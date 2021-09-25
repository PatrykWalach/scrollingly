<script lang="ts" setup>
import { Comment, Listing } from "@/types";
import { watch } from "@vue/runtime-core";
import { computed, shallowRef } from "vue";
import { useRoute } from "vue-router";
import RedditComment from "./RedditComment.vue";

const route = useRoute();

const data = computed(() => route.meta.data as Listing<Comment>);

const result = shallowRef(data.value);

watch(data, (data) => {
  result.value = data;
});
</script>
<template>
  <div class="flex-1">
    <ul class="list-disc">
      <RedditComment
        :key="comment.data.id"
        v-for="comment in result.data.children"
        :comment="comment"
      ></RedditComment>
    </ul>
  </div>

  <teleport to="#actions">
    <!--  div-->
    <button
      @click="$router.back"
      class="p-2 rounded-full focus:ring-2 hover:bg-black/[0.08] text-white"
    >
      <mdicon name="arrow-left" title="Back" size="20"></mdicon>
    </button>
  </teleport>
</template>
