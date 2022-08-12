
export interface serviceConfig {
  schema_url:string,
  endpoint:string,
  name:string,
}
export const serviceConfigs:{[id:string]:serviceConfig} = {
  DiscoveryApi:{
    schema_url:'https://api.ap-southeast-2.relevance.ai/latest/openapi_schema.json',
    endpoint:'https://api.ap-southeast-2.relevance.ai',
    name:'DiscoveryApi',
  },
}