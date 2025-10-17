import { assertEquals } from "@std/assert";
import { Agent, type AgentConfig } from "./agent.ts";
import { Client } from "./client.ts";
import { Key } from "./key.ts";
import { REGION_US } from "./region.ts";

Deno.test("Agent constructor creates instance with config", () => {
  const config: AgentConfig = {
    agent_id: "agent-123",
    public: true,
    project: "test-project",
    name: "Test Agent",
    description: "A test agent",
    emoji: "🤖",
    insert_date_: "2024-01-01T00:00:00Z",
    update_date_: "2024-01-02T00:00:00Z",
    model: "gpt-4",
  };

  const key = new Key({
    key: "test-key",
    region: REGION_US,
    project: "test-project",
  });
  const client = new Client(key);

  const agent = new Agent(config, client);

  assertEquals(agent.id, "agent-123");
  assertEquals(agent.project, "test-project");
  assertEquals(agent.name, "Test Agent");
  assertEquals(agent.description, "A test agent");
  assertEquals(agent.avatar, "🤖");
  assertEquals(agent.region, REGION_US);
});

Deno.test("Agent.id returns agent_id from config", () => {
  const config: AgentConfig = {
    agent_id: "unique-agent-id",
    public: false,
    project: "test-project",
    insert_date_: "2024-01-01T00:00:00Z",
    update_date_: "2024-01-02T00:00:00Z",
    model: "gpt-4",
  };

  const key = new Key({
    key: "test-key",
    region: REGION_US,
    project: "test-project",
  });
  const client = new Client(key);

  const agent = new Agent(config, client);
  assertEquals(agent.id, "unique-agent-id");
});

Deno.test("Agent.region returns client region", () => {
  const config: AgentConfig = {
    agent_id: "agent-123",
    public: true,
    project: "test-project",
    insert_date_: "2024-01-01T00:00:00Z",
    update_date_: "2024-01-02T00:00:00Z",
    model: "gpt-4",
  };

  const key = new Key({
    key: "test-key",
    region: REGION_US,
    project: "test-project",
  });
  const client = new Client(key);

  const agent = new Agent(config, client);
  assertEquals(agent.region, REGION_US);
});

Deno.test("Agent.project returns project from config", () => {
  const config: AgentConfig = {
    agent_id: "agent-123",
    public: true,
    project: "my-project",
    insert_date_: "2024-01-01T00:00:00Z",
    update_date_: "2024-01-02T00:00:00Z",
    model: "gpt-4",
  };

  const key = new Key({
    key: "test-key",
    region: REGION_US,
    project: "test-project",
  });
  const client = new Client(key);

  const agent = new Agent(config, client);
  assertEquals(agent.project, "my-project");
});

Deno.test("Agent.name returns name from config", () => {
  const config: AgentConfig = {
    agent_id: "agent-123",
    public: true,
    project: "test-project",
    name: "My Custom Agent",
    insert_date_: "2024-01-01T00:00:00Z",
    update_date_: "2024-01-02T00:00:00Z",
    model: "gpt-4",
  };

  const key = new Key({
    key: "test-key",
    region: REGION_US,
    project: "test-project",
  });
  const client = new Client(key);

  const agent = new Agent(config, client);
  assertEquals(agent.name, "My Custom Agent");
});

Deno.test("Agent.name returns undefined when not set", () => {
  const config: AgentConfig = {
    agent_id: "agent-123",
    public: true,
    project: "test-project",
    insert_date_: "2024-01-01T00:00:00Z",
    update_date_: "2024-01-02T00:00:00Z",
    model: "gpt-4",
  };

  const key = new Key({
    key: "test-key",
    region: REGION_US,
    project: "test-project",
  });
  const client = new Client(key);

  const agent = new Agent(config, client);
  assertEquals(agent.name, undefined);
});

Deno.test("Agent.description returns description from config", () => {
  const config: AgentConfig = {
    agent_id: "agent-123",
    public: true,
    project: "test-project",
    description: "This is a helpful agent",
    insert_date_: "2024-01-01T00:00:00Z",
    update_date_: "2024-01-02T00:00:00Z",
    model: "gpt-4",
  };

  const key = new Key({
    key: "test-key",
    region: REGION_US,
    project: "test-project",
  });
  const client = new Client(key);

  const agent = new Agent(config, client);
  assertEquals(agent.description, "This is a helpful agent");
});

Deno.test("Agent.description returns undefined when not set", () => {
  const config: AgentConfig = {
    agent_id: "agent-123",
    public: true,
    project: "test-project",
    insert_date_: "2024-01-01T00:00:00Z",
    update_date_: "2024-01-02T00:00:00Z",
    model: "gpt-4",
  };

  const key = new Key({
    key: "test-key",
    region: REGION_US,
    project: "test-project",
  });
  const client = new Client(key);

  const agent = new Agent(config, client);
  assertEquals(agent.description, undefined);
});

Deno.test("Agent.avatar returns emoji from config", () => {
  const config: AgentConfig = {
    agent_id: "agent-123",
    public: true,
    project: "test-project",
    emoji: "🚀",
    insert_date_: "2024-01-01T00:00:00Z",
    update_date_: "2024-01-02T00:00:00Z",
    model: "gpt-4",
  };

  const key = new Key({
    key: "test-key",
    region: REGION_US,
    project: "test-project",
  });
  const client = new Client(key);

  const agent = new Agent(config, client);
  assertEquals(agent.avatar, "🚀");
});

Deno.test("Agent.avatar returns undefined when not set", () => {
  const config: AgentConfig = {
    agent_id: "agent-123",
    public: true,
    project: "test-project",
    insert_date_: "2024-01-01T00:00:00Z",
    update_date_: "2024-01-02T00:00:00Z",
    model: "gpt-4",
  };

  const key = new Key({
    key: "test-key",
    region: REGION_US,
    project: "test-project",
  });
  const client = new Client(key);

  const agent = new Agent(config, client);
  assertEquals(agent.avatar, undefined);
});

Deno.test("Agent.createdAt returns parsed date", () => {
  const config: AgentConfig = {
    agent_id: "agent-123",
    public: true,
    project: "test-project",
    insert_date_: "2024-01-15T10:30:00Z",
    update_date_: "2024-01-16T10:30:00Z",
    model: "gpt-4",
  };

  const key = new Key({
    key: "test-key",
    region: REGION_US,
    project: "test-project",
  });
  const client = new Client(key);

  const agent = new Agent(config, client);
  const createdAt = agent.createdAt;

  assertEquals(createdAt instanceof Date, true);
  assertEquals(createdAt.toISOString(), "2024-01-15T10:30:00.000Z");
});

Deno.test("Agent.updatedAt returns parsed date", () => {
  const config: AgentConfig = {
    agent_id: "agent-123",
    public: true,
    project: "test-project",
    insert_date_: "2024-01-15T10:30:00Z",
    update_date_: "2024-01-20T14:45:00Z",
    model: "gpt-4",
  };

  const key = new Key({
    key: "test-key",
    region: REGION_US,
    project: "test-project",
  });
  const client = new Client(key);

  const agent = new Agent(config, client);
  const updatedAt = agent.updatedAt;

  assertEquals(updatedAt instanceof Date, true);
  assertEquals(updatedAt.toISOString(), "2024-01-20T14:45:00.000Z");
});
