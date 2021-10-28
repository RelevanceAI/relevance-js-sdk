import {DiscoveryClient} from '../src';
describe("Discovery Tests",() => {
  test("Can search dataset", async () => {
    const discovery = new DiscoveryClient({
      project:'dummy-collections',
      api_key:'UzdYRktIY0JxNmlvb1NpOFNsenU6VGdTU0s4UjhUR0NsaDdnQTVwUkpKZw'
    });
    const {body} = await discovery.SimpleSearchPost({params:{dataset_id:'1000-movies'},body:{}});
    expect(body.results.length).toEqual(10);
    const res2 = await discovery.SimpleSearchPost({params:{dataset_id:'1000-movies'},body:{pageSize:0}});
    expect(res2.body.results.length).toEqual(0);

  });
});