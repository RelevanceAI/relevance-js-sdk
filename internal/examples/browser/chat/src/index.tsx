import { render } from "preact";
import { Suspense } from "preact/compat";
import { App } from "@/components/app";

render(
  <Suspense fallback={<em>loading...</em>}>
    <App />
  </Suspense>,
  document.getElementById("app"),
);
