# relevance-sdk
Install with npm using:
```
npm i @relevanceai/relevance-sdk
```
## Getting Started
```javascript
import {DiscoveryClient} from "@relevanceai/relevance-sdk";

const discovery = new DiscoveryClient({
  project:'dummy-collections',
  api_key:'UzdYRktIY0JxNmlvb1NpOFNsenU6VGdTU0s4UjhUR0NsaDdnQTVwUkpKZw'
});
const {body} = await discovery.SimpleSearchPost({
  params:{dataset_id:'1000-movies'},
  body:{query:'Las Vegas'}
});
console.log(body.results);
```