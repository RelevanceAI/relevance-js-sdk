import {CommandInput,_GenericClient,CommandOutput,_ClientInput,_GenericMethodOptions} from '../shared/BaseClient';
      import {operations} from './_DiscoveryApiSchemaTypes';

  export type CreateDeployableInput = operations['CreateDeployable']['requestBody']['content']['application/json']
export type CreateDeployableOutput = operations['CreateDeployable']['responses']['200']['content']['application/json']
  export type GetDeployableInput = {}
export type GetDeployableOutput = operations['GetDeployable']['responses']['200']['content']['application/json']
  export type UpdateDeployableInput = operations['UpdateDeployable']['requestBody']['content']['application/json']
export type UpdateDeployableOutput = operations['UpdateDeployable']['responses']['200']['content']['application/json']
  export type DeleteDeployableInput = operations['DeleteDeployable']['requestBody']['content']['application/json']
export type DeleteDeployableOutput = operations['DeleteDeployable']['responses']['200']['content']['application/json']
  export type CreateDeployableKeyInput = operations['CreateDeployableKey']['requestBody']['content']['application/json']
export type CreateDeployableKeyOutput = operations['CreateDeployableKey']['responses']['200']['content']['application/json']
  export type CreateDeployableInviteInput = operations['CreateDeployableInvite']['requestBody']['content']['application/json']
export type CreateDeployableInviteOutput = operations['CreateDeployableInvite']['responses']['200']['content']['application/json']
  export type UpdateUsersDeployablePermissionsInput = operations['UpdateUsersDeployablePermissions']['requestBody']['content']['application/json']
export type UpdateUsersDeployablePermissionsOutput = operations['UpdateUsersDeployablePermissions']['responses']['200']['content']['application/json']
  export type DeleteDeployableKeyInput = operations['DeleteDeployableKey']['requestBody']['content']['application/json']
export type DeleteDeployableKeyOutput = operations['DeleteDeployableKey']['responses']['200']['content']['application/json']
  export type ListDeployablesInput = {}
export type ListDeployablesOutput = operations['ListDeployables']['responses']['200']['content']['application/json']
  export type DeleteDeployableGroupInput = operations['DeleteDeployableGroup']['requestBody']['content']['application/json']
export type DeleteDeployableGroupOutput = operations['DeleteDeployableGroup']['responses']['200']['content']['application/json']
  export type ListDeployableGroupsInput = operations['ListDeployableGroups']['requestBody']['content']['application/json']
export type ListDeployableGroupsOutput = operations['ListDeployableGroups']['responses']['200']['content']['application/json']
  export type CreateDeployableGroupInput = operations['CreateDeployableGroup']['requestBody']['content']['application/json']
export type CreateDeployableGroupOutput = operations['CreateDeployableGroup']['responses']['200']['content']['application/json']
  export type GetDeployableGroupInput = {}
export type GetDeployableGroupOutput = operations['GetDeployableGroup']['responses']['200']['content']['application/json']
  export type UpdateDeployableGroupInput = operations['UpdateDeployableGroup']['requestBody']['content']['application/json']
export type UpdateDeployableGroupOutput = operations['UpdateDeployableGroup']['responses']['200']['content']['application/json']
  export type CreateDeployableGroupKeyInput = operations['CreateDeployableGroupKey']['requestBody']['content']['application/json']
export type CreateDeployableGroupKeyOutput = operations['CreateDeployableGroupKey']['responses']['200']['content']['application/json']
  export type DeleteDeployableGroupKeyInput = operations['DeleteDeployableGroupKey']['requestBody']['content']['application/json']
export type DeleteDeployableGroupKeyOutput = operations['DeleteDeployableGroupKey']['responses']['200']['content']['application/json']
  export type CreateProjectInput = operations['CreateProject']['requestBody']['content']['application/json']
export type CreateProjectOutput = operations['CreateProject']['responses']['200']['content']['application/json']
  export type UpdateProjectInput = operations['UpdateProject']['requestBody']['content']['application/json']
export type UpdateProjectOutput = operations['UpdateProject']['responses']['200']['content']['application/json']
  export type TransferProjectToOrganizationInput = operations['TransferProjectToOrganization']['requestBody']['content']['application/json']
export type TransferProjectToOrganizationOutput = operations['TransferProjectToOrganization']['responses']['200']['content']['application/json']
  export type ListProjectsInput = {}
export type ListProjectsOutput = operations['ListProjects']['responses']['200']['content']['application/json']
  export type CreateUserInput = operations['CreateUser']['requestBody']['content']['application/json']
export type CreateUserOutput = operations['CreateUser']['responses']['200']['content']['application/json']
  export type ListUsersInput = operations['ListUsers']['requestBody']['content']['application/json']
export type ListUsersOutput = operations['ListUsers']['responses']['200']['content']['application/json']
  export type IsUserAuthorizedInput = operations['IsUserAuthorized']['requestBody']['content']['application/json']
export type IsUserAuthorizedOutput = operations['IsUserAuthorized']['responses']['200']['content']['application/json']
  export type GetAuthHeaderInfoInput = {}
export type GetAuthHeaderInfoOutput = operations['GetAuthHeaderInfo']['responses']['200']['content']['application/json']
  export type CreateProjectInviteInput = operations['CreateProjectInvite']['requestBody']['content']['application/json']
export type CreateProjectInviteOutput = operations['CreateProjectInvite']['responses']['200']['content']['application/json']
  export type ListProjectInvitesInput = operations['ListProjectInvites']['requestBody']['content']['application/json']
export type ListProjectInvitesOutput = operations['ListProjectInvites']['responses']['200']['content']['application/json']
  export type AcceptProjectInviteInput = operations['AcceptProjectInvite']['requestBody']['content']['application/json']
export type AcceptProjectInviteOutput = operations['AcceptProjectInvite']['responses']['200']['content']['application/json']
  export type DeleteProjectInviteInput = operations['DeleteProjectInvite']['requestBody']['content']['application/json']
export type DeleteProjectInviteOutput = operations['DeleteProjectInvite']['responses']['200']['content']['application/json']
  export type ResendProjectInviteInput = operations['ResendProjectInvite']['requestBody']['content']['application/json']
export type ResendProjectInviteOutput = operations['ResendProjectInvite']['responses']['200']['content']['application/json']
  export type GetUserInput = {}
export type GetUserOutput = operations['GetUser']['responses']['200']['content']['application/json']
  export type UpdateUserInput = operations['UpdateUser']['requestBody']['content']['application/json']
