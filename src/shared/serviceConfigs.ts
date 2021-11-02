
export interface serviceConfig {
  schema_url:string,
  endpoint:string,
  name:string,
}
export const serviceConfigs:{[id:string]:serviceConfig} = {
  Discovery:{
    schema_url:'https://gateway-api-aueast.relevance.ai/latest/openapi_schema.json',
    endpoint:'https://gateway-api-aueast.relevance.ai',
    name:'Discovery',
  },
  Vector:{
    schema_url:'https://gateway-api-aueast.relevance.ai/latest/openapi.json',
    endpoint:'https://gateway-api-aueast.relevance.ai',
    name:'Vector',
  }
}