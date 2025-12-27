/**
 * Component information interface
 */
export interface ComponentInfo {
  name: string;
  path: string;
  displayName: string;
}

/**
 * Component route interface for Vue Router
 */
export interface ComponentRoute {
  path: string;
  name: string;
  component: () => Promise<any>;
  meta: {
    title: string;
    description?: string;
  };
}

/**
 * Playground configuration interface
 */
export interface PlaygroundConfig {
  mode: 'source' | 'build';
  components: ComponentInfo[];
}

/**
 * Playground state interface
 */
export interface PlaygroundState {
  currentMode: 'source' | 'build';
  availableComponents: ComponentInfo[];
  currentComponent?: string;
}