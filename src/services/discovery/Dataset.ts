import { AggregateBuilder, DiscoveryClient, FilterBuilder, SearchBuilder } from ".";
import { SimpleSearchPostOutput } from "../..";
import { BulkInsertOutput } from "../../";
import { CommandInput, _GenericMethodOptions } from "../../shared/BaseClient";

interface searchOptions {
 debounce?:number;   
}



export class Dataset {
    client: DiscoveryClient;
    name: string;
    config: any;
    debounceTimer?:NodeJS.Timeout;

    constructor(client: DiscoveryClient, name: string, options: any) {
        // TODO validate name

        this.client = client;
        this.name = name;
        this.config = options;
    }

    get datasetName(): string {
        return this.name;
    };

    async insertDocument(document: any, options?: _GenericMethodOptions) {
        const response = await this.client.Insert({
            document,
            ...options
        }, { dataset_id: this.name });

        return response.body;
    }
    // without options
    async search(): Promise<SimpleSearchPostOutput>;
    async search(query?: SearchBuilder): Promise<SimpleSearchPostOutput>;
    async search(filters?: FilterBuilder): Promise<SimpleSearchPostOutput>;
    async search(facets?: AggregateBuilder): Promise<SimpleSearchPostOutput>;
    async search(query?: SearchBuilder, filters?: FilterBuilder): Promise<SimpleSearchPostOutput>;
    async search(query?: SearchBuilder, facets?: AggregateBuilder): Promise<SimpleSearchPostOutput>;
    async search(filters?: FilterBuilder, facets?: AggregateBuilder): Promise<SimpleSearchPostOutput>;
    async search(query?: SearchBuilder, filters?: FilterBuilder, facets?: AggregateBuilder): Promise<SimpleSearchPostOutput>;
    // with options
    async search(options?:searchOptions): Promise<SimpleSearchPostOutput>;
    async search(query?: SearchBuilder,options?:searchOptions): Promise<SimpleSearchPostOutput>;
    async search(filters?: FilterBuilder,options?:searchOptions): Promise<SimpleSearchPostOutput>;
    async search(facets?: AggregateBuilder,options?:searchOptions): Promise<SimpleSearchPostOutput>;
    async search(query?: SearchBuilder, filters?: FilterBuilder,options?:searchOptions): Promise<SimpleSearchPostOutput>;
    async search(query?: SearchBuilder, facets?: AggregateBuilder,options?:searchOptions): Promise<SimpleSearchPostOutput>;
    async search(filters?: FilterBuilder, facets?: AggregateBuilder,options?:searchOptions): Promise<SimpleSearchPostOutput>;
    async search(query?: SearchBuilder, filters?: FilterBuilder, facets?: AggregateBuilder,options?:searchOptions): Promise<SimpleSearchPostOutput>;
    async search(...args:any[]) {
        let payload: any = {};
        let options:searchOptions = {};
        for (const arg of args) {
            if (arg instanceof SearchBuilder) payload = {...payload,...arg.build()};
            else if (arg instanceof FilterBuilder) payload.filters = arg.filters;
            else if (arg instanceof AggregateBuilder) {
                payload.fieldsToAggregate = arg.fieldsToAggregate;
                payload.fieldsToAggregateStats = arg.fieldsToAggregateStats;
                
            }
            else options = arg;
        }
        const reqCallback = async () => await this.client.SimpleSearchPost(payload, { dataset_id: this.name });
        if (options.debounce && this.debounceTimer) {
            clearTimeout(this.debounceTimer);
            return new Promise((resolve) => {
                this.debounceTimer = setTimeout(async () => {const res = await reqCallback();resolve(res)},options.debounce);
            });
        } else {
            const response = await reqCallback();
            return response.body;
        }
    }

    async insertDocuments(documents: any, options?: _GenericMethodOptions & { batchSize?: number, progressCallback: (progress:BulkInsertOutput) => any }) {
        const allDocuments = documents ?? [];
        const batchSize = options?.batchSize ?? 10000;
        const results:BulkInsertOutput = { inserted: 0, failed_documents: [] };
        for (let i = 0; i < allDocuments?.length; i += batchSize) {
            const res = await this.client.apiClient.BulkInsert({ documents: allDocuments.slice(i, i + batchSize) }, { dataset_id: this.name });
            results.failed_documents = results.failed_documents.concat(res.body.failed_documents);
            results.inserted += res.body.inserted
            options?.progressCallback(results);
        }

        return results;
    }
    // TODO - ChunkSearch, insert, insertAndVectorize?, vectorize, 


    async updateDocument(documentId: string, partialUpdates: any) {
        const response = await this.client.Update({ id: documentId, updates: partialUpdates });

        return response.body;
    }

    async updateDocuments(partialUpdates: [any]) {
        // TODO add batching
        const response = await this.client.BulkUpdate({ updates: partialUpdates });
        return response.body;
    }

    async updateDocumentsWhere(filters: FilterBuilder, partialUpdates: {[id:string]:any}) {
        return (await this.client.UpdateWhere({ filters: filters.build(), updates: partialUpdates })).body;
    }

    // All of this code will be ready once api is ready
    // async getDocument(documentId: string) {
    //     return (await this.client.GetDocument({document_id:documentId})).body;
    //     // TODO
    // }

    // async deleteDocument(documentId: string) {
    //     return (await this.client.DeleteDocument({document_id:documentId})).body;
    //     // TODO
    // }

    // async deleteDocuments(documentIds: [string]) {
    //     const filters = (new FilterBuilder()).match('_id',documentIds);
    //     return (await this.client.DeleteWhere({ filters: filters.build() })).body;
    //     // TODO
    // } 
    // async deleteDocumentsWhere(filters: FilterBuilder) {
    //     return await (this.client.DeleteWhere({ filters: filters.build()})).body;
    // }
}