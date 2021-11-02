import {CommandInput,_GenericClient,CommandOutput,_ClientInput,_GenericMethodOptions} from '../shared/BaseClient';
      import {operations} from './_VectorSchemaTypes';

  export type requestreadapikeyapiadminrequestreadapikeypostInput = operations['request_read_api_key_api_admin_request_read_api_key_post']['requestBody']['content']['application/json']
export type requestreadapikeyapiadminrequestreadapikeypostOutput = operations['request_read_api_key_api_admin_request_read_api_key_post']['responses']['200']['content']['application/json']
  export type copyforeigndatasetadmincopyforeigndatasetpostInput = operations['copy_foreign_dataset_admin_copy_foreign_dataset_post']['requestBody']['content']['application/json']
export type copyforeigndatasetadmincopyforeigndatasetpostOutput = operations['copy_foreign_dataset_admin_copy_foreign_dataset_post']['responses']['200']['content']['application/json']
  export type createdatasetapidatasetscreatepostInput = operations['create_dataset_api_datasets_create_post']['requestBody']['content']['application/json']
export type createdatasetapidatasetscreatepostOutput = operations['create_dataset_api_datasets_create_post']['responses']['200']['content']['application/json']
  export type inferschemaapidatasetsinferschemapostInput = operations['infer_schema_api_datasets_infer_schema_post']['requestBody']['content']['application/json']
export type inferschemaapidatasetsinferschemapostOutput = operations['infer_schema_api_datasets_infer_schema_post']['responses']['200']['content']['application/json']
  export type schemaapidatasetsdatasetidschemagetInput = {}
export type schemaapidatasetsdatasetidschemagetOutput = operations['schema_api_datasets__dataset_id__schema_get']['responses']['200']['content']['application/json']
  export type deletedatasetapidatasetsdeletepostInput = operations['delete_dataset_api_datasets_delete_post']['requestBody']['content']['application/json']
export type deletedatasetapidatasetsdeletepostOutput = operations['delete_dataset_api_datasets_delete_post']['responses']['200']['content']['application/json']
  export type listdatasetsapidatasetslistgetInput = {}
export type listdatasetsapidatasetslistgetOutput = operations['list_datasets_api_datasets_list_get']['responses']['200']['content']['application/json']
  export type listcollectionsapidatasetslistpostInput = operations['list_collections_api_datasets_list_post']['requestBody']['content']['application/json']
export type listcollectionsapidatasetslistpostOutput = operations['list_collections_api_datasets_list_post']['responses']['200']['content']['application/json']
  export type searchdatasetsapidatasetssearchgetInput = {}
export type searchdatasetsapidatasetssearchgetOutput = operations['search_datasets_api_datasets_search_get']['responses']['200']['content']['application/json']
  export type facetsapidatasetsdatasetidfacetspostInput = operations['facets_api_datasets__dataset_id__facets_post']['requestBody']['content']['application/json']
export type facetsapidatasetsdatasetidfacetspostOutput = operations['facets_api_datasets__dataset_id__facets_post']['responses']['200']['content']['application/json']
  export type clonedatasetapidatasetsdatasetidclonepostInput = operations['clone_dataset_api_datasets__dataset_id__clone_post']['requestBody']['content']['application/json']
export type clonedatasetapidatasetsdatasetidclonepostOutput = operations['clone_dataset_api_datasets__dataset_id__clone_post']['responses']['200']['content']['application/json']
  export type storeencoderspipelineapidatasetsdatasetidstoreencoderspipelinepostInput = operations['store_encoders_pipeline_api_datasets__dataset_id__store_encoders_pipeline_post']['requestBody']['content']['application/json']
export type storeencoderspipelineapidatasetsdatasetidstoreencoderspipelinepostOutput = operations['store_encoders_pipeline_api_datasets__dataset_id__store_encoders_pipeline_post']['responses']['200']['content']['application/json']
  export type datasetvectormappingsapidatasetsdatasetidvectormappingsgetInput = {}
export type datasetvectormappingsapidatasetsdatasetidvectormappingsgetOutput = operations['dataset_vector_mappings_api_datasets__dataset_id__vector_mappings_get']['responses']['200']['content']['application/json']
  export type datasetvectormappingsapipostdatasetsdatasetidvectormappingspostInput = operations['dataset_vector_mappings_api_post_datasets__dataset_id__vector_mappings_post']['requestBody']['content']['application/json']
export type datasetvectormappingsapipostdatasetsdatasetidvectormappingspostOutput = operations['dataset_vector_mappings_api_post_datasets__dataset_id__vector_mappings_post']['responses']['200']['content']['application/json']
  export type insertapidatasetsdatasetiddocumentsinsertpostInput = operations['insert_api_datasets__dataset_id__documents_insert_post']['requestBody']['content']['application/json']
export type insertapidatasetsdatasetiddocumentsinsertpostOutput = operations['insert_api_datasets__dataset_id__documents_insert_post']['responses']['200']['content']['application/json']
  export type bulkinsertapidatasetsdatasetiddocumentsbulkinsertpostInput = operations['bulk_insert_api_datasets__dataset_id__documents_bulk_insert_post']['requestBody']['content']['application/json']
export type bulkinsertapidatasetsdatasetiddocumentsbulkinsertpostOutput = operations['bulk_insert_api_datasets__dataset_id__documents_bulk_insert_post']['responses']['200']['content']['application/json']
  export type idlookupapidatasetsdatasetiddocumentsgetgetInput = {}
export type idlookupapidatasetsdatasetiddocumentsgetgetOutput = operations['id_lookup_api_datasets__dataset_id__documents_get_get']['responses']['200']['content']['application/json']
  export type bulkidlookupapidatasetsdatasetiddocumentsbulkgetpostInput = operations['bulk_id_lookup_api_datasets__dataset_id__documents_bulk_get_post']['requestBody']['content']['application/json']
