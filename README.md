# relevance-js-sdk
Install with npm using:
```
npm i @relevanceai/sdk
```
## Features
- Node and Browser support
- Typescript definitions for almost all [relevanceai.com](https://relevanceai.com/) apis
- Insert millions of documents with one function call
- Our SearchBuilder makes searching, filtering, and aggregating your data simple
# Getting started
Get started by creating an account in [cloud.relevanceai.com](https://cloud.relevanceai.com) - select the Vector Database onboarding option. Once set up you can fetch your API key and use the below snippet.

```javascript
import {VecDBClient,QueryBuilder} from "@relevanceai/sdk";

const discovery = new VecDBClient({
  project: '',
  api_key: '',
  endpoint: ''
});
const dataset = discovery.dataset('1000-movies');

const movies = [{ title: 'Lord of the Rings: The Fellowship of the Ring', grenre: 'action', budget: 100 }, ...]
await dataset.insertDocuments(movies, [{ model_name: 'text-embedding-ada-002', field: 'title' }]);

const {results} = await dataset.search(QueryBuilder().vector('title_vector_', { query: 'LOTR', model: 'text-embeddings-ada-002' }));
```
## Set up your credentials
### Option 1 - Use environment variables
First, set environment variables in your shell before you run your code. 

set RELEVANCE_PROJECT to your project name.

set RELEVANCE_API_KEY to your api key.
for more information, view the docs here: [Authorization docs](https://discovery.relevanceai.com/reference/api-usage)

Heres a template to copy and paste in for linux environments:
```bash
export RELEVANCE_PROJECT=#########
export RELEVANCE_API_KEY=#########
```
The SDK will use these variables when making api calls. You can then initialise your client like this:
```javascript
import {VecDBClient} from "@relevanceai/sdk";
const client = new VecDBClient({});
```
### Option 2 - Passing them in code.
```javascript
import {VecDBClient} from "@relevanceai/sdk";
const client = new VecDBClient({
  project:'########',
  api_key:'########',
});
```
# Examples
### You can import builders and type definitions like this
```javascript
import {QueryBuilder,VecDBClient,BulkInsertOutput} from "@relevanceai/sdk";
```
## Insert millions of items with one function call
```javascript
const discovery = new VecDBClient({ ... });
const dataset = discovery.dataset('tshirts-prod');
 // Here we create some demo data. Replace this with your real data
const fakeVector = [];
for (let i = 0; i < 768; i++) fakeVector.push(1);
const tshirtsData = [];
for (let i = 0; i < 10000; i++) {
  tshirtsData.push({_id:`tshirt-${i}1`,color:'red',price:i/1000,'title-fake_vector_':fakeVector});
  tshirtsData.push({_id:`tshirt-${i}2`,color:'blue',price:i/1000});
  tshirtsData.push({_id:`tshirt-${i}3`,color:'orange',price:i/1000});
}
const res = await dataset.insertDocuments(tshirtsData,{batchSize:10000});
```
### insertDocuments will output:
```javascript
{"inserted":30000,"failed_documents":[]}
```
## Text Search and Vector Search
```javascript
const builder = QueryBuilder();
builder.query('red').text().vector('title-fake_vector_',0.5).minimumRelevance(0.1);
// .text() searches all fields. alternatively, use .text(field1).text(field2)... to search specific fields
const searchResults = await dataset.search(builder);
```
## Filter and retrieve items
```javascript
const filters = QueryBuilder();
filters.match('color',['blue','red']).range('price',{lessThan:50});
const filteredItems = await dataset.search(filters);
```
### search will output:
```javascript
{
  results: [
    {
      color: 'red',
      price: 0,
      insert_date_: '2021-11-16T03:14:28.509Z',
      _id: 'tshirt-01',
      _relevance: 0
    }
    ...
  ],
  resultsSize: 10200,
  aggregations: {},
  aggregates: {},
  aggregateStats: {}
}
```


```
## Call raw api methods directly
```javascript
const discovery = new VecDBClient({ ... });
const dataset = discovery.dataset('tshirts-prod');
const {body} = await dataset.apiClient.FastSearch({filters:[{match:{key:'_id',value:`tshirt-01`}}]});
expect((body.results[0] as any).color).toBe('red')
```