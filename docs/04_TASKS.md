# Tasks

This document covers the task lifecycle, status model, event system,
subscriptions, and cleanup. A task represents a conversation thread
between an application and an agent or workforce.

## What Is a Task

A task is the core unit of interaction in the SDK. When a message is
sent to an agent or workforce, the SDK returns a `Task` instance that
tracks the conversation. All later messages, status changes, and events
flow through this task.

```typescript
const task = await agent.sendMessage("Hello");
console.log(task.id);     // unique task identifier
console.log(task.name);   // display title
console.log(task.status); // current status
```

## Task Status Lifecycle

Every task has a `status` field that reflects its current state. The
SDK simplifies the platform's internal states into a concise set of
statuses:

| Status        | Meaning                            |
|---------------|------------------------------------|
| `not-started` | Created locally, not yet sent      |
| `idle`        | Agent is idle, awaiting input      |
| `paused`      | Execution has been paused          |
| `queued`      | Waiting to start (capacity, queue) |
| `running`     | Agent is actively processing       |
| `action`      | Requires approval or has escalated |
| `completed`   | Finished successfully              |
| `cancelled`   | Cancelled before completion        |
| `error`       | Encountered a failure              |

### How Platform States Map to Task Statuses

The Relevance AI platform uses more granular internal states. The SDK
maps these to the simplified statuses above, so application code does
not need to handle every variation:

| Platform State             | SDK Status  |
|----------------------------|-------------|
| `idle`                     | `idle`      |
| `starting-up`              | `queued`    |
| `waiting-for-capacity`     | `queued`    |
| `queued-for-approval`      | `queued`    |
| `queued-for-rerun`         | `queued`    |
| `running`                  | `running`   |
| `pending-approval`         | `action`    |
| `escalated`                | `action`    |
| `paused`                   | `paused`    |
| `completed`                | `completed` |
| `cancelled`                | `cancelled` |
| `timed-out`                | `error`     |
| `unrecoverable`            | `error`     |
| `errored-pending-approval` | `error`     |

For workforce-specific state mappings, see
[Workforces](./06_WORKFORCES.md).

## Checking If a Task Is Active

Use `isRunning` to determine whether the agent is still processing.
This returns `true` when the status is `queued` or `running`.

```typescript
if (task.isRunning()) {
  console.log("Agent is working...");
}
```

## Fetching Message History

Retrieve all messages in a task's conversation with `getMessages`:

```typescript
const messages = await task.getMessages();
```

To fetch only messages after a specific point in time, pass an `after`
date:

```typescript
const recent = await task.getMessages({
  after: new Date("2025-06-01T00:00:00Z"),
});
```

Each message in the returned array is one of the types described in
[Messaging](./05_MESSAGING.md). The same type guard methods
(`isAgent`, `isTool`, etc.) are available on each message.

## Listening for Events

Tasks emit events in real time as the conversation progresses. There
are three event types:

| Event       | When It Fires                        |
|-------------|--------------------------------------|
| `"message"` | A new message is received            |
| `"error"`   | An agent error occurs                |
| `"update"`  | Task metadata changes (e.g., status) |

### The "message" Event

This is the primary event for receiving agent responses, tool
executions, and streaming content:

```typescript
task.addEventListener("message", ({ detail }) => {
  const { message } = detail;

  if (message.isAgent()) {
    console.log("Agent:", message.text);
  }
});
```

See [Messaging](./05_MESSAGING.md) for the full set of message types
and their fields.

### The "error" Event

Fires when the agent encounters a failure:

```typescript
task.addEventListener("error", ({ detail }) => {
  console.error(detail.message.lastError);
});
```

### The "update" Event

Fires when the task's metadata changes, such as a status transition:

```typescript
task.addEventListener("update", () => {
  console.log("New status:", task.status);
});
```

## How Subscriptions Work

Subscriptions start automatically. The first call to
`addEventListener` on a task activates the subscription. There is no
need to call `subscribe` manually.

Once subscribed, the SDK keeps the task up to date by polling for new
messages and metadata changes. It also opens a streaming connection
when available to deliver real-time thinking and typing events. See
[Streaming](./07_STREAMING.md) for details.

The SDK manages the polling frequency internally, speeding up when the
task is active and slowing down when idle. This is transparent to the
application.

## Cleaning Up

Always call `unsubscribe` when a task is no longer needed. This stops
the polling loop and closes any active connections, freeing network
and memory resources.

```typescript
task.unsubscribe();
```

Failing to unsubscribe from tasks that have left scope is a common
source of resource leaks. In component-based UI frameworks, call
`unsubscribe` in the cleanup or teardown handler.

### React Example

```typescript
useEffect(() => {
  const handler = ({ detail }) => {
    setMessages((prev) => [...prev, detail.message]);
  };

  task.addEventListener("message", handler);

  return () => {
    task.unsubscribe();
  };
}, [task]);
```

### Vanilla JavaScript Example

```typescript
// When navigating away from a conversation view
function teardown() {
  task.unsubscribe();
}
```

---

See also:

- [Agents](./03_AGENTS.md) – Loading agents and retrieving tasks
- [Workforces](./06_WORKFORCES.md) – Workforce task differences
- [Messaging](./05_MESSAGING.md) – Message types and handling
- [Streaming](./07_STREAMING.md) – Real-time streaming events
