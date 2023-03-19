import { VecDBApiClient, BulkInsertInput, BulkInsertOutput } from '../../';
import { _ClientInput, CommandInput, CommandOutput, _GenericMethodOptions } from '../../shared/BaseClient';
import { operations, components } from '../../generated/_DiscoveryApiSchemaTypes';
import { Dataset } from './Dataset';
type bodyType = any; // TODO operations['SimpleSearchPost']['requestBody']['content']['application/json'];
export function QueryBuilder():_QueryBuilder{
    return new _QueryBuilder();
}
export function FilterBuilder():_FilterBuilder{
    return new _FilterBuilder();
}

export class _FilterBuilder {
    body: bodyType;
    constructor() {
        this.body = {filters:[],fieldsToAggregate:[],fieldsToAggregateStats:[]};
    }
    buildFilters() {
        return this.body.filters;
    }
    rawFilter(filter: components['schemas']['simpleSearchAndFlatFilterItem'] ) {
        this.body.filters?.push(filter);
        return this;
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
        this.body.filters?.push({ match: { field: field, value } });
        return this;
    }

    wildcard(field: string, value: any) {
        this.body.filters?.push({ wildcard: { field: field, value } });
        return this;
    }

    range(field: string, options: Omit<components['schemas']['simpleSearchAndFlatFilterItem']['range'],'field'>) {
        this.body.filters?.push({ range: { field: field, ...options } });
        return this;
    }

    or(filters: _FilterBuilder[]) {
        this.body.filters?.push({ or: filters.map(f => f.body.filters ?? []) });
        return this;
    }
} 
export class _QueryBuilder extends _FilterBuilder {
    defaultQueryValue?: string;
    shouldPerformTextQuery:boolean;
    constructor() {
        super();
        this.shouldPerformTextQuery = false;
    }

    build() {
        if (!this.shouldPerformTextQuery) return this.body;
        if (!this.defaultQueryValue) throw new Error("Please set the search query by calling .query('my search query') before performing a text search.");
        this.body.query = this.defaultQueryValue;
        return this.body;
    }

    vector(field: string, weight?: number): _QueryBuilder;
    vector(field: string, options?: any): _QueryBuilder; // TODO components['schemas']['simpleSearchAndFlatFilterItem']['search']['vectorSearchQuery']
    vector(field: string, weight?: number, options?: any): _QueryBuilder; // TODO components['schemas']['simpleSearchAndFlatFilterItem']['search']['vectorSearchQuery']
    vector(field: string, ...args:any[]) {
        if (!Array.isArray(this.body.vectorSearchQuery)) this.body.vectorSearchQuery = [];
        let payload:any = {field}; // TODO components['schemas']['simpleSearchAndFlatFilterItem']['search']['vectorSearchQuery']
        const inferredModelMatch = field.match(/_(.*)_.*vector_/) // title_text@1-0_vector_ -> text@1-0
        if (inferredModelMatch && inferredModelMatch[1]) payload.model = inferredModelMatch[1]; // this can be overridden
        for (const arg of args) {
            if (typeof arg ==='number') payload.weight = arg; // weight
            else payload = {...payload,...arg}; // options
        }
        this.body.vectorSearchQuery.push(payload);
        return this;
    }
    
    sort(field: string, direction: 'asc' | 'desc') {
        if (!this?.body?.sort?.length) this.body.sort = {};
        this.body.sort[field] = direction;
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
    
    includeFields(fields:bodyType['includeFields']) {
        this.body.includeFields = fields;
        return this;
    }
}

export class VecDBClient {
    apiClient:VecDBApiClient;

    constructor(config?: _ClientInput) {
        this.apiClient = new VecDBApiClient(config ?? {});
    }
    dataset(name: string, options?: any) {
        let dataset = new Dataset(this, name, options);
        return dataset;
    }
}