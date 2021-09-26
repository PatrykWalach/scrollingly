import { onActivated, onDeactivated, ref, shallowRef } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";

export const useMetaData = <T>() => {
  const route = useRoute();

  const result = shallowRef(route.meta.data as T);

  onActivated(() => {
    result.value = route.meta.data as T;
  });

  onBeforeRouteUpdate(() => {
    result.value = route.meta.data as T;
  });

  return result;
};

export const useIsActivated = () => {
  const isActivated = ref(true);

  onActivated(() => {
    isActivated.value = true;
  });
  onDeactivated(() => {
    isActivated.value = false;
  });
  return isActivated;
};
