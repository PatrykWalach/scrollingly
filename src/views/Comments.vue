<script lang="ts" setup>
import { useIsActivated, useMetaData } from "@/hooks/useMetaData";
import { Comment, Listing } from "@/types";
import { computed } from "vue";
import RedditComment from "./RedditComment.vue";

const result = useMetaData<Listing<Comment>>();

const isActivated = useIsActivated();

const comments = computed(() => result.value?.data.children || []);
</script>
<template>
  <div class="p-4 md:p-8 flex-1">
    <ul class="list-disc">
      <RedditComment
        :key="comment.data.id"
        v-for="comment in comments"
        :comment="comment"
      ></RedditComment>
    </ul>
  </div>

  <teleport to="#actions" v-if="isActivated">
    <!--  div-->
    <button
      @click="$router.back"
      class="p-2 rounded-full focus:ring-2 hover:bg-black/[0.08] text-white"
    >
      <mdicon name="arrow-left" title="Back" size="20"></mdicon>
    </button>
  </teleport>
</template>