export type bulkidlookupapidatasetsdatasetiddocumentsbulkgetpostOutput = operations['bulk_id_lookup_api_datasets__dataset_id__documents_bulk_get_post']['responses']['200']['content']['application/json']
  export type retrievedocumentsapidatasetsdatasetiddocumentslistgetInput = {}
export type retrievedocumentsapidatasetsdatasetiddocumentslistgetOutput = operations['retrieve_documents_api_datasets__dataset_id__documents_list_get']['responses']['200']['content']['application/json']
  export type retrievedocumentswithfiltersapidatasetsdatasetiddocumentsgetwherepostInput = operations['retrieve_documents_with_filters_api_datasets__dataset_id__documents_get_where_post']['requestBody']['content']['application/json']
export type retrievedocumentswithfiltersapidatasetsdatasetiddocumentsgetwherepostOutput = operations['retrieve_documents_with_filters_api_datasets__dataset_id__documents_get_where_post']['responses']['200']['content']['application/json']
  export type retrievedocumentswithfiltersapidatasetsdatasetiddocumentspaginatepostInput = operations['retrieve_documents_with_filters_api_datasets__dataset_id__documents_paginate_post']['requestBody']['content']['application/json']
export type retrievedocumentswithfiltersapidatasetsdatasetiddocumentspaginatepostOutput = operations['retrieve_documents_with_filters_api_datasets__dataset_id__documents_paginate_post']['responses']['200']['content']['application/json']
  export type bulkmissingidapidatasetsdatasetiddocumentsgetmissinggetInput = {}
export type bulkmissingidapidatasetsdatasetiddocumentsgetmissinggetOutput = operations['bulk_missing_id_api_datasets__dataset_id__documents_get_missing_get']['responses']['200']['content']['application/json']
  export type updatedocumentapidatasetsdatasetiddocumentsupdatepostInput = operations['update_document_api_datasets__dataset_id__documents_update_post']['requestBody']['content']['application/json']
export type updatedocumentapidatasetsdatasetiddocumentsupdatepostOutput = operations['update_document_api_datasets__dataset_id__documents_update_post']['responses']['200']['content']['application/json']
  export type bulkupdatedocumentsapidatasetsdatasetiddocumentsbulkupdatepostInput = operations['bulk_update_documents_api_datasets__dataset_id__documents_bulk_update_post']['requestBody']['content']['application/json']
export type bulkupdatedocumentsapidatasetsdatasetiddocumentsbulkupdatepostOutput = operations['bulk_update_documents_api_datasets__dataset_id__documents_bulk_update_post']['responses']['200']['content']['application/json']
  export type deleteapidatasetsdatasetiddocumentsdeletepostInput = operations['delete_api_datasets__dataset_id__documents_delete_post']['requestBody']['content']['application/json']
export type deleteapidatasetsdatasetiddocumentsdeletepostOutput = operations['delete_api_datasets__dataset_id__documents_delete_post']['responses']['200']['content']['application/json']
  export type bulkdeleteapidatasetsdatasetiddocumentsbulkdeletepostInput = operations['bulk_delete_api_datasets__dataset_id__documents_bulk_delete_post']['requestBody']['content']['application/json']
export type bulkdeleteapidatasetsdatasetiddocumentsbulkdeletepostOutput = operations['bulk_delete_api_datasets__dataset_id__documents_bulk_delete_post']['responses']['200']['content']['application/json']
  export type deletefieldsapidatasetsdatasetiddocumentsdeletefieldspostInput = operations['delete_fields_api_datasets__dataset_id__documents_delete_fields_post']['requestBody']['content']['application/json']
export type deletefieldsapidatasetsdatasetiddocumentsdeletefieldspostOutput = operations['delete_fields_api_datasets__dataset_id__documents_delete_fields_post']['responses']['200']['content']['application/json']
  export type updatebyfiltersapidatasetsdatasetiddocumentsupdatewherepostInput = operations['update_by_filters_api_datasets__dataset_id__documents_update_where_post']['requestBody']['content']['application/json']
export type updatebyfiltersapidatasetsdatasetiddocumentsupdatewherepostOutput = operations['update_by_filters_api_datasets__dataset_id__documents_update_where_post']['responses']['200']['content']['application/json']
  export type deletebyfiltersapidatasetsdatasetiddocumentsdeletewherepostInput = operations['delete_by_filters_api_datasets__dataset_id__documents_delete_where_post']['requestBody']['content']['application/json']
export type deletebyfiltersapidatasetsdatasetiddocumentsdeletewherepostOutput = operations['delete_by_filters_api_datasets__dataset_id__documents_delete_where_post']['responses']['200']['content']['application/json']
  export type collectionmetadataapidatasetsdatasetidmetadatagetInput = {}
export type collectionmetadataapidatasetsdatasetidmetadatagetOutput = operations['collection_metadata_api_datasets__dataset_id__metadata_get']['responses']['200']['content']['application/json']
  export type postcollectionmetadataapidatasetsdatasetidmetadatapostInput = operations['post_collection_metadata_api_datasets__dataset_id__metadata_post']['requestBody']['content']['application/json']
export type postcollectionmetadataapidatasetsdatasetidmetadatapostOutput = operations['post_collection_metadata_api_datasets__dataset_id__metadata_post']['responses']['200']['content']['application/json']
  export type datasetschemastatsapidatasetsdatasetidmonitorstatsgetInput = {}
export type datasetschemastatsapidatasetsdatasetidmonitorstatsgetOutput = operations['dataset_schema_stats_api_datasets__dataset_id__monitor_stats_get']['responses']['200']['content']['application/json']
  export type datasetvectorhealthapidatasetsdatasetidmonitorhealthgetInput = {}
export type datasetvectorhealthapidatasetsdatasetidmonitorhealthgetOutput = operations['dataset_vector_health_api_datasets__dataset_id__monitor_health_get']['responses']['200']['content']['application/json']
  export type aggregatelogsapidatasetsdatasetidmonitorusagepostInput = operations['aggregate_logs_api_datasets__dataset_id__monitor_usage_post']['requestBody']['content']['application/json']
