export function abortPromise(signal: AbortSignal, reject?: boolean) {
  return new Promise<void>((res, rej) =>
    signal.addEventListener("abort", () => reject ? rej() : res())
  );
}

export function delay(timeout: number | (() => number)) {
  return new Promise<void>((done) =>
    setTimeout(done, typeof timeout === "number" ? timeout : timeout())
  );
}

export function cleanPath(path: string, version = "latest"): string {
  return `/${version}/${path.trim().replace(/^\/+/, "")}`;
}

export async function randomUUID() {
  if (typeof crypto !== "undefined") {
    return crypto.randomUUID();
  }

  // @ts-ignore allow this import for node builds
  const cryptoModule = await import("node:crypto");

  return cryptoModule.randomUUID();
}