export type UpdateUserOutput = operations['UpdateUser']['responses']['200']['content']['application/json']
  export type DeleteUserInput = operations['DeleteUser']['requestBody']['content']['application/json']
export type DeleteUserOutput = operations['DeleteUser']['responses']['200']['content']['application/json']
  export type CreateUserKeyInput = operations['CreateUserKey']['requestBody']['content']['application/json']
export type CreateUserKeyOutput = operations['CreateUserKey']['responses']['200']['content']['application/json']
  export type ListUserKeysInput = operations['ListUserKeys']['requestBody']['content']['application/json']
export type ListUserKeysOutput = operations['ListUserKeys']['responses']['200']['content']['application/json']
  export type DeleteUserKeyInput = operations['DeleteUserKey']['requestBody']['content']['application/json']
export type DeleteUserKeyOutput = operations['DeleteUserKey']['responses']['200']['content']['application/json']
  export type InsertClusterCentroidsInput = operations['InsertClusterCentroids']['requestBody']['content']['application/json']
export type InsertClusterCentroidsOutput = operations['InsertClusterCentroids']['responses']['200']['content']['application/json']
  export type UpdateClusterCentroidsInput = operations['UpdateClusterCentroids']['requestBody']['content']['application/json']
export type UpdateClusterCentroidsOutput = operations['UpdateClusterCentroids']['responses']['200']['content']['application/json']
  export type CompareClusterCentroidsInput = operations['CompareClusterCentroids']['requestBody']['content']['application/json']
export type CompareClusterCentroidsOutput = operations['CompareClusterCentroids']['responses']['200']['content']['application/json']
  export type AggregateInput = operations['Aggregate']['requestBody']['content']['application/json']
export type AggregateOutput = operations['Aggregate']['responses']['200']['content']['application/json']
  export type AggregateClustersInput = operations['AggregateClusters']['requestBody']['content']['application/json']
export type AggregateClustersOutput = operations['AggregateClusters']['responses']['200']['content']['application/json']
  export type ListClusterFacetsInput = operations['ListClusterFacets']['requestBody']['content']['application/json']
export type ListClusterFacetsOutput = operations['ListClusterFacets']['responses']['200']['content']['application/json']
  export type ListClosestToCentroidsInput = operations['ListClosestToCentroids']['requestBody']['content']['application/json']
export type ListClosestToCentroidsOutput = operations['ListClosestToCentroids']['responses']['200']['content']['application/json']
  export type ListFurthestFromCentroidsInput = operations['ListFurthestFromCentroids']['requestBody']['content']['application/json']
export type ListFurthestFromCentroidsOutput = operations['ListFurthestFromCentroids']['responses']['200']['content']['application/json']
  export type ListCentroidsInput = operations['ListCentroids']['requestBody']['content']['application/json']
export type ListCentroidsOutput = operations['ListCentroids']['responses']['200']['content']['application/json']
  export type ListCentroidConfigsInput = {}
export type ListCentroidConfigsOutput = operations['ListCentroidConfigs']['responses']['200']['content']['application/json']
  export type DeleteCentroidInput = operations['DeleteCentroid']['requestBody']['content']['application/json']
export type DeleteCentroidOutput = operations['DeleteCentroid']['responses']['200']['content']['application/json']
  export type RealtimeClusteringInput = operations['RealtimeClustering']['requestBody']['content']['application/json']
export type RealtimeClusteringOutput = operations['RealtimeClustering']['responses']['200']['content']['application/json']
  export type MergeClustersInput = operations['MergeClusters']['requestBody']['content']['application/json']
export type MergeClustersOutput = operations['MergeClusters']['responses']['200']['content']['application/json']
  export type CreateClusterSummariesInput = operations['CreateClusterSummaries']['requestBody']['content']['application/json']
export type CreateClusterSummariesOutput = operations['CreateClusterSummaries']['responses']['200']['content']['application/json']
  export type CreateClusterLabelsInput = operations['CreateClusterLabels']['requestBody']['content']['application/json']
export type CreateClusterLabelsOutput = operations['CreateClusterLabels']['responses']['200']['content']['application/json']
  export type ListClusterSummariesInput = operations['ListClusterSummaries']['requestBody']['content']['application/json']
export type ListClusterSummariesOutput = operations['ListClusterSummaries']['responses']['200']['content']['application/json']
  export type DeleteClusterSummariesInput = operations['DeleteClusterSummaries']['requestBody']['content']['application/json']
export type DeleteClusterSummariesOutput = operations['DeleteClusterSummaries']['responses']['200']['content']['application/json']
  export type CreateOrganizationInput = operations['CreateOrganization']['requestBody']['content']['application/json']
export type CreateOrganizationOutput = operations['CreateOrganization']['responses']['200']['content']['application/json']
  export type UpdateOrganizationInput = operations['UpdateOrganization']['requestBody']['content']['application/json']
export type UpdateOrganizationOutput = operations['UpdateOrganization']['responses']['200']['content']['application/json']
  export type UpdateOrganizationAdminInput = operations['UpdateOrganizationAdmin']['requestBody']['content']['application/json']
export type UpdateOrganizationAdminOutput = operations['UpdateOrganizationAdmin']['responses']['200']['content']['application/json']
  export type ListOrganizationsInput = {}
export type ListOrganizationsOutput = operations['ListOrganizations']['responses']['200']['content']['application/json']
  export type DeleteOrganizationInput = operations['DeleteOrganization']['requestBody']['content']['application/json']
export type DeleteOrganizationOutput = operations['DeleteOrganization']['responses']['200']['content']['application/json']
  export type GetOrganizationInput = {}
export type GetOrganizationOutput = operations['GetOrganization']['responses']['200']['content']['application/json']
  export type GetOrganizationUsageInput = {}
export type GetOrganizationUsageOutput = operations['GetOrganizationUsage']['responses']['200']['content']['application/json']
  export type ListUsersInOrganizationInput = {}
export type ListUsersInOrganizationOutput = operations['ListUsersInOrganization']['responses']['200']['content']['application/json']
  export type ListProjectsInOrganizationInput = {}
export type ListProjectsInOrganizationOutput = operations['ListProjectsInOrganization']['responses']['200']['content']['application/json']
  export type CreateConnectorInput = operations['CreateConnector']['requestBody']['content']['application/json']
export type CreateConnectorOutput = operations['CreateConnector']['responses']['200']['content']['application/json']
  export type CheckConnectionInput = operations['CheckConnection']['requestBody']['content']['application/json']
