import {DiscoveryClient} from '@relevanceai/relevance-sdk';
describe("Discovery Tests",() => {
  test("Can search dataset", async () => {
    const discovery = new DiscoveryClient({
      project:'dummy-collections',
      api_key:'UzdYRktIY0JxNmlvb1NpOFNsenU6VGdTU0s4UjhUR0NsaDdnQTVwUkpKZw'
    });
    const {body} = await discovery.SimpleSearchPost({params:{dataset_id:'1000-movies'},body:{}});
    expect(body.resultsSize).toBeGreaterThan(10);

  });
});