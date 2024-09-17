export type WithAbortController<T> = T & { signal?: AbortSignal };
