# Streaming

This document covers real-time streaming of agent output. Streaming
delivers incremental thinking and typing tokens as the agent
processes, enabling live feedback in applications before the final
response is complete.

## What Streaming Provides

As an agent works through a request, it produces two kinds of
incremental output:

- **Thinking tokens** represent the agent's intermediate reasoning and
  planning. These are useful for showing progress indicators or debug
  views.
- **Typing tokens** represent the agent's response text as it is being
  generated. These enable character-by-character or chunk-by-chunk
  rendering of the response.

Both arrive through the standard `"message"` event on a task,
alongside the final polled messages.

## Streaming Is Automatic

The SDK enables and manages streaming automatically. There is no
configuration required. When a task is subscribed to (via
`addEventListener`), the SDK opens a streaming connection if one is
available. Token refresh, reconnection, and cleanup are handled
internally.

Streaming works across all supported runtimes: browsers, Node.js,
Deno, Bun, and Cloudflare Workers.

## Listening for Streaming Events

Streaming messages arrive through the same `"message"` event used for
all other message types. Use the `isThinking` and `isTyping` type
guards to identify them:

```typescript
task.addEventListener("message", ({ detail }) => {
  const { message } = detail;

  if (message.isThinking()) {
    console.log("[thinking]", message.text);
  }

  if (message.isTyping()) {
    process.stdout.write(message.text);
  }
});
```

Both `ThinkingMessage` and `TypingMessage` expose a `text` property
containing the incremental content.

## Building a Live Typing Indicator

A common use case is rendering the agent's response in real time as it
is generated. Accumulate typing tokens into a buffer and render them
as they arrive:

```typescript
let buffer = "";

task.addEventListener("message", ({ detail }) => {
  const { message } = detail;

  if (message.isTyping()) {
    buffer += message.text;
    renderPartialResponse(buffer);
  }

  if (message.isAgent() && !message.isThought()) {
    // Final response arrived; replace the buffer
    buffer = "";
    renderFinalResponse(message.text);
  }
});
```

The typing tokens represent the same content that will eventually
appear in the final `AgentMessage`. Once the final message arrives,
the application can replace the accumulated buffer with the complete
response.

## Distinguishing Thinking from Typing

Thinking and typing represent different phases of the agent's
processing:

- **Thinking** occurs while the agent reasons about what to do next,
  which tools to call, or how to structure its response. Applications
  may choose to show this as a "thinking..." indicator, display it in
  a debug panel, or ignore it entirely.

- **Typing** occurs as the agent generates its actual response text.
  This is the content that will appear in the final agent message.

```typescript
task.addEventListener("message", ({ detail }) => {
  const { message } = detail;

  if (message.isThinking()) {
    showThinkingIndicator(message.text);
  }

  if (message.isTyping()) {
    appendToResponse(message.text);
  }
});
```

## Streaming Lifecycle

Streaming follows the same lifecycle as task subscriptions:

- **Start**: When the first event listener is added to a task, the SDK
  subscribes and opens a streaming connection if available.
- **Active**: Thinking and typing tokens arrive through the `"message"`
  event as the agent processes. The SDK manages connection health and
  token refresh transparently.
- **End**: When `task.unsubscribe()` is called, the streaming
  connection is closed along with the polling loop.

There is no separate subscription or connect step for streaming. It is
part of the standard task subscription and follows the same cleanup
rules described in [Tasks](./04_TASKS.md).

---

See also:

- [Tasks](./04_TASKS.md) – Task subscriptions and event handling
- [Messaging](./05_MESSAGING.md) – All message types including
  ThinkingMessage and TypingMessage
