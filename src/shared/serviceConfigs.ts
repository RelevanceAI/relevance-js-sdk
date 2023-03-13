
export interface serviceConfig {
  schema_url:string,
  endpoint:string,
  name:string,
}
export const serviceConfigs:{[id:string]:serviceConfig} = {
  DiscoveryApi:{
    schema_url:'https://api-f1db6c.stack.tryrelevance.com/latest/openapi_schema.json',
    endpoint:'https://api-f1db6c.stack.tryrelevance.com',
    name:'DiscoveryApi',
  },
}