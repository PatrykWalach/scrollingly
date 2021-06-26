import fscreen from "fscreen";
import { ref, watch, computed } from "vue";

const isFullscreen = ref(fscreen.fullscreenElement !== null);

fscreen.addEventListener("fullscreenchange", () => {
  isFullscreen.value = fscreen.fullscreenElement !== null;
});

export const useFullscreen = () => {
  return {
    isFullscreen: computed({
      get: () => isFullscreen.value,
      set(value) {
        if (isFullscreen.value === value) {
          return;
        }

        if (value) {
          fscreen.requestFullscreen(document.documentElement);
        } else {
          fscreen.exitFullscreen();
        }
      },
    }),
    isFullscreenSupported: fscreen.fullscreenEnabled,
  };
};
