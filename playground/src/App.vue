<template>
  <div class="playground">
    <header class="app-header">
      <NavigationMenu />
      <div class="header-actions">
        <ModeSwitcher />
      </div>
    </header>
    
    <BreadcrumbNavigation />
    
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import NavigationMenu from './components/NavigationMenu.vue';
import BreadcrumbNavigation from './components/BreadcrumbNavigation.vue';
import ModeSwitcher from './components/ModeSwitcher.vue';
import { modeSwitcher } from './services/mode-switcher';

// Load styles on app startup
onMounted(async () => {
  await modeSwitcher.loadStyles();
});
</script>

<style scoped>
.playground {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
    Cantarell, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  position: relative;
  display: flex;
  align-items: center;
  background: #ffffff;
  border-bottom: 1px solid #e4e7ed;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  z-index: 100;
}

.header-actions {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

.main-content {
  flex: 1;
  min-height: calc(100vh - 120px); /* Account for header + breadcrumb */
  overflow-x: auto; /* Handle horizontal overflow on mobile */
}

/* Tablet styles */
@media (max-width: 1024px) {
  .main-content {
    padding: 16px;
  }
}

/* Mobile styles */
@media (max-width: 768px) {
  .header-actions {
    right: 12px;
  }
  
  .main-content {
    min-height: calc(100vh - 110px);
    padding: 12px;
  }
}

/* Small mobile styles */
@media (max-width: 480px) {
  .header-actions {
    right: 8px;
  }
  
  .main-content {
    min-height: calc(100vh - 100px);
    padding: 8px;
  }
}

/* Ensure content doesn't overflow horizontally */
@media (max-width: 320px) {
  .playground {
    min-width: 320px;
  }
  
  .main-content {
    padding: 4px;
  }
}
</style>
