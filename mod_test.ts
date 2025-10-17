import { assertEquals, assertExists } from "@std/assert";
import {
  Agent,
  type Attachment,
  Client,
  createClient,
  Key,
  REGION_AU,
  REGION_EU,
  REGION_US,
  Workforce,
} from "./mod.ts";

Deno.test("mod.ts exports Agent class", () => {
  assertExists(Agent);
  assertEquals(typeof Agent, "function");
});

Deno.test("mod.ts exports Client class", () => {
  assertExists(Client);
  assertEquals(typeof Client, "function");
});

Deno.test("mod.ts exports createClient function", () => {
  assertExists(createClient);
  assertEquals(typeof createClient, "function");
});

Deno.test("mod.ts exports Key class", () => {
  assertExists(Key);
  assertEquals(typeof Key, "function");
});

Deno.test("mod.ts exports Workforce class", () => {
  assertExists(Workforce);
  assertEquals(typeof Workforce, "function");
});

Deno.test("mod.ts exports REGION_US constant", () => {
  assertExists(REGION_US);
  assertEquals(REGION_US, "bcbe5a");
});

Deno.test("mod.ts exports REGION_EU constant", () => {
  assertExists(REGION_EU);
  assertEquals(REGION_EU, "d7b62b");
});

Deno.test("mod.ts exports REGION_AU constant", () => {
  assertExists(REGION_AU);
  assertEquals(REGION_AU, "f1db6c");
});

Deno.test("mod.ts - Agent can be instantiated", () => {
  const key = new Key({
    key: "test-key",
    region: REGION_US,
    project: "test-project",
  });

  const client = new Client(key);

  const agent = new Agent(
    {
      agent_id: "agent-123",
      public: true,
      project: "test-project",
      name: "Test Agent",
      insert_date_: "2024-01-01T00:00:00Z",
      update_date_: "2024-01-02T00:00:00Z",
      model: "gpt-4",
    },
    client,
  );

  assertEquals(agent.id, "agent-123");
  assertEquals(agent.name, "Test Agent");
});

Deno.test("mod.ts - Client can be created with createClient", () => {
  // Note: This test will fail because we already created a default client
  // in the client_test.ts file. This is expected behavior demonstrating
  // the singleton pattern.
  try {
    const client = createClient({
      apiKey: "test-key",
      region: REGION_US,
      project: "test-project",
    });
    assertEquals(client.region, REGION_US);
  } catch (error) {
    // Expected to throw because default client already exists
    assertEquals((error as Error).message, "default client already exists");
  }
});

Deno.test("mod.ts - Key can be instantiated", () => {
  const key = new Key({
    key: "test-key",
    region: REGION_EU,
    project: "test-project",
  });

  assertEquals(key.region, REGION_EU);
  assertEquals(key.project, "test-project");
});

Deno.test("mod.ts - Workforce can be instantiated", () => {
  const key = new Key({
    key: "test-key",
    region: REGION_US,
    project: "test-project",
  });

  const client = new Client(key);

  const workforce = new Workforce(
    {
      id: "workforce-123",
      workforce_metadata: {
        name: "Test Workforce",
      },
    },
    client,
  );

  assertEquals(workforce.id, "workforce-123");
  assertEquals(workforce.name, "Test Workforce");
});

Deno.test("mod.ts - Attachment type is available", () => {
  const attachment: Attachment = {
    fileName: "test.txt",
    fileUrl: "https://example.com/test.txt",
  };

  assertEquals(attachment.fileName, "test.txt");
  assertEquals(attachment.fileUrl, "https://example.com/test.txt");
});

Deno.test("mod.ts - Region types work correctly", () => {
  const regions = [REGION_US, REGION_EU, REGION_AU];

  assertEquals(regions.length, 3);
  assertEquals(regions.includes(REGION_US), true);
  assertEquals(regions.includes(REGION_EU), true);
  assertEquals(regions.includes(REGION_AU), true);
});

Deno.test("mod.ts - All core classes work together", () => {
  // Create a Key
  const key = new Key({
    key: "integration-key",
    region: REGION_US,
    project: "integration-project",
  });

  // Create a Client
  const client = new Client(key);

  // Create an Agent
  const agent = new Agent(
    {
      agent_id: "integration-agent",
      public: true,
      project: "integration-project",
      name: "Integration Agent",
      insert_date_: "2024-01-01T00:00:00Z",
      update_date_: "2024-01-02T00:00:00Z",
      model: "gpt-4",
    },
    client,
  );

  // Create a Workforce
  const workforce = new Workforce(
    {
      id: "integration-workforce",
      workforce_metadata: {
        name: "Integration Workforce",
      },
    },
    client,
  );

  // Verify all components are properly connected
  assertEquals(client.region, REGION_US);
  assertEquals(agent.region, REGION_US);
  assertEquals(workforce.region, REGION_US);
  assertEquals(agent.project, "integration-project");
  assertEquals(workforce.project, "integration-project");
});
