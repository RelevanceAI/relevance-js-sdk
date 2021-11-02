import fetch from 'cross-fetch';
import {promises as fs} from 'fs';
import openapiTS,{ OpenAPI3,OperationObject} from 'openapi-typescript';
import { serviceConfig,serviceConfigs } from './serviceConfigs';

// download schema using cross-fetch
// convert to sdk with typescript, can supply middleware methods that will be run ???
function GetFlattenedSchema(schema:OpenAPI3){
  if (!schema.paths) throw new Error('No paths in schema ${config.schema_url}');
  const final:{path:string,method:string,operation:OperationObject,operationSummaryName:string}[] = [];
  for (const [path,methods] of Object.entries(schema.paths )) {
    for (const [method,pathData] of Object.entries(methods)) {
      const operation:OperationObject = pathData; // object.entries didnt work here
      const operationSummaryName = (operation?.operationId ?? operation?.summary ?? `${path}-${method}`)?.replace(/[^A-Za-z0-9]/g,"");
      final.push({path,method,operation,operationSummaryName});
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
      sdkText += `import {CommandInput,_GenericClient,CommandOutput,_ClientInput,_GenericMethodOptions} from '../shared/BaseClient';
      import {operations} from './_${config.name}SchemaTypes';
`;
    },
    () => {
      for (const {path,method,operation,operationSummaryName} of GetFlattenedSchema(openapiSchema)) {
        if (method.toLowerCase() !== 'get' && operation.requestBody) {
          sdkText += `
  export type ${operationSummaryName}Input = operations['${operation.operationId}']['requestBody']['content']['application/json']`;

        }
        else {
          sdkText += `
  export type ${operationSummaryName}Input = {}`;
        }
        sdkText += `
export type ${operationSummaryName}Output = operations['${operation.operationId}']['responses']['200']['content']['application/json']`;
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
      for (const {path,method,operationSummaryName} of GetFlattenedSchema(openapiSchema)) {
        sdkText += `
  public async ${operationSummaryName}(
    input: CommandInput<${operationSummaryName}Input>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<${operationSummaryName}Output>> {
    return this.SendRequest({
      input,
      method:'${method}',
      path:'${path}',
      options
    });
  }`;
      }
    },
    () => {
      sdkText += '}';
    }
  ]
  for (const fn of pipeline) fn();
  await fs.writeFile(`./src/generated/${config.name}.ts`,sdkText);
  await fs.writeFile(`./src/generated/_${config.name}SchemaTypes.ts`,typescriptOutput);
}
async function GenerateSDKS(){
  let indexFileContent = '';
  for (const config of Object.values(serviceConfigs)) {
    GenerateSDKFromOpenAPISchema({config});
    indexFileContent += `export * from "./${config.name}";\n`;
  }
  await fs.writeFile(`./src/generated/index.ts`,indexFileContent);
}
GenerateSDKS();