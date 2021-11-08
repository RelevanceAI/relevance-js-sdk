import { DiscoveryClient } from '../../../dist-types';
import { _ClientInput } from '../../../dist-types/shared/BaseClient';
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
    }
    vector(vectorField:string,options?:components['schemas']['vectorSearchQuery']){
        if (!Array.isArray(this.body.vectorSearchQuery)) return;
        if (!this?.body?.vectorSearchQuery?.length) this.body.vectorSearchQuery = [];
        this.body.vectorSearchQuery.push({field:vectorField,...options});
    }
    sort(field:string,direction:'asc'|'desc'){
        if (!this?.body?.sort?.length) this.body.sort = {};
        this.body.sort[field] = direction;
    }
    textSort(field:string,direction:'asc'|'desc'){
        if (!this?.body?.textSort?.length) this.body.textSort = {};
        this.body.textSort[field] = direction;
    }
    rawOption(key:string,value:any) {
        (this.body as any)[key] = value;
    }
    minimumRelevance(value:bodyType['minimumRelevance']) {
        this.body.minimumRelevance = value;
    }
    page(value:bodyType['page']) {
        this.body.page = value;
    }
    pageSize(value:bodyType['pageSize']) {
        this.body.pageSize = value;
    }
}

export class FilterBuilder {
    filters:components['schemas']['filterListItem'][]
    constructor(){
        this.filters = [];
    }
    rawFilter(filter:components['schemas']['filterListItem']) {
        this.filters.push(filter);
    }
    match(field:string,value:any) {
        this.filters.push({match:{key:field,value}});
    }
    wildcard(field:string,value:any) {
        this.filters.push({wildcard:{key:field,value}});
    }
    selfreference(fielda:string,fieldb:string,operation:"<=" | ">=" | "<" | ">" | "==" | "!=") {
        this.filters.push({selfreference:{a:fielda,b:fieldb,operation}});
    }
    range(field:string,options:components['schemas']['filterListItem']['range']) {
        this.filters.push({range:{key:field,...options}});
    }
    or(filters:FilterBuilder[]){
        this.filters.push({or:filters.map(f => f.filters)});
    }
    not(filter:FilterBuilder) {
        this.filters.push({not:filter.filters});
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
    }
    aggregateStats(field:string,interval?:number){
        this.fieldsToAggregateStats?.push({key:field,interval});
    }
}

export class EnhancedDiscovery extends DiscoveryClient {
    constructor(input:_ClientInput){
        super(input);
    }
    async search({search,boosters,filters,aggregates}:{
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
}