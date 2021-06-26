import { reactive } from "vue";

const viewport = reactive({ height: 0, width: 0 });

const listener = () => {
  viewport.height = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );
  viewport.width = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
};

listener();

addEventListener("resize", listener);

export function useViewport() {
  return viewport;
}
