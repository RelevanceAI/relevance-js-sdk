# Relevance AI JavaScript SDK

A comprehensive JavaScript/TypeScript SDK for building AI-powered applications
with Relevance AI's workforce platform. Build, deploy, and scale AI agents
across any JavaScript runtime.

## Description

The Relevance AI JavaScript SDK provides a unified interface for integrating
AI agents into your applications. Whether you're building server-side
applications, browser-based interfaces, or edge computing solutions, this SDK
delivers consistent, type-safe access to Relevance AI's powerful agent
ecosystem.

### Key Features

- **Universal Compatibility**: Works seamlessly across Node.js, Deno, Bun,
  Cloudflare Workers, and browsers
- **Event-Driven Architecture**: Real-time updates via native EventTarget API
- **Type Safety**: Full TypeScript support with comprehensive type definitions
- **Multi-Client Support**: Manage multiple projects and authentication scopes
  simultaneously
- **Zero Dependencies**: Built on web standards for minimal footprint

## Quick Start

Get up and running with AI agents in under 5 minutes:

```typescript
import { Agent, createClient, EU_REGION } from "@relevanceai/sdk";

// Initialize client with your credentials
const client = createClient({
  apiKey: process.env.RELEVANCE_API_KEY,
  region: EU_REGION,
  project: process.env.PROJECT_ID,
});

// Load an agent and start a conversation
const agent = await Agent.get("agent-id");
const task = await agent.sendMessage("Hello, how can you help me today?");

// Listen for agent responses
task.addEventListener("message", ({ detail: { message } }) => {
  if (message.isAgent()) {
    console.log("Agent:", message.text);
  }
});
```

## Installation

Choose the installation method for your runtime:

### Node.js / Bun

```bash
npm install @relevanceai/sdk@latest
# or
yarn add @relevanceai/sdk@latest
# or
pnpm add @relevanceai/sdk@latest
# or
bun add @relevanceai/sdk@latest
```

### Deno

```bash
deno add jsr:@relevanceai/sdk
```

Or import directly:

```typescript
import { createClient } from "jsr:@relevanceai/sdk";
```

### Cloudflare Workers

```bash
npm install @relevanceai/sdk@latest
```

### Browser (with bundler)

```bash
npm install @relevanceai/sdk@latest
```

For bundlers that warn about `node:crypto`, create a shim:

```javascript
// shims/crypto.js
export default window.crypto;
```

Configure your bundler to use the shim:

