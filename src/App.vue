<template>
  <v-app>
    <v-sheet
      color="deep-purple-accent-4"
      tag="header"
      :style="{
        zIndex: 2,
        display: 'flex',
        gap: '12px',
      }"
      fixed
      v-bind="headerStyle"
      id="actions"
    >
    </v-sheet>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { computed, defineComponent, toRef } from "vue";
import { useBreakpoints } from "./hooks/useBreakpoints";

export default defineComponent({
  name: "App",

  data() {
    const mobile = toRef(useBreakpoints(), "mobile");

    const headerStyle = computed(() =>
      mobile.value
        ? {
            bottom: true,
            width: "100vw",
            height: "56px",
            style: { padding: "10px 6px" },
          }
        : {
            right: true,
            width: "56px",
            height: "100vh",
            style: {
              padding: "6px 10px",
              flexDirection: "column",
              justifyContent: "center",
            },
          }
    );
    return {
      headerStyle,
      //
    };
  },
});
</script>
