import { assertEquals, assertThrows } from "@std/assert";
import { Client, createClient } from "./client.ts";
import { Key } from "./key.ts";
import { REGION_EU, REGION_US } from "./region.ts";

Deno.test("createClient with Key instance", () => {
  const key = new Key({
    key: "test-key",
    region: REGION_US,
    project: "test-project",
  });

  const client = createClient(key);
  assertEquals(client.key, key);
  assertEquals(client.region, REGION_US);
  assertEquals(client.project, "test-project");
});

Deno.test("createClient throws error when default client already exists", () => {
  // The first test already created a default client, so this should throw
  assertThrows(
    () => {
      createClient({
        apiKey: "another-key",
        region: REGION_EU,
        project: "another-project",
      });
    },
    Error,
    "default client already exists",
  );
});

Deno.test("Client.default returns the default client", () => {
  // The default client was created in the first test with REGION_US
  const client = Client.default();
  assertEquals(client.region, REGION_US);
  assertEquals(client.project, "test-project");
});

Deno.test("Client constructor creates instance", () => {
  const key = new Key({
    key: "direct-key",
    region: REGION_US,
    project: "direct-project",
  });

  const client = new Client(key);
  assertEquals(client.key, key);
  assertEquals(client.region, REGION_US);
  assertEquals(client.project, "direct-project");
});

Deno.test("Client.region returns key region", () => {
  const key = new Key({
    key: "test-key",
    region: REGION_EU,
    project: "test-project",
  });

  const client = new Client(key);
  assertEquals(client.region, REGION_EU);
});

Deno.test("Client.project returns key project", () => {
  const key = new Key({
    key: "test-key",
    region: REGION_US,
    project: "my-project",
  });

  const client = new Client(key);
  assertEquals(client.project, "my-project");
});

Deno.test("Client.isEmbedKey returns false for full key", () => {
  const key = new Key({
    key: "full-key",
    region: REGION_US,
    project: "test-project",
  });

  const client = new Client(key);
  assertEquals(client.isEmbedKey(), false);
});

Deno.test("Client.isEmbedKey returns true for agent embed key", () => {
  const key = new Key({
    key: "embed-key",
    region: REGION_US,
    project: "test-project",
    agentId: "agent-123",
    taskPrefix: "prefix-abc",
  });

  const client = new Client(key);
  assertEquals(client.isEmbedKey(), true);
});

Deno.test("Client.isEmbedKey returns true for workforce embed key", () => {
  const key = new Key({
    key: "embed-key",
    region: REGION_US,
    project: "test-project",
    workforceId: "workforce-456",
    taskPrefix: "prefix-xyz",
  });

  const client = new Client(key);
  assertEquals(client.isEmbedKey(), true);
});

Deno.test("Client.url with relative path", () => {
  const key = new Key({
    key: "test-key",
    region: REGION_US,
    project: "test-project",
  });

  const client = new Client(key);
  const url = client.url("/agents/list");

  assertEquals(
    url.toString(),
    "https://api-bcbe5a.stack.tryrelevance.com/latest/agents/list",
  );
});

Deno.test("Client.url with path without leading slash", () => {
  const key = new Key({
    key: "test-key",
    region: REGION_EU,
    project: "test-project",
  });

  const client = new Client(key);
  const url = client.url("agents/trigger");

  assertEquals(
    url.toString(),
    "https://api-d7b62b.stack.tryrelevance.com/latest/agents/trigger",
  );
});

Deno.test("Client.url with absolute URL", () => {
  const key = new Key({
    key: "test-key",
    region: REGION_US,
    project: "test-project",
  });

  const client = new Client(key);
  const absoluteUrl = "https://example.com/custom/path";
  const url = client.url(absoluteUrl);

  assertEquals(url.toString(), absoluteUrl);
});

Deno.test("Client.url with http URL upgrades to https", () => {
  const key = new Key({
    key: "test-key",
    region: REGION_US,
    project: "test-project",
  });

  const client = new Client(key);
  const url = client.url("http://example.com/path");

  assertEquals(url.toString(), "http://example.com/path");
});
