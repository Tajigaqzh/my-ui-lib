import Button from "./src/button.vue";
import type { App } from "vue";

Button.install = (app: App) => {
  app.component(Button.name as string, Button);
};

export default Button;
export { Button };
export * from "./src/button";
