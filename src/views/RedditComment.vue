<script lang="ts">
export default { name: "RedditComment" };
</script>

<script lang="ts" setup>
import { formatDistance } from "date-fns";
import { computed, defineProps } from "vue";
import { Comment } from "../types";

const props = defineProps<{ comment: Comment }>();

let replies = computed(
  () =>
    (typeof props.comment.data.replies !== "string" &&
      props.comment.data.replies.data.children) ||
    []
);

const createdUtc = computed(() => props.comment.data.created_utc * 1000);
const formattedCreatedUtc = computed(
  () => `${formatDistance(Date.now(), createdUtc.value)} ago`
);
</script>
<template>
  <li class="ml-4 py-2">
    <div class="font-medium leading-5 text-sm">
      {{ comment.data.author }}
    </div>
    <div v-html="comment.data.body_html"></div>
    <ul
      class="
        flex
        mt-1
        space-x-1
        text-xs
        font-normal
        leading-4
        text-coolGray-500
      "
    >
      <li>
        <time :datetime="new Date(createdUtc).toISOString()"
          >{{ formattedCreatedUtc }}
        </time>
      </li>
      <li>&middot;</li>
      <li><mdicon name="arrow-up" size="16"></mdicon></li>
      <li>
        <span>{{ comment.data.ups }}</span>
      </li>
    </ul>
    <template v-if="replies.length">
      <ul class="list-disc">
        <RedditComment
          :key="comment.data.id"
          v-for="comment in replies"
          :comment="comment"
        ></RedditComment>
      </ul>
    </template>
  </li>
</template>

<style lang="scss">
a {
  @apply text-purple-700;
}
</style>
