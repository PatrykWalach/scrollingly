<script lang="ts">
import "swiper/css";
import "swiper/css/keyboard";
import "swiper/css/mousewheel";
import "swiper/css/scrollbar";
import "swiper/css/virtual";
</script>

<script lang="ts" setup>
import { getLinks, LinksSort } from "@/api/reddit";
import { Link, Listing } from "@/types";
import { Swiper, SwiperSlide } from "swiper/vue";
import { computed, onBeforeUnmount, ref, shallowRef, watch } from "vue";
import { useRoute } from "vue-router";
import RedditLink from "./RedditLink.vue";
import { Keyboard, Mousewheel, Scrollbar, Virtual } from "swiper";
const modules = [
  Virtual,
  Mousewheel,
  Keyboard,
  Scrollbar,
  // History,
];
function updateResult(
  result: Listing<Link> | null,
  nextResult: Listing<Link>
): Listing<Link> {
  return {
    ...result,
    ...nextResult,
    data: {
      ...result?.data,
      ...nextResult.data,
      children: [...(result?.data.children ?? []), ...nextResult.data.children],
    },
  };
}

const route = useRoute();

const data = computed(() => route.meta.data as Listing<Link>);

const result = shallowRef(data.value);

watch(data, (data) => {
  result.value = data;
});

let promise: Promise<unknown> | null = null;

const fetchMore = async () => {
  if (after.value === null || promise !== null) {
    return;
  }

  promise = getLinks({
    subreddit: route.params.subreddit as string,
    sort: route.params.sort as LinksSort,
    after: after.value,
  }).then((nextResult) => {
    result.value = updateResult(result.value, nextResult);
    promise = null;
  });
};

const after = computed(() => result.value.data.after ?? null);

const links = computed(
  () =>
    result.value.data.children.filter((link) =>
      (
        ["hosted:video", "image", "rich:video"] as (string | undefined)[]
      ).includes(link.data.post_hint)
    ) || []
);

watch(links, (links, prev) => {
  if (links.length <= prev.length) {
    fetchMore();
  }
});

function getFullname(node: { kind: string; data: { id: string } }) {
  return node.kind + "_" + node.data.id;
}

const height = ref(window.visualViewport.height);

function resizeHandler() {
  height.value = window.visualViewport.height;
}

window.visualViewport.addEventListener("resize", resizeHandler);

onBeforeUnmount(() => {
  window.visualViewport.removeEventListener("resize", resizeHandler);
});
</script>

<template>
  <swiper
    :modules="modules"
    class="sm:!h-screen"
    :style="{ height: `${height - 56}px` }"
    direction="vertical"
    keyboard
    virtual
    mousewheel
    @reachEnd="fetchMore"
    :scrollbar="{ snapOnRelease: true, draggable: true, hide: true }"
  >
    <swiper-slide
      v-for="(node, index) in links"
      :key="getFullname(node)"
      :virtualIndex="index"
      v-slot="{ isActive }"
    >
      <RedditLink :isActive="isActive" :node="node.data" />
    </swiper-slide>

    <swiper-slide
      :virtualIndex="links.length"
      v-if="after !== null"
      v-slot="{ isActive }"
    >
      <template v-if="isActive"></template>

      <div class="h-full flex justify-center items-center"></div>
    </swiper-slide>
  </swiper>
</template>

<style></style>
