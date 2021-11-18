import { QueryBuilder, DiscoveryClient, _QueryBuilder } from ".";
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
        const response = await this.client.apiClient.Insert({
            document,
            ...options
        }, { dataset_id: this.name });

        return response.body;
    }
    // without options
    async search(): Promise<SimpleSearchPostOutput>;
    async search(query?: _QueryBuilder): Promise<SimpleSearchPostOutput>;
    async search(options?:searchOptions): Promise<SimpleSearchPostOutput>;
    async search(query?: _QueryBuilder,options?:searchOptions): Promise<SimpleSearchPostOutput>;
    async search(...args:any[]) {
        let payload: any = {};
        let options:searchOptions = {};
        for (const arg of args) {
            if (arg instanceof _QueryBuilder) {
                payload = {...payload,...arg.build()};
                
            }
            else options = arg;
        }
        const reqCallback = async () => await this.client.apiClient.SimpleSearchPost(payload, { dataset_id: this.name });
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

    async insertDocuments(documents: any, options?: _GenericMethodOptions & { batchSize?: number, progressCallback?: (progress:BulkInsertOutput) => any }) {
        const allDocuments = documents ?? [];
        const batchSize = options?.batchSize ?? 10000;
        const results:BulkInsertOutput = { inserted: 0, failed_documents: [] };
        for (let i = 0; i < allDocuments?.length; i += batchSize) {
            const res = await this.client.apiClient.BulkInsert({ documents: allDocuments.slice(i, i + batchSize) }, { dataset_id: this.name });
            results.failed_documents = results.failed_documents.concat(res.body.failed_documents);
            results.inserted += res.body.inserted
            if (options?.progressCallback) options.progressCallback(results);
        }

        return results;
    }
    // TODO - ChunkSearch, insert, insertAndVectorize?, vectorize, 


    async updateDocument(documentId: string, partialUpdates: any) {
        const response = await this.client.apiClient.Update({ id: documentId, updates: partialUpdates });

        return response.body;
    }

    async updateDocuments(partialUpdates: [any]) {
        // TODO add batching
        const response = await this.client.apiClient.BulkUpdate({ updates: partialUpdates });
        return response.body;
    }

    async updateDocumentsWhere(filters: _QueryBuilder, partialUpdates: {[id:string]:any}) {
        return (await this.client.apiClient.UpdateWhere({ filters: filters.build().filters, updates: partialUpdates })).body;
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