import {CommandInput,_GenericClient,CommandOutput,_ClientInput,_GenericMethodOptions} from '../shared/BaseClient';
      import {operations} from './_DiscoveryApiSchemaTypes';

  export type InsertInput = operations['Insert']['requestBody']['content']['application/json']
export type InsertOutput = operations['Insert']['responses']['200']['content']['application/json']
  export type BulkInsertInput = operations['BulkInsert']['requestBody']['content']['application/json']
export type BulkInsertOutput = operations['BulkInsert']['responses']['200']['content']['application/json']
  export type BlobAccessURLsInput = operations['BlobAccessURLs']['requestBody']['content']['application/json']
export type BlobAccessURLsOutput = operations['BlobAccessURLs']['responses']['200']['content']['application/json']
  export type ParseBlobInput = operations['ParseBlob']['requestBody']['content']['application/json']
export type ParseBlobOutput = operations['ParseBlob']['responses']['200']['content']['application/json']
  export type UpdateInput = operations['Update']['requestBody']['content']['application/json']
export type UpdateOutput = operations['Update']['responses']['200']['content']['application/json']
  export type BulkUpdateInput = operations['BulkUpdate']['requestBody']['content']['application/json']
export type BulkUpdateOutput = operations['BulkUpdate']['responses']['200']['content']['application/json']
  export type UpdateWhereInput = operations['UpdateWhere']['requestBody']['content']['application/json']
export type UpdateWhereOutput = operations['UpdateWhere']['responses']['200']['content']['application/json']
  export type SimpleSearchPostInput = operations['SimpleSearchPost']['requestBody']['content']['application/json']
export type SimpleSearchPostOutput = operations['SimpleSearchPost']['responses']['200']['content']['application/json']
  export type SimpleSearchGetInput = {}
export type SimpleSearchGetOutput = operations['SimpleSearchGet']['responses']['200']['content']['application/json']
export class DiscoveryApiClient  extends _GenericClient {
  constructor(config:_ClientInput){
    super({...config,service_name:'DiscoveryApi'});
  }
  public async Insert(
    input: CommandInput<InsertInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<InsertOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/documents/insert',
      options
    });
  }
  public async BulkInsert(
    input: CommandInput<BulkInsertInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<BulkInsertOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/documents/bulk_insert',
      options
    });
  }
  public async BlobAccessURLs(
    input: CommandInput<BlobAccessURLsInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<BlobAccessURLsOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/blob_access_urls',
      options
    });
  }
  public async ParseBlob(
    input: CommandInput<ParseBlobInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<ParseBlobOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/parse_blob',
      options
    });
  }
  public async Update(
    input: CommandInput<UpdateInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<UpdateOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/documents/update',
      options
    });
  }
  public async BulkUpdate(
    input: CommandInput<BulkUpdateInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<BulkUpdateOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/documents/bulk_update',
      options
    });
  }
  public async UpdateWhere(
    input: CommandInput<UpdateWhereInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<UpdateWhereOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/documents/update_where',
      options
    });
  }
  public async SimpleSearchPost(
    input: CommandInput<SimpleSearchPostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<SimpleSearchPostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/simple_search',
      options
    });
  }
  public async SimpleSearchGet(
    input: CommandInput<SimpleSearchGetInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<SimpleSearchGetOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/datasets/{dataset_id}/simple_search',
      options
    });
  }}