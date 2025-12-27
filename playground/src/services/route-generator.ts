import type { RouteRecordRaw } from 'vue-router';
import type { ComponentInfo, ComponentRoute } from '../types/playground';
import { componentDiscoveryService } from './component-discovery';

// Import route components
import Home from '../views/Home.vue';
import ButtonDemo from '../views/ButtonDemo.vue';
import CardDemo from '../views/CardDemo.vue';

/**
 * Route Generator Service
 * Generates routes based on discovered components
 */
export class RouteGeneratorService {
  /**
   * Component mapping for demo pages
   * Maps component names to their corresponding demo components
   */
  private componentMapping: Record<string, any> = {
    'button': ButtonDemo,
    'card': CardDemo
  };

  /**
   * Generates routes based on discovered components
   */
  generateRoutes(components: ComponentInfo[]): ComponentRoute[] {
    return components.map(component => ({
      path: component.path,
      name: component.displayName,
      component: () => Promise.resolve(this.componentMapping[component.name]),
      meta: {
        title: `${component.displayName} Component`,
        description: `${component.displayName} component demos and examples`
      }
    }));
  }

  /**
   * Creates the complete route configuration including home route
   */
  createRouteConfiguration(): RouteRecordRaw[] {
    const components = componentDiscoveryService.scanComponents();
    
    // Create routes with direct component references (not lazy loaded)
    const routes: RouteRecordRaw[] = [
      // Home route
      {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
          title: 'Component Overview',
          description: 'Overview of all available components'
        }
      },
      // Component routes with direct imports
      ...components.map(component => ({
        path: component.path,
        name: component.displayName,
        component: this.componentMapping[component.name],
        meta: {
          title: `${component.displayName} Component`,
          description: `${component.displayName} component demos and examples`
        }
      }))
    ];

    return routes;
  }

  /**
   * Gets route for a specific component
   */
  getRouteForComponent(componentName: string): ComponentRoute | undefined {
    const component = componentDiscoveryService.getComponentByName(componentName);
    if (!component) {
      return undefined;
    }

    return this.generateRoutes([component])[0];
  }

  /**
   * Validates that all components have corresponding demo pages
   */
  validateComponentMapping(): { valid: boolean; missing: string[] } {
    const components = componentDiscoveryService.scanComponents();
    const missing = components
      .filter(component => !this.componentMapping[component.name])
      .map(component => component.name);

    return {
      valid: missing.length === 0,
      missing
    };
  }
}

export const routeGeneratorService = new RouteGeneratorService();