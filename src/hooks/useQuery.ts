const sortObject = (value: unknown): unknown =>
  Array.isArray(value)
    ? value.map(sortObject)
    : typeof value === "object" && value
    ? Object.fromEntries(
        Object.entries(value)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([key, value]) => [key, sortObject(value)])
      )
    : value;

const serialize = (key: unknown) =>
  typeof key === "string" ? key : JSON.stringify(sortObject(key));

import { defineStore } from "pinia";

export const createUseCache = ({ id = "cache", time = 20000 } = {}) => {
  // const cache = new Map<string, { timestamp: number; data: unknown }>();
  const useCache = defineStore({
    id,

    state() {
      const cache: Record<string, { timestamp: number; data: unknown }> = {};

      return {
        cache,
      };
    },
    actions: {
      get(key: string) {
        const cached = this.cache[key];
        if (cached !== undefined && Date.now() - cached.timestamp < time) {
          return cached.data;
        }
      },

      set(key: string, data: unknown) {
        this.cache[key] = { data, timestamp: Date.now() };
        return this;
      },
    },
  });

  return [
    <Args extends unknown[], R>(fn: (...args: Args) => R) =>
      (...args: Args): R => {
        const cache = useCache();

        const serializedKey = serialize(args);
        const cached = cache.get(serializedKey);
        if (cached !== undefined) {
          return cached as R;
        }
        const result = fn(...args);
        cache.set(serializedKey, result);
        return result;
      },
    useCache,
  ] as const;
};

export const createUseProgress = ({ id = "progress" } = {}) => {
  const useProgress = defineStore({
    id,

    state() {
      return {
        isActive: false,
      };
    },

    actions: {
      start() {
        this.isActive = true;
      },
      done() {
        this.isActive = false;
      },
    },
  });

  return [
    <Args extends unknown[], R>(fn: (...args: Args) => Promise<R>) =>
      async (...args: Args): Promise<R> => {
        const progress = useProgress();

        progress.start();
        try {
          return await fn(...args);
        } finally {
          progress.done();
        }
      },
    useProgress,
  ] as const;
};