export type CheckConnectionOutput = operations['CheckConnection']['responses']['200']['content']['application/json']
  export type GetConnectorInput = {}
export type GetConnectorOutput = operations['GetConnector']['responses']['200']['content']['application/json']
  export type UpdateConnectorInput = operations['UpdateConnector']['requestBody']['content']['application/json']
export type UpdateConnectorOutput = operations['UpdateConnector']['responses']['200']['content']['application/json']
  export type TriggerConnectorInput = operations['TriggerConnector']['requestBody']['content']['application/json']
export type TriggerConnectorOutput = operations['TriggerConnector']['responses']['200']['content']['application/json']
  export type DeleteConnectorInput = operations['DeleteConnector']['requestBody']['content']['application/json']
export type DeleteConnectorOutput = operations['DeleteConnector']['responses']['200']['content']['application/json']
  export type ListConnectorsInput = {}
export type ListConnectorsOutput = operations['ListConnectors']['responses']['200']['content']['application/json']
  export type ListConnectorTypesInput = {}
export type ListConnectorTypesOutput = operations['ListConnectorTypes']['responses']['200']['content']['application/json']
  export type GetConnectorTypeInput = {}
export type GetConnectorTypeOutput = operations['GetConnectorType']['responses']['200']['content']['application/json']
  export type ListConnectorJobsInput = {}
export type ListConnectorJobsOutput = operations['ListConnectorJobs']['responses']['200']['content']['application/json']
  export type GetConnectorJobInput = {}
export type GetConnectorJobOutput = operations['GetConnectorJob']['responses']['200']['content']['application/json']
  export type TriggerWorkflowInput = operations['TriggerWorkflow']['requestBody']['content']['application/json']
export type TriggerWorkflowOutput = operations['TriggerWorkflow']['responses']['200']['content']['application/json']
  export type ListWorkflowsInput = {}
export type ListWorkflowsOutput = operations['ListWorkflows']['responses']['200']['content']['application/json']
  export type GetWorkflowStatusInput = operations['GetWorkflowStatus']['requestBody']['content']['application/json']
export type GetWorkflowStatusOutput = operations['GetWorkflowStatus']['responses']['200']['content']['application/json']
  export type DeleteWorkflowStatusInput = operations['DeleteWorkflowStatus']['requestBody']['content']['application/json']
export type DeleteWorkflowStatusOutput = operations['DeleteWorkflowStatus']['responses']['200']['content']['application/json']
  export type UpsertWorkflowMetadataInput = operations['UpsertWorkflowMetadata']['requestBody']['content']['application/json']
export type UpsertWorkflowMetadataOutput = operations['UpsertWorkflowMetadata']['responses']['200']['content']['application/json']
  export type UpsertWorkflowStatusInput = operations['UpsertWorkflowStatus']['requestBody']['content']['application/json']
export type UpsertWorkflowStatusOutput = operations['UpsertWorkflowStatus']['responses']['200']['content']['application/json']
  export type ListWorkflowTypesInput = {}
export type ListWorkflowTypesOutput = operations['ListWorkflowTypes']['responses']['200']['content']['application/json']
  export type GetWorkflowTypeInput = {}
export type GetWorkflowTypeOutput = operations['GetWorkflowType']['responses']['200']['content']['application/json']
  export type ValidateWorkflowParamsInput = operations['ValidateWorkflowParams']['requestBody']['content']['application/json']
export type ValidateWorkflowParamsOutput = operations['ValidateWorkflowParams']['responses']['200']['content']['application/json']
  export type InsertInput = operations['Insert']['requestBody']['content']['application/json']
export type InsertOutput = operations['Insert']['responses']['200']['content']['application/json']
  export type BulkInsertInput = operations['BulkInsert']['requestBody']['content']['application/json']
export type BulkInsertOutput = operations['BulkInsert']['responses']['200']['content']['application/json']
  export type GetFileUploadUrlsForDatasetInput = operations['GetFileUploadUrlsForDataset']['requestBody']['content']['application/json']
export type GetFileUploadUrlsForDatasetOutput = operations['GetFileUploadUrlsForDataset']['responses']['200']['content']['application/json']
  export type ListFileUploadsForDatasetInput = {}
export type ListFileUploadsForDatasetOutput = operations['ListFileUploadsForDataset']['responses']['200']['content']['application/json']
  export type ParseBlobInput = operations['ParseBlob']['requestBody']['content']['application/json']
export type ParseBlobOutput = operations['ParseBlob']['responses']['200']['content']['application/json']
  export type CopyForeignDatasetInput = operations['CopyForeignDataset']['requestBody']['content']['application/json']
export type CopyForeignDatasetOutput = operations['CopyForeignDataset']['responses']['200']['content']['application/json']
  export type CreateProjectReadKeyInput = operations['CreateProjectReadKey']['requestBody']['content']['application/json']
export type CreateProjectReadKeyOutput = operations['CreateProjectReadKey']['responses']['200']['content']['application/json']
  export type DeleteDatasetInput = operations['DeleteDataset']['requestBody']['content']['application/json']
export type DeleteDatasetOutput = operations['DeleteDataset']['responses']['200']['content']['application/json']
  export type CreateDatasetInput = operations['CreateDataset']['requestBody']['content']['application/json']
export type CreateDatasetOutput = operations['CreateDataset']['responses']['200']['content']['application/json']
  export type GetSchemaInput = {}
export type GetSchemaOutput = operations['GetSchema']['responses']['200']['content']['application/json']
  export type ListDatasetsInput = {}
export type ListDatasetsOutput = operations['ListDatasets']['responses']['200']['content']['application/json']
  export type CombineDatasetsInput = operations['CombineDatasets']['requestBody']['content']['application/json']
export type CombineDatasetsOutput = operations['CombineDatasets']['responses']['200']['content']['application/json']
  export type GetCombineJobStatusInput = operations['GetCombineJobStatus']['requestBody']['content']['application/json']
export type GetCombineJobStatusOutput = operations['GetCombineJobStatus']['responses']['200']['content']['application/json']
  export type SearchDatasetsInput = {}
export type SearchDatasetsOutput = operations['SearchDatasets']['responses']['200']['content']['application/json']
  export type GetFieldHealthInput = {}
export type GetFieldHealthOutput = operations['GetFieldHealth']['responses']['200']['content']['application/json']
  export type GetDatasetStatsInput = {}
