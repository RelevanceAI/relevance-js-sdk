import fetch from 'cross-fetch';
import { serviceConfig, serviceConfigs } from './serviceConfigs';
export type CommandInput<A> = A
export interface CommandOutput<output> {
  body: output
}
export interface _ClientInput { endpoint?: string, api_key?: string, project?: string, dataset_id?: string }
export type _GenericClientInput = _ClientInput & { service_name: string }
export interface _GenericMethodOptions { dataset_id?: string }
const envVars = {
  project: process?.env?.RELEVANCE_PROJECT,
  api_key: process?.env?.RELEVANCE_API_KEY,
}
export class _GenericClient {
  config: _GenericClientInput;
  serviceConfig: serviceConfig;
  constructor(config: _GenericClientInput) {
    this.config = config;
    this.serviceConfig = serviceConfigs[config.service_name];
  }
  async SendRequest({ input, path, method, options }: { input: any, path: string, method: string, options?: _GenericMethodOptions }): Promise<CommandOutput<any>> {
    const settings: RequestInit = {
      method,
      headers: { authorization: `${this.config.project??envVars.project}:${this.config.api_key??envVars.api_key}` },
    };
    if (method.toLowerCase() !== 'get') settings.body = JSON.stringify(input);
    const final_dataset_id = options?.dataset_id ?? this.config.dataset_id ?? "";
    const res = await fetch(
      `${this.config.endpoint ?? this.serviceConfig.endpoint}/latest${path.replace('{dataset_id}', final_dataset_id)}`,
      settings
    )
    if (!res.ok) throw new Error(`${path} ${method} failed with status ${res.status}: ${(await res.text())}`)
    const body = await res.json();
    return { body };
  }
}