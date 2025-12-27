declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    MyButton: typeof import("./button/src/button.vue").default;
    MyCard: typeof import("./card/src/card.vue").default;
  }
}

export {};
