<script lang="ts">
import { ref } from "vue";
const volume = ref(0.5);
</script>
<script lang="ts" setup>
import { LinkData } from "@/types";
import { computed, defineProps, watch } from "vue";
import Hls from "hls.js";
import VImg from "./VImg.vue";

const props = defineProps<{ node: LinkData; isActive: boolean }>();

const images = computed(() => props.node.preview?.images || []);

const video = ref(document.createElement("video"));

const redditVideo = computed(() =>
  props.node.secure_media && "reddit_video" in props.node.secure_media
    ? props.node.secure_media.reddit_video
    : null
);

watch(video, (video, _, onCleanup) => {
  video.volume = volume.value;
  const listener = () => {
    volume.value = video.volume;
  };

  video.addEventListener("volumechange", listener);

  onCleanup(() => {
    video.removeEventListener("volumechange", listener);
  });
});

watch([video, redditVideo], ([video, redditVideo], _, onCleanup) => {
  if (redditVideo && Hls.isSupported()) {
    const hls = new Hls();

    hls.attachMedia(video);

    hls.on(Hls.Events.MEDIA_ATTACHED, () => {
      hls.loadSource(redditVideo.hls_url);
      hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
        //
      });
    });

    onCleanup(() => {
      hls.destroy();
    });
  }
});
</script>

<template>
  <div class="h-full flex justify-center items-center">
    <template v-if="redditVideo">
      <video
        :width="redditVideo.width"
        :height="redditVideo.height"
        v-bind="
          redditVideo.is_gif
            ? {
                autoplay: true,
                loop: true,
                muted: true,
                playsinline: true,
              }
            : { controls: true }
        "
        ref="video"
        class="max-h-full w-full flex-1 object-contain"
      >
        <source :src="redditVideo.dash_url" type="application/dash+xml" />
        <source :src="redditVideo.fallback_url" type="video/mp4" />
        <source :src="redditVideo.hls_url" type="application/x-mpegURL" />
        <source :src="redditVideo.scrubber_media_url" type="video/mp4" />
        Video not supported
      </video>
    </template>
    <template v-else-if="'content' in node.secure_media_embed">
      <div v-html="node.secure_media_embed.content"></div>
    </template>
    <template v-else v-for="{ variants, id, ...image } in images" :key="id">
      <video
        v-if="variants.mp4"
        class="max-h-full w-full flex-1 object-contain"
        :width="variants.mp4.source.width"
        :height="variants.mp4.source.height"
        :src="variants.mp4.source.url"
        autoplay
        loop
        muted
        playsinline
      >
        <v-img v-if="variants.gif" :image="variants.gif" />
      </video>

      <v-img v-else :image="image" />
    </template>

    <teleport to="#actions" v-if="isActive">
      <a
        :href="`https://www.reddit.com${node.permalink}`"
        target="_blank"
        class="p-2 rounded-full focus:ring-2 hover:bg-black/[0.08] text-white"
      >
        <mdicon name="open-in-new" title="Reddit link" size="20"></mdicon>
      </a>
      <router-link
        :to="{
          name: 'Comments',
          params: { article: node.id, subreddit: node.subreddit },
        }"
        class="
          p-2
          gap-2
          rounded-md
          focus:ring-2
          hover:bg-black/[0.08]
          text-white
          flex
          sm:flex-col
          items-center
        "
      >
        <mdicon name="comment-text-outline" title="Comments" size="18"></mdicon>
        {{ node.num_comments }}
      </router-link>
    </teleport>
  </div>
</template>
