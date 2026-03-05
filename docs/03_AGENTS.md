# Agents

This document covers loading agents, reading their metadata, starting
conversations, and retrieving tasks. For in-depth coverage of messaging
and task management, see [Messaging](./05_MESSAGING.md) and
[Tasks](./04_TASKS.md).

## Loading a Single Agent

Fetch an agent by its ID using `Agent.get`. The agent ID is available
in the Relevance AI dashboard.

```typescript
import { Agent } from "@relevanceai/sdk";

const agent = await Agent.get("<agent-id>");
```

To use a specific client instead of the default singleton:

```typescript
const agent = await Agent.get("<agent-id>", client);
```

## Listing All Agents

Fetch a paginated list of all agents in the project with
`Agent.getAll`.

```typescript
const agents = await Agent.getAll();
```

Pagination is controlled with `pageSize` and `page`:

```typescript
const agents = await Agent.getAll({
  pageSize: 50,
  page: 2,
});
```

The defaults are `pageSize: 20` and `page: 1`.

## Reading Agent Metadata

Once loaded, an agent exposes the following metadata:

```typescript
const agent = await Agent.get("<agent-id>");

console.log(agent.name);        // display name
console.log(agent.description); // agent description
console.log(agent.avatar);      // avatar emoji or URL
console.log(agent.id);          // unique identifier
console.log(agent.region);      // deployment region
console.log(agent.project);     // project identifier
console.log(agent.createdAt);   // Date object
console.log(agent.updatedAt);   // Date object
```

The `name`, `description`, and `avatar` fields may be `undefined` if
they have not been configured in the dashboard.

## Starting a Conversation

Send a message to an agent with `sendMessage`. This creates a new task
(conversation thread) and returns it immediately. The method does not
wait for the agent to respond.

```typescript
const task = await agent.sendMessage(
  "What can you help me with?"
);
```

To continue an existing conversation, pass the task back:

```typescript
await agent.sendMessage("Tell me more about that", task);
```

File attachments can be included as well:

```typescript
const file = new File([bytes], "report.pdf", {
  type: "application/pdf",
});

const task = await agent.sendMessage(
  "Summarize this report",
  [file]
);
```

For full details on sending messages, handling responses, and working
with attachments, see [Messaging](./05_MESSAGING.md).

## Retrieving Tasks

### A Single Task

Fetch a specific task by its ID:

```typescript
const task = await agent.getTask("<task-id>");
```

### Listing Tasks

Fetch a paginated, sortable, and filterable list of tasks for the
agent:

```typescript
const tasks = await agent.getTasks({
  pageSize: 10,
  page: 1,
  sort: { updatedAt: "desc" },
  filter: { status: ["running", "queued"] },
  search: "quarterly report",
});
```

All options are optional. The defaults are `pageSize: 100`,
`page: 1`, and `sort: { createdAt: "asc" }`.

Filtering by status accepts an array of simplified task statuses. See
[Tasks](./04_TASKS.md) for the full status lifecycle and available
values.

---

See also:

- [Client](./02_CLIENT.md) – Client initialization
- [Tasks](./04_TASKS.md) – Task lifecycle, events, and cleanup
- [Messaging](./05_MESSAGING.md) – Sending messages, handling
  responses, and attachments