export type aggregatelogsapidatasetsdatasetidmonitorusagepostOutput = operations['aggregate_logs_api_datasets__dataset_id__monitor_usage_post']['responses']['200']['content']['application/json']
  export type tasksapidatasetsdatasetidtaskscreatepostInput = operations['tasks_api_datasets__dataset_id__tasks_create_post']['requestBody']['content']['application/json']
export type tasksapidatasetsdatasetidtaskscreatepostOutput = operations['tasks_api_datasets__dataset_id__tasks_create_post']['responses']['200']['content']['application/json']
  export type listcollectionjobsapidatasetsdatasetidtaskslistgetInput = {}
export type listcollectionjobsapidatasetsdatasetidtaskslistgetOutput = operations['list_collection_jobs_api_datasets__dataset_id__tasks_list_get']['responses']['200']['content']['application/json']
  export type tasksstatusapidatasetsdatasetidtaskstaskidstatusgetInput = {}
export type tasksstatusapidatasetsdatasetidtaskstaskidstatusgetOutput = operations['tasks_status_api_datasets__dataset_id__tasks__task_id__status_get']['responses']['200']['content']['application/json']
  export type vectorsearchapiservicessearchvectorpostInput = operations['vector_search_api_services_search_vector_post']['requestBody']['content']['application/json']
export type vectorsearchapiservicessearchvectorpostOutput = operations['vector_search_api_services_search_vector_post']['responses']['200']['content']['application/json']
  export type traditionalsearchapiservicessearchtraditionalpostInput = operations['traditional_search_api_services_search_traditional_post']['requestBody']['content']['application/json']
export type traditionalsearchapiservicessearchtraditionalpostOutput = operations['traditional_search_api_services_search_traditional_post']['responses']['200']['content']['application/json']
  export type hybridsearchapiservicessearchhybridpostInput = operations['hybrid_search_api_services_search_hybrid_post']['requestBody']['content']['application/json']
export type hybridsearchapiservicessearchhybridpostOutput = operations['hybrid_search_api_services_search_hybrid_post']['responses']['200']['content']['application/json']
  export type hybridsearchapiservicessearchsemanticpostInput = operations['hybrid_search_api_services_search_semantic_post']['requestBody']['content']['application/json']
export type hybridsearchapiservicessearchsemanticpostOutput = operations['hybrid_search_api_services_search_semantic_post']['responses']['200']['content']['application/json']
  export type chunksearchapiservicessearchchunkpostInput = operations['chunk_search_api_services_search_chunk_post']['requestBody']['content']['application/json']
export type chunksearchapiservicessearchchunkpostOutput = operations['chunk_search_api_services_search_chunk_post']['responses']['200']['content']['application/json']
  export type advancedmultistepchunksearchapiservicessearchmultistepchunkpostInput = operations['advanced_multistep_chunk_search_api_services_search_multistep_chunk_post']['requestBody']['content']['application/json']
export type advancedmultistepchunksearchapiservicessearchmultistepchunkpostOutput = operations['advanced_multistep_chunk_search_api_services_search_multistep_chunk_post']['responses']['200']['content']['application/json']
  export type advancedchunksearchapiservicessearchadvancedchunkpostInput = operations['advanced_chunk_search_api_services_search_advanced_chunk_post']['requestBody']['content']['application/json']
export type advancedchunksearchapiservicessearchadvancedchunkpostOutput = operations['advanced_chunk_search_api_services_search_advanced_chunk_post']['responses']['200']['content']['application/json']
  export type advancedmultistepchunksearchapiservicessearchadvancedmultistepchunkpostInput = operations['advanced_multistep_chunk_search_api_services_search_advanced_multistep_chunk_post']['requestBody']['content']['application/json']
export type advancedmultistepchunksearchapiservicessearchadvancedmultistepchunkpostOutput = operations['advanced_multistep_chunk_search_api_services_search_advanced_multistep_chunk_post']['responses']['200']['content']['application/json']
  export type vectorsearchapiservicessearchdiversitypostInput = operations['vector_search_api_services_search_diversity_post']['requestBody']['content']['application/json']
export type vectorsearchapiservicessearchdiversitypostOutput = operations['vector_search_api_services_search_diversity_post']['responses']['200']['content']['application/json']
  export type vectorrecommendapiservicesrecommendvectorpostInput = operations['vector_recommend_api_services_recommend_vector_post']['requestBody']['content']['application/json']
export type vectorrecommendapiservicesrecommendvectorpostOutput = operations['vector_recommend_api_services_recommend_vector_post']['responses']['200']['content']['application/json']
  export type vectordiversityrecommendapiservicesrecommenddiversitypostInput = operations['vector_diversity_recommend_api_services_recommend_diversity_post']['requestBody']['content']['application/json']
export type vectordiversityrecommendapiservicesrecommenddiversitypostOutput = operations['vector_diversity_recommend_api_services_recommend_diversity_post']['responses']['200']['content']['application/json']
  export type aggregatev2apiservicesaggregateaggregatepostInput = operations['aggregate_v2_api_services_aggregate_aggregate_post']['requestBody']['content']['application/json']
export type aggregatev2apiservicesaggregateaggregatepostOutput = operations['aggregate_v2_api_services_aggregate_aggregate_post']['responses']['200']['content']['application/json']
  export type clustercentroidsapiservicesclustercentroidslistgetInput = {}
export type clustercentroidsapiservicesclustercentroidslistgetOutput = operations['cluster_centroids_api_services_cluster_centroids_list_get']['responses']['200']['content']['application/json']
  export type clustercentroidsgetapiservicesclustercentroidsgetgetInput = {}
export type clustercentroidsgetapiservicesclustercentroidsgetgetOutput = operations['cluster_centroids_get_api_services_cluster_centroids_get_get']['responses']['200']['content']['application/json']
  export type insertclustercentroidsapiservicesclustercentroidsinsertpostInput = operations['insert_cluster_centroids_api_services_cluster_centroids_insert_post']['requestBody']['content']['application/json']
