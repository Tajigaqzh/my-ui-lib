<template>
  <nav class="navigation-menu">
    <div class="nav-brand">
      <router-link to="/" class="brand-link">
        <span class="brand-icon">🎨</span>
        <span class="brand-text">UI Library</span>
      </router-link>
    </div>
    
    <div class="nav-links">
      <router-link 
        to="/" 
        class="nav-link"
        :class="{ 'active': isActiveRoute('/') }"
      >
        <span class="nav-icon">🏠</span>
        <span class="nav-text">Home</span>
      </router-link>
      
      <router-link 
        v-for="component in availableComponents" 
        :key="component.name"
        :to="component.path"
        class="nav-link"
        :class="{ 'active': isActiveRoute(component.path) }"
      >
        <span class="nav-icon">{{ getComponentIcon(component.name) }}</span>
        <span class="nav-text">{{ component.displayName }}</span>
      </router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { componentDiscoveryService } from '../services/component-discovery';
import type { ComponentInfo } from '../types/playground';

const route = useRoute();

// Get all available components
const availableComponents = computed<ComponentInfo[]>(() => {
  return componentDiscoveryService.scanComponents();
});

// Check if a route is currently active
const isActiveRoute = (path: string): boolean => {
  return route.path === path;
};

// Get icon for component type
const getComponentIcon = (componentName: string): string => {
  const iconMap: Record<string, string> = {
    'button': '🔘',
    'card': '🃏',
    'input': '📝',
    'modal': '🪟',
    'table': '📊',
    'form': '📋'
  };
  
  return iconMap[componentName] || '🧩';
};
</script>

<style scoped>
.navigation-menu {
  background: #ffffff;
  border-bottom: 1px solid #e4e7ed;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 64px;
}

.nav-brand {
  flex-shrink: 0;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: #2c3e50;
  font-weight: 700;
  font-size: 1.2rem;
  transition: color 0.3s ease;
}

.brand-link:hover {
  color: #409eff;
}

.brand-icon {
  font-size: 1.5rem;
}

.brand-text {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
  justify-content: center;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 8px;
  text-decoration: none;
  color: #606266;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  position: relative;
  white-space: nowrap;
}

.nav-link:hover {
  color: #409eff;
  background: rgba(64, 158, 255, 0.08);
}

.nav-link.active {
  color: #409eff;
  background: rgba(64, 158, 255, 0.12);
  font-weight: 600;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 2px;
  background: #409eff;
  border-radius: 1px;
}

.nav-icon {
  font-size: 1.1rem;
  line-height: 1;
}

.nav-text {
  line-height: 1;
}

/* Responsive design */
@media (max-width: 768px) {
  .navigation-menu {
    padding: 0 12px;
    min-height: 56px;
  }
  
  .nav-links {
    gap: 2px;
  }
  
  .nav-link {
    padding: 10px 12px;
    font-size: 0.9rem;
  }
  
  .brand-text {
    display: none;
  }
  
  .nav-text {
    display: none;
  }
  
  .nav-icon {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .navigation-menu {
    padding: 0 8px;
    min-height: 52px;
  }
  
  .nav-link {
    padding: 8px 10px;
  }
  
  .brand-icon {
    font-size: 1.3rem;
  }
}
</style>