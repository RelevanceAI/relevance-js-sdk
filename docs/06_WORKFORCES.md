# Workforces

This document covers loading and interacting with workforces. A
workforce is a team of agents that coordinate to handle complex,
multistep tasks through delegation and handover.

## What Is a Workforce

A workforce groups multiple agents together under a single entry
point. When a message is sent to a workforce, the platform routes it
to the most appropriate agent, and agents can hand work off to each
other as the task progresses. This enables complex workflows that span
multiple areas of expertise without requiring the application to
manage agent coordination directly.

## Loading a Workforce

Fetch a workforce by its ID using `Workforce.get`. The workforce ID is
available in the Relevance AI dashboard.

```typescript
import { Workforce } from "@relevanceai/sdk";

const workforce = await Workforce.get("<workforce-id>");
```

To use a specific client instead of the default singleton:

```typescript
const workforce = await Workforce.get(
  "<workforce-id>",
  client
);
```

Once loaded, the workforce exposes its metadata:

```typescript
console.log(workforce.name);    // display name
console.log(workforce.id);      // unique identifier
console.log(workforce.region);  // deployment region
console.log(workforce.project); // project identifier
```

## Starting a Workforce Task

Send a message to the workforce with `sendMessage`. This creates a
new task and returns it immediately. The workforce begins routing the
message to the appropriate agent.

```typescript
const task = await workforce.sendMessage(
  "Analyze last quarter's sales data and prepare a summary"
);
```

As with agent tasks, `sendMessage` resolves as soon as the message is
sent, not when the workforce completes its work. Listen for events on
the returned task to receive results. See [Tasks](./04_TASKS.md) for
event handling.

## Continuing a Conversation

Pass the existing task to `sendMessage` to add follow-up messages:

```typescript
await workforce.sendMessage(
  "Include a regional breakdown",
  task
);
```

**Note:** Unlike agent tasks, workforce tasks do not support file
attachments.

## Retrieving Workforce Tasks

### A Single Task

Fetch a specific task by its ID:

```typescript
const task = await workforce.getTask("<task-id>");
```

### Listing Tasks

Fetch a list of workforce tasks with `getTasks`:

```typescript
const tasks = await workforce.getTasks();
```

Workforce task listing supports cursor-based pagination and search:

```typescript
const tasks = await workforce.getTasks({
  pageSize: 50,
  search: "quarterly report",
});
```

To paginate through results, pass the cursor from the previous
response:

```typescript
const firstPage = await workforce.getTasks({
  pageSize: 20,
});

// To get the next page, use the cursor from the response
const nextPage = await workforce.getTasks({
  pageSize: 20,
  cursor: "<cursor-from-previous-page>",
});
```

### Differences from Agent Task Retrieval

Workforce and agent task listings differ in the options they support:

| Feature          | Agent Tasks | Workforce Tasks |
|------------------|-------------|-----------------|
| Pagination       | Page-based  | Cursor-based    |
| Sort options     | Supported   | Not supported   |
| Status filtering | Supported   | Not supported   |
| Search           | Supported   | Supported       |
| File attachments | Supported   | Not supported   |

## Workforce Task States

Workforce tasks use a different set of internal states than agent
tasks. The SDK maps these to the same simplified statuses used
elsewhere:

| Workforce State            | SDK Status  |
|----------------------------|-------------|
| `running`                  | `running`   |
| `completed`                | `completed` |
| `execution-limit-reached`  | `error`     |
| `pending-approval`         | `action`    |
| `escalated`                | `action`    |
| `errored-pending-approval` | `error`     |

The `action` status indicates that the workforce requires human
intervention, either through an approval step or because the task was
escalated.

## Workforce-Specific Messages

Workforce tasks emit two message types that do not appear in agent
tasks:

### Agent Run Messages

A `WorkforceAgentMessage` (type `"workforce-agent-run"`) indicates
that an agent within the workforce is executing a subtask. These
messages include details about which agent is running and the current
state of its work.

```typescript
task.addEventListener("message", ({ detail }) => {
  const { message } = detail;

  if (message.type === "workforce-agent-run") {
    // An agent in the workforce is working
  }
});
```

### Handover Messages

A `WorkforceAgentHandoverMessage` (type
`"workforce-agent-handover"`) indicates that work is being delegated
from one agent to another. The message includes the trigger message
that initiated the handover and details about the receiving agent.

```typescript
task.addEventListener("message", ({ detail }) => {
  const { message } = detail;

  if (message.type === "workforce-agent-handover") {
    // Work is being handed to another agent
  }
});
```

These messages appear interleaved with standard agent and tool
messages in the event stream. For full details on all message types
and type guards, see [Messaging](./05_MESSAGING.md).

---

See also:

- [Client](./02_CLIENT.md) – Client initialization
- [Tasks](./04_TASKS.md) – Task lifecycle and events
- [Messaging](./05_MESSAGING.md) – Message types and handling
- [Authentication](./01_AUTH.md) – Embed keys for workforces
