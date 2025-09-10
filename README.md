# Relevance AI JavaScript SDK

Build full-stack AI applications using our JavaScript SDK. This multi-environment
SDK enables you to integrate, extend, or build end-to-end solutions on top of
our powerful AI Workforce platform.

> **Note:** The SDK is in active development and not all features are available
> yet. Please refer to our roadmap for updates.

## Quickstart

```js
import { createClient, AU_REGION } from "@relevanceai/sdk";

// Create a client with your credentials
const client = createClient({
  apiKey: "sk-abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKL",
  region: AU_REGION,
  project: "12345678-90ab-cdef-1234-567890abcdef",
});

// Create a task for an agent
const task = client.createTask({
  agent: "fedcba09-8765-4321-fedc-ba0987654321",
});

// Send a message to the agent
task.sendMessage(
  "What is the weather like in Sydney, Australia this weekend?"
);

// Listen for responses
task.addEventListener("message", ({ detail }) => {
  const { message } = detail;
  console.log(message.text);

  task.sendMessage("Thanks!");
  
  // Important: Stop listening when done to prevent memory leaks
  task.stopListening();
});
```

## Getting Started

The JavaScript SDK is a stateless, event-driven toolkit that provides the
flexibility to build any application you need. It sits on top of our API and
offers a streamlined developer experience, making it easier for your apps to
integrate with agents, tools, and workforces.

This multi-environment library allows you to build wherever modern JavaScript
runs:

- Node.js
- Deno
- Bun
- Cloudflare Workers
- Browser

### Installation

Install the SDK for your environment:

```bash
# Node.js / Cloudflare Workers / Browser (with bundler)
npm install @relevanceai/sdk@latest

# Deno
deno add jsr:@relevanceai/sdk

# Bun
bun add @relevanceai/sdk@latest
```

#### Browser (CDN)

If you are developing a frontend application and not using a bundler like
[Vite](https://vite.dev) or [Webpack](https://webpack.js.org), you can use the
CDN version directly:

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
// ...
</script>
```

## Usage

### Keys

To communicate with Relevance AI, you will need a key. Keys authenticate your
requests and grant access to your project.

There are two types of keys: _API_ and _Embed_.

#### API Key

API keys grant access to the entire project, including agents, tools, and
workforces. This key is best used for server-side applications or protected web
apps where third parties do not have access.

Using the default client `createClient({ apiKey, region, project })` will create
an API Key for convenience. Alternatively, you can create a `Key` instance and
pass it to the client.

```js
import { createClient, Key, AU_REGION } from "@relevanceai/sdk";

const apiKey = "sk-...";
const region = AU_REGION;
const project = "1234...";

const key = new Key({ apiKey, region, project });
const client = createClient(key);
```

#### Embed Key

If you are developing a web app that allows third-party access, such as for your
customers, it's best to share resources from the Relevance AI platform. This
makes them available for public use and requires an embed key scoped only to
that resource.

To get an embed key, specify which public resource you wish to scope it to. For
example, to create an embed key for a publicly available agent in your project:

```js
import { createClient, Key, AU_REGION } from "@relevanceai/sdk";

const region = AU_REGION;
const project = "1234...";
const agent = "abcd..."; // a *public* agent

const embedKey = await Key.generateEmbedKey({ region, project, agent });
const client = createClient(embedKey);
```

### Clients

A client is the main entry point for the SDK. It configures communication with
Relevance AI and manages authentication.

You can create multiple clients, which is useful for multi-project setups.

```js
import { Client, Key, AU_REGION } from "@relevanceai/sdk";

const apiKey = "sk-...";
const region = AU_REGION;
const projectOne = "1234...";
const projectTwo = "abcd...";

const oneKey = new Key({ apiKey, region, project: projectOne });
const twoKey = new Key({ apiKey, region, project: projectTwo });

const oneClient = new Client(oneKey);
const twoClient = new Client(twoKey);
```

#### Default client

Typically, you will only need a single client. In this case, use the default
client factory as shown in the quickstart:

```js
import { createClient, Client } from "@relevanceai/sdk";

const client = createClient({ apiKey, region, project });

// elsewhere in your app
Client.default();
```

Attempting to create more than one default client will throw an error. Referencing
the default client before creating one will also throw an error.

### Tasks

Whenever you run anything in Relevance AI, these are known as tasks. Tasks have
a subject: an agent, tool, or workforce. You can send messages to these subjects,
receive replies, and follow updates and errors.

> **Important:** Always call `task.stopListening()` when you're done with a task
> to prevent memory leaks and clean up resources properly.

#### Creating Tasks

The easiest way to create a new task is to use the client's convenient method
`createTask` and provide the subject ID.

```js
const agentId = "1234...";
const task = client.createTask({ agent: agentId });
```

#### Sending a Message

Once you have a task instance, you can send messages to the subject using the
`sendMessage()` method.

```js
task.sendMessage("How many letter r's are there in the word 'strawberry'?");
```

Note that this call is not `async`. It sends the message and does not `await`
a reply. This is intentional, as tasks are event-driven.

### Events

Tasks are event-driven and an application must listen to predefined events to
manage the status and messages of a task.

Use `.addEventListener()` to listen for task events.

```js
task.sendMessage("What came first; the chicken or the egg?");

task.addEventListener("message", ({ detail }) => {
  const { message } = detail;
  console.log("> %s", message.text);
});
```

Tasks dispatch `CustomEvent`. Event properties will be set in the `detail`
field of the event. You can see the types of events for more information about
the properties associated with different events.

Remember to call `task.stopListening()` once you no longer need to listen to
the task.

---

The following events are available for agent subjects.

#### `start`

When a _new_ task starts.

**Details**

```ts
interface StartEventDetails {
  id: string;
  status: TaskStatus;
}
```

#### `status`

Whenever the task's _status_ changes.

> **Note:** this event does **not** fire for starting status. Use the `start`
> event if you need the initial status.

**Details**

```ts
interface StatusEventDetails {
  status: TaskStatus;
}
```

##### `update`

A task has updated. This update will always be a tool for now but may expand in
the future.

**Details**

```ts
interface UpdateEventDetails {
  update: TaskMessage<"tool">;
}
```

#### `message`

A task has received a message.

> **Note:** you will receive messages from _both_ subjects and users.

**Details**

```ts
interface MessageEventDetails {
  message: TaskMessage<"agent" | "user">;
}
```

#### `error`

Whenever the task has failed.

**Details**

```ts
interface ErrorEventDetails {
  error: TaskMessage<"error">;
}
```

**Example**

```js
task.addEventListener("error", ({ detail }) => {
  const { error } = detail;
  console.error("Task failed:", error.text);
  
  // clean up
  task.stopListening();
});
```
