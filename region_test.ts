import { assertEquals } from "@std/assert";
import { REGION_AU, REGION_EU, REGION_US, regionBaseURL } from "./region.ts";

Deno.test("REGION_US constant", () => {
  assertEquals(REGION_US, "bcbe5a");
});

Deno.test("REGION_EU constant", () => {
  assertEquals(REGION_EU, "d7b62b");
});

Deno.test("REGION_AU constant", () => {
  assertEquals(REGION_AU, "f1db6c");
});

Deno.test("regionBaseURL with US region", () => {
  const url = regionBaseURL(REGION_US);
  assertEquals(url, "https://api-bcbe5a.stack.tryrelevance.com");
});

Deno.test("regionBaseURL with EU region", () => {
  const url = regionBaseURL(REGION_EU);
  assertEquals(url, "https://api-d7b62b.stack.tryrelevance.com");
});

Deno.test("regionBaseURL with AU region", () => {
  const url = regionBaseURL(REGION_AU);
  assertEquals(url, "https://api-f1db6c.stack.tryrelevance.com");
});
