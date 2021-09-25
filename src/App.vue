<template>
  <main class="mb-[56px] sm:mr-[56px] sm:mb-0">
    <router-view />
  </main>

  <nav
    :class="[
      `fixed
        right-0
        bottom-0
        w-screen
        flex
        gap-3
        h-14
        px-1.5
        py-2.5`,
      'sm:w-14 sm:h-screen sm:flex-col sm:px-2.5 sm:py-1.5 sm:justify-center',
      'bg-purple-600',
    ]"
    id="actions"
  ></nav>
</template>

<script lang="ts" setup>
import { customRef, shallowRef, watch } from "vue";
import { getAutocomplete } from "./api/reddit";
import { Comment, Listing, Subreddit } from "./types";
function useDebouncedRef<T>(value: T, delay: number) {
  let timeout: number | undefined;
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue: T) {
        value = newValue;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          trigger();
        }, delay);
      },
    };
  });
}

const query = useDebouncedRef("", 500);
const result = shallowRef<Listing<Comment | Subreddit> | null>(null);

watch(query, async (query) => {
  try {
    result.value = await getAutocomplete({ query });
  } catch {
    result.value = null;
  }
});
</script>

<style>
#app {
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
