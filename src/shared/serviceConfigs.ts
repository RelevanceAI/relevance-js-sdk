
export interface serviceConfig {
  schema_url:string,
  endpoint:string,
  name:string,
}
export const serviceConfigs:{[id:string]:serviceConfig} = {
  Discovery:{
    schema_url:'https://ingest-api-aueast.relevance.ai/latest/openapi_schema.json',
    endpoint:'https://ingest-api-aueast.relevance.ai',
    name:'Discovery',
  }
}