export type insertclustercentroidsapiservicesclustercentroidsinsertpostOutput = operations['insert_cluster_centroids_api_services_cluster_centroids_insert_post']['responses']['200']['content']['application/json']
  export type clustercentroidsgetapiservicesclustercentroidsdocumentspostInput = operations['cluster_centroids_get_api_services_cluster_centroids_documents_post']['requestBody']['content']['application/json']
export type clustercentroidsgetapiservicesclustercentroidsdocumentspostOutput = operations['cluster_centroids_get_api_services_cluster_centroids_documents_post']['responses']['200']['content']['application/json']
  export type clusteraggregateapiservicesclusteraggregatepostInput = operations['cluster_aggregate_api_services_cluster_aggregate_post']['requestBody']['content']['application/json']
export type clusteraggregateapiservicesclusteraggregatepostOutput = operations['cluster_aggregate_api_services_cluster_aggregate_post']['responses']['200']['content']['application/json']
  export type clusterfacetsapiservicesclusterfacetsgetInput = {}
export type clusterfacetsapiservicesclusterfacetsgetOutput = operations['cluster_facets_api_services_cluster_facets_get']['responses']['200']['content']['application/json']
  export type tagapiservicestaggertagpostInput = operations['tag_api_services_tagger_tag_post']['requestBody']['content']['application/json']
export type tagapiservicestaggertagpostOutput = operations['tag_api_services_tagger_tag_post']['responses']['200']['content']['application/json']
  export type clusterandtagapiservicestaggerdiversitypostInput = operations['cluster_and_tag_api_services_tagger_diversity_post']['requestBody']['content']['application/json']
export type clusterandtagapiservicestaggerdiversitypostOutput = operations['cluster_and_tag_api_services_tagger_diversity_post']['responses']['200']['content']['application/json']
  export type vectorrecommendapiservicesdocumentdiffpostInput = operations['vector_recommend_api_services_document_diff_post']['requestBody']['content']['application/json']
export type vectorrecommendapiservicesdocumentdiffpostOutput = operations['vector_recommend_api_services_document_diff_post']['responses']['200']['content']['application/json']
  export type predictknnregressionapiservicespredictionregressionknnpostInput = operations['predict_knn_regression_api_services_prediction_regression_knn_post']['requestBody']['content']['application/json']
export type predictknnregressionapiservicespredictionregressionknnpostOutput = operations['predict_knn_regression_api_services_prediction_regression_knn_post']['responses']['200']['content']['application/json']
  export type predictknnregressionfromsearchresultsapiservicespredictionregressionknnfromresultspostInput = operations['predict_knn_regression_from_search_results_api_services_prediction_regression_knn_from_results_post']['requestBody']['content']['application/json']
export type predictknnregressionfromsearchresultsapiservicespredictionregressionknnfromresultspostOutput = operations['predict_knn_regression_from_search_results_api_services_prediction_regression_knn_from_results_post']['responses']['200']['content']['application/json']
  export type encodenumericfieldsapiservicesencodersnumericfieldspostInput = operations['encode_numeric_fields_api_services_encoders_numeric_fields_post']['requestBody']['content']['application/json']
export type encodenumericfieldsapiservicesencodersnumericfieldspostOutput = operations['encode_numeric_fields_api_services_encoders_numeric_fields_post']['responses']['200']['content']['application/json']
  export type encodecategoriesapiservicesencoderscategoriespostInput = operations['encode_categories_api_services_encoders_categories_post']['requestBody']['content']['application/json']
export type encodecategoriesapiservicesencoderscategoriespostOutput = operations['encode_categories_api_services_encoders_categories_post']['responses']['200']['content']['application/json']
  export type encodedictionaryapiservicesencodersdictionarypostInput = operations['encode_dictionary_api_services_encoders_dictionary_post']['requestBody']['content']['application/json']
export type encodedictionaryapiservicesencodersdictionarypostOutput = operations['encode_dictionary_api_services_encoders_dictionary_post']['responses']['200']['content']['application/json']
  export type encodetextapiservicesencoderstextgetInput = {}
export type encodetextapiservicesencoderstextgetOutput = operations['encode_text_api_services_encoders_text_get']['responses']['200']['content']['application/json']
  export type encodetextapiservicesencodersmultitextgetInput = {}
export type encodetextapiservicesencodersmultitextgetOutput = operations['encode_text_api_services_encoders_multi_text_get']['responses']['200']['content']['application/json']
  export type encodeimageapiservicesencodersimagepostInput = operations['encode_image_api_services_encoders_image_post']['requestBody']['content']['application/json']
export type encodeimageapiservicesencodersimagepostOutput = operations['encode_image_api_services_encoders_image_post']['responses']['200']['content']['application/json']
  export type encodetextimageapiservicesencoderstextimagegetInput = {}
export type encodetextimageapiservicesencoderstextimagegetOutput = operations['encode_textimage_api_services_encoders_textimage_get']['responses']['200']['content']['application/json']
  export type encodeimagetextapiservicesencodersimagetextgetInput = {}
export type encodeimagetextapiservicesencodersimagetextgetOutput = operations['encode_imagetext_api_services_encoders_imagetext_get']['responses']['200']['content']['application/json']
  export type retrievedocumentsapiservicesencodersencodepostInput = operations['retrieve_documents_api_services_encoders_encode_post']['requestBody']['content']['application/json']
export type retrievedocumentsapiservicesencodersencodepostOutput = operations['retrieve_documents_api_services_encoders_encode_post']['responses']['200']['content']['application/json']
  export type retrievedocumentsapiservicesencodersbulkencodepostInput = operations['retrieve_documents_api_services_encoders_bulk_encode_post']['requestBody']['content']['application/json']
