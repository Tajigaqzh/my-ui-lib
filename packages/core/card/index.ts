import Card from "./src/card.vue";
import type { App } from "vue";

Card.install = (app: App) => {
  app.component(Card.name as string, Card);
};

export default Card;
export { Card };
export * from "./src/card";
