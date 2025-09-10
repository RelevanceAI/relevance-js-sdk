export function abortPromise(signal: AbortSignal, reject?: boolean) {
  return new Promise<void>((res, rej) =>
    signal.addEventListener("abort", () => reject ? rej() : res())
  );
}

export function delay(timeout: number) {
  return new Promise<void>((done) => setTimeout(done, timeout));
}

export async function runInterval(
  runner: () => Promise<void> | void,
  interval: number,
  {
    signal,
  }: { signal?: AbortSignal; immediate?: boolean } = {},
) {
  while (true) {
    if (signal?.aborted) {
      break;
    }

    await runner();

    await Promise.race([
      delay(interval),
      signal ? abortPromise(signal) : new Promise<never>(() => {}),
    ]);
  }
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