- [Vite configuration](https://vite.dev/config/shared-options.html#resolve-alias)
- [Webpack configuration](https://webpack.js.org/configuration/resolve/#resolvealias)
- [Rollup configuration](https://www.npmjs.com/package/@rollup/plugin-alias)

### Browser (CDN)

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
  // Your code here
</script>
```

## Usage

### Authentication

The SDK supports two authentication methods for different use cases:

#### API Keys (Server-side)

API keys grant full access to your project. Use these for server applications
and secure environments:

```typescript
import { createClient, AU_REGION } from "@relevanceai/sdk";

const client = createClient({
  apiKey: "sk-...",
  region: AU_REGION,
  project: "project-uuid",
});
```

You can also create a Key instance explicitly:

```typescript
import { Client, Key, AU_REGION } from "@relevanceai/sdk";

const key = new Key({
  key: "sk-...",
  region: AU_REGION,
  project: "project-uuid",
});

const client = new Client(key);
```

#### Embed Keys (Client-side)

For public-facing applications, use embed keys which are scoped to a specific
public agent:

```typescript
import { Key, createClient, US_REGION } from "@relevanceai/sdk";

const embedKey = await Key.generateEmbedKey({
  region: US_REGION,
  project: "project-uuid",
  agentId: "public-agent-id", // Must be a public agent
});

const client = createClient(embedKey);
```

### Fetching Agents

Load agents before creating tasks:

```typescript
// Using default client
const agent = await Agent.get("agent-id");

// Using specific client
const customClient = createClient({
  /* config */
});
const agent = await Agent.get("agent-id", customClient);

// Access agent properties
console.log(agent.name);
console.log(agent.avatar);
console.log(agent.description);
```

### Sending Messages

#### Create a New Task

Start a new conversation with an agent:

```typescript
const agent = await Agent.get("agent-id");
const task = await agent.sendMessage("What's the weather like today?");
```

#### Send to Existing Task

Continue an existing conversation:

```typescript
// Get an existing task
const task = await agent.getTask("task-id");

// Send a follow-up message
await agent.sendMessage("What about tomorrow?", task);
```

#### Send Messages with Attachments

You can include file attachments when sending messages to agents using web standard File objects or URL-based attachments:

```typescript
import { Agent } from "jsr:@relevanceai/sdk";

const agent = await Agent.get("agent-id");

// Read files using Deno APIs
const pdfData = await Deno.readFile("./document.pdf");
const imageData = await Deno.readFile("./photo.png");

// Create file objects
const pdfFile = new File([pdfData], "document.pdf", {
  type: "application/pdf",
});
const imageFile = new File([imageData], "photo.png", { type: "image/png" });

// Send message with attachments
const task = await agent.sendMessage("Analyze these documents", [
  pdfFile,
  imageFile,
]);
```

Note: `sendMessage` returns once the message is sent and doesn't wait for a
response. Use event listeners to handle responses.

#### Retrieving tasks

Fetch and filter tasks for an agent:

```typescript
// specific task
const task = await agent.getTask("<task-id>");

// pagination
const tasks = await agent.getTasks({
  pageSize: 10,
  page: 1,
  sort: { updatedAt: "desc" },
});

// filtering
const activeTasks = await agent.getTasks({
  filter: { status: ["queued", "running", "idle"] },
});

// searching
const searchResults = await agent.getTasks({
  search: "weather",
  sort: { createdAt: "asc" },
});
```

### Event Handling

Tasks use an event-driven architecture for real-time updates:

#### Available Events

- **`start`**: Task initialization
- **`status`**: Status changes (queued, running, complete, error)
- **`message`**: Unified event for all message types (agent, user, tool)
- **`error`**: Error notifications

#### Listening for Events

```typescript
// Listen for all messages (agent, user, and tool)
task.addEventListener("message", ({ detail }) => {
  const { message } = detail;

  // Check message type using helper methods
  if (message.isAgent()) {
    console.log("Agent:", message.text);
  } else if (message.isUser()) {
    console.log("User:", message.text);
  } else if (message.isTool()) {
    console.log("Tool:", message.status);
  }
});

// Listen for status changes
task.addEventListener("status", ({ detail }) => {
  console.log("Status changed to:", detail.status);
});

// Listen for errors
task.addEventListener("error", ({ detail }) => {
  console.error("Task error:", detail.message);
});

// Clean up when done
task.unsubscribe();
```

#### Managing Subscriptions

The SDK automatically starts listening when you add event listeners. Remember
to clean up:

```typescript
// Start listening (called automatically with addEventListener)
task.subscribe();

// Stop listening and clean up
task.unsubscribe();
```

### Advanced Usage

#### Default Client Pattern

Use a singleton client throughout your application:

```typescript
// Initialize once at startup
createClient({ apiKey, region, project });

// Access anywhere in your app
import { Client } from "@relevanceai/sdk";
const client = Client.default();
```

#### Multiple Clients

Manage multiple projects or authentication scopes:

```typescript
import { Client, Key, EU_REGION } from "@relevanceai/sdk";

const projectOneKey = new Key({
  key: "sk-project1",
  region: EU_REGION,
  project: "project-1-id",
});

const projectTwoKey = new Key({
  key: "sk-project2",
  region: EU_REGION,
  project: "project-2-id",
});

const clientOne = new Client(projectOneKey);
const clientTwo = new Client(projectTwoKey);

// Use different clients for different agents
const agentOne = await Agent.get("agent-1", clientOne);
const agentTwo = await Agent.get("agent-2", clientTwo);
```

## Examples

For complete working examples, check out the `internal/examples` directory:

- **Deno Examples** (`internal/examples/deno/`):

  - Client setup and configuration
  - Creating and managing tasks
  - Fetching agent information
  - Retrieving existing tasks
  - Image OCR with file attachments

- **Browser Example** (`internal/examples/browser/`):
  - Full chat application with Preact
  - Real-time message handling
  - UI components for agent interactions

## API Reference

### Client

```typescript
class Client {
  constructor(key: Key);
  static default(): Client;

  readonly key: Key;
  readonly region: Region;
  readonly project: string;

  isEmbedKey(): boolean;
  fetch<T>(endpoint: string, init?: RequestInit): Promise<T>;
  url(path: string): URL;
  uploadTempFile(file: File): Promise<Attachment>;
}

function createClient(keyOrOptions: Key | CreateClientOptions): Client;

interface CreateClientOptions {
  apiKey: string;
  region: Region;
  project: string;
}

interface Attachment {
  fileName: string;
  fileUrl: string;
}
```

### Key

```typescript
class Key {
  static async generateEmbedKey(options: GenerateEmbedKeyOptions): Promise<Key>;

  constructor(options: CreateKeyOptions);

  readonly region: Region;
  readonly project: string;
  readonly agentId?: string;
  readonly taskPrefix?: string;

  isEmbed(): boolean;
  fetchHeaders(): HeadersInit;
  toJSON(): CreateKeyOptions;
}

interface CreateKeyOptions {
  key: string;
  region: Region;
  project: string;
  agentId?: string;
  taskPrefix?: string;
}

interface GenerateEmbedKeyOptions {
  region: Region;
  project: string;
  agentId: string;
}
```

### Agent

```typescript
class Agent {
  static async get(id: string, client?: Client): Promise<Agent>;

  readonly id: string;
  readonly name?: string;
  readonly description?: string;
  readonly avatar?: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly region: Region;
  readonly project: string;

  getTask(taskId: string): Promise<Task>;
  getTasks(options?: GetTaskOptions): Promise<Task[]>;
    sendMessage(message: string): Promise<Task>;
    sendMessage(message: string, task: Task): Promise<Task>;
    sendMessage(
        message: string,
        attachments: (Attachment | File)[]
    ): Promise<Task>;
    sendMessage(
        message: string,
        attachments: (Attachment | File)[],
        task: Task
    ): Promise<Task>;}

interface GetTaskOptions {
  pageSize?: number; // default: 100
  page?: number; // default: 1
  // default: { createdAt: "asc" }
  sort?: { createdAt: "asc" | "desc" } | { updatedAt: "asc" | "desc" };
  search?: string;
  filter?: {
    status?: TaskStatus[];
  };
}
```

### Task

```typescript
class Task extends EventTarget {
  static async get(
    id: string,
    agentOrAgentId: Agent | string,
    client?: Client
  ): Promise<Task>;

  readonly id: string;
  readonly title: string;
  readonly status: TaskStatus;
  readonly agent: Agent;

  isRunning(): boolean;
  getMessages(options?: { from?: Date }): Promise<AnyTaskMessage[]>;
  subscribe(): void;
  unsubscribe(): void;

  addEventListener(type: string, listener: EventListener): void;
  removeEventListener(type: string, listener: EventListener): void;
}

type TaskStatus =
  | "not-started"
  | "idle"
  | "queued"
  | "running"
  | "action"
  | "completed"
  | "error";
```

### Messages

```typescript
abstract class GenericMessage {
  readonly id: string;
  readonly type: MessageType;
  readonly createdAt: Date;

  isAgent(): boolean; // Check if message is from agent
  isUser(): boolean; // Check if message is from user
  isTool(): boolean; // Check if message is a tool execution
  isAgentError(): boolean; // Check if message is an agent error
}

class AgentMessage extends GenericMessage {
  readonly text: string;
}

class UserMessage extends GenericMessage {
  readonly text: string;
}

class ToolMessage extends GenericMessage {
  readonly status: "cancelled" | "pending" | "running" | "completed" | "failed";
}

class AgentErrorMessage extends GenericMessage {
  readonly error: string;
}
```

### Types

```typescript
type Region = "us" | "eu" | "au";

const US_REGION: Region = "us";
const EU_REGION: Region = "eu";
const AU_REGION: Region = "au";
```

## Contributing

We welcome contributions to improve the SDK. Please follow these guidelines:

### Development Setup

1. Clone the repository
2. Install Deno (primary development environment)

```bash
# Build npm package
deno run dnt
```

### Code Style

- Use TypeScript for all code
- Follow existing patterns and conventions
- Maintain 80-character line width where practical
- Write clear, concise commit messages

### Submitting Changes

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request with clear description

## Roadmap

### Current

- [x] Core client functionality
- [x] Task creation
- [x] Event-driven messaging
- [x] Multi-environment support

### Upcoming Features

- [ ] Streaming responses
- [x] File upload support
- [ ] Enhanced error recovery
- [ ] Agent and task management
- [ ] Workforce support
- [ ] Tool support

### Future Considerations (2.0)

- [ ] WebSocket support for real-time updates
- [ ] Offline queue management
- [ ] Tool building architecture
- [ ] Voice modality

## Support

- **Issues**: [GitHub Issues](https://github.com/RelevanceAI/relevance-js-sdk/issues)
- **Community**: [Discord Server](https://discord.gg/relevanceai)

## License

MIT License. See [LICENSE](./LICENSE) for details.

## Security

For security vulnerabilities, please email security@relevanceai.com directly
rather than using public issue trackers.
