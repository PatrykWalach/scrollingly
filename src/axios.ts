import { cached } from "./hooks/useQuery";

import { default as globalAxios } from "axios";

export function createCancelToken(abort: AbortSignal) {
  return new globalAxios.CancelToken((cancel) => {
    abort.onabort = () => {
      cancel();
    };
  });
}

let acc: any;

const instance = globalAxios.create({
  baseURL: "https://www.reddit.com/r",
  transformResponse: [
    JSON.parse,
    (data) => {
      try {
        console.log("detectTypes", data);
        acc = detectTypes(data?.data?.children || [], acc);
        console.log(acc);
      } catch {
        console.error("detectTypes error");
      }
      return data;
    },
  ],
});

// instance.interceptors.request.use((config) => {
//   NProgress.start();
//   return config;
// });

// // before a response is returned stop nprogress
// instance.interceptors.response.use((response) => {
//   NProgress.done();
//   return response;
// });

export default cached()(instance);

import { inject, InjectionKey } from "vue";

export const AXIOS = Symbol("AXIOS") as InjectionKey<typeof instance>;

export const useAxios = () => {
  const axios = inject(AXIOS, null);
  if (axios === null) {
    throw "no client";
  }
  return axios;
};

export function detectTypes(
  edges: { data: Record<string, unknown> }[],
  acc = Object.fromEntries(
    Object.keys(edges[0].data).map((k) => [k, [] as string[]])
  )
): any {
  // return edges.reduce<Record<string, string[]>>((acc, edge: any) => {
  for (const edge of edges) {
    for (const key in edge?.data ?? []) {
      const type = getType(edge?.data[key]);

      if (!Array.isArray(acc[key])) {
        acc[key] = [];
      }
      if (!acc[key].includes(type)) {
        acc[key].push(type);
      }
    }
  }

  return acc;
}

const getType = (t: unknown): string =>
  t === null || t === undefined
    ? "null"
    : Array.isArray(t)
    ? t.length > 0
      ? `array<${t.map(getType).join(",")}>`
      : "array"
    : typeof t;
