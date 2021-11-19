# relevance-js-sdk
Install with npm using:
```
npm i @relevanceai/sdk
```
## Features
- Node and Browser support
- Typescript definitions for almost all [relevance.ai](https://relevance.ai/) apis
- Insert millions of documents with one function call
- Our SearchBuilder makes searching, filtering, and aggregating your data simple
# Getting started
Get started in seconds with a demo dataset of popular movies.
```javascript
import {DiscoveryClient,QueryBuilder} from "@relevanceai/sdk";

const discovery = new DiscoveryClient({
  project:'dummy-collections',
  api_key:'UzdYRktIY0JxNmlvb1NpOFNsenU6VGdTU0s4UjhUR0NsaDdnQTVwUkpKZw',
});
const dataset = discovery.dataset('1000-movies');
const {results} = await dataset.search(QueryBuilder().text('Las Vegas'));
```
## Set up your credentials
### Option 1 - Use environment variables
First, set environment variables in your shell before you run your code. 

set RELEVANCE_PROJECT to your project name.

set RELEVANCE_API_KEY to your api key.
for more information, view the docs here: [Authorization docs](https://discovery.relevance.ai/reference/api-usage)

Heres a template to copy and paste in for linux environments:
```bash
export RELEVANCE_PROJECT=#########
export RELEVANCE_API_KEY=#########
```
The SDK will use these variables when making api calls. You can then initialise your client like this:
```javascript
import {DiscoveryClient} from "@relevanceai/sdk";
const discovery = new DiscoveryClient({});
```
### Option 2 - Passing them in code.
```javascript
import {DiscoveryClient} from "@relevanceai/sdk";
const discovery = new DiscoveryClient({
  project:'########',
  api_key:'########',
});
```
# Examples
### You can import builders and type definitions like this
```javascript
import {QueryBuilder,DiscoveryClient,BulkInsertOutput} from "@relevanceai/sdk";
```
## Insert millions of items with one function call
```javascript
const discovery = new DiscoveryClient({ });
const dataset = discovery.dataset('tshirts-prod');
// Here we create some demo data. Replace this with your real data
const tshirtsData = [];
for (let i = 0; i < 100000; i++) {
    tshirtsData.push({_id:`tshirt-${i}1`,color:'red',price:i/1000});
    tshirtsData.push({_id:`tshirt-${i}2`,color:'blue',price:i/1000});
    tshirtsData.push({_id:`tshirt-${i}3`,color:'orange',price:i/1000});
}
const res = await dataset.insertDocuments(tshirtsData,{batchSize:50000});
```
### insertDocuments will output:
```javascript
{"inserted":300000,"failed_documents":[]}
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
  resultsSize: 102000,
  aggregations: {},
  aggregates: {},
  aggregateStats: {}
}
```
## Summarise your data using aggregations
```javascript
const aggregates = QueryBuilder();
aggregates.aggregate('color').aggregateStats('price',10);
const aggregatesResult = await dataset.search(aggregates);
```
### aggregates will output:
```javascript
{
  aggregates:{
    color: {
      results: { blue: 100000, orange: 100000, red: 100000 },
      aggregates: {}
    },
    price: {
      results: {
        '0': 30000,
        '10': 30000,
        '20': 30000,
        '30': 30000,
        '40': 30000,
        '50': 30000,
        '60': 30000,
        '70': 30000,
        '80': 30000,
        '90': 30000
      },
      aggregates: {}
    }
  }
}
```
## Call raw api methods directly
```javascript
const rawClient = new DiscoveryApiClient({dataset_id:'tshirts-prod'});
const {body} = await rawClient.FastSearch({filters:[{match:{key:'_id',value:`tshirt-01`}}]});
expect((body.results[0] as any).color).toBe('red')
```