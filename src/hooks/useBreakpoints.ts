import { reactive } from "vue";

const mobile = window.matchMedia("(max-width: 600px)");

const breakpoints = reactive({ mobile: mobile.matches });

mobile.addEventListener("change", ({ matches }) => {
  breakpoints.mobile = matches;
});

export const useBreakpoints = () => breakpoints;
