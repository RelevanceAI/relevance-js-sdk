import fetch from 'cross-fetch';
import { serviceConfig,serviceConfigs } from './serviceConfigs';
export interface CommandInput<input> {
  body:input,
  params:{dataset_id:string},
  endpoint?:string

}

export interface CommandOutput<output> {
  body:output
}
export interface _ClientInput { endpoint?:string,api_key:string,project:string}
export type _GenericClientInput = _ClientInput & {service_name:string}
export class _GenericClient {
  config: _GenericClientInput;
  serviceConfig:serviceConfig;
  constructor(config:_GenericClientInput){
    this.config = config;
    this.serviceConfig = serviceConfigs[config.service_name];
  }
  async SendRequest({input,path,method}:{input:CommandInput<any>,path:string,method:string}):Promise<CommandOutput<any>>{
    const settings:RequestInit = {
      method,
      headers:{authorization:`${this.config.project}:${this.config.api_key}`},
    };
    if (method.toLowerCase() !== 'get') settings.body = JSON.stringify(input.body);
    const res = await fetch(
      `${this.config.endpoint ?? this.serviceConfig.endpoint}/latest${path.replace('{dataset_id}',input.params.dataset_id)}`,
      settings
    )
    const body = await res.json();
    return {body};
  }
}