import { DiscoveryClient, SearchBuilder, AggregateBuilder } from '../src';

async function main() {

    const client = new DiscoveryClient({
        api_key: 'x',
        project: 'boop'
    });

    const dataset = await client.createDataset('beyblades');

    const existingDataset = client.dataset('yugioh');
    
    const searchQuery = new SearchBuilder();
    searchQuery.traditional('hello world').vector('text_vector_', 'text@0-0', .1);

    const aggregateQuery = new AggregateBuilder();
    aggregateQuery.aggregate('category');
    // existingDataset.search()
    const { results } = await existingDataset.search(searchQuery, aggregateQuery);
    // QueryBuilder().fuzzy('aaa').vecotr('a','b').aggregate('catrgory').search();


}
main();