
export interface serviceConfig {
  schema_url:string,
  endpoint:string,
  name:string,
}
export const serviceConfigs:{[id:string]:serviceConfig} = {
  DiscoveryApi:{
    schema_url:'https://gateway-api-aueast.relevance.ai/latest/openapi_schema.json',
    endpoint:'https://gateway-api-aueast.relevance.ai',
    name:'DiscoveryApi',
  },
  VectorApi:{
    schema_url:'https://gateway-api-aueast.relevance.ai/latest/openapi.json',
    endpoint:'https://gateway-api-aueast.relevance.ai',
    name:'VectorApi',
  }
}