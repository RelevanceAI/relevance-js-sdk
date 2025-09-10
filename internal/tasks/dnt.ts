import { build, emptyDir } from "@deno/dnt";
import denoConfig from "../../deno.json" with { type: "json" };

await emptyDir("./npm");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {},
  package: {
    name: denoConfig.name,
    version: denoConfig.version,
    license: denoConfig.license,
  },
  test: false,
  scriptModule: false,
  skipSourceOutput: true,
  compilerOptions: {
    target: "ES2022",
    lib: ["ES2022", "DOM"],
  },
  postBuild() {
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});
