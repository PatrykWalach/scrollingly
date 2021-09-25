import { VNodeProps } from "@vue/runtime-dom"

import { IconNames } from "./mdi"

declare module "vue" {
  interface Mdicon {
    new (): {
      $props: VNodeProps & {
        name: IconNames
      }
    }
  }

  export interface GlobalComponents {
    Mdicon: Mdicon
    // RouterLink: typeof import("vue-router")["RouterLink"]
    // RouterView: typeof import("vue-router")["RouterView"]
  }
}

export {}
