<template>
  <nav class="breadcrumb-navigation" v-if="breadcrumbs.length > 1">
    <ol class="breadcrumb-list">
      <li 
        v-for="(crumb, index) in breadcrumbs" 
        :key="crumb.path"
        class="breadcrumb-item"
        :class="{ 'active': index === breadcrumbs.length - 1 }"
      >
        <router-link 
          v-if="index < breadcrumbs.length - 1"
          :to="crumb.path"
          class="breadcrumb-link"
        >
          <span class="breadcrumb-icon" v-if="crumb.icon">{{ crumb.icon }}</span>
          <span class="breadcrumb-text">{{ crumb.title }}</span>
        </router-link>
        
        <span v-else class="breadcrumb-current">
          <span class="breadcrumb-icon" v-if="crumb.icon">{{ crumb.icon }}</span>
          <span class="breadcrumb-text">{{ crumb.title }}</span>
        </span>
        
        <span 
          v-if="index < breadcrumbs.length - 1" 
          class="breadcrumb-separator"
          aria-hidden="true"
        >
          /
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { componentDiscoveryService } from '../services/component-discovery';

interface BreadcrumbItem {
  title: string;
  path: string;
  icon?: string;
}

const route = useRoute();

// Generate breadcrumbs based on current route
const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  const crumbs: BreadcrumbItem[] = [];
  
  // Always start with home
  crumbs.push({
    title: 'Home',
    path: '/',
    icon: '🏠'
  });
  
  // Add component-specific breadcrumb if we're on a component page
  if (route.path !== '/') {
    const componentName = route.path.substring(1); // Remove leading slash
    const component = componentDiscoveryService.getComponentByName(componentName);
    
    if (component) {
      crumbs.push({
        title: component.displayName,
        path: component.path,
        icon: getComponentIcon(component.name)
      });
    } else {
      // Fallback for unknown routes
      crumbs.push({
        title: route.meta?.title as string || 'Unknown Page',
        path: route.path
      });
    }
  }
  
  return crumbs;
});

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
.breadcrumb-navigation {
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  padding: 12px 20px;
}

.breadcrumb-list {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 0.9rem;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.breadcrumb-link {
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  color: #606266;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.breadcrumb-link:hover {
  color: #409eff;
  background: rgba(64, 158, 255, 0.08);
}

.breadcrumb-current {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #409eff;
  font-weight: 600;
  padding: 4px 8px;
}

.breadcrumb-icon {
  font-size: 1rem;
  line-height: 1;
}

.breadcrumb-text {
  line-height: 1;
}

.breadcrumb-separator {
  color: #c0c4cc;
  font-weight: 400;
  user-select: none;
  margin: 0 4px;
}

.breadcrumb-item.active .breadcrumb-text {
  color: #409eff;
}

/* Responsive design */
@media (max-width: 768px) {
  .breadcrumb-navigation {
    padding: 10px 12px;
  }
  
  .breadcrumb-list {
    font-size: 0.85rem;
    gap: 6px;
  }
  
  .breadcrumb-link,
  .breadcrumb-current {
    padding: 3px 6px;
    gap: 4px;
  }
  
  .breadcrumb-separator {
    margin: 0 2px;
  }
}

@media (max-width: 480px) {
  .breadcrumb-navigation {
    padding: 8px;
  }
  
  .breadcrumb-list {
    font-size: 0.8rem;
    gap: 4px;
  }
  
  .breadcrumb-text {
    display: none;
  }
  
  .breadcrumb-icon {
    font-size: 1.1rem;
  }
}
</style>