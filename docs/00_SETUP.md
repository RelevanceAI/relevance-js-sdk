# Setup and Installation

This document covers installing the Relevance AI JavaScript SDK across
supported runtimes and verifying a working setup.

## Prerequisites

Before installing the SDK, ensure the following is in place:

- A Relevance AI account with access to the project dashboard
- An API key or embed key (see [Authentication](./01_AUTH.md))
- One of the supported runtimes listed below

## Node.js, Bun, and Cloudflare Workers

Install the package from npm using any package manager:

```bash
npm install @relevanceai/sdk@latest
```

```bash
yarn add @relevanceai/sdk@latest
```

```bash
pnpm add @relevanceai/sdk@latest
```

```bash
bun add @relevanceai/sdk@latest
```

Then import from the package:

```typescript
import { createClient, Agent } from "@relevanceai/sdk";
```

## Deno

Add the package from the JSR registry:

```bash
deno add jsr:@relevanceai/sdk
```

Alternatively, import directly without a local installation:

```typescript
import { createClient } from "jsr:@relevanceai/sdk";
```

## Browser via CDN

For applications that do not use a bundler, load the SDK directly from
a CDN using an import map:

```html
<script type="importmap">
  {
    "imports": {
      "@relevanceai/sdk": "https://esm.run/@relevanceai/sdk"
    }
  }
</script>
<script type="module">
  import { createClient } from "@relevanceai/sdk";
</script>
```

## Browser Bundler Configuration

When using a bundler such as Vite, Webpack, or Rollup, the SDK may
trigger a warning about `node:crypto`. This module is used for UUID
generation and has a native browser equivalent. Create a shim file and
configure the bundler to resolve it.

### The Shim File

Create a file at a known path (for example, `src/shims/crypto.ts`):

```typescript
export default globalThis.crypto;
```

### Vite

In `vite.config.ts`, add a resolve alias:

```typescript
import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "node:crypto": path.resolve(
        __dirname,
        "src/shims/crypto.ts"
      ),
    },
  },
});
```

### Webpack

In `webpack.config.js`, add a resolve alias:

```javascript
module.exports = {
  resolve: {
    alias: {
      "node:crypto": path.resolve(
        __dirname,
        "src/shims/crypto.js"
      ),
    },
  },
};
```

### Rollup

Use the `@rollup/plugin-alias` plugin:

```javascript
import alias from "@rollup/plugin-alias";
import path from "node:path";

export default {
  plugins: [
    alias({
      entries: [
        {
          find: "node:crypto",
          replacement: path.resolve(
            __dirname,
            "src/shims/crypto.js"
          ),
        },
      ],
    }),
  ],
};
```

## Verifying the Installation

After installing, run a minimal script to confirm everything is wired
up correctly. Replace the placeholder values with real credentials from
the Relevance AI dashboard.

```typescript
import {
  createClient,
  Agent,
  REGION_US,
} from "@relevanceai/sdk";

createClient({
  apiKey: "<api-key>",
  region: REGION_US,
  project: "<project-id>",
});

const agent = await Agent.get("<agent-id>");
console.log("Connected:", agent.name);
```

If the agent name prints to the console, the SDK is installed and
authenticated correctly.

---

See also:

- [Authentication](./01_AUTH.md) – API keys, embed keys, and region
  selection
- [Client](./02_CLIENT.md) – Client initialization and configuration
