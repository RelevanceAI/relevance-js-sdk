# Client

This document covers initializing and configuring the SDK client,
including the default singleton pattern and multi-project setups.

## Initializing with createClient

The `createClient` function is the recommended way to set up the SDK.
It creates a `Client` instance, registers it as the default singleton,
and returns it.

```typescript
import { createClient, REGION_EU } from "@relevanceai/sdk";

const client = createClient({
  apiKey: "sk-...",
  region: REGION_EU,
  project: "<project-id>",
});
```

It also accepts a `Key` instance directly, which is useful when
working with embed keys:

```typescript
import { createClient, Key, REGION_US } from "@relevanceai/sdk";

const key = await Key.generateEmbedKey({
  region: REGION_US,
  project: "<project-id>",
  agentId: "<agent-id>",
});

const client = createClient(key);
```

See [Authentication](./01_AUTH.md) for full details on API keys and
embed keys.

## The Default Client Singleton

When `createClient` is called, the resulting client is stored as a
global default. All SDK methods that accept an optional client
parameter will fall back to this default when none is provided.

```typescript
import {
  createClient,
  Client,
  Agent,
  REGION_US,
} from "@relevanceai/sdk";

// Set the default at application startup
createClient({
  apiKey: "sk-...",
  region: REGION_US,
  project: "<project-id>",
});

// Retrieve the default anywhere in the application
const client = Client.default();

// SDK methods use the default automatically
const agent = await Agent.get("<agent-id>");
```

This pattern keeps authentication centralized. Initialize the client
once during startup, and the rest of the application can interact with
agents and workforces without passing the client around.

## Using Multiple Clients

Some applications need to interact with multiple projects or use
different authentication scopes (for example, an API key for admin
operations and an embed key for end-user interactions). In these cases,
construct `Client` instances directly and pass them explicitly.

```typescript
import { Client, Key, Agent, REGION_EU } from "@relevanceai/sdk";

const adminKey = new Key({
  key: "sk-admin-key",
  region: REGION_EU,
  project: "project-one",
});

const userKey = new Key({
  key: "sk-user-key",
  region: REGION_EU,
  project: "project-two",
});

const adminClient = new Client(adminKey);
const userClient = new Client(userKey);

// Pass the client explicitly
const adminAgent = await Agent.get("agent-a", adminClient);
const userAgent = await Agent.get("agent-b", userClient);
```

Only one client can be the default singleton. When using multiple
clients, pass the appropriate instance to each SDK method call.

---

See also:

- [Authentication](./01_AUTH.md) – API keys, embed keys, and regions
- [Agents](./03_AGENTS.md) – Loading and interacting with agents
- [Workforces](./06_WORKFORCES.md) – Loading and interacting with
  workforces
