# Relevance AI JavaScript SDK

A comprehensive JavaScript/TypeScript SDK for building AI-powered applications
with Relevance AI's workforce platform. Build, deploy, and scale AI workforces
across any JavaScript runtime.

## Description

The Relevance AI JavaScript SDK provides a unified interface for integrating
AI workforces and agents into your applications. Whether you're building
server-side applications, browser-based interfaces, or edge computing solutions,
this SDK delivers consistent, type-safe access to Relevance AI's powerful agent
ecosystem.

### Key Features

- **Universal Compatibility**: Works seamlessly across Node.js, Deno, Bun,
  Cloudflare Workers, and browsers
- **Event-Driven Architecture**: Real-time updates via native EventTarget API
- **Type Safety**: Full TypeScript support with comprehensive type definitions
- **Zero Dependencies**: Built on web standards for minimal footprint

## Quick Start

Get up and running in seconds:

```typescript
import { Agent, createClient, EU_REGION } from "@relevanceai/sdk";

// Initialize client with your credentials
const client = createClient({
  apiKey: process.env.RELEVANCE_API_KEY,
  region: EU_REGION,
  project: process.env.PROJECT_ID,
});

// Load an agent
const agent = await Agent.get("agent-id");
// Start a conversation
const task = await agent.sendMessage("Hello, how can you help me today?");
// Listen for agent responses
task.addEventListener("message", ({ detail: { message } }) => {
  if (message.isAgent()) {
    console.log("Agent:", message.text);
  }
});

// Or use a workforce of agents

import { Workforce } from "@relevanceai/sdk";

// Load the workforce
const workforce = await Workforce.get("workforce-id");
// Start delegating
const task = await workforce.sendMessage("Analyze this complex dataset");
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

#### API Keys (server-side)

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

#### Embed Keys (client-side)

For public-facing applications, use embed keys which are scoped to a specific
public agent. Embed keys need to be generated and should be stored in your
applications local storage or database. Each embed key corresponds to a single
agent or workforce.

```typescript
import { Key, createClient, US_REGION } from "@relevanceai/sdk";

const embedKey = await Key.generateEmbedKey({
  region: US_REGION,
  project: "project-uuid",
  agentId: "public-agent-id", // Must be a public agent
});

const client = createClient(embedKey);
```

### Agents

#### Loading agents

```typescript
// fetch all agents (with pagination)
const agents = await Agent.getAll({ pageSize: 20, page: 1 });

// fetch all agents with custom page size
const agents = await Agent.getAll({ pageSize: 50, page: 3 });

// fetch all agents using default options (pageSize: 20, page: 1)
const agents = await Agent.getAll();

// using the default client
const agent = await Agent.get("agent-id");

// or using a specific client
const agent = await Agent.get("agent-id", client);

// accessing agent properties
console.log(agent.name);
console.log(agent.avatar);
console.log(agent.description);
```

#### Sending messages

Use `Agent#sendMessage()` to send messages to an agent.

```typescript
// create a new task
const task = await agent.sendMessage("What's the weather like today?");

// reply to existing tasks
await agent.sendMessage("What about tomorrow?", task);

// sending attachments
const contents = await Deno.readFile("./contract.pdf");
const contract = new File([contents], "contract.pdf", {
  type: "application/pdf",
});
await agent.sendMessage("Summarize this contract", [contract]);
```

Note: `Agent#sendMessage()` returns once the message is sent and doesn't wait for
a response. See Tasks for handling message events.

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

### Workforces

#### Loading workforces

```typescript
// using the default client
const workforce = await Workforce.get("<workforce-id>");

// or with a specific client
const workforce = await Workforce.get("<workforce-id>", client);

// accessing workforce properties
console.log(workforce.name);
```

#### Sending messages

Use `Workforce#sendMessage()` to send messages to a workforce.

```typescript
// create a new task
const task = await agent.sendMessage("What's the weather like today?");

// reply to existing tasks
await agent.sendMessage("What about tomorrow?", task);
```

Note: `Workforce#sendMessage()` returns once the message is sent and doesn't
wait for a response. See Tasks for handling message events.

#### Retrieving tasks

