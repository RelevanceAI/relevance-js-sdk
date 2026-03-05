# Relevance AI JavaScript SDK

The official JavaScript/TypeScript SDK for building applications
with Relevance AI agents and workforces.

- **Universal runtime support** - Node.js, Deno, Bun, Cloudflare
  Workers, and browsers
- **Event-driven architecture** - real-time updates via the native
  EventTarget API
- **Type-safe** - full TypeScript support with comprehensive type
  definitions
- **Zero dependencies** - built entirely on web standards

## Installation

```bash
npm install @relevanceai/sdk@latest
```

For Deno, Bun, CDN, and browser bundler setup, see the
[Setup guide](./docs/00_SETUP.md).

## Quick Start

```typescript
import { Agent, createClient, REGION_US } from "@relevanceai/sdk";

createClient({
  apiKey: process.env.RELEVANCE_API_KEY,
  region: REGION_US,
  project: process.env.PROJECT_ID,
});

const agent = await Agent.get("agent-id");
const task = await agent.sendMessage("Hello!");

task.addEventListener("message", ({ detail: { message } }) => {
  if (message.isAgent()) {
    console.log("Agent:", message.text);
  }
});
```

## Documentation

| Guide | Description |
| ----- | ----------- |
| [Setup](./docs/00_SETUP.md) | Installation and runtime configuration |
| [Authentication](./docs/01_AUTH.md) | API keys, embed keys, and regions |
| [Client](./docs/02_CLIENT.md) | Client initialization and singleton pattern |
| [Agents](./docs/03_AGENTS.md) | Loading agents and starting conversations |
| [Tasks](./docs/04_TASKS.md) | Task lifecycle, events, and subscriptions |
| [Messaging](./docs/05_MESSAGING.md) | Messages, attachments, and type guards |
| [Workforces](./docs/06_WORKFORCES.md) | Multi-agent orchestration |
| [Streaming](./docs/07_STREAMING.md) | Real-time thinking and typing tokens |

## Examples

Working examples are available in `internal/examples/`:

- **Deno** (`internal/examples/deno/`) - agent tasks, pagination,
  embed keys, image OCR, workforce tasks
- **Browser** (`internal/examples/browser/chat/`) - full chat
  application built with Preact

## Development

The SDK is developed with Deno and published to npm and JSR.

```bash
# clone the repository
git clone https://github.com/RelevanceAI/relevance-js-sdk.git
cd relevance-js-sdk

# build the npm package
deno run -A internal/tasks/dnt.ts
```

## License

MIT

## Security

For security vulnerabilities, please email security@relevanceai.com
directly rather than using public issue trackers.

## Support

- [GitHub Issues](https://github.com/RelevanceAI/relevance-js-sdk/issues)
- [Discord](https://discord.gg/relevanceai)
