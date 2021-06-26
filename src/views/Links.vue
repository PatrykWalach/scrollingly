<script lang="ts">
import { LinksSort, useLinksQuery } from "@/generated/graphql";
import { gql, NetworkStatus } from "@apollo/client";
import { computed, defineComponent, toRef, onBeforeUnmount} from "vue";
import Component0, { fragments } from "./Component0.vue";
import { Swiper, SwiperSlide } from "swiper/vue";

import { useBreakpoints } from "@/hooks/useBreakpoints";
import { useFullscreen } from "@/hooks/useFullscreen";

// import "swiper/swiper-bundle.min.css";
//   import 'swiper/components/scrollbar/scrollbar.scss';

import "swiper/swiper.scss";

import SwiperCore, {
  // Mousewheel,
  Virtual,
  // Scrollbar,
  Keyboard,
} from "swiper/core";
import { useViewport } from "@/hooks/useViewport";

SwiperCore.use([
  Virtual,
  // Mousewheel,
  Keyboard,
  //  Scrollbar
]);

export const LINKS = gql`
  query LinksQuery($params: LinksParams!, $after: String) {
    links(params: $params, first: 100, after: $after)
      @rest(
        type: "LinksConnection"
        path: "/r/{args.params.subreddit}/{args.params.sort}.json?{args}&limit={args.first}"
      ) {
      edges {
        node {
          ...Link_node
          id
          permalink
          title
          subreddit
        }
        cursor
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
  ${fragments.node}
`;

export default defineComponent({
  components: {
    Component0,
    Swiper,
    SwiperSlide,
  },

  props: ["subreddit"],

  setup(props) {
    const query = useLinksQuery(
      () => ({
        params: {
          subreddit: props.subreddit,
          sort: LinksSort.New,
          // after: "null",
        },
      }),
      {
        notifyOnNetworkStatusChange: true,
        // returnPartialData: true,
      }
    );

    const fetchMore = (i: number) => {
      if ((links.value?.length || Infinity) - i > 3) {
        return;
      }
      if (query.networkStatus.value !== NetworkStatus.ready) {
        return;
      }
      if (!hasNextPage.value) {
        return;
      }
      console.log("fetchMore");
      query.fetchMore({
        variables: {
          after: query.result.value.links?.pageInfo.endCursor ?? undefined,
        },
      });
    };

    const hasNextPage = computed(
      () => query.result.value?.links?.pageInfo.hasNextPage ?? true
    );
    const links = computed(
      () =>
        query.result.value?.links?.edges?.filter((edge) =>
          edge?.node?.url.endsWith(".jpg")
        ) || []
    );

    const vh = ref(0);

    const listener = () => {
      vh.value = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      );
    };

    listener();

    addEventListener("resize", listener);
    onBeforeUnmount(() => {
      removeEventListener("resize", listener);
    });

    return {
      links,
      mobile: toRef(useBreakpoints(), "mobile"),
      height: toRef(useViewport(), "height"),

      ...useFullscreen(),
      fetchMore,
      // onSlideChange(...arg: unknown[]) {
      //   console.log(...arg);
      // },
    };
  },
});
</script>

<template>
  <swiper
    :style="{ height: `${height - (mobile ? 56 : 0)}px` }"
    direction="vertical"
    keyboard
    virtual
    @reachEnd="fetchMore"
  >
    <!-- @slideChange="onSlideChange" -->
    <swiper-slide
      v-for="({ node, cursor }, index) in links"
      :key="cursor"
      :virtualIndex="index"
      v-slot="{ isActive }"
    >
      <teleport to="#actions" v-if="isActive">
        <a
          class="text-white"
          :style="{ textDecoration: 'unset' }"
          :href="`https://www.reddit.com${node.permalink}`"
          target="_blank"
        >
          <v-btn flat density="comfortable" icon="mdi-open-in-new"> </v-btn>
        </a>
      </teleport>
      <Component0 :isActive="isActive" :node="node" />
    </swiper-slide>
  </swiper>
  <teleport to="#actions">

    <v-btn
      flat
      v-if="isFullscreenSupported"
      density="comfortable"
      :icon="isFullscreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen'"
      @click="isFullscreen = !isFullscreen"
    >
    </v-btn>
  </teleport>
</template>

<style>
</style>