Load existing workforce tasks.

```typescript
const task = await workforce.getTask("<task-id>");
```

### Tasks

Agents and workforces, subjects, all return an instance of a `Task` when sending
messages. Tasks dispatch events as they would occur on the the subjects timeline
in the Relevance AI workforce platform.

#### Available Events

- **`update`**: Whenever a subject has been update.
- **`message`**: Unified event for all message types
- **`error`**: Error notifications

#### Listening for Events

```typescript
// Listen for all messages (agent, user, and tool)
task.addEventListener("message", ({ detail: { message } }) => {
  // use message helpers to determine the message
  if (message.isAgent()) {
    console.log("Agent:", message.text);
  } else if (message.isUser()) {
    console.log("User:", message.text);
  } else if (message.isTool()) {
    console.log("Tool:", message.status);
  }
});

// catching errors
task.addEventListener("error", ({ detail: { message } }) => {
  console.error("Task error:", message.lastError);
});
```

#### Unsubscribing

It's important that you unsubscribe from tasks once they have moved out of
scope in your application. This will prevent memory leaks by removing dead
subscriptions.

```typescript
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

  - (Agent) Creating tasks
  - (Agent) Getting a task
  - (Agent) Getting all agents
  - (Agent) Getting all tasks
  - (Agent) Getting an agent
  - (Workforce) Creating a task

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
}

function createClient(keyOrOptions: Key | CreateClientOptions): Client;

interface CreateClientOptions {
  apiKey: string;
  region: Region;
  project: string;
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

  static async getAll(
    options?: GetAllOptions,
    client?: Client
  ): Promise<Agent[]>;

  readonly id: string;
  readonly name?: string;
  readonly description?: string;
  readonly avatar?: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly region: Region;
  readonly project: string;

  getTask(taskId: string): Promise<Task>;

  getTasks(): Promise<Task[]>;
  getTasks(options: GetTaskOptions): Promise<Task[]>;

  sendMessage(message: string): Promise<Task>;
  sendMessage(message: string, task: Task): Promise<Task>;
  sendMessage(
    message: string,
    attachments: (File | Attachment)[]
  ): Promise<Task>;
  sendMessage(
    message: string,
    attachments: (File | Attachment)[],
    task: Task
  ): Promise<Task>;
}

interface Attachment {
  fileName: string;
  fileUrl: string;
}

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

interface GetAllOptions {
  pageSize?: number; // default: 20
  page?: number; // default: 1
}
```

### Workforce

```typescript
class Workforce {
  static async get(id: string, client?: Client): Promise<Workforce>;

  readonly id: string;
  readonly name: string;
  readonly region: Region;
  readonly project: string;

  getTask(taskId: string): Promise<Task>;

  sendMessage(message: string): Promise<Task>;
  sendMessage(message: string, task: Task): Promise<Task>;
}
```

### Task

```typescript
class Task<T extends Agent | Workforce = Agent> extends EventTarget {
  readonly id: string;
  readonly title: string;
  readonly status: TaskStatus;
  readonly subject: Agent | Workforce;

  isRunning(): boolean;

  getMessages(): Promise<AnyTaskMessage[]>;
  getMessages(options: { from: Date }): Promise<AnyTaskMessage[]>;

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
  readonly tool?: Tool; // Available when message is from a tool (not subagent)
  readonly toolOrAgentId: string; // ID of the tool or subagent

  isSubAgent(): boolean; // Check if this is a subagent execution
  subAgentTaskId: string | null; // Task ID if this is a subagent, null otherwise
}

class AgentErrorMessage extends GenericMessage {}

class WorkforceAgentMessage extends GenericMessage {}

class WorkforceAgentHandoverMessage extends GenericMessage {}
```

### Tool

```typescript
class Tool {
  readonly id: string;
  readonly name: string;
  readonly avatar?: string;
  readonly description?: string;
  readonly region: Region;
  readonly project: string;
  readonly parametersSchema: JSONSchema4;
}
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
- [x] Workforce support

### Upcoming Features

- [ ] Streaming responses
- [ ] File upload support
- [ ] Enhanced error recovery
- [ ] Agent and task management
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
