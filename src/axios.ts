import { default as globalAxios } from "axios";
import { inject, InjectionKey } from "vue";
import { createUseCache, createUseProgress } from "./hooks/useQuery";

export function createCancelToken(abort: AbortSignal) {
  return new globalAxios.CancelToken((cancel) => {
    abort.onabort = () => {
      cancel();
    };
  });
}

const instance = globalAxios.create({
  baseURL: "https://www.reddit.com",
});

instance.interceptors.request.use((config) => {
  useProgress().start();
  return config;
});

instance.interceptors.response.use((response) => {
  useProgress().done();
  return response;
});

const [withProgress, useProgress] = createUseProgress({
  id: "progress",
});

const [withCache, useCache] = createUseCache({ id: "cache" });

export default withCache(instance);

export { useCache, useProgress };


