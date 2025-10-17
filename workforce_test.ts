import { assertEquals } from "@std/assert";
import { Workforce } from "./workforce.ts";
import { Client } from "./client.ts";
import { Key } from "./key.ts";
import { REGION_EU, REGION_US } from "./region.ts";

Deno.test("Workforce constructor creates instance with config", () => {
  const config = {
    id: "workforce-123",
    workforce_metadata: {
      name: "Test Workforce",
    },
  };

  const key = new Key({
    key: "test-key",
    region: REGION_US,
    project: "test-project",
  });
  const client = new Client(key);

  const workforce = new Workforce(config, client);

  assertEquals(workforce.id, "workforce-123");
  assertEquals(workforce.name, "Test Workforce");
  assertEquals(workforce.region, REGION_US);
  assertEquals(workforce.project, "test-project");
});

Deno.test("Workforce.id returns id from config", () => {
  const config = {
    id: "unique-workforce-id",
    workforce_metadata: {
      name: "My Workforce",
    },
  };

  const key = new Key({
    key: "test-key",
    region: REGION_US,
    project: "test-project",
  });
  const client = new Client(key);

  const workforce = new Workforce(config, client);
  assertEquals(workforce.id, "unique-workforce-id");
});

Deno.test("Workforce.region returns client region", () => {
  const config = {
    id: "workforce-123",
    workforce_metadata: {
      name: "Test Workforce",
    },
  };

  const key = new Key({
    key: "test-key",
    region: REGION_EU,
    project: "test-project",
  });
  const client = new Client(key);

  const workforce = new Workforce(config, client);
  assertEquals(workforce.region, REGION_EU);
});

Deno.test("Workforce.project returns client project", () => {
  const config = {
    id: "workforce-123",
    workforce_metadata: {
      name: "Test Workforce",
    },
  };

  const key = new Key({
    key: "test-key",
    region: REGION_US,
    project: "my-project",
  });
  const client = new Client(key);

  const workforce = new Workforce(config, client);
  assertEquals(workforce.project, "my-project");
});

Deno.test("Workforce.name returns name from metadata", () => {
  const config = {
    id: "workforce-123",
    workforce_metadata: {
      name: "Customer Support Team",
    },
  };

  const key = new Key({
    key: "test-key",
    region: REGION_US,
    project: "test-project",
  });
  const client = new Client(key);

  const workforce = new Workforce(config, client);
  assertEquals(workforce.name, "Customer Support Team");
});

Deno.test("Workforce with different client configurations", () => {
  const config = {
    id: "workforce-456",
    workforce_metadata: {
      name: "Sales Team",
    },
  };

  const key = new Key({
    key: "another-key",
    region: REGION_EU,
    project: "another-project",
  });
  const client = new Client(key);

  const workforce = new Workforce(config, client);

  assertEquals(workforce.id, "workforce-456");
  assertEquals(workforce.name, "Sales Team");
  assertEquals(workforce.region, REGION_EU);
  assertEquals(workforce.project, "another-project");
});
