import { DiscoveryApiClient, BulkInsertInput, BulkInsertOutput } from '../../';
import { _ClientInput, CommandInput, CommandOutput, _GenericMethodOptions } from '../../shared/BaseClient';
import { operations, components } from '../../generated/_DiscoveryApiSchemaTypes';
import { Dataset } from './Dataset';
type bodyType = operations['SimpleSearchPost']['requestBody']['content']['application/json'];
export function QueryBuilder():_QueryBuilder{
    return new _QueryBuilder();
}

export class _QueryBuilder {
    body: bodyType;

    constructor() {
        this.body = {filters:[],fieldsToAggregate:[],fieldsToAggregateStats:[]};
    }

    build() {
        return this.body;
    }

    text(query: string, queryConfig?: bodyType['queryConfig']): _QueryBuilder;
    text(query: string, fieldsToSearch?: bodyType['fieldsToSearch']):_QueryBuilder;
    text(query: string, fieldsToSearch?: bodyType['fieldsToSearch'], queryConfig?: bodyType['queryConfig']):_QueryBuilder;
    text(query:string,...args:any[]) {
        this.body.query = query;
        for (const arg of args) {
            if (Array.isArray(arg)) this.body.fieldsToSearch = arg;
            else this.body.queryConfig = arg;
        }
        return this;
    }

    vector(field: string, model: string, weight?: number): _QueryBuilder;
    vector(field: string, model: string, options?: components['schemas']['vectorSearchQuery']): _QueryBuilder;
    vector(field: string, model: string, weight?: number, options?: components['schemas']['vectorSearchQuery']): _QueryBuilder;
    vector(field: string, model: string, ...args:any[]) {
        if (!Array.isArray(this.body.vectorSearchQuery)) this.body.vectorSearchQuery = [];
        if (!this?.body?.vectorSearchQuery?.length) this.body.vectorSearchQuery = [];
        let payload:components['schemas']['vectorSearchQuery'] = {field,model};
        for (const arg of args) {
            if (typeof arg ==='number') payload.weight = arg;
            else payload = {...payload,...arg};
        }
        this.body.vectorSearchQuery.push(payload);
        return this;
    }
    
    sort(field: string, direction: 'asc' | 'desc') {
        if (!this?.body?.sort?.length) this.body.sort = {};
        this.body.sort[field] = direction;
        return this;
    }

    textSort(field: string, direction: 'asc' | 'desc') {
        if (!this?.body?.textSort?.length) this.body.textSort = {};
        this.body.textSort[field] = direction;
        return this;
    }

    rawOption(key: string, value: any) {
        (this.body as any)[key] = value;
        return this;
    }
    
    minimumRelevance(value: bodyType['minimumRelevance']) {
        this.body.minimumRelevance = value;
        return this;
    }

    page(value: bodyType['page']) {
        this.body.page = value;
        return this;
    }

    pageSize(value: bodyType['pageSize']) {
        this.body.pageSize = value;
        return this;
    }
    rawFilter(filter: components['schemas']['filterListItem']) {
        this.body.filters?.push(filter);
        return this;
    }
    includeFields(fields:bodyType['includeFields']) {
        this.body.includeFields = fields;
    }
    excludeFields(fields:bodyType['excludeFields']) {
        this.body.excludeFields = fields;
    }
    includeVectors(whetherToInclude:bodyType['includeVectors']){
        this.body.includeVectors = whetherToInclude;
    }
    
    filter(type: string, key: string, value: string, ...options: any) {
        this.body.filters?.push({
            [type]: {
                key,
                value,
                ...options
            }
        });
        return this;
    }

    match(field: string, value: any) {
        this.body.filters?.push({ match: { key: field, value } });
        return this;
    }

    wildcard(field: string, value: any) {
        this.body.filters?.push({ wildcard: { key: field, value } });
        return this;
    }

    selfreference(fielda: string, fieldb: string, operation: "<=" | ">=" | "<" | ">" | "==" | "!=") {
        this.body.filters?.push({ selfreference: { a: fielda, b: fieldb, operation } });
        return this;
    }

    range(field: string, options: Omit<components['schemas']['filterListItem']['range'],'key'>) {
        this.body.filters?.push({ range: { key: field, ...options } });
        return this;
    }

    or(filters: _QueryBuilder[]) {
        this.body.filters?.push({ or: filters.map(f => f.body.filters ?? []) });
        return this;
    }

    not(filter: _QueryBuilder) {
        this.body.filters?.push({ not: filter.body?.filters ?? [] });
        return this;
    }
    aggregate(field: string, options?: { options?: any, aggregates?: _QueryBuilder }) {
        this.body.fieldsToAggregate?.push({ key: field, ...options, fieldsToAggregate: options?.aggregates?.body.fieldsToAggregate ?? [] });
        return this;
    }

    aggregateStats(field: string, interval?: number) {
        this.body.fieldsToAggregateStats?.push({ key: field, interval });
        return this;
    }

}


export class DiscoveryClient {
    apiClient:DiscoveryApiClient;

    constructor(config?: _ClientInput) {
        this.apiClient = new DiscoveryApiClient(config ?? {});
    }
    dataset(name: string, options?: any) {
        let dataset = new Dataset(this, name, options);
        return dataset;
    }
}