export type GetDatasetStatsOutput = operations['GetDatasetStats']['responses']['200']['content']['application/json']
  export type GetDatasetUsageInput = operations['GetDatasetUsage']['requestBody']['content']['application/json']
export type GetDatasetUsageOutput = operations['GetDatasetUsage']['responses']['200']['content']['application/json']
  export type GetVectorMappingsInput = {}
export type GetVectorMappingsOutput = operations['GetVectorMappings']['responses']['200']['content']['application/json']
  export type GetDatasetDetailsInput = operations['GetDatasetDetails']['requestBody']['content']['application/json']
export type GetDatasetDetailsOutput = operations['GetDatasetDetails']['responses']['200']['content']['application/json']
  export type GetDocumentInput = {}
export type GetDocumentOutput = operations['GetDocument']['responses']['200']['content']['application/json']
  export type DeleteDocumentInput = operations['DeleteDocument']['requestBody']['content']['application/json']
export type DeleteDocumentOutput = operations['DeleteDocument']['responses']['200']['content']['application/json']
  export type UpsertDatasetSettingsInput = operations['UpsertDatasetSettings']['requestBody']['content']['application/json']
export type UpsertDatasetSettingsOutput = operations['UpsertDatasetSettings']['responses']['200']['content']['application/json']
  export type GetDatasetSettingsInput = {}
export type GetDatasetSettingsOutput = operations['GetDatasetSettings']['responses']['200']['content']['application/json']
  export type UpsertDatasetMetadataInput = operations['UpsertDatasetMetadata']['requestBody']['content']['application/json']
export type UpsertDatasetMetadataOutput = operations['UpsertDatasetMetadata']['responses']['200']['content']['application/json']
  export type GetDatasetMetadataInput = {}
export type GetDatasetMetadataOutput = operations['GetDatasetMetadata']['responses']['200']['content']['application/json']
  export type UpdateInput = operations['Update']['requestBody']['content']['application/json']
export type UpdateOutput = operations['Update']['responses']['200']['content']['application/json']
  export type DeleteDocumentFieldsInput = operations['DeleteDocumentFields']['requestBody']['content']['application/json']
export type DeleteDocumentFieldsOutput = operations['DeleteDocumentFields']['responses']['200']['content']['application/json']
  export type BulkUpdateInput = operations['BulkUpdate']['requestBody']['content']['application/json']
export type BulkUpdateOutput = operations['BulkUpdate']['responses']['200']['content']['application/json']
  export type UpdateWhereInput = operations['UpdateWhere']['requestBody']['content']['application/json']
export type UpdateWhereOutput = operations['UpdateWhere']['responses']['200']['content']['application/json']
  export type DeleteTagsInput = operations['DeleteTags']['requestBody']['content']['application/json']
export type DeleteTagsOutput = operations['DeleteTags']['responses']['200']['content']['application/json']
  export type MergeTagsInput = operations['MergeTags']['requestBody']['content']['application/json']
export type MergeTagsOutput = operations['MergeTags']['responses']['200']['content']['application/json']
  export type ListFacetsInput = operations['ListFacets']['requestBody']['content']['application/json']
export type ListFacetsOutput = operations['ListFacets']['responses']['200']['content']['application/json']
  export type GetWhereInput = operations['GetWhere']['requestBody']['content']['application/json']
export type GetWhereOutput = operations['GetWhere']['responses']['200']['content']['application/json']
  export type PaginateDocumentsInput = operations['PaginateDocuments']['requestBody']['content']['application/json']
export type PaginateDocumentsOutput = operations['PaginateDocuments']['responses']['200']['content']['application/json']
  export type BulkGetDocumentsInput = operations['BulkGetDocuments']['requestBody']['content']['application/json']
export type BulkGetDocumentsOutput = operations['BulkGetDocuments']['responses']['200']['content']['application/json']
  export type BulkDeleteDocumentsInput = operations['BulkDeleteDocuments']['requestBody']['content']['application/json']
export type BulkDeleteDocumentsOutput = operations['BulkDeleteDocuments']['responses']['200']['content']['application/json']
  export type ListDocumentsInput = {}
export type ListDocumentsOutput = operations['ListDocuments']['responses']['200']['content']['application/json']
  export type DeleteWhereInput = operations['DeleteWhere']['requestBody']['content']['application/json']
export type DeleteWhereOutput = operations['DeleteWhere']['responses']['200']['content']['application/json']
  export type SimpleSearchPostInput = operations['SimpleSearchPost']['requestBody']['content']['application/json']
export type SimpleSearchPostOutput = operations['SimpleSearchPost']['responses']['200']['content']['application/json']
  export type SearchInput = operations['Search']['requestBody']['content']['application/json']
export type SearchOutput = operations['Search']['responses']['200']['content']['application/json']
  export type RecommendInput = operations['Recommend']['requestBody']['content']['application/json']
export type RecommendOutput = operations['Recommend']['responses']['200']['content']['application/json']
  export type CloneDatasetInput = operations['CloneDataset']['requestBody']['content']['application/json']
export type CloneDatasetOutput = operations['CloneDataset']['responses']['200']['content']['application/json']
  export type PredictKNNRegressionInput = operations['PredictKNNRegression']['requestBody']['content']['application/json']
export type PredictKNNRegressionOutput = operations['PredictKNNRegression']['responses']['200']['content']['application/json']
  export type PredictKNNFromResultsInput = operations['PredictKNNFromResults']['requestBody']['content']['application/json']
export type PredictKNNFromResultsOutput = operations['PredictKNNFromResults']['responses']['200']['content']['application/json']
  export type BiasEvaluationInput = operations['BiasEvaluation']['requestBody']['content']['application/json']
export type BiasEvaluationOutput = operations['BiasEvaluation']['responses']['200']['content']['application/json']
  export type VectorizeInput = operations['Vectorize']['requestBody']['content']['application/json']
export type VectorizeOutput = operations['Vectorize']['responses']['200']['content']['application/json']
  export type VectorizeAndInsertInput = operations['VectorizeAndInsert']['requestBody']['content']['application/json']
export type VectorizeAndInsertOutput = operations['VectorizeAndInsert']['responses']['200']['content']['application/json']
  export type VectorizeFieldInput = operations['VectorizeField']['requestBody']['content']['application/json']
export type VectorizeFieldOutput = operations['VectorizeField']['responses']['200']['content']['application/json']
  export type CreateImageFromPromptInput = operations['CreateImageFromPrompt']['requestBody']['content']['application/json']
