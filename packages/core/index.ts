import type { App } from "vue";
import Button from "./button";
import Card from "./card";

const components = [Button, Card];

const install = (app: App) => {
  components.forEach((component) => {
    app.component(component.name as string, component);
  });
};

export default {
  install,
};

export { Button, Card };
