import { createApp } from "vue";
import App from "./App.vue";
import MyUI from "@my-ui/core";

const app = createApp(App);
app.use(MyUI);
app.mount("#app");
