# Messaging

This document covers sending messages, handling responses, working
with the different message types, managing file attachments, and
handling errors.

## Sending a Message

Both agents and workforces use `sendMessage` to start or continue a
conversation. The method accepts a string and returns a `Task`
representing the conversation thread.

```typescript
const task = await agent.sendMessage(
  "What can you help me with?"
);
```

The returned task begins processing immediately. The method resolves
as soon as the message is sent, not when the agent responds. To
receive the response, listen for events on the task. See
[Tasks](./04_TASKS.md) for event handling.

## Continuing a Conversation

To send a follow-up message within the same conversation, pass the
existing task as the second argument:

```typescript
const task = await agent.sendMessage("Hello");

// Later, continue the same conversation
await agent.sendMessage("Tell me more", task);
```

Each call to `sendMessage` with an existing task appends to the
conversation history. The agent has full context of the prior messages.

## File Attachments

Files can be attached to a message by passing an array of `File`
objects as the second argument. The SDK handles the upload
automatically.

```typescript
const pdf = new File(
  [bytes],
  "contract.pdf",
  { type: "application/pdf" }
);

const task = await agent.sendMessage(
  "Summarize this contract",
  [pdf]
);
```

Multiple files can be sent in a single message:

```typescript
const task = await agent.sendMessage(
  "Compare these two documents",
  [fileA, fileB]
);
```

To attach files while continuing an existing conversation, pass both
the attachments array and the task:

```typescript
await agent.sendMessage(
  "Here is an updated version",
  [updatedFile],
  task
);
```

Pre-uploaded attachments (objects with `fileName` and `fileUrl` fields)
can also be included in the array alongside `File` objects.

**Note:** Workforce tasks do not support file attachments. Only agent
tasks accept files.

## Handling Incoming Messages

Messages arrive through the `"message"` event on a task. Each event
contains a `message` property on its `detail` object. Use the type
guard methods on the message to determine its kind and access the
appropriate fields.

```typescript
task.addEventListener("message", ({ detail }) => {
  const { message } = detail;

  if (message.isAgent()) {
    console.log("Agent:", message.text);
  } else if (message.isTool()) {
    console.log("Tool:", message.status);
  } else if (message.isThinking()) {
    console.log("Thinking:", message.text);
  } else if (message.isTyping()) {
    console.log("Typing:", message.text);
  }
});
```

The type guard methods narrow the TypeScript type, so properties
specific to each message kind become available after the check.

## Agent Responses

When `message.isAgent()` returns `true`, the message is an
`AgentMessage` with the agent's response text.

```typescript
if (message.isAgent()) {
  console.log(message.text);
  console.log(message.agentId);
}
```

Some agent messages represent internal reasoning about tool calls
rather than a direct response. The `isThought` method identifies
these:

```typescript
if (message.isAgent() && !message.isThought()) {
  // This is a direct response, not internal reasoning
  renderResponse(message.text);
}
```

## Tool Executions

When `message.isTool()` returns `true`, the message is a `ToolMessage`
representing a tool or subagent execution within the agent pipeline.

```typescript
if (message.isTool()) {
  console.log("Tool:", message.tool?.name);
  console.log("Status:", message.status);
}
```

The `status` field indicates where the tool is in its lifecycle:

| Status      | Meaning                    |
|-------------|----------------------------|
| `pending`   | Scheduled, not yet started |
| `running`   | Currently executing        |
| `completed` | Finished successfully      |
| `error`     | Failed with an error       |
| `cancelled` | Execution was cancelled    |

### Reading Tool Output

Once a tool completes, its output is available:

```typescript
if (message.isTool() && message.status === "completed") {
  console.log(message.output);
}
```

### Detecting Sub-Agents

A tool message may represent a subagent rather than a standalone
tool. Use `isSubAgent` to check, and `subAgentTaskId` to access the
subagent's task:

```typescript
if (message.isTool() && message.isSubAgent()) {
  console.log("Sub-agent task:", message.subAgentTaskId);
}
```

### Tool Errors

Check for errors on a tool message with `hasErrors`:

```typescript
if (message.isTool() && message.hasErrors()) {
  for (const error of message.errors) {
    console.error(error.stepName, error.message);
  }
}
```

## User Messages

User messages represent input sent by the application or end user.
They are included in the message history alongside agent responses.

```typescript
task.addEventListener("message", ({ detail }) => {
  const { message } = detail;

  if (message.isUser()) {
    console.log("User:", message.text);

    if (message.hasAttachments()) {
      for (const attachment of message.attachments) {
        console.log("File:", attachment.fileName);
      }
    }
  }
});
```

The `isTrigger` method returns `true` for the first message in a
conversation (the one that created the task):

```typescript
if (message.isUser() && message.isTrigger()) {
  console.log("Conversation started with:", message.text);
}
```

## Error Handling

Agent errors are delivered through the `"error"` event on the task.
The event detail contains an `AgentErrorMessage` with one or more
error strings.

```typescript
task.addEventListener("error", ({ detail }) => {
  const { message } = detail;
  console.error("Last error:", message.lastError);

  // All errors in this cycle
  for (const error of message.errors) {
    console.error(error);
  }
});
```

Error events indicate that the agent encountered a problem during
execution. The task may transition to an `"error"` or `"action"`
status depending on the nature of the failure. See
[Tasks](./04_TASKS.md) for status details.

## Workforce Messages

Workforce tasks include two additional message types that represent
multi-agent coordination:

- **WorkforceAgentMessage** indicates that an agent within the
  workforce is executing a subtask. It contains details about which
  agent is running and the state of its work.
- **WorkforceAgentHandoverMessage** indicates that work is being
  delegated from one agent to another within the workforce. It
  contains the trigger message and details about the receiving agent.

These messages appear alongside standard agent and tool messages in
the event stream. See [Workforces](./06_WORKFORCES.md) for details on
workforce-specific behavior.

## Streaming Messages

Two message types represent real-time incremental output from the
agent:

- **ThinkingMessage** contains the agent's intermediate reasoning as
  it processes.
- **TypingMessage** contains the agent's response text as it is being
  generated.

Both are identified using the `isThinking` and `isTyping` type guards
shown in the handling example above.

For details on streaming behavior and building live typing indicators,
see [Streaming](./07_STREAMING.md).

---

See also:

- [Agents](./03_AGENTS.md) – Loading agents and starting conversations
- [Tasks](./04_TASKS.md) – Task lifecycle, events, and subscriptions
- [Workforces](./06_WORKFORCES.md) – Multi-agent workforce interactions
- [Streaming](./07_STREAMING.md) – Real-time streaming events
