import {QueryBuilder,VectorApiClient,DiscoveryClient, DiscoveryApiClient, FilterBuilder} from '../src';
const timeout = 100000;
describe("Discovery Tests",() => {
  // comment to trigger update on push
  const discovery = new DiscoveryClient({
    project:'dummy-collections',
    api_key:'UzdYRktIY0JxNmlvb1NpOFNsenU6VGdTU0s4UjhUR0NsaDdnQTVwUkpKZw',
    dataset_id:'1000-movies'
  });
  const dataset = discovery.dataset('1000-movies')
  test("Can search dataset", async () => {
    const body = await dataset.search();
    expect(body.results.length).toEqual(10);
    const res2 = await dataset.search(QueryBuilder().pageSize(0));
    expect(res2.results.length).toEqual(0);

  },timeout);
  test("Can list datasets in vector client", async () => {
    const vector = new VectorApiClient({
      project:'dummy-collections',
      api_key:'UzdYRktIY0JxNmlvb1NpOFNsenU6VGdTU0s4UjhUR0NsaDdnQTVwUkpKZw',
    });
    const res = await vector.listdatasetsapidatasetslistget({});
    expect((res.body as any).datasets?.length).toBeGreaterThan(0);
  },timeout);
  test("Main tutorial test",async () => {
    async function insert(){

      // Here we create some demo data. Replace this with your real data
      const fakeVector = [];
      for (let i = 0; i < 768; i++) fakeVector.push(1);
      const tshirtsData = [];
      for (let i = 0; i < 10000; i++) {
        tshirtsData.push({_id:`tshirt-${i}1`,color:'red',price:i/1000,'title_text@1-0_vector_':fakeVector});
        tshirtsData.push({_id:`tshirt-${i}2`,color:'blue',price:i/1000});
        tshirtsData.push({_id:`tshirt-${i}3`,color:'orange',price:i/1000});
      }
      const res = await dataset.insertDocuments(tshirtsData,{batchSize:10000});
      expect(res.inserted).toEqual(30000);

    }
    async function cleanup(){
      await (new VectorApiClient({})).deletedatasetapidatasetsdeletepost({dataset_id:'tshirts-prod'});
    }
    async function search(){
      const builder = QueryBuilder();
      builder.query('red').text().vector('title_text@1-0_vector_',0.5).minimumRelevance(0.1);
      const searchResults = await dataset.search(builder);
      expect(searchResults.resultsSize).toBeGreaterThan(0);
    }
    async function filter(){
      const filters = QueryBuilder();
      filters.match('color',['blue','red']).range('price',{lessThan:50});
      const filteredItems = await dataset.search(filters);
      expect(filteredItems.resultsSize).toBeGreaterThan(0);
      expect(filteredItems.resultsSize).toBeLessThan(30000);
    }
    async function filterBuilder(){
      const query = QueryBuilder();
      const filter = FilterBuilder();
      query.not(filter.match('color','red'));
      const filteredItems = await dataset.search(query);
      expect(filteredItems.resultsSize).toBeGreaterThan(0);
      expect(filteredItems.resultsSize).toBeLessThan(30000);
    }
    async function aggregate(){
      const aggregates = QueryBuilder();
      aggregates.aggregate('color').aggregateStats('price',10);
      const aggregatesResult = await dataset.search(aggregates);
      expect(aggregatesResult.aggregates['color'].results['blue']).toEqual(10000);
    }
    // Endpoint is currently broken
    async function getdoc(){
      const rawClient = new DiscoveryApiClient({dataset_id:'tshirts-prod'});
      const {body} = await rawClient.FastSearch({filters:[{match:{key:'_id',value:`tshirt-01`}}]});
      expect((body.results[0] as any).color).toBe('red')
    }
    const discovery = new DiscoveryClient({ });
    const dataset = discovery.dataset('tshirts-prod');
    await cleanup();
    await insert();
    await search();
    await filter();
    await filterBuilder();
    await aggregate();
    await getdoc();
  },timeout);
  
});
