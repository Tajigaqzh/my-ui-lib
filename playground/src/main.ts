import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { modeSwitcher } from "./services/mode-switcher";

let currentApp: any = null;

async function initializeApp() {
  // Unmount existing app if it exists
  if (currentApp) {
    currentApp.unmount();
  }

  const app = createApp(App);
  
  // Get the current mode configuration
  const modeConfig = modeSwitcher.getModeConfig();
  
  // Dynamically import and register components based on mode
  const componentModules = await Promise.all(
    Object.entries(modeConfig.componentImports).map(async ([name, importFn]) => {
      const module = await importFn();
      return { name, component: module.default || module };
    })
  );

  // Register components globally
  componentModules.forEach(({ name, component }) => {
    app.component(`My${name}`, component);
  });

  app.use(router);
  app.mount("#app");
  
  currentApp = app;
}

// Listen for mode changes
window.addEventListener('mode-changed', () => {
  initializeApp();
});

initializeApp();
