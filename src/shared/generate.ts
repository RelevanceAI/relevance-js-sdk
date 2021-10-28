import fetch from 'cross-fetch';
import {promises as fs} from 'fs';
import openapiTS,{ OpenAPI3,OperationObject} from 'openapi-typescript';
import { serviceConfig,serviceConfigs } from './serviceConfigs';

// download schema using cross-fetch
// convert to sdk with typescript, can supply middleware methods that will be run ???
function GetFlattenedSchema(schema:OpenAPI3){
  if (!schema.paths) throw new Error('No paths in schema ${config.schema_url}');
  const final:{path:string,method:string,operation:OperationObject}[] = [];
  for (const [path,methods] of Object.entries(schema.paths )) {
    for (const [method,pathData] of Object.entries(methods)) {
      const operation:OperationObject = pathData; // object.entries didnt work here
      final.push({path,method,operation});
    }
  }
  return final;
}
async function GenerateSDKFromOpenAPISchema({config}:{config:serviceConfig}) {
  const openapiSchema:OpenAPI3 = await (await fetch(config.schema_url)).json();
  const typescriptOutput = await openapiTS(openapiSchema);
  let sdkText = '';
  const pipeline = [
    () => {
      sdkText += `import {_GenericClient,CommandInput,CommandOutput,_ClientInput} from '../shared/BaseClient';
`;
    },
    () => {
      sdkText += typescriptOutput;
    },
    () => {
      for (const {path,method,operation} of GetFlattenedSchema(openapiSchema)) {
        if (method.toLowerCase() !== 'get') {
          sdkText += `
  export type ${operation.summary}Input = operations['${operation.summary}']['requestBody']['content']['application/json']`;

        }
        else {
          sdkText += `
  export type ${operation.summary}Input = {}`;
        }
        sdkText += `
export type ${operation.summary}Output = operations['${operation.summary}']['responses']['200']['content']['application/json']`;
      }

    },
    () => {
      sdkText += `
export class ${config.name}Client  extends _GenericClient {
  constructor(config:_ClientInput){
    super({...config,service_name:'${config.name}'});
  }`;
    },
    () => {
      for (const {path,method,operation} of GetFlattenedSchema(openapiSchema)) {
        sdkText += `
  public async ${operation.summary}(
    input: CommandInput<${operation.summary}Input>
  ):Promise<CommandOutput<${operation.summary}Output>> {
    return this.SendRequest({
      input,
      method:'${method}',
      path:'${path}'
    });
  }`;
      }
    },
    () => {
      sdkText += '}';
    }
  ]
  for (const fn of pipeline) fn();
  await fs.writeFile(`./src/generated/clients.ts`,sdkText);

}
GenerateSDKFromOpenAPISchema({config:serviceConfigs['Discovery']})