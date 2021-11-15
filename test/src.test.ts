import {SearchBuilder,FilterBuilder,AggregateBuilder,VectorApiClient,DiscoveryClient} from '../src';
describe("Discovery Tests",() => {
  const discovery = new DiscoveryClient({
    project:'dummy-collections',
    api_key:'UzdYRktIY0JxNmlvb1NpOFNsenU6VGdTU0s4UjhUR0NsaDdnQTVwUkpKZw',
    dataset_id:'1000-movies'
  });
  const dataset = discovery.dataset('1000-movies')
  test("Can search dataset", async () => {
    const {body} = await discovery.SimpleSearchPost({});
    expect(body.results.length).toEqual(10);
    const res2 = await discovery.SimpleSearchPost({pageSize:0});
    expect(res2.body.results.length).toEqual(0);

  });
  test("Can set dataset_id in options", async () => {
    await discovery.SimpleSearchPost({},{dataset_id:'1000-movies'});
  });
  test("Can list datasets in vector client", async () => {
    const vector = new VectorApiClient({
      project:'dummy-collections',
      api_key:'UzdYRktIY0JxNmlvb1NpOFNsenU6VGdTU0s4UjhUR0NsaDdnQTVwUkpKZw',
    });
    const res = await vector.listdatasetsapidatasetslistget({});
    expect((res.body as any).datasets?.length).toBeGreaterThan(0);
    console.log(JSON.stringify(res));
  });
  test("builder search", async () => {
    await dataset.search(
      (new SearchBuilder()).traditional('abc',{weight:5}).vector('vectorfield_vector_','text',0.3,{field:'_vectorfield_vector_',query:'abcd'}),
      
    )
    // case 1 - text query with vector search
    // case 2 - filter and aggregate
    // case 3 - options
  });
  
});

// make model param mandatory
// use filter.build in not
// make projectid and apikey optional

//