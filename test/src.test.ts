import {DiscoveryClient} from '../src';
describe("Discovery Tests",() => {
  test("Can search dataset", async () => {
    const discovery = new DiscoveryClient({
      project:'dummy-collections',
      api_key:'UzdYRktIY0JxNmlvb1NpOFNsenU6VGdTU0s4UjhUR0NsaDdnQTVwUkpKZw',
      dataset_id:'1000-movies'
    });
    const {body} = await discovery.SimpleSearchPost({});
    expect(body.results.length).toEqual(10);
    const res2 = await discovery.SimpleSearchPost({pageSize:0});
    expect(res2.body.results.length).toEqual(0);

  });
  test("Can set dataset_id in options", async () => {
    const discovery = new DiscoveryClient({
      project:'dummy-collections',
      api_key:'UzdYRktIY0JxNmlvb1NpOFNsenU6VGdTU0s4UjhUR0NsaDdnQTVwUkpKZw',
    });
    await discovery.SimpleSearchPost({},{dataset_id:'1000-movies'});
  });
});