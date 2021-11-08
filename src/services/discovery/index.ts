import { DiscoveryClient,BulkInsertInput ,BulkInsertOutput} from '../../';
import { _ClientInput,CommandInput,CommandOutput,_GenericMethodOptions } from '../../shared/BaseClient';
import {operations,components} from '../../generated/_DiscoverySchemaTypes';
type bodyType = operations['SimpleSearchPost']['requestBody']['content']['application/json'];
export class SearchBuilder {
    body: bodyType;
    constructor(){
        this.body = {};
    }
    traditional(query:string,fieldsToSearch?:bodyType['fieldsToSearch'],queryConfig?:bodyType['queryConfig']){
        this.body.query = query;
        if (fieldsToSearch) this.body.fieldsToSearch = fieldsToSearch;
        if (queryConfig) this.body.queryConfig = queryConfig;
        return this;
    }
    vector(vectorField:string,options?:components['schemas']['vectorSearchQuery']){
        if (!Array.isArray(this.body.vectorSearchQuery)) return;
        if (!this?.body?.vectorSearchQuery?.length) this.body.vectorSearchQuery = [];
        this.body.vectorSearchQuery.push({field:vectorField,...options});
        return this;
    }
    sort(field:string,direction:'asc'|'desc'){
        if (!this?.body?.sort?.length) this.body.sort = {};
        this.body.sort[field] = direction;
        return this;
    }
    textSort(field:string,direction:'asc'|'desc'){
        if (!this?.body?.textSort?.length) this.body.textSort = {};
        this.body.textSort[field] = direction;
        return this;
    }
    rawOption(key:string,value:any) {
        (this.body as any)[key] = value;
        return this;
    }
    minimumRelevance(value:bodyType['minimumRelevance']) {
        this.body.minimumRelevance = value;
        return this;
    }
    page(value:bodyType['page']) {
        this.body.page = value;
        return this;
    }
    pageSize(value:bodyType['pageSize']) {
        this.body.pageSize = value;
        return this;
    }
}

export class FilterBuilder {
    filters:components['schemas']['filterListItem'][]
    constructor(){
        this.filters = [];
    }
    rawFilter(filter:components['schemas']['filterListItem']) {
        this.filters.push(filter);
        return this;
    }
    match(field:string,value:any) {
        this.filters.push({match:{key:field,value}});
        return this;
    }
    wildcard(field:string,value:any) {
        this.filters.push({wildcard:{key:field,value}});
        return this;
    }
    selfreference(fielda:string,fieldb:string,operation:"<=" | ">=" | "<" | ">" | "==" | "!=") {
        this.filters.push({selfreference:{a:fielda,b:fieldb,operation}});
        return this;
    }
    range(field:string,options:components['schemas']['filterListItem']['range']) {
        this.filters.push({range:{key:field,...options}});
        return this;
    }
    or(filters:FilterBuilder[]){
        this.filters.push({or:filters.map(f => f.filters)});
        return this;
    }
    not(filter:FilterBuilder) {
        this.filters.push({not:filter.filters});
        return this;
    }
}
export class AggregateBuilder {
    fieldsToAggregate: components['schemas']['fieldsToAggregate'];
    fieldsToAggregateStats: bodyType['fieldsToAggregateStats'];
    constructor(){
        this.fieldsToAggregate = [];
        this.fieldsToAggregateStats = [];
    }
    aggregate(field:string,options?:{options?:any,aggregates?:AggregateBuilder}){
        this.fieldsToAggregate.push({key:field,...options,fieldsToAggregate:options?.aggregates?.fieldsToAggregate ?? []});
        return this;
    }
    aggregateStats(field:string,interval?:number){
        this.fieldsToAggregateStats?.push({key:field,interval});
        return this;
    }
}

export class EnhancedDiscovery extends DiscoveryClient {
    constructor(input:_ClientInput){
        super(input);
    }
    async searchUsingBuilders({search,boosters,filters,aggregates}:{
        search?:SearchBuilder
        boosters?:FilterBuilder,
        filters?:FilterBuilder,
        aggregates?:AggregateBuilder
    }){
        let payload: bodyType = {};
        if (search) payload = search.body;
        if (boosters) payload.relevanceBoosters = boosters.filters;
        if (filters) payload.filters = filters.filters;
        if (aggregates) {
            payload.fieldsToAggregate = aggregates.fieldsToAggregate;
            payload.fieldsToAggregateStats = aggregates.fieldsToAggregateStats;
        }
        return await this.SimpleSearchPost(payload);
    }
    async batchedBulkInsert(input: CommandInput<BulkInsertInput>, options?: _GenericMethodOptions & {batch_size?:number}):Promise<CommandOutput<BulkInsertOutput>>{
        const allDocuments = input.documents ?? [];
        const batch_size= options?.batch_size ?? 10000;
        const results: BulkInsertOutput = {inserted:0,failed_documents:[]};
        for (let i = 0; i < allDocuments?.length; i+=batch_size) {
            const res = await this.BulkInsert({...input,documents:allDocuments.slice(i,i+batch_size)});
            results.failed_documents = results.failed_documents.concat(res.body.failed_documents);
            results.inserted += res.body.inserted
        }
        return {body:results};
    }
    // TODO - ChunkSearch, insert, insertAndVectorize?, vectorize, 
    // TODO - add api methods to make sure they all work
}