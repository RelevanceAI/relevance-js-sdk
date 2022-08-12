// import { DiscoveryApiClient, BulkInsertInput, BulkInsertOutput } from '../../';
// import { _ClientInput, CommandInput, CommandOutput, _GenericMethodOptions } from '../../shared/BaseClient';
// import { operations, components } from '../../generated/_DiscoveryApiSchemaTypes';
// import { Dataset } from './Dataset';
// type bodyType = operations['SimpleSearchPost']['requestBody']['content']['application/json'];
// export function QueryBuilder():_QueryBuilder{
//     return new _QueryBuilder();
// }
// export function FilterBuilder():_FilterBuilder{
//     return new _FilterBuilder();
// }

// export class _FilterBuilder {
//     body: bodyType;
//     constructor() {
//         this.body = {filters:[],fieldsToAggregate:[],fieldsToAggregateStats:[]};
//     }
//     buildFilters() {
//         return this.body.filters;
//     }
//     rawFilter(filter: components['schemas']['filterListItem']) {
//         this.body.filters?.push(filter);
//         return this;
//     }
//     filter(type: string, key: string, value: string, ...options: any) {
//         this.body.filters?.push({
//             [type]: {
//                 key,
//                 value,
//                 ...options
//             }
//         });
//         return this;
//     }

//     match(field: string, value: any) {
//         this.body.filters?.push({ match: { key: field, value } });
//         return this;
//     }

//     wildcard(field: string, value: any) {
//         this.body.filters?.push({ wildcard: { key: field, value } });
//         return this;
//     }

//     selfreference(fielda: string, fieldb: string, operation: "<=" | ">=" | "<" | ">" | "==" | "!=") {
//         this.body.filters?.push({ selfreference: { a: fielda, b: fieldb, operation } });
//         return this;
//     }

//     range(field: string, options: Omit<components['schemas']['filterListItem']['range'],'key'>) {
//         this.body.filters?.push({ range: { key: field, ...options } });
//         return this;
//     }

//     or(filters: _FilterBuilder[]) {
//         this.body.filters?.push({ or: filters.map(f => f.body.filters ?? []) });
//         return this;
//     }

//     not(filter: _FilterBuilder) {
//         this.body.filters?.push({ not: filter.body?.filters ?? [] });
//         return this;
//     }
// } 
// export class _QueryBuilder extends _FilterBuilder {
//     defaultQueryValue?: string;
//     shouldPerformTextQuery:boolean;
//     constructor() {
//         super();
//         this.shouldPerformTextQuery = false;
//     }

//     build() {
//         if (!this.shouldPerformTextQuery) return this.body;
//         if (!this.defaultQueryValue) throw new Error("Please set the search query by calling .query('my search query') before performing a text search.");
//         this.body.query = this.defaultQueryValue;
//         return this.body;
//     }
//     query(query:string,fieldsToSearch?: bodyType['fieldsToSearch']) {
//         this.defaultQueryValue = query;
//         if (fieldsToSearch) this.body.fieldsToSearch = fieldsToSearch;
//         return this;
//     }
//     queryConfig(weight:number,options?:bodyType['queryConfig']) {
//         this.body.queryConfig = {weight,...(options??{})};
//         return this;
//     }
//     text(field?:string): _QueryBuilder;
//     text(field?:string,weight?:number):_QueryBuilder{
//         this.shouldPerformTextQuery = true;
//         if (!field) return this; // support searching all fields
//         if (!this.body.fieldsToSearch) this.body.fieldsToSearch = [];
//         if (!weight) this.body.fieldsToSearch.push(field);
//         else this.body.fieldsToSearch.push({field,weight});
//         return this;
//     }

//     vector(field: string, weight?: number): _QueryBuilder;
//     vector(field: string, options?: components['schemas']['vectorSearchQuery']): _QueryBuilder;
//     vector(field: string, weight?: number, options?: components['schemas']['vectorSearchQuery']): _QueryBuilder;
//     vector(field: string, ...args:any[]) {
//         if (!Array.isArray(this.body.vectorSearchQuery)) this.body.vectorSearchQuery = [];
//         let payload:components['schemas']['vectorSearchQuery'] = {field};
//         const inferredModelMatch = field.match(/_(.*)_.*vector_/) // title_text@1-0_vector_ -> text@1-0
//         if (inferredModelMatch && inferredModelMatch[1]) payload.model = inferredModelMatch[1]; // this can be overridden
//         for (const arg of args) {
//             if (typeof arg ==='number') payload.weight = arg; // weight
//             else payload = {...payload,...arg}; // options
//         }
//         this.body.vectorSearchQuery.push(payload);
//         return this;
//     }
    
//     sort(field: string, direction: 'asc' | 'desc') {
//         if (!this?.body?.sort?.length) this.body.sort = {};
//         this.body.sort[field] = direction;
//         return this;
//     }

//     textSort(field: string, direction: 'asc' | 'desc') {
//         if (!this?.body?.textSort?.length) this.body.textSort = {};
//         this.body.textSort[field] = direction;
//         return this;
//     }

//     rawOption(key: string, value: any) {
//         (this.body as any)[key] = value;
//         return this;
//     }
    
//     minimumRelevance(value: bodyType['minimumRelevance']) {
//         this.body.minimumRelevance = value;
//         return this;
//     }

//     page(value: bodyType['page']) {
//         this.body.page = value;
//         return this;
//     }

//     pageSize(value: bodyType['pageSize']) {
//         this.body.pageSize = value;
//         return this;
//     }
//     includeFields(fields:bodyType['includeFields']) {
//         this.body.includeFields = fields;
//     }
//     excludeFields(fields:bodyType['excludeFields']) {
//         this.body.excludeFields = fields;
//     }
//     includeVectors(whetherToInclude:bodyType['includeVectors']){
//         this.body.includeVectors = whetherToInclude;
//     }
    
//     aggregate(field: string, options?: { options?: any, aggregates?: _QueryBuilder }) {
//         this.body.fieldsToAggregate?.push({  field, ...options, fieldsToAggregate: options?.aggregates?.body.fieldsToAggregate ?? [] });
//         return this;
//     }

//     aggregateStats(field: string, interval?: number) {
//         this.body.fieldsToAggregateStats?.push({  field, interval });
//         return this;
//     }

// }



// export class DiscoveryClient {
//     apiClient:DiscoveryApiClient;

//     constructor(config?: _ClientInput) {
//         this.apiClient = new DiscoveryApiClient(config ?? {});
//     }
//     dataset(name: string, options?: any) {
//         let dataset = new Dataset(this, name, options);
//         return dataset;
//     }
// }