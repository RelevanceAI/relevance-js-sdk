import { QueryBuilder, DiscoveryClient, _QueryBuilder } from ".";
import { DeleteDocumentOutput, DeleteWhereOutput, GetDocumentOutput, SimpleSearchPostOutput, BulkInsertOutput,UpdateWhereOutput,BulkUpdateOutput } from "../..";
import { _GenericMethodOptions } from "../../shared/BaseClient";

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

    async insertDocuments(documents: any, options?: _GenericMethodOptions & { batchSize?: number,retryCount?:number, progressCallback?: (progress:BulkInsertOutput[]) => any }):Promise<BulkInsertOutput> {
        const results = await this._GenericBulkOperation<any,BulkInsertOutput>({
            data:documents??[],
            ...options,
            fn:async (documentsSlice) => (await this.client.apiClient.BulkInsert({ documents:documentsSlice }, { dataset_id: this.name })).body
        });
        const finalResults = results.reduce((prev,cur) => {
            prev.failed_documents = prev.failed_documents.concat(cur.failed_documents);
            prev.inserted += cur.inserted
            return prev;
        },{inserted:0,failed_documents:[]});

        return finalResults;
    }
    // TODO - ChunkSearch, insert, insertAndVectorize?, vectorize, 
    async _GenericBulkOperation<InputItem,OutputItem>({data,batchSize,fn,retryCount}:{
        data:InputItem[],
        fn:(data:InputItem[]) => Promise<OutputItem>,
        batchSize?:number,
        retryCount?:number,
        progressCallback?:(progress:OutputItem[]) => any
    }):Promise<OutputItem[]> {
        batchSize = batchSize ?? 10000;
        retryCount = retryCount ?? 1;
        const results:OutputItem[] = [];
        for (let i = 0; i < data?.length; i += batchSize) {
            for (let retrysSoFar = 0; retrysSoFar < retryCount; retrysSoFar++) {
                try {
                    const res = await fn(data.slice(i, i + batchSize));
                    results.push(res);
                    break;
                } catch (e) { console.error(`Bulk operation failed with error, retrying - ${e}`) }
            }
        }
        return results;
    }

    async updateDocument(documentId: string, partialUpdates: any) {
        const response = await this.client.apiClient.Update({ id: documentId, updates: partialUpdates });

        return response.body;
    }
    async updateDocuments(updates: any, options?: _GenericMethodOptions & { batchSize?: number,retryCount?:number, progressCallback?: (progress:BulkUpdateOutput[]) => any }):Promise<BulkUpdateOutput> {
        const results = await this._GenericBulkOperation<any,BulkUpdateOutput>({
            data:updates??[],
            ...options,
            fn:async (updatesSlice) => (await this.client.apiClient.BulkUpdate({ updates:updatesSlice }, { dataset_id: this.name })).body
        });
        const finalResults = results.reduce((prev,cur) => {
            prev.failed_documents = prev.failed_documents.concat(cur.failed_documents);
            prev.inserted += cur.inserted
            return prev;
        },{inserted:0,failed_documents:[]});

        return finalResults;
    }

    async updateDocumentsWhere(filters: _QueryBuilder, partialUpdates: {[id:string]:any}):Promise<UpdateWhereOutput> {
        return (await this.client.apiClient.UpdateWhere({ filters: filters.body.filters, updates: partialUpdates })).body;
    }

    async getDocument(documentId: string):Promise<GetDocumentOutput> {
        return (await this.client.apiClient.GetDocument({document_id:documentId})).body;
    }

    async deleteDocument(documentId: string):Promise<DeleteDocumentOutput> {
        return (await this.client.apiClient.DeleteDocument({document_id:documentId})).body;
    }

    async deleteDocuments(documentIds: [string]):Promise<DeleteWhereOutput> {
        const filters = QueryBuilder().match('_id',documentIds);
        return (await this.client.apiClient.DeleteWhere({ filters: filters.body.filters??[] })).body;
    } 
    async deleteDocumentsWhere(filters: _QueryBuilder):Promise<DeleteWhereOutput> {
        return (await this.client.apiClient.DeleteWhere({ filters: filters.body.filters??[]})).body;
    }
}