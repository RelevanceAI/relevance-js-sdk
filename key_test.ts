import { assertEquals, assertExists } from "@std/assert";
import { Key } from "./key.ts";
import { REGION_EU, REGION_US } from "./region.ts";

Deno.test("Key constructor creates instance with required properties", () => {
  const key = new Key({
    key: "test-key",
    region: REGION_US,
    project: "test-project",
  });

  assertEquals(key.region, REGION_US);
  assertEquals(key.project, "test-project");
  assertEquals(key.agentId, undefined);
  assertEquals(key.workforceId, undefined);
  assertEquals(key.taskPrefix, undefined);
});

Deno.test("Key constructor with agent embed key properties", () => {
  const key = new Key({
    key: "embed-key",
    region: REGION_EU,
    project: "test-project",
    agentId: "agent-123",
    taskPrefix: "prefix-abc",
  });

  assertEquals(key.region, REGION_EU);
  assertEquals(key.project, "test-project");
  assertEquals(key.agentId, "agent-123");
  assertEquals(key.taskPrefix, "prefix-abc");
  assertEquals(key.workforceId, undefined);
});

Deno.test("Key constructor with workforce embed key properties", () => {
  const key = new Key({
    key: "embed-key",
    region: REGION_US,
    project: "test-project",
    workforceId: "workforce-456",
    taskPrefix: "prefix-xyz",
  });

  assertEquals(key.region, REGION_US);
  assertEquals(key.project, "test-project");
  assertEquals(key.workforceId, "workforce-456");
  assertEquals(key.taskPrefix, "prefix-xyz");
  assertEquals(key.agentId, undefined);
});

Deno.test("Key.isEmbed returns false for full keys", () => {
  const key = new Key({
    key: "full-key",
    region: REGION_US,
    project: "test-project",
  });

  assertEquals(key.isEmbed(), false);
});

Deno.test("Key.isEmbed returns true for agent embed keys", () => {
  const key = new Key({
    key: "embed-key",
    region: REGION_US,
    project: "test-project",
    agentId: "agent-123",
    taskPrefix: "prefix-abc",
  });

  assertEquals(key.isEmbed(), true);
});

Deno.test("Key.isEmbed returns true for workforce embed keys", () => {
  const key = new Key({
    key: "embed-key",
    region: REGION_US,
    project: "test-project",
    workforceId: "workforce-456",
    taskPrefix: "prefix-xyz",
  });

  assertEquals(key.isEmbed(), true);
});

Deno.test("Key.isEmbed returns false if taskPrefix is missing", () => {
  const key = new Key({
    key: "embed-key",
    region: REGION_US,
    project: "test-project",
    agentId: "agent-123",
  });

  assertEquals(key.isEmbed(), false);
});

Deno.test("Key.fetchHeaders returns correct Authorization header", () => {
  const key = new Key({
    key: "my-secret-key",
    region: REGION_US,
    project: "my-project",
  });

  const headers = key.fetchHeaders();
  assertExists(headers);

  // Convert to record to access Authorization
  const headerRecord = headers as Record<string, string>;
  assertEquals(headerRecord.Authorization, "my-project:my-secret-key");
});

Deno.test("Key.toJSON returns full key configuration", () => {
  const key = new Key({
    key: "test-key",
    region: REGION_US,
    project: "test-project",
  });

  const json = key.toJSON();
  assertEquals(json, {
    key: "test-key",
    region: REGION_US,
    project: "test-project",
  });
});

Deno.test("Key.toJSON includes agent embed key properties", () => {
  const key = new Key({
    key: "embed-key",
    region: REGION_EU,
    project: "test-project",
    agentId: "agent-123",
    taskPrefix: "prefix-abc",
  });

  const json = key.toJSON();
  assertEquals(json, {
    key: "embed-key",
    region: REGION_EU,
    project: "test-project",
    agentId: "agent-123",
    taskPrefix: "prefix-abc",
  });
});

Deno.test("Key.toJSON includes workforce embed key properties", () => {
  const key = new Key({
    key: "embed-key",
    region: REGION_US,
    project: "test-project",
    workforceId: "workforce-456",
    taskPrefix: "prefix-xyz",
  });

  const json = key.toJSON();
  assertEquals(json, {
    key: "embed-key",
    region: REGION_US,
    project: "test-project",
    workforceId: "workforce-456",
    taskPrefix: "prefix-xyz",
  });
});
