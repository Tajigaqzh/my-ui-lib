import { ComponentInfo } from '../types/playground';

/**
 * Component Discovery Service
 * Scans the core package for available components and extracts metadata
 */
export class ComponentDiscoveryService {
  /**
   * Scans packages/core directory for components
   * Returns component metadata including name, path, and display name
   */
  scanComponents(): ComponentInfo[] {
    // For now, we'll use a static list based on the current core package structure
    // In a real implementation, this could use dynamic imports or file system scanning
    const components: ComponentInfo[] = [
      {
        name: 'button',
        path: '/button',
        displayName: 'Button'
      },
      {
        name: 'card', 
        path: '/card',
        displayName: 'Card'
      }
    ];

    return components;
  }

  /**
   * Gets component metadata by name
   */
  getComponentByName(name: string): ComponentInfo | undefined {
    return this.scanComponents().find(component => component.name === name);
  }

  /**
   * Gets all available component names
   */
  getComponentNames(): string[] {
    return this.scanComponents().map(component => component.name);
  }
}

export const componentDiscoveryService = new ComponentDiscoveryService();