export type retrievedocumentsapiservicesencodersbulkencodepostOutput = operations['retrieve_documents_api_services_encoders_bulk_encode_post']['responses']['200']['content']['application/json']
  export type wordcloudsapiserviceswordcloudswordcloudspostInput = operations['wordclouds_api_services_wordclouds_wordclouds_post']['requestBody']['content']['application/json']
export type wordcloudsapiserviceswordcloudswordcloudspostOutput = operations['wordclouds_api_services_wordclouds_wordclouds_post']['responses']['200']['content']['application/json']
  export type deployablecreateapideployablescreatepostInput = operations['deployable_create_api_deployables_create_post']['requestBody']['content']['application/json']
export type deployablecreateapideployablescreatepostOutput = operations['deployable_create_api_deployables_create_post']['responses']['200']['content']['application/json']
  export type deployableupdateshareableapideployablesdeployableidsharepostInput = {}
export type deployableupdateshareableapideployablesdeployableidsharepostOutput = operations['deployable_update_shareable_api_deployables__deployable_id__share_post']['responses']['200']['content']['application/json']
  export type deployableupdateprivateapideployablesdeployableidprivatepostInput = {}
export type deployableupdateprivateapideployablesdeployableidprivatepostOutput = operations['deployable_update_private_api_deployables__deployable_id__private_post']['responses']['200']['content']['application/json']
  export type deployableupdateapideployablesdeployableidupdatepostInput = operations['deployable_update_api_deployables__deployable_id__update_post']['requestBody']['content']['application/json']
export type deployableupdateapideployablesdeployableidupdatepostOutput = operations['deployable_update_api_deployables__deployable_id__update_post']['responses']['200']['content']['application/json']
  export type deployablegetapideployablesdeployableidgetgetInput = {}
export type deployablegetapideployablesdeployableidgetgetOutput = operations['deployable_get_api_deployables__deployable_id__get_get']['responses']['200']['content']['application/json']
  export type deployabledeleteapideployablesdeletepostInput = operations['deployable_delete_api_deployables_delete_post']['requestBody']['content']['application/json']
export type deployabledeleteapideployablesdeletepostOutput = operations['deployable_delete_api_deployables_delete_post']['responses']['200']['content']['application/json']
  export type deployablelistapideployableslistgetInput = {}
