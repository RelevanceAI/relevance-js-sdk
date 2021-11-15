import { AggregateBuilder, DiscoveryClient, FilterBuilder, SearchBuilder } from ".";
import { SimpleSearchPostOutput } from "../..";
import { CommandInput, _GenericMethodOptions } from "../../shared/BaseClient";

export class Dataset {
    client: DiscoveryClient;
    name: string;
    config: any;

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
    async search(query?: SearchBuilder): Promise<SimpleSearchPostOutput>;
    async search(filters?: FilterBuilder): Promise<SimpleSearchPostOutput>;
    async search(facets?: AggregateBuilder): Promise<SimpleSearchPostOutput>;
    async search(query?: SearchBuilder, filters?: FilterBuilder): Promise<SimpleSearchPostOutput>;
    async search(query?: SearchBuilder, facets?: AggregateBuilder): Promise<SimpleSearchPostOutput>;
    async search(filters?: FilterBuilder, facets?: AggregateBuilder): Promise<SimpleSearchPostOutput>;
    async search(query?: SearchBuilder, filters?: FilterBuilder, facets?: AggregateBuilder): Promise<SimpleSearchPostOutput>;
    async search(...args:any[]) {
        let payload: any = {};
        for (const arg of args) {
            if (arg instanceof SearchBuilder) payload = {...payload,...arg.build()};
            else if (arg instanceof FilterBuilder) payload.filters = arg.filters;
            else if (arg instanceof AggregateBuilder) {
                payload.fieldsToAggregate = arg.fieldsToAggregate;
                payload.fieldsToAggregateStats = arg.fieldsToAggregateStats;
                
            }
        }
        const response = await this.client.SimpleSearchPost(payload, { dataset_id: this.name });
        return response.body;
    }

    async insertDocuments(documents: any, options?: _GenericMethodOptions & { batch_size?: number }) {
        const allDocuments = documents ?? [];
        const batch_size = options?.batch_size ?? 10000;
        const results: any = { inserted: 0, failed_documents: [] };
        for (let i = 0; i < allDocuments?.length; i += batch_size) {
            const res = await this.client.BulkInsert({ documents: allDocuments.slice(i, i + batch_size) }, { dataset_id: this.name });
            results.failed_documents = results.failed_documents.concat(res.body.failed_documents);
            results.inserted += res.body.inserted
        }

        return results;
    }
    // TODO - ChunkSearch, insert, insertAndVectorize?, vectorize, 

    getDocument(documentId: string) {
        await this.client.
        // TODO
    }

    async updateDocument(documentId: string, partialUpdates: any) {
        const response = await this.client.Update({ id: documentId, updates: partialUpdates });

        return response;
    }

    async updateDocuments(partialUpdates: [any]) {
        // TODO add batching
        const response = await this.client.BulkUpdate({ updates: partialUpdates });

        return response;
    }

    async updateDocumentsWhere(filters: FilterBuilder, partialUpdates: any) {
        const response = await this.client.UpdateWhere({ filters: filters.build(), updates: partialUpdates });

        return response;
    }

    async deleteDocument(documentId: string) {
        // TODO
    }

    deleteDocuments(documentIds: [string]) {
        // TODO
    }
}