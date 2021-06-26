<script lang="ts">
import { gql } from "@apollo/client";
import { defineComponent, PropType, toRef } from "vue";
import { Link_Node } from "../generated/graphql";

export const fragments = {
  node: gql`
    fragment Link_node on Link {
      url
      thumbnail
      id
      permalink
      title
      subreddit
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
  <v-sheet flat tile>
    <v-img v-bind="$attrs" :src="node.url" contain>
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
  </v-sheet>
</template>
