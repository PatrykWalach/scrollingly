<script lang="ts">
import { gql } from "@apollo/client";
import { defineComponent, PropType, toRef } from "vue";
import { Link_Node } from "../generated/graphql";

import { useBreakpoints } from "@/hooks/useBreakpoints";
import { useClipboard } from "@/hooks/useClipboard";
import { useViewport } from "@/hooks/useViewport";
export const fragments = {
  node: gql`
    fragment Link_node on Link {
      url
      thumbnail
      id
      permalink
      title
      subreddit
      postHint
    }
  `,
};

export default defineComponent({
  props: {
    node: { type: Object as PropType<Link_Node>, required: true },
    isActive: { type: Boolean, required: true },
  },

  setup(props) {
    return {
      height: toRef(useViewport(), "height"),
      clipboard: useClipboard(),
      mobile: toRef(useBreakpoints(), "mobile"),
    };
  },
});
</script>

<template>
  <v-sheet
    tile
    :style="{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }"
    :height="`calc(100vh - ${mobile ? 56 : 0}px)`"
  >
    <v-img
      v-if="node.postHint === 'image'"
      :style="{ width: '100%', height: '100%' }"
      :src="node.url"
      :lazy-src="node.thumbnail"
    >
      <!-- <div :style="{ display: 'flex', alignItems: 'flex-end' }"> -->
      <teleport to="#actions">
        <v-btn
          flat
          v-if="isActive"
          density="comfortable"
          icon="mdi-content-copy"
          @click="clipboard.write(node.url)"
        >
        </v-btn>
      </teleport>
        <!-- <v-list-item>
          <v-list-item-content>
            <v-list-item-title v-text="node.subreddit" />
            <v-list-item-subtitle v-text="node.title" />
          </v-list-item-content>
        </v-list-item> -->
      <!-- </div> -->
    </v-img>
    <div v-else>couldn't load</div>
  </v-sheet>
</template>
