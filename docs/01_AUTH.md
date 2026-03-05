# Authentication

This document covers the two authentication methods supported by the
SDK, region selection, key generation, persistence, and security
guidance.

## Choosing an Authentication Method

The SDK supports two authentication methods, each designed for a
different environment:

- **API keys** grant full access to a project. Use these in server-side
  applications, background workers, and other secure environments where
  the key is never exposed to end users.
- **Embed keys** are scoped to a single public agent or workforce. Use
  these in browser applications and other client-side contexts where
  the key is visible in network traffic.

As a general rule: if the code runs on a server, use an API key. If it
runs in a browser, use an embed key.

## Regions

Every Relevance AI project is deployed to a specific region. The SDK
provides constants for each supported region:

| Constant    | Region        |
|-------------|---------------|
| `REGION_US` | United States |
| `REGION_EU` | Europe        |
| `REGION_AU` | Australia     |

The region must match the region in which the project was created. This
value is visible in the project settings on the Relevance AI dashboard.

```typescript
import { REGION_US, REGION_EU, REGION_AU } from "@relevanceai/sdk";
```

## API Key Authentication

API keys are available in the project settings on the Relevance AI
dashboard. They follow the format `sk-...` and grant unrestricted
access to all resources within the project.

The fastest way to authenticate is with `createClient`:

```typescript
import { createClient, REGION_AU } from "@relevanceai/sdk";

const client = createClient({
  apiKey: "sk-...",
  region: REGION_AU,
  project: "<project-id>",
});
```

For more control, construct a `Key` instance explicitly and pass it to
the `Client` constructor:

```typescript
import { Client, Key, REGION_AU } from "@relevanceai/sdk";

const key = new Key({
  key: "sk-...",
  region: REGION_AU,
  project: "<project-id>",
});

const client = new Client(key);
```

Both approaches produce an authenticated client ready to make API
calls. See [Client](./02_CLIENT.md) for details on client
initialization patterns.

## Embed Key Authentication

Embed keys are generated at runtime and scoped to a single public
agent or a single workforce. They are safe to use in browser
environments because they cannot access resources outside their scope.

### Generating an Embed Key for an Agent

```typescript
import {
  Key,
  createClient,
  REGION_US,
} from "@relevanceai/sdk";

const key = await Key.generateEmbedKey({
  region: REGION_US,
  project: "<project-id>",
  agentId: "<public-agent-id>",
});

const client = createClient(key);
```

The agent must be marked as public in the Relevance AI dashboard.
Private agents cannot be accessed with embed keys.

### Generating an Embed Key for a Workforce

```typescript
import { Key, REGION_US } from "@relevanceai/sdk";

const key = await Key.generateEmbedKey({
  region: REGION_US,
  project: "<project-id>",
  workforceId: "<workforce-id>",
});
```

Each embed key is bound to exactly one agent or one workforce. To
interact with multiple agents or workforces from the client side,
generate a separate embed key for each.

## Persisting Embed Keys

Generating an embed key involves a network request. To avoid
regenerating on every page load, persist the key using `toJSON` and
restore it with the `Key` constructor.

### Saving to localStorage

```typescript
const key = await Key.generateEmbedKey({
  region: REGION_US,
  project: "<project-id>",
  agentId: "<agent-id>",
});

localStorage.setItem(
  "relevance_key",
  JSON.stringify(key.toJSON())
);
```

### Restoring from localStorage

```typescript
import { Key, Client } from "@relevanceai/sdk";

const stored = localStorage.getItem("relevance_key");
if (stored) {
  const key = new Key(JSON.parse(stored));
  const client = new Client(key);
}
```

The `toJSON` method returns a plain object containing all the fields
needed to reconstruct the key, including the region, project, scoped
agent or workforce ID, and the task prefix used for conversation
namespacing.

## Security Guidance

- Never embed API keys in client-side code, environment variables
  accessible to the browser, or version control. API keys grant full
  project access and must remain on the server.
- Embed keys are the only safe authentication method for browser
  environments. They are scoped to a single agent or workforce and
  cannot access other project resources.
- If an embed key is compromised, generate a new one. The old key will
  continue to function until explicitly revoked from the dashboard.
- Store embed keys in `localStorage`, a secure cookie, or an
  equivalent client-side persistence mechanism. Regenerate them if the
  storage is cleared.

---

See also:

- [Setup and Installation](./00_SETUP.md) – Installing the SDK
- [Client](./02_CLIENT.md) - Client initialization and the default
  singleton pattern