export type deployablelistapideployableslistgetOutput = operations['deployable_list_api_deployables_list_get']['responses']['200']['content']['application/json']
export class VectorClient  extends _GenericClient {
  constructor(config:_ClientInput){
    super({...config,service_name:'Vector'});
  }
  public async requestreadapikeyapiadminrequestreadapikeypost(
    input: CommandInput<requestreadapikeyapiadminrequestreadapikeypostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<requestreadapikeyapiadminrequestreadapikeypostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/admin/request_read_api_key',
      options
    });
  }
  public async copyforeigndatasetadmincopyforeigndatasetpost(
    input: CommandInput<copyforeigndatasetadmincopyforeigndatasetpostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<copyforeigndatasetadmincopyforeigndatasetpostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/admin/copy_foreign_dataset',
      options
    });
  }
  public async createdatasetapidatasetscreatepost(
    input: CommandInput<createdatasetapidatasetscreatepostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<createdatasetapidatasetscreatepostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/create',
      options
    });
  }
  public async inferschemaapidatasetsinferschemapost(
    input: CommandInput<inferschemaapidatasetsinferschemapostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<inferschemaapidatasetsinferschemapostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/infer_schema',
      options
    });
  }
  public async schemaapidatasetsdatasetidschemaget(
    input: CommandInput<schemaapidatasetsdatasetidschemagetInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<schemaapidatasetsdatasetidschemagetOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/datasets/{dataset_id}/schema',
      options
    });
  }
  public async deletedatasetapidatasetsdeletepost(
    input: CommandInput<deletedatasetapidatasetsdeletepostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<deletedatasetapidatasetsdeletepostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/delete',
      options
    });
  }
  public async listdatasetsapidatasetslistget(
    input: CommandInput<listdatasetsapidatasetslistgetInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<listdatasetsapidatasetslistgetOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/datasets/list',
      options
    });
  }
  public async listcollectionsapidatasetslistpost(
    input: CommandInput<listcollectionsapidatasetslistpostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<listcollectionsapidatasetslistpostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/list',
      options
    });
  }
  public async searchdatasetsapidatasetssearchget(
    input: CommandInput<searchdatasetsapidatasetssearchgetInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<searchdatasetsapidatasetssearchgetOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/datasets/search',
      options
    });
  }
  public async facetsapidatasetsdatasetidfacetspost(
    input: CommandInput<facetsapidatasetsdatasetidfacetspostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<facetsapidatasetsdatasetidfacetspostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/facets',
      options
    });
  }
  public async clonedatasetapidatasetsdatasetidclonepost(
    input: CommandInput<clonedatasetapidatasetsdatasetidclonepostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<clonedatasetapidatasetsdatasetidclonepostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/clone',
      options
    });
  }
  public async storeencoderspipelineapidatasetsdatasetidstoreencoderspipelinepost(
    input: CommandInput<storeencoderspipelineapidatasetsdatasetidstoreencoderspipelinepostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<storeencoderspipelineapidatasetsdatasetidstoreencoderspipelinepostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/store_encoders_pipeline',
      options
    });
  }
  public async datasetvectormappingsapidatasetsdatasetidvectormappingsget(
    input: CommandInput<datasetvectormappingsapidatasetsdatasetidvectormappingsgetInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<datasetvectormappingsapidatasetsdatasetidvectormappingsgetOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/datasets/{dataset_id}/vector_mappings',
      options
    });
  }
  public async datasetvectormappingsapipostdatasetsdatasetidvectormappingspost(
    input: CommandInput<datasetvectormappingsapipostdatasetsdatasetidvectormappingspostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<datasetvectormappingsapipostdatasetsdatasetidvectormappingspostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/vector_mappings',
      options
    });
  }
  public async insertapidatasetsdatasetiddocumentsinsertpost(
    input: CommandInput<insertapidatasetsdatasetiddocumentsinsertpostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<insertapidatasetsdatasetiddocumentsinsertpostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/documents/insert',
      options
    });
  }
  public async bulkinsertapidatasetsdatasetiddocumentsbulkinsertpost(
    input: CommandInput<bulkinsertapidatasetsdatasetiddocumentsbulkinsertpostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<bulkinsertapidatasetsdatasetiddocumentsbulkinsertpostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/documents/bulk_insert',
      options
    });
  }
  public async idlookupapidatasetsdatasetiddocumentsgetget(
    input: CommandInput<idlookupapidatasetsdatasetiddocumentsgetgetInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<idlookupapidatasetsdatasetiddocumentsgetgetOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/datasets/{dataset_id}/documents/get',
      options
    });
  }
  public async bulkidlookupapidatasetsdatasetiddocumentsbulkgetpost(
    input: CommandInput<bulkidlookupapidatasetsdatasetiddocumentsbulkgetpostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<bulkidlookupapidatasetsdatasetiddocumentsbulkgetpostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/documents/bulk_get',
      options
    });
  }
  public async retrievedocumentsapidatasetsdatasetiddocumentslistget(
    input: CommandInput<retrievedocumentsapidatasetsdatasetiddocumentslistgetInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<retrievedocumentsapidatasetsdatasetiddocumentslistgetOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/datasets/{dataset_id}/documents/list',
      options
    });
  }
  public async retrievedocumentswithfiltersapidatasetsdatasetiddocumentsgetwherepost(
    input: CommandInput<retrievedocumentswithfiltersapidatasetsdatasetiddocumentsgetwherepostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<retrievedocumentswithfiltersapidatasetsdatasetiddocumentsgetwherepostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/documents/get_where',
      options
    });
  }
  public async retrievedocumentswithfiltersapidatasetsdatasetiddocumentspaginatepost(
    input: CommandInput<retrievedocumentswithfiltersapidatasetsdatasetiddocumentspaginatepostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<retrievedocumentswithfiltersapidatasetsdatasetiddocumentspaginatepostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/documents/paginate',
      options
    });
  }
  public async bulkmissingidapidatasetsdatasetiddocumentsgetmissingget(
    input: CommandInput<bulkmissingidapidatasetsdatasetiddocumentsgetmissinggetInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<bulkmissingidapidatasetsdatasetiddocumentsgetmissinggetOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/datasets/{dataset_id}/documents/get_missing',
      options
    });
  }
  public async updatedocumentapidatasetsdatasetiddocumentsupdatepost(
    input: CommandInput<updatedocumentapidatasetsdatasetiddocumentsupdatepostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<updatedocumentapidatasetsdatasetiddocumentsupdatepostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/documents/update',
      options
    });
  }
  public async bulkupdatedocumentsapidatasetsdatasetiddocumentsbulkupdatepost(
    input: CommandInput<bulkupdatedocumentsapidatasetsdatasetiddocumentsbulkupdatepostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<bulkupdatedocumentsapidatasetsdatasetiddocumentsbulkupdatepostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/documents/bulk_update',
      options
    });
  }
  public async deleteapidatasetsdatasetiddocumentsdeletepost(
    input: CommandInput<deleteapidatasetsdatasetiddocumentsdeletepostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<deleteapidatasetsdatasetiddocumentsdeletepostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/documents/delete',
      options
    });
  }
  public async bulkdeleteapidatasetsdatasetiddocumentsbulkdeletepost(
    input: CommandInput<bulkdeleteapidatasetsdatasetiddocumentsbulkdeletepostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<bulkdeleteapidatasetsdatasetiddocumentsbulkdeletepostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/documents/bulk_delete',
      options
    });
  }
  public async deletefieldsapidatasetsdatasetiddocumentsdeletefieldspost(
    input: CommandInput<deletefieldsapidatasetsdatasetiddocumentsdeletefieldspostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<deletefieldsapidatasetsdatasetiddocumentsdeletefieldspostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/documents/delete_fields',
      options
    });
  }
  public async updatebyfiltersapidatasetsdatasetiddocumentsupdatewherepost(
    input: CommandInput<updatebyfiltersapidatasetsdatasetiddocumentsupdatewherepostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<updatebyfiltersapidatasetsdatasetiddocumentsupdatewherepostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/documents/update_where',
      options
    });
  }
  public async deletebyfiltersapidatasetsdatasetiddocumentsdeletewherepost(
    input: CommandInput<deletebyfiltersapidatasetsdatasetiddocumentsdeletewherepostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<deletebyfiltersapidatasetsdatasetiddocumentsdeletewherepostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/documents/delete_where',
      options
    });
  }
  public async collectionmetadataapidatasetsdatasetidmetadataget(
    input: CommandInput<collectionmetadataapidatasetsdatasetidmetadatagetInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<collectionmetadataapidatasetsdatasetidmetadatagetOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/datasets/{dataset_id}/metadata',
      options
    });
  }
  public async postcollectionmetadataapidatasetsdatasetidmetadatapost(
    input: CommandInput<postcollectionmetadataapidatasetsdatasetidmetadatapostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<postcollectionmetadataapidatasetsdatasetidmetadatapostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/metadata',
      options
    });
  }
  public async datasetschemastatsapidatasetsdatasetidmonitorstatsget(
    input: CommandInput<datasetschemastatsapidatasetsdatasetidmonitorstatsgetInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<datasetschemastatsapidatasetsdatasetidmonitorstatsgetOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/datasets/{dataset_id}/monitor/stats',
      options
    });
  }
  public async datasetvectorhealthapidatasetsdatasetidmonitorhealthget(
    input: CommandInput<datasetvectorhealthapidatasetsdatasetidmonitorhealthgetInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<datasetvectorhealthapidatasetsdatasetidmonitorhealthgetOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/datasets/{dataset_id}/monitor/health',
      options
    });
  }
  public async aggregatelogsapidatasetsdatasetidmonitorusagepost(
    input: CommandInput<aggregatelogsapidatasetsdatasetidmonitorusagepostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<aggregatelogsapidatasetsdatasetidmonitorusagepostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/monitor/usage',
      options
    });
  }
  public async tasksapidatasetsdatasetidtaskscreatepost(
    input: CommandInput<tasksapidatasetsdatasetidtaskscreatepostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<tasksapidatasetsdatasetidtaskscreatepostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/datasets/{dataset_id}/tasks/create',
      options
    });
  }
  public async listcollectionjobsapidatasetsdatasetidtaskslistget(
    input: CommandInput<listcollectionjobsapidatasetsdatasetidtaskslistgetInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<listcollectionjobsapidatasetsdatasetidtaskslistgetOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/datasets/{dataset_id}/tasks/list',
      options
    });
  }
  public async tasksstatusapidatasetsdatasetidtaskstaskidstatusget(
    input: CommandInput<tasksstatusapidatasetsdatasetidtaskstaskidstatusgetInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<tasksstatusapidatasetsdatasetidtaskstaskidstatusgetOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/datasets/{dataset_id}/tasks/{task_id}/status',
      options
    });
  }
  public async vectorsearchapiservicessearchvectorpost(
    input: CommandInput<vectorsearchapiservicessearchvectorpostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<vectorsearchapiservicessearchvectorpostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/services/search/vector',
      options
    });
  }
  public async traditionalsearchapiservicessearchtraditionalpost(
    input: CommandInput<traditionalsearchapiservicessearchtraditionalpostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<traditionalsearchapiservicessearchtraditionalpostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/services/search/traditional',
      options
    });
  }
  public async hybridsearchapiservicessearchhybridpost(
    input: CommandInput<hybridsearchapiservicessearchhybridpostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<hybridsearchapiservicessearchhybridpostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/services/search/hybrid',
      options
    });
  }
  public async hybridsearchapiservicessearchsemanticpost(
    input: CommandInput<hybridsearchapiservicessearchsemanticpostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<hybridsearchapiservicessearchsemanticpostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/services/search/semantic',
      options
    });
  }
  public async chunksearchapiservicessearchchunkpost(
    input: CommandInput<chunksearchapiservicessearchchunkpostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<chunksearchapiservicessearchchunkpostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/services/search/chunk',
      options
    });
  }
  public async advancedmultistepchunksearchapiservicessearchmultistepchunkpost(
    input: CommandInput<advancedmultistepchunksearchapiservicessearchmultistepchunkpostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<advancedmultistepchunksearchapiservicessearchmultistepchunkpostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/services/search/multistep_chunk',
      options
    });
  }
  public async advancedchunksearchapiservicessearchadvancedchunkpost(
    input: CommandInput<advancedchunksearchapiservicessearchadvancedchunkpostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<advancedchunksearchapiservicessearchadvancedchunkpostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/services/search/advanced_chunk',
      options
    });
  }
  public async advancedmultistepchunksearchapiservicessearchadvancedmultistepchunkpost(
    input: CommandInput<advancedmultistepchunksearchapiservicessearchadvancedmultistepchunkpostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<advancedmultistepchunksearchapiservicessearchadvancedmultistepchunkpostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/services/search/advanced_multistep_chunk',
      options
    });
  }
  public async vectorsearchapiservicessearchdiversitypost(
    input: CommandInput<vectorsearchapiservicessearchdiversitypostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<vectorsearchapiservicessearchdiversitypostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/services/search/diversity',
      options
    });
  }
  public async vectorrecommendapiservicesrecommendvectorpost(
    input: CommandInput<vectorrecommendapiservicesrecommendvectorpostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<vectorrecommendapiservicesrecommendvectorpostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/services/recommend/vector',
      options
    });
  }
  public async vectordiversityrecommendapiservicesrecommenddiversitypost(
    input: CommandInput<vectordiversityrecommendapiservicesrecommenddiversitypostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<vectordiversityrecommendapiservicesrecommenddiversitypostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/services/recommend/diversity',
      options
    });
  }
  public async aggregatev2apiservicesaggregateaggregatepost(
    input: CommandInput<aggregatev2apiservicesaggregateaggregatepostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<aggregatev2apiservicesaggregateaggregatepostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/services/aggregate/aggregate',
      options
    });
  }
  public async clustercentroidsapiservicesclustercentroidslistget(
    input: CommandInput<clustercentroidsapiservicesclustercentroidslistgetInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<clustercentroidsapiservicesclustercentroidslistgetOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/services/cluster/centroids/list',
      options
    });
  }
  public async clustercentroidsgetapiservicesclustercentroidsgetget(
    input: CommandInput<clustercentroidsgetapiservicesclustercentroidsgetgetInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<clustercentroidsgetapiservicesclustercentroidsgetgetOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/services/cluster/centroids/get',
      options
    });
  }
  public async insertclustercentroidsapiservicesclustercentroidsinsertpost(
    input: CommandInput<insertclustercentroidsapiservicesclustercentroidsinsertpostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<insertclustercentroidsapiservicesclustercentroidsinsertpostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/services/cluster/centroids/insert',
      options
    });
  }
  public async clustercentroidsgetapiservicesclustercentroidsdocumentspost(
    input: CommandInput<clustercentroidsgetapiservicesclustercentroidsdocumentspostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<clustercentroidsgetapiservicesclustercentroidsdocumentspostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/services/cluster/centroids/documents',
      options
    });
  }
  public async clusteraggregateapiservicesclusteraggregatepost(
    input: CommandInput<clusteraggregateapiservicesclusteraggregatepostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<clusteraggregateapiservicesclusteraggregatepostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/services/cluster/aggregate',
      options
    });
  }
  public async clusterfacetsapiservicesclusterfacetsget(
    input: CommandInput<clusterfacetsapiservicesclusterfacetsgetInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<clusterfacetsapiservicesclusterfacetsgetOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/services/cluster/facets',
      options
    });
  }
  public async tagapiservicestaggertagpost(
    input: CommandInput<tagapiservicestaggertagpostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<tagapiservicestaggertagpostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/services/tagger/tag',
      options
    });
  }
  public async clusterandtagapiservicestaggerdiversitypost(
    input: CommandInput<clusterandtagapiservicestaggerdiversitypostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<clusterandtagapiservicestaggerdiversitypostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/services/tagger/diversity',
      options
    });
  }
  public async vectorrecommendapiservicesdocumentdiffpost(
    input: CommandInput<vectorrecommendapiservicesdocumentdiffpostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<vectorrecommendapiservicesdocumentdiffpostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/services/document_diff',
      options
    });
  }
  public async predictknnregressionapiservicespredictionregressionknnpost(
    input: CommandInput<predictknnregressionapiservicespredictionregressionknnpostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<predictknnregressionapiservicespredictionregressionknnpostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/services/prediction/regression/knn',
      options
    });
  }
  public async predictknnregressionfromsearchresultsapiservicespredictionregressionknnfromresultspost(
    input: CommandInput<predictknnregressionfromsearchresultsapiservicespredictionregressionknnfromresultspostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<predictknnregressionfromsearchresultsapiservicespredictionregressionknnfromresultspostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/services/prediction/regression/knn_from_results',
      options
    });
  }
  public async encodenumericfieldsapiservicesencodersnumericfieldspost(
    input: CommandInput<encodenumericfieldsapiservicesencodersnumericfieldspostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<encodenumericfieldsapiservicesencodersnumericfieldspostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/services/encoders/numeric_fields',
      options
    });
  }
  public async encodecategoriesapiservicesencoderscategoriespost(
    input: CommandInput<encodecategoriesapiservicesencoderscategoriespostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<encodecategoriesapiservicesencoderscategoriespostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/services/encoders/categories',
      options
    });
  }
  public async encodedictionaryapiservicesencodersdictionarypost(
    input: CommandInput<encodedictionaryapiservicesencodersdictionarypostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<encodedictionaryapiservicesencodersdictionarypostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/services/encoders/dictionary',
      options
    });
  }
  public async encodetextapiservicesencoderstextget(
    input: CommandInput<encodetextapiservicesencoderstextgetInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<encodetextapiservicesencoderstextgetOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/services/encoders/text',
      options
    });
  }
  public async encodetextapiservicesencodersmultitextget(
    input: CommandInput<encodetextapiservicesencodersmultitextgetInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<encodetextapiservicesencodersmultitextgetOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/services/encoders/multi_text',
      options
    });
  }
  public async encodeimageapiservicesencodersimagepost(
    input: CommandInput<encodeimageapiservicesencodersimagepostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<encodeimageapiservicesencodersimagepostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/services/encoders/image',
      options
    });
  }
  public async encodetextimageapiservicesencoderstextimageget(
    input: CommandInput<encodetextimageapiservicesencoderstextimagegetInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<encodetextimageapiservicesencoderstextimagegetOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/services/encoders/textimage',
      options
    });
  }
  public async encodeimagetextapiservicesencodersimagetextget(
    input: CommandInput<encodeimagetextapiservicesencodersimagetextgetInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<encodeimagetextapiservicesencodersimagetextgetOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/services/encoders/imagetext',
      options
    });
  }
  public async retrievedocumentsapiservicesencodersencodepost(
    input: CommandInput<retrievedocumentsapiservicesencodersencodepostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<retrievedocumentsapiservicesencodersencodepostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/services/encoders/encode',
      options
    });
  }
  public async retrievedocumentsapiservicesencodersbulkencodepost(
    input: CommandInput<retrievedocumentsapiservicesencodersbulkencodepostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<retrievedocumentsapiservicesencodersbulkencodepostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/services/encoders/bulk_encode',
      options
    });
  }
  public async wordcloudsapiserviceswordcloudswordcloudspost(
    input: CommandInput<wordcloudsapiserviceswordcloudswordcloudspostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<wordcloudsapiserviceswordcloudswordcloudspostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/services/wordclouds/wordclouds',
      options
    });
  }
  public async deployablecreateapideployablescreatepost(
    input: CommandInput<deployablecreateapideployablescreatepostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<deployablecreateapideployablescreatepostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/deployables/create',
      options
    });
  }
  public async deployableupdateshareableapideployablesdeployableidsharepost(
    input: CommandInput<deployableupdateshareableapideployablesdeployableidsharepostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<deployableupdateshareableapideployablesdeployableidsharepostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/deployables/{deployable_id}/share',
      options
    });
  }
  public async deployableupdateprivateapideployablesdeployableidprivatepost(
    input: CommandInput<deployableupdateprivateapideployablesdeployableidprivatepostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<deployableupdateprivateapideployablesdeployableidprivatepostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/deployables/{deployable_id}/private',
      options
    });
  }
  public async deployableupdateapideployablesdeployableidupdatepost(
    input: CommandInput<deployableupdateapideployablesdeployableidupdatepostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<deployableupdateapideployablesdeployableidupdatepostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/deployables/{deployable_id}/update',
      options
    });
  }
  public async deployablegetapideployablesdeployableidgetget(
    input: CommandInput<deployablegetapideployablesdeployableidgetgetInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<deployablegetapideployablesdeployableidgetgetOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/deployables/{deployable_id}/get',
      options
    });
  }
  public async deployabledeleteapideployablesdeletepost(
    input: CommandInput<deployabledeleteapideployablesdeletepostInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<deployabledeleteapideployablesdeletepostOutput>> {
    return this.SendRequest({
      input,
      method:'post',
      path:'/deployables/delete',
      options
    });
  }
  public async deployablelistapideployableslistget(
    input: CommandInput<deployablelistapideployableslistgetInput>,
    options?: _GenericMethodOptions
  ):Promise<CommandOutput<deployablelistapideployableslistgetOutput>> {
    return this.SendRequest({
      input,
      method:'get',
      path:'/deployables/list',
      options
    });
  }}