export type CreateImageFromPromptOutput = operations['CreateImageFromPrompt']['responses']['200']['content']['application/json']
  export type DeleteFieldChildrenInput = operations['DeleteFieldChildren']['requestBody']['content']['application/json']
export type DeleteFieldChildrenOutput = operations['DeleteFieldChildren']['responses']['200']['content']['application/json']
  export type ListFieldChildrensInput = operations['ListFieldChildrens']['requestBody']['content']['application/json']
export type ListFieldChildrensOutput = operations['ListFieldChildrens']['responses']['200']['content']['application/json']
  export type UpdateFieldChildrenInput = operations['UpdateFieldChildren']['requestBody']['content']['application/json']
export type UpdateFieldChildrenOutput = operations['UpdateFieldChildren']['responses']['200']['content']['application/json']
  export type DeleteFavouriteWorkflowInput = operations['DeleteFavouriteWorkflow']['requestBody']['content']['application/json']
export type DeleteFavouriteWorkflowOutput = operations['DeleteFavouriteWorkflow']['responses']['200']['content']['application/json']
  export type ListFavouriteWorkflowsInput = operations['ListFavouriteWorkflows']['requestBody']['content']['application/json']
export type ListFavouriteWorkflowsOutput = operations['ListFavouriteWorkflows']['responses']['200']['content']['application/json']
  export type UpdateFavouriteWorkflowInput = operations['UpdateFavouriteWorkflow']['requestBody']['content']['application/json']
export type UpdateFavouriteWorkflowOutput = operations['UpdateFavouriteWorkflow']['responses']['200']['content']['application/json']
  export type DeleteSavedFilterInput = operations['DeleteSavedFilter']['requestBody']['content']['application/json']
export type DeleteSavedFilterOutput = operations['DeleteSavedFilter']['responses']['200']['content']['application/json']
  export type ListSavedFiltersInput = operations['ListSavedFilters']['requestBody']['content']['application/json']
export type ListSavedFiltersOutput = operations['ListSavedFilters']['responses']['200']['content']['application/json']
  export type UpdateSavedFilterInput = operations['UpdateSavedFilter']['requestBody']['content']['application/json']
export type UpdateSavedFilterOutput = operations['UpdateSavedFilter']['responses']['200']['content']['application/json']
  export type GetSavedFilterInput = {}
export type GetSavedFilterOutput = operations['GetSavedFilter']['responses']['200']['content']['application/json']
  export type CreateSavedFilterInput = operations['CreateSavedFilter']['requestBody']['content']['application/json']
export type CreateSavedFilterOutput = operations['CreateSavedFilter']['responses']['200']['content']['application/json']
export class DiscoveryApiClient  extends _GenericClient {
  constructor(config:_ClientInput){
    super({...config,service_name:'DiscoveryApi'});
  }
  public async CreateDeployable(
    input: CommandInput<CreateDeployableInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<CreateDeployableOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/deployables/create',
      options
    });
  }
  public async GetDeployable(
    input: CommandInput<GetDeployableInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<GetDeployableOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/deployables/{deployable_id}/get',
      options
    });
  }
  public async UpdateDeployable(
    input: CommandInput<UpdateDeployableInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<UpdateDeployableOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/deployables/{deployable_id}/update',
      options
    });
  }
  public async DeleteDeployable(
    input: CommandInput<DeleteDeployableInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<DeleteDeployableOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/deployables/delete',
      options
    });
  }
  public async CreateDeployableKey(
    input: CommandInput<CreateDeployableKeyInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<CreateDeployableKeyOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/deployables/{deployable_id}/share',
      options
    });
  }
  public async CreateDeployableInvite(
    input: CommandInput<CreateDeployableInviteInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<CreateDeployableInviteOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/deployables/{deployable_id}/invite',
      options
    });
  }
  public async UpdateUsersDeployablePermissions(
    input: CommandInput<UpdateUsersDeployablePermissionsInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<UpdateUsersDeployablePermissionsOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/deployables/{deployable_id}/users/{user_id}/update',
      options
    });
  }
  public async DeleteDeployableKey(
    input: CommandInput<DeleteDeployableKeyInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<DeleteDeployableKeyOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/deployables/{deployable_id}/private',
      options
    });
  }
  public async ListDeployables(
    input: CommandInput<ListDeployablesInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<ListDeployablesOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/deployables/list',
      options
    });
  }
  public async DeleteDeployableGroup(
    input: CommandInput<DeleteDeployableGroupInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<DeleteDeployableGroupOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/deployablegroups/{deployablegroup_id}/delete',
      options
    });
  }
  public async ListDeployableGroups(
    input: CommandInput<ListDeployableGroupsInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<ListDeployableGroupsOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/deployablegroups/list',
      options
    });
  }
  public async CreateDeployableGroup(
    input: CommandInput<CreateDeployableGroupInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<CreateDeployableGroupOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/deployablegroups/create',
      options
    });
  }
  public async GetDeployableGroup(
    input: CommandInput<GetDeployableGroupInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<GetDeployableGroupOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/deployablegroups/{deployablegroup_id}/get',
      options
    });
  }
  public async UpdateDeployableGroup(
    input: CommandInput<UpdateDeployableGroupInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<UpdateDeployableGroupOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/deployablegroups/{deployablegroup_id}/update',
      options
    });
  }
  public async CreateDeployableGroupKey(
    input: CommandInput<CreateDeployableGroupKeyInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<CreateDeployableGroupKeyOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/deployablegroups/{deployablegroup_id}/share',
      options
    });
  }
  public async DeleteDeployableGroupKey(
    input: CommandInput<DeleteDeployableGroupKeyInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<DeleteDeployableGroupKeyOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/deployablegroups/{deployablegroup_id}/private',
      options
    });
  }
  public async CreateProject(
    input: CommandInput<CreateProjectInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<CreateProjectOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/projects/create',
      options
    });
  }
  public async UpdateProject(
    input: CommandInput<UpdateProjectInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<UpdateProjectOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/projects/update',
      options
    });
  }
  public async TransferProjectToOrganization(
    input: CommandInput<TransferProjectToOrganizationInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<TransferProjectToOrganizationOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/projects/transfer_to_organization',
      options
    });
  }
  public async ListProjects(
    input: CommandInput<ListProjectsInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<ListProjectsOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/projects/list',
      options
    });
  }
  public async CreateUser(
    input: CommandInput<CreateUserInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<CreateUserOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/auth/users/create',
      options
    });
  }
  public async ListUsers(
    input: CommandInput<ListUsersInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<ListUsersOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/auth/users/list',
      options
    });
  }
  public async IsUserAuthorized(
    input: CommandInput<IsUserAuthorizedInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<IsUserAuthorizedOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/auth/is_authorized',
      options
    });
  }
  public async GetAuthHeaderInfo(
    input: CommandInput<GetAuthHeaderInfoInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<GetAuthHeaderInfoOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/auth/info',
      options
    });
  }
  public async CreateProjectInvite(
    input: CommandInput<CreateProjectInviteInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<CreateProjectInviteOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/auth/invite/create',
      options
    });
  }
  public async ListProjectInvites(
    input: CommandInput<ListProjectInvitesInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<ListProjectInvitesOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/auth/invite/list',
      options
    });
  }
  public async AcceptProjectInvite(
    input: CommandInput<AcceptProjectInviteInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<AcceptProjectInviteOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/auth/invite/accept',
      options
    });
  }
  public async DeleteProjectInvite(
    input: CommandInput<DeleteProjectInviteInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<DeleteProjectInviteOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/auth/invite/delete',
      options
    });
  }
  public async ResendProjectInvite(
    input: CommandInput<ResendProjectInviteInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<ResendProjectInviteOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/auth/invite/resend',
      options
    });
  }
  public async GetUser(
    input: CommandInput<GetUserInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<GetUserOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/auth/users/{user_id}',
      options
    });
  }
  public async UpdateUser(
    input: CommandInput<UpdateUserInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<UpdateUserOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/auth/users/{user_id}/update',
      options
    });
  }
  public async DeleteUser(
    input: CommandInput<DeleteUserInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<DeleteUserOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/auth/users/{user_id}/delete',
      options
    });
  }
  public async CreateUserKey(
    input: CommandInput<CreateUserKeyInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<CreateUserKeyOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/auth/users/{user_id}/keys/create',
      options
    });
  }
  public async ListUserKeys(
    input: CommandInput<ListUserKeysInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<ListUserKeysOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/auth/users/{user_id}/keys/list',
      options
    });
  }
  public async DeleteUserKey(
    input: CommandInput<DeleteUserKeyInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<DeleteUserKeyOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/auth/users/{user_id}/keys/delete',
      options
    });
  }
  public async InsertClusterCentroids(
    input: CommandInput<InsertClusterCentroidsInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<InsertClusterCentroidsOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/cluster/centroids/insert',
      options
    });
  }
  public async UpdateClusterCentroids(
    input: CommandInput<UpdateClusterCentroidsInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<UpdateClusterCentroidsOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/cluster/centroids/update',
      options
    });
  }
  public async CompareClusterCentroids(
    input: CommandInput<CompareClusterCentroidsInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<CompareClusterCentroidsOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/cluster/centroids/compare_centroids',
      options
    });
  }
  public async Aggregate(
    input: CommandInput<AggregateInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<AggregateOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/aggregate',
      options
    });
  }
  public async AggregateClusters(
    input: CommandInput<AggregateClustersInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<AggregateClustersOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/cluster/aggregate',
      options
    });
  }
  public async ListClusterFacets(
    input: CommandInput<ListClusterFacetsInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<ListClusterFacetsOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/cluster/facets',
      options
    });
  }
  public async ListClosestToCentroids(
    input: CommandInput<ListClosestToCentroidsInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<ListClosestToCentroidsOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/cluster/centroids/list_closest_to_center',
      options
    });
  }
  public async ListFurthestFromCentroids(
    input: CommandInput<ListFurthestFromCentroidsInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<ListFurthestFromCentroidsOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/cluster/centroids/list_furthest_from_center',
      options
    });
  }
  public async ListCentroids(
    input: CommandInput<ListCentroidsInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<ListCentroidsOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/cluster/centroids/documents',
      options
    });
  }
  public async ListCentroidConfigs(
    input: CommandInput<ListCentroidConfigsInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<ListCentroidConfigsOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/datasets/{dataset_id}/cluster/centroids/configs/list',
      options
    });
  }
  public async DeleteCentroid(
    input: CommandInput<DeleteCentroidInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<DeleteCentroidOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/cluster/centroids/{centroid_id}/delete',
      options
    });
  }
  public async RealtimeClustering(
    input: CommandInput<RealtimeClusteringInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<RealtimeClusteringOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/cluster/realtime',
      options
    });
  }
  public async MergeClusters(
    input: CommandInput<MergeClustersInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<MergeClustersOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/cluster/merge',
      options
    });
  }
  public async CreateClusterSummaries(
    input: CommandInput<CreateClusterSummariesInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<CreateClusterSummariesOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/cluster/centroids/summaries/create',
      options
    });
  }
  public async CreateClusterLabels(
    input: CommandInput<CreateClusterLabelsInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<CreateClusterLabelsOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/cluster/centroids/labels/create',
      options
    });
  }
  public async ListClusterSummaries(
    input: CommandInput<ListClusterSummariesInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<ListClusterSummariesOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/cluster/centroids/summaries/list',
      options
    });
  }
  public async DeleteClusterSummaries(
    input: CommandInput<DeleteClusterSummariesInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<DeleteClusterSummariesOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/cluster/centroids/summaries/bulk_delete',
      options
    });
  }
  public async CreateOrganization(
    input: CommandInput<CreateOrganizationInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<CreateOrganizationOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/organizations/create',
      options
    });
  }
  public async UpdateOrganization(
    input: CommandInput<UpdateOrganizationInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<UpdateOrganizationOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/organizations/{organization_id}/update',
      options
    });
  }
  public async UpdateOrganizationAdmin(
    input: CommandInput<UpdateOrganizationAdminInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<UpdateOrganizationAdminOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/admin/organizations/{organization_id}/update',
      options
    });
  }
  public async ListOrganizations(
    input: CommandInput<ListOrganizationsInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<ListOrganizationsOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/organizations/list',
      options
    });
  }
  public async DeleteOrganization(
    input: CommandInput<DeleteOrganizationInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<DeleteOrganizationOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/organizations/{organization_id}/delete',
      options
    });
  }
  public async GetOrganization(
    input: CommandInput<GetOrganizationInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<GetOrganizationOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/organizations/{organization_id}/get',
      options
    });
  }
  public async GetOrganizationUsage(
    input: CommandInput<GetOrganizationUsageInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<GetOrganizationUsageOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/organizations/{organization_id}/usage/get',
      options
    });
  }
  public async ListUsersInOrganization(
    input: CommandInput<ListUsersInOrganizationInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<ListUsersInOrganizationOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/organizations/{organization_id}/users/list',
      options
    });
  }
  public async ListProjectsInOrganization(
    input: CommandInput<ListProjectsInOrganizationInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<ListProjectsInOrganizationOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/organizations/{organization_id}/projects/list',
      options
    });
  }
  public async CreateConnector(
    input: CommandInput<CreateConnectorInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<CreateConnectorOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/connectors/create',
      options
    });
  }
  public async CheckConnection(
    input: CommandInput<CheckConnectionInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<CheckConnectionOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/connectors/check_connection',
      options
    });
  }
  public async GetConnector(
    input: CommandInput<GetConnectorInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<GetConnectorOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/connectors/{connector_id}/get',
      options
    });
  }
  public async UpdateConnector(
    input: CommandInput<UpdateConnectorInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<UpdateConnectorOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/connectors/{connector_id}/update',
      options
    });
  }
  public async TriggerConnector(
    input: CommandInput<TriggerConnectorInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<TriggerConnectorOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/connectors/{connector_id}/trigger',
      options
    });
  }
  public async DeleteConnector(
    input: CommandInput<DeleteConnectorInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<DeleteConnectorOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/connectors/{connector_id}/delete',
      options
    });
  }
  public async ListConnectors(
    input: CommandInput<ListConnectorsInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<ListConnectorsOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/connectors/list',
      options
    });
  }
  public async ListConnectorTypes(
    input: CommandInput<ListConnectorTypesInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<ListConnectorTypesOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/connectors/types/list',
      options
    });
  }
  public async GetConnectorType(
    input: CommandInput<GetConnectorTypeInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<GetConnectorTypeOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/connectors/types/{connector_id}/get',
      options
    });
  }
  public async ListConnectorJobs(
    input: CommandInput<ListConnectorJobsInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<ListConnectorJobsOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/connectors/{connector_id}/jobs/list',
      options
    });
  }
  public async GetConnectorJob(
    input: CommandInput<GetConnectorJobInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<GetConnectorJobOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/connectors/{connector_id}/jobs/{job_id}/get',
      options
    });
  }
  public async TriggerWorkflow(
    input: CommandInput<TriggerWorkflowInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<TriggerWorkflowOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/workflows/trigger',
      options
    });
  }
  public async ListWorkflows(
    input: CommandInput<ListWorkflowsInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<ListWorkflowsOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/workflows/list',
      options
    });
  }
  public async GetWorkflowStatus(
    input: CommandInput<GetWorkflowStatusInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<GetWorkflowStatusOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/workflows/{workflow_id}/get',
      options
    });
  }
  public async DeleteWorkflowStatus(
    input: CommandInput<DeleteWorkflowStatusInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<DeleteWorkflowStatusOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/workflows/{workflow_id}/delete',
      options
    });
  }
  public async UpsertWorkflowMetadata(
    input: CommandInput<UpsertWorkflowMetadataInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<UpsertWorkflowMetadataOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/workflows/{workflow_id}/metadata',
      options
    });
  }
  public async UpsertWorkflowStatus(
    input: CommandInput<UpsertWorkflowStatusInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<UpsertWorkflowStatusOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/workflows/{workflow_id}/status',
      options
    });
  }
  public async ListWorkflowTypes(
    input: CommandInput<ListWorkflowTypesInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<ListWorkflowTypesOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/workflows/types/list',
      options
    });
  }
  public async GetWorkflowType(
    input: CommandInput<GetWorkflowTypeInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<GetWorkflowTypeOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/workflows/types/{workflow_id}/get',
      options
    });
  }
  public async ValidateWorkflowParams(
    input: CommandInput<ValidateWorkflowParamsInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<ValidateWorkflowParamsOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/workflows/types/{workflow_id}/validate',
      options
    });
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
  public async GetFileUploadUrlsForDataset(
    input: CommandInput<GetFileUploadUrlsForDatasetInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<GetFileUploadUrlsForDatasetOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/get_file_upload_urls',
      options
    });
  }
  public async ListFileUploadsForDataset(
    input: CommandInput<ListFileUploadsForDatasetInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<ListFileUploadsForDatasetOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/datasets/{dataset_id}/list_file_uploads',
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
  public async CopyForeignDataset(
    input: CommandInput<CopyForeignDatasetInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<CopyForeignDatasetOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/admin/copy_foreign_dataset',
      options
    });
  }
  public async CreateProjectReadKey(
    input: CommandInput<CreateProjectReadKeyInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<CreateProjectReadKeyOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/admin/request_read_api_key',
      options
    });
  }
  public async DeleteDataset(
    input: CommandInput<DeleteDatasetInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<DeleteDatasetOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/delete',
      options
    });
  }
  public async CreateDataset(
    input: CommandInput<CreateDatasetInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<CreateDatasetOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/create',
      options
    });
  }
  public async GetSchema(
    input: CommandInput<GetSchemaInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<GetSchemaOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/datasets/{dataset_id}/schema',
      options
    });
  }
  public async ListDatasets(
    input: CommandInput<ListDatasetsInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<ListDatasetsOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/datasets/list',
      options
    });
  }
  public async CombineDatasets(
    input: CommandInput<CombineDatasetsInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<CombineDatasetsOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/combine',
      options
    });
  }
  public async GetCombineJobStatus(
    input: CommandInput<GetCombineJobStatusInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<GetCombineJobStatusOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/combine/{job_id}/get',
      options
    });
  }
  public async SearchDatasets(
    input: CommandInput<SearchDatasetsInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<SearchDatasetsOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/datasets/search',
      options
    });
  }
  public async GetFieldHealth(
    input: CommandInput<GetFieldHealthInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<GetFieldHealthOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/datasets/{dataset_id}/monitor/health',
      options
    });
  }
  public async GetDatasetStats(
    input: CommandInput<GetDatasetStatsInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<GetDatasetStatsOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/datasets/{dataset_id}/monitor/stats',
      options
    });
  }
  public async GetDatasetUsage(
    input: CommandInput<GetDatasetUsageInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<GetDatasetUsageOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/monitor/usage',
      options
    });
  }
  public async GetVectorMappings(
    input: CommandInput<GetVectorMappingsInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<GetVectorMappingsOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/datasets/{dataset_id}/vector_mappings',
      options
    });
  }
  public async GetDatasetDetails(
    input: CommandInput<GetDatasetDetailsInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<GetDatasetDetailsOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/details',
      options
    });
  }
  public async GetDocument(
    input: CommandInput<GetDocumentInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<GetDocumentOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/datasets/{dataset_id}/documents/get',
      options
    });
  }
  public async DeleteDocument(
    input: CommandInput<DeleteDocumentInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<DeleteDocumentOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/documents/delete',
      options
    });
  }
  public async UpsertDatasetSettings(
    input: CommandInput<UpsertDatasetSettingsInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<UpsertDatasetSettingsOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/settings',
      options
    });
  }
  public async GetDatasetSettings(
    input: CommandInput<GetDatasetSettingsInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<GetDatasetSettingsOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/datasets/{dataset_id}/settings',
      options
    });
  }
  public async UpsertDatasetMetadata(
    input: CommandInput<UpsertDatasetMetadataInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<UpsertDatasetMetadataOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/metadata',
      options
    });
  }
  public async GetDatasetMetadata(
    input: CommandInput<GetDatasetMetadataInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<GetDatasetMetadataOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/datasets/{dataset_id}/metadata',
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
  public async DeleteDocumentFields(
    input: CommandInput<DeleteDocumentFieldsInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<DeleteDocumentFieldsOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/documents/delete_fields',
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
  public async DeleteTags(
    input: CommandInput<DeleteTagsInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<DeleteTagsOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/tags/delete',
      options
    });
  }
  public async MergeTags(
    input: CommandInput<MergeTagsInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<MergeTagsOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/tags/merge',
      options
    });
  }
  public async ListFacets(
    input: CommandInput<ListFacetsInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<ListFacetsOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/facets',
      options
    });
  }
  public async GetWhere(
    input: CommandInput<GetWhereInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<GetWhereOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/documents/get_where',
      options
    });
  }
  public async PaginateDocuments(
    input: CommandInput<PaginateDocumentsInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<PaginateDocumentsOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/documents/paginate',
      options
    });
  }
  public async BulkGetDocuments(
    input: CommandInput<BulkGetDocumentsInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<BulkGetDocumentsOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/documents/bulk_get',
      options
    });
  }
  public async BulkDeleteDocuments(
    input: CommandInput<BulkDeleteDocumentsInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<BulkDeleteDocumentsOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/documents/bulk_delete',
      options
    });
  }
  public async ListDocuments(
    input: CommandInput<ListDocumentsInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<ListDocumentsOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/datasets/{dataset_id}/documents/list',
      options
    });
  }
  public async DeleteWhere(
    input: CommandInput<DeleteWhereInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<DeleteWhereOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/documents/delete_where',
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
  public async Search(
    input: CommandInput<SearchInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<SearchOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/search',
      options
    });
  }
  public async Recommend(
    input: CommandInput<RecommendInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<RecommendOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/recommend',
      options
    });
  }
  public async CloneDataset(
    input: CommandInput<CloneDatasetInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<CloneDatasetOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/clone',
      options
    });
  }
  public async PredictKNNRegression(
    input: CommandInput<PredictKNNRegressionInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<PredictKNNRegressionOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/services/prediction/regression/knn',
      options
    });
  }
  public async PredictKNNFromResults(
    input: CommandInput<PredictKNNFromResultsInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<PredictKNNFromResultsOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/services/prediction/knn_from_results',
      options
    });
  }
  public async BiasEvaluation(
    input: CommandInput<BiasEvaluationInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<BiasEvaluationOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/services/evaluation/bias',
      options
    });
  }
  public async Vectorize(
    input: CommandInput<VectorizeInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<VectorizeOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/services/vectorize',
      options
    });
  }
  public async VectorizeAndInsert(
    input: CommandInput<VectorizeAndInsertInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<VectorizeAndInsertOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/services/vectorize/{dataset_id}/vectorize_and_insert',
      options
    });
  }
  public async VectorizeField(
    input: CommandInput<VectorizeFieldInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<VectorizeFieldOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/services/vectorize/{dataset_id}',
      options
    });
  }
  public async CreateImageFromPrompt(
    input: CommandInput<CreateImageFromPromptInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<CreateImageFromPromptOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/services/prompt_to_image/create',
      options
    });
  }
  public async DeleteFieldChildren(
    input: CommandInput<DeleteFieldChildrenInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<DeleteFieldChildrenOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/field_children/{fieldchildren_id}/delete',
      options
    });
  }
  public async ListFieldChildrens(
    input: CommandInput<ListFieldChildrensInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<ListFieldChildrensOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/field_children/list',
      options
    });
  }
  public async UpdateFieldChildren(
    input: CommandInput<UpdateFieldChildrenInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<UpdateFieldChildrenOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/field_children/{fieldchildren_id}/update',
      options
    });
  }
  public async DeleteFavouriteWorkflow(
    input: CommandInput<DeleteFavouriteWorkflowInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<DeleteFavouriteWorkflowOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/workflows/favourites/{favouriteworkflow_id}/delete',
      options
    });
  }
  public async ListFavouriteWorkflows(
    input: CommandInput<ListFavouriteWorkflowsInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<ListFavouriteWorkflowsOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/workflows/favourites/list',
      options
    });
  }
  public async UpdateFavouriteWorkflow(
    input: CommandInput<UpdateFavouriteWorkflowInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<UpdateFavouriteWorkflowOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/workflows/favourites/{favouriteworkflow_id}/update',
      options
    });
  }
  public async DeleteSavedFilter(
    input: CommandInput<DeleteSavedFilterInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<DeleteSavedFilterOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/savedfilters/{savedfilter_id}/delete',
      options
    });
  }
  public async ListSavedFilters(
    input: CommandInput<ListSavedFiltersInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<ListSavedFiltersOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/savedfilters/list',
      options
    });
  }
  public async UpdateSavedFilter(
    input: CommandInput<UpdateSavedFilterInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<UpdateSavedFilterOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/savedfilters/{savedfilter_id}/update',
      options
    });
  }
  public async GetSavedFilter(
    input: CommandInput<GetSavedFilterInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<GetSavedFilterOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/savedfilters/{savedfilter_id}/get',
      options
    });
  }
  public async CreateSavedFilter(
    input: CommandInput<CreateSavedFilterInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<CreateSavedFilterOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/savedfilters/create',
      options
    });
  }}