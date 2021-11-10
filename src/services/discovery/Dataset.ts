import { AggregateBuilder, DiscoveryClient, FilterBuilder, SearchBuilder } from ".";
import { InsertInput } from "../..";
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

    async insert(document: any, options?: _GenericMethodOptions) {
        const response = await this.client.Insert({
            document,
            ...options
        }, { dataset_id: this.name });

        return response.body;
    }

    async search(query: SearchBuilder, filters?: FilterBuilder, facets?: AggregateBuilder, options?: any) {
        let payload: any = {};
        
        if (query) payload = query.build();
        if (filters) payload.filters = filters.filters;
        if (facets) {
            payload.fieldsToAggregate = facets.fieldsToAggregate;
            payload.fieldsToAggregateStats = facets.fieldsToAggregateStats;
        }

        const response = await this.client.SimpleSearchPost(payload, { dataset_id: this.name });

        return response.body;
    }

    async bulkInsert(documents: any, options?: _GenericMethodOptions & { batch_size?: number }) {
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
    // TODO - add api methods to make sure they all work
}