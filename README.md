# relevance-js-sdk
Install with npm using:
```
npm i @relevanceai/relevance-js-sdk
```
## Getting Started
```javascript
import {DiscoveryClient} from "@relevanceai/relevance-js-sdk";

const discovery = new DiscoveryClient({
  project:'dummy-collections',
  api_key:'UzdYRktIY0JxNmlvb1NpOFNsenU6VGdTU0s4UjhUR0NsaDdnQTVwUkpKZw',
  dataset_id:
});
const {body} = await discovery.SimpleSearchPost(
  {query:'Las Vegas'},
  {dataset_id:'1000-movies'}
});
console.log(body.results);
```
### Example set up: [codesandbox demo](https://codesandbox.io/s/relevance-js-sdk-demo-kg72k?file=/src/index.js)
# TODO - fix documentation to be up to date