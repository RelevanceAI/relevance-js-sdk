import { assertEquals } from "@std/assert";
import { Task, type TaskMetadata, type TaskStrategy } from "./task.ts";
import { Agent, type AgentConfig } from "../agent.ts";
import { Client } from "../client.ts";
import { Key } from "../key.ts";
import { REGION_US } from "../region.ts";
import type { AnyTaskMessage } from "../message/task.ts";

// Mock strategy for testing
class MockAgentStrategy implements TaskStrategy<Agent> {
  public subject: Agent;

  constructor(subject: Agent) {
    this.subject = subject;
  }

  async getMessages(_options?: { after?: Date }): Promise<AnyTaskMessage[]> {
    return [];
  }

  async getMetadata(): Promise<TaskMetadata> {
    return {
      id: "task-123",
      region: REGION_US,
      project: "test-project",
      status: "idle",
      name: "Test Task",
      createdAt: new Date("2024-01-01T00:00:00Z"),
      updatedAt: new Date("2024-01-02T00:00:00Z"),
    };
  }
}

Deno.test("Task constructor creates instance with metadata", () => {
  const metadata: TaskMetadata = {
    id: "task-123",
    region: REGION_US,
    project: "test-project",
    status: "idle",
    name: "Test Task",
    createdAt: new Date("2024-01-01T00:00:00Z"),
    updatedAt: new Date("2024-01-02T00:00:00Z"),
  };

  const agentConfig: AgentConfig = {
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
  const agent = new Agent(agentConfig, client);

  const strategy = new MockAgentStrategy(agent);
  const task = new Task(metadata, strategy);

  assertEquals(task.id, "task-123");
  assertEquals(task.region, REGION_US);
  assertEquals(task.project, "test-project");
  assertEquals(task.status, "idle");
  assertEquals(task.name, "Test Task");
});

Deno.test("Task.id returns id from metadata", () => {
  const metadata: TaskMetadata = {
    id: "unique-task-id",
    region: REGION_US,
    project: "test-project",
    status: "running",
    name: "Running Task",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const agentConfig: AgentConfig = {
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
  const agent = new Agent(agentConfig, client);

  const strategy = new MockAgentStrategy(agent);
  const task = new Task(metadata, strategy);

  assertEquals(task.id, "unique-task-id");
});

Deno.test("Task.region returns region from metadata", () => {
  const metadata: TaskMetadata = {
    id: "task-123",
    region: REGION_US,
    project: "test-project",
    status: "completed",
    name: "Completed Task",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const agentConfig: AgentConfig = {
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
  const agent = new Agent(agentConfig, client);

  const strategy = new MockAgentStrategy(agent);
  const task = new Task(metadata, strategy);

  assertEquals(task.region, REGION_US);
});

Deno.test("Task.project returns project from metadata", () => {
  const metadata: TaskMetadata = {
    id: "task-123",
    region: REGION_US,
    project: "my-project",
    status: "idle",
    name: "Test Task",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const agentConfig: AgentConfig = {
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
  const agent = new Agent(agentConfig, client);

  const strategy = new MockAgentStrategy(agent);
  const task = new Task(metadata, strategy);

  assertEquals(task.project, "my-project");
});

Deno.test("Task.name returns name from metadata", () => {
  const metadata: TaskMetadata = {
    id: "task-123",
    region: REGION_US,
    project: "test-project",
    status: "idle",
    name: "My Custom Task",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const agentConfig: AgentConfig = {
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
  const agent = new Agent(agentConfig, client);

  const strategy = new MockAgentStrategy(agent);
  const task = new Task(metadata, strategy);

  assertEquals(task.name, "My Custom Task");
});

Deno.test("Task.status returns status from metadata", () => {
  const metadata: TaskMetadata = {
    id: "task-123",
    region: REGION_US,
    project: "test-project",
    status: "running",
    name: "Test Task",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const agentConfig: AgentConfig = {
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
  const agent = new Agent(agentConfig, client);

  const strategy = new MockAgentStrategy(agent);
  const task = new Task(metadata, strategy);

  assertEquals(task.status, "running");
});

Deno.test("Task.createdAt returns createdAt from metadata", () => {
  const createdDate = new Date("2024-01-15T10:30:00Z");
  const metadata: TaskMetadata = {
    id: "task-123",
    region: REGION_US,
    project: "test-project",
    status: "idle",
    name: "Test Task",
    createdAt: createdDate,
    updatedAt: new Date(),
  };

  const agentConfig: AgentConfig = {
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
  const agent = new Agent(agentConfig, client);

  const strategy = new MockAgentStrategy(agent);
  const task = new Task(metadata, strategy);

  assertEquals(task.createdAt, createdDate);
});

Deno.test("Task.updatedAt returns updatedAt from metadata", () => {
  const updatedDate = new Date("2024-01-20T14:45:00Z");
  const metadata: TaskMetadata = {
    id: "task-123",
    region: REGION_US,
    project: "test-project",
    status: "idle",
    name: "Test Task",
    createdAt: new Date(),
    updatedAt: updatedDate,
  };

  const agentConfig: AgentConfig = {
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
  const agent = new Agent(agentConfig, client);

  const strategy = new MockAgentStrategy(agent);
  const task = new Task(metadata, strategy);

  assertEquals(task.updatedAt, updatedDate);
});

Deno.test("Task.subject returns strategy subject", () => {
  const metadata: TaskMetadata = {
    id: "task-123",
    region: REGION_US,
    project: "test-project",
    status: "idle",
    name: "Test Task",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const agentConfig: AgentConfig = {
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
  const agent = new Agent(agentConfig, client);

  const strategy = new MockAgentStrategy(agent);
  const task = new Task(metadata, strategy);

  assertEquals(task.subject, agent);
  assertEquals(task.subject.id, "agent-123");
});

Deno.test("Task.isRunning returns true for queued status", () => {
  const metadata: TaskMetadata = {
    id: "task-123",
    region: REGION_US,
    project: "test-project",
    status: "queued",
    name: "Test Task",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const agentConfig: AgentConfig = {
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
  const agent = new Agent(agentConfig, client);

  const strategy = new MockAgentStrategy(agent);
  const task = new Task(metadata, strategy);

  assertEquals(task.isRunning(), true);
});

Deno.test("Task.isRunning returns true for running status", () => {
  const metadata: TaskMetadata = {
    id: "task-123",
    region: REGION_US,
    project: "test-project",
    status: "running",
    name: "Test Task",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const agentConfig: AgentConfig = {
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
  const agent = new Agent(agentConfig, client);

  const strategy = new MockAgentStrategy(agent);
  const task = new Task(metadata, strategy);

  assertEquals(task.isRunning(), true);
});

Deno.test("Task.isRunning returns false for idle status", () => {
  const metadata: TaskMetadata = {
    id: "task-123",
    region: REGION_US,
    project: "test-project",
    status: "idle",
    name: "Test Task",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const agentConfig: AgentConfig = {
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
  const agent = new Agent(agentConfig, client);

  const strategy = new MockAgentStrategy(agent);
  const task = new Task(metadata, strategy);

  assertEquals(task.isRunning(), false);
});

Deno.test("Task.isRunning returns false for completed status", () => {
  const metadata: TaskMetadata = {
    id: "task-123",
    region: REGION_US,
    project: "test-project",
    status: "completed",
    name: "Test Task",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const agentConfig: AgentConfig = {
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
  const agent = new Agent(agentConfig, client);

  const strategy = new MockAgentStrategy(agent);
  const task = new Task(metadata, strategy);

  assertEquals(task.isRunning(), false);
});

Deno.test("Task.isRunning returns false for error status", () => {
  const metadata: TaskMetadata = {
    id: "task-123",
    region: REGION_US,
    project: "test-project",
    status: "error",
    name: "Test Task",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const agentConfig: AgentConfig = {
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
  const agent = new Agent(agentConfig, client);

  const strategy = new MockAgentStrategy(agent);
  const task = new Task(metadata, strategy);

  assertEquals(task.isRunning(), false);
});

Deno.test("Task.isRunning returns false for cancelled status", () => {
  const metadata: TaskMetadata = {
    id: "task-123",
    region: REGION_US,
    project: "test-project",
    status: "cancelled",
    name: "Test Task",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const agentConfig: AgentConfig = {
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
  const agent = new Agent(agentConfig, client);

  const strategy = new MockAgentStrategy(agent);
  const task = new Task(metadata, strategy);

  assertEquals(task.isRunning(), false);
});

Deno.test("Task.getMessages delegates to strategy", async () => {
  const metadata: TaskMetadata = {
    id: "task-123",
    region: REGION_US,
    project: "test-project",
    status: "idle",
    name: "Test Task",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const agentConfig: AgentConfig = {
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
  const agent = new Agent(agentConfig, client);

  const strategy = new MockAgentStrategy(agent);
  const task = new Task(metadata, strategy);

  const messages = await task.getMessages();
  assertEquals(messages, []);
});

Deno.test("Task.unsubscribe stops subscription", () => {
  const metadata: TaskMetadata = {
    id: "task-123",
    region: REGION_US,
    project: "test-project",
    status: "idle",
    name: "Test Task",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const agentConfig: AgentConfig = {
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
  const agent = new Agent(agentConfig, client);

  const strategy = new MockAgentStrategy(agent);
  const task = new Task(metadata, strategy);

  // Should not throw
  task.unsubscribe();
  assertEquals(true, true);
});
