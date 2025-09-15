export type EventMap = Record<string, unknown>;

/**
 * Emitter
 *
 * Abstraction for type-assisting event targets.
 *
 * @internal
 */
export abstract class Emitter<M extends EventMap> extends EventTarget {
  public override addEventListener<K extends keyof M>(
    type: Extract<K, string>,
    listener: ((event: CustomEvent<M[K]>) => void) | {
      handleEvent: (event: CustomEvent<M[K]>) => void;
    } | null,
    options?: boolean | AddEventListenerOptions,
  ): void {
    super.addEventListener(type, listener as EventListener, options);
  }

  public override removeEventListener<K extends keyof M>(
    type: Extract<K, string>,
    listener: ((event: CustomEvent<M[K]>) => void) | {
      handleEvent: (event: CustomEvent<M[K]>) => void;
    } | null,
    options?: boolean | AddEventListenerOptions,
  ): void {
    super.removeEventListener(type, listener as EventListener, options);
  }
}
