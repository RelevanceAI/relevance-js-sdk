import {QueryBuilder,VectorApiClient,DiscoveryClient, DiscoveryApiClient} from '../src';
const timeout = 100000;
describe("Discovery Tests",() => {
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

  });
  test("Can list datasets in vector client", async () => {
    const vector = new VectorApiClient({
      project:'dummy-collections',
      api_key:'UzdYRktIY0JxNmlvb1NpOFNsenU6VGdTU0s4UjhUR0NsaDdnQTVwUkpKZw',
    });
    const res = await vector.listdatasetsapidatasetslistget({});
    expect((res.body as any).datasets?.length).toBeGreaterThan(0);
  });
  test("Main tutorial test",async () => {
    async function insert(){
      // Here we create some demo data. Replace this with your real data
      const tshirtsData = [];
      for (let i = 0; i < 100000; i++) {
        tshirtsData.push({_id:`tshirt-${i}1`,color:'red',price:i/1000});
        tshirtsData.push({_id:`tshirt-${i}2`,color:'blue',price:i/1000});
        tshirtsData.push({_id:`tshirt-${i}3`,color:'orange',price:i/1000});
      }
      const res = await dataset.insertDocuments(tshirtsData,{batchSize:50000});
      expect(res.inserted).toEqual(300000);

    }
    async function filter(){
      const filters = QueryBuilder();
      filters.match('color',['blue','red']).range('price',{lessThan:50});
      const filteredItems = await dataset.search(filters);
      expect(filteredItems.resultsSize).toBeGreaterThan(0);
      expect(filteredItems.resultsSize).toBeLessThan(300000);
    }
    async function aggregate(){
      const aggregates = QueryBuilder();
      aggregates.aggregate('color').aggregateStats('price',10);
      const aggregatesResult = await dataset.search(aggregates);
      expect(aggregatesResult.aggregates['color'].results['blue']).toEqual(100000);
    }
    // Endpoint is currently broken
    async function getdoc(){
      const rawClient = new DiscoveryApiClient({dataset_id:'tshirts-prod'});
      const {body} = await rawClient.FastSearch({filters:[{match:{key:'_id',value:`tshirt-01`}}]});
      expect((body.results[0] as any).color).toBe('red')
    }
    const discovery = new DiscoveryClient({ });
    const dataset = discovery.dataset('tshirts-prod');
    await insert();
    await filter();
    await aggregate();
    await getdoc();
  },timeout);
  
});