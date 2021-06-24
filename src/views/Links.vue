<script lang="ts">
import { useLinksQuery } from "@/generated/graphql";
import { gql, NetworkStatus } from "@apollo/client";
import { computed, onBeforeUnmount, ref } from "vue";
import Component0 from "./Component0.vue";

import { Swiper, SwiperSlide } from "swiper/vue";

// import "swiper/swiper-bundle.min.css";
//   import 'swiper/components/scrollbar/scrollbar.scss';

import "swiper/swiper.scss";

import SwiperCore, {
  // Mousewheel,
  Virtual,
  // Scrollbar,
  Keyboard,
} from "swiper/core";

SwiperCore.use([
  Virtual,
  // Mousewheel,
  Keyboard,
  //  Scrollbar
]);

export const LINKS = gql`
  query Links($subreddit: String!, $after: String!) {
    links(subreddit: $subreddit, first: 100, after: $after)
      @rest(
        type: "LinksConnection"
        path: "/r/{args.subreddit}/new.json?{args}&limit={args.first}"
      ) {
      edges {
        node {
          url
          thumbnail
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
`;

import { defineComponent } from "vue";

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
        subreddit: props.subreddit,
        after: "null",
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
          after: query.result.value.links?.pageInfo.endCursor ?? "null",
        },
      });
    };

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
      vh,
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
    :style="{ height: '100vh' }"
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
      <teleport to="body">
        <a :href="`https://www.reddit.com${node.permalink}`" target="_blank">
          <v-btn
            v-if="isActive"
            fab
            :style="{ position: 'fixed', right: '40px', bottom: '40px' }"
            x-large
            color="primary"
          >
            link
          </v-btn></a
        >
      </teleport>
      <Component0 :height="vh" :node="node" />
    </swiper-slide>
  </swiper>
</template>

<style>
</style>
