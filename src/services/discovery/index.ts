import { DiscoveryApiClient, BulkInsertInput, BulkInsertOutput } from '../../';
import { _ClientInput, CommandInput, CommandOutput, _GenericMethodOptions } from '../../shared/BaseClient';
import { operations, components } from '../../generated/_DiscoveryApiSchemaTypes';
import { Dataset } from './Dataset';
type bodyType = operations['SimpleSearchPost']['requestBody']['content']['application/json'];
export class SearchBuilder {
    body: bodyType;

    constructor() {
        this.body = {};
    }

    build() {
        return this.body;
    }

    traditional(query: string, queryConfig?: bodyType['queryConfig']): SearchBuilder;
    traditional(query: string, fieldsToSearch?: bodyType['fieldsToSearch']):SearchBuilder;
    traditional(query: string, fieldsToSearch?: bodyType['fieldsToSearch'], queryConfig?: bodyType['queryConfig']):SearchBuilder;
    traditional(query:string,...args:any[]) {
        this.body.query = query;
        for (const arg of args) {
            if (Array.isArray(args)) this.body.fieldsToSearch = arg;
            else this.body.queryConfig = arg;
        }
        return this;
    }

    vector(field: string, model: string, weight?: number): SearchBuilder;
    vector(field: string, model: string, options?: components['schemas']['vectorSearchQuery']): SearchBuilder;
    vector(field: string, model: string, weight?: number, options?: components['schemas']['vectorSearchQuery']): SearchBuilder;
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
}

export class FilterBuilder {
    filters: components['schemas']['filterListItem'][]

    constructor() {
        this.filters = [];
    }


    rawFilter(filter: components['schemas']['filterListItem']) {
        this.filters.push(filter);
        return this;
    }
    
    filter(type: string, key: string, value: string, ...options: any) {
        this.filters.push({
            [type]: {
                key,
                value,
                ...options
            }
        });
        return this;
    }

    match(field: string, value: any) {
        this.filters.push({ match: { key: field, value } });
        return this;
    }

    wildcard(field: string, value: any) {
        this.filters.push({ wildcard: { key: field, value } });
        return this;
    }

    selfreference(fielda: string, fieldb: string, operation: "<=" | ">=" | "<" | ">" | "==" | "!=") {
        this.filters.push({ selfreference: { a: fielda, b: fieldb, operation } });
        return this;
    }

    range(field: string, options: components['schemas']['filterListItem']['range']) {
        this.filters.push({ range: { key: field, ...options } });
        return this;
    }

    or(filters: FilterBuilder[]) {
        this.filters.push({ or: filters.map(f => f.build()) });
        return this;
    }

    not(filter: FilterBuilder) {
        this.filters.push({ not: filter.filters });
        return this;
    }
}
export class AggregateBuilder {
    fieldsToAggregate: components['schemas']['fieldsToAggregate'];
    fieldsToAggregateStats: bodyType['fieldsToAggregateStats'];

    constructor() {
        this.fieldsToAggregate = [];
        this.fieldsToAggregateStats = [];
    }

    aggregate(field: string, options?: { options?: any, aggregates?: AggregateBuilder }) {
        this.fieldsToAggregate.push({ key: field, ...options, fieldsToAggregate: options?.aggregates?.fieldsToAggregate ?? [] });
        return this;
    }

    aggregateStats(field: string, interval?: number) {
        this.fieldsToAggregateStats?.push({ key: field, interval });
        return this;
    }
}

export class DiscoveryClient extends DiscoveryApiClient {
    constructor(config?: _ClientInput) {
        super(config ?? {});
    }
    dataset(name: string, options?: any) {
        let dataset = new Dataset(this, name, options);
        return dataset;
    }
}