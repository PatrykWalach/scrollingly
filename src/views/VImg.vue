<script lang="ts" setup>
import { Image, Img } from "@/types";
import { computed, defineProps } from "vue";

const toSrcset = (resolutions: Img[]) =>
  resolutions.map(({ width, url }) => `${url} ${width}w`).join(", ");

const props = defineProps<{ image: Image }>();

const allSources = computed(() => [
  ...props.image.resolutions,
  props.image.source,
]);

const srcset = computed(() => toSrcset(allSources.value));

const lazyUrl = computed(() => props.image.resolutions[0]?.url);

const lazyBackground = computed(() =>
  lazyUrl.value
    ? `center / contain no-repeat url('${lazyUrl.value}')`
    : undefined
);
</script>
<template>
  <img
    :style="{
      background: lazyBackground,
    }"
    class="max-h-full w-full flex-1 object-contain"
    :src="image.source.url"
    :srcset="srcset"
    :height="image.source.height"
    :width="image.source.width"
  />
</template>
