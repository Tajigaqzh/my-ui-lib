export type PlaygroundMode = 'source' | 'build';

export interface ModeConfig {
  mode: PlaygroundMode;
  componentImports: Record<string, () => Promise<any>>;
  styleImports: string[];
}

class ModeSwitcherService {
  private currentMode: PlaygroundMode = 'source';
  private modeChangeCallbacks: ((mode: PlaygroundMode) => void)[] = [];

  constructor() {
    // Load saved mode from localStorage
    const savedMode = localStorage.getItem('playground-mode') as PlaygroundMode;
    if (savedMode && (savedMode === 'source' || savedMode === 'build')) {
      this.currentMode = savedMode;
    }
  }

  getCurrentMode(): PlaygroundMode {
    return this.currentMode;
  }

  setMode(mode: PlaygroundMode): void {
    if (mode !== this.currentMode) {
      this.currentMode = mode;
      localStorage.setItem('playground-mode', mode);
      this.notifyModeChange();
    }
  }

  onModeChange(callback: (mode: PlaygroundMode) => void): () => void {
    this.modeChangeCallbacks.push(callback);
    return () => {
      const index = this.modeChangeCallbacks.indexOf(callback);
      if (index > -1) {
        this.modeChangeCallbacks.splice(index, 1);
      }
    };
  }

  private notifyModeChange(): void {
    this.modeChangeCallbacks.forEach(callback => callback(this.currentMode));
  }

  getModeConfig(): ModeConfig {
    if (this.currentMode === 'source') {
      return {
        mode: 'source',
        componentImports: {
          Button: async () => {
            const { Button } = await import('@my-ui/core');
            return { default: Button };
          },
          Card: async () => {
            const { Card } = await import('@my-ui/core');
            return { default: Card };
          },
        },
        styleImports: [], // Styles are handled by Vite in source mode
      };
    } else {
      // 在开发环境中，需要使用相对路径访问 dist 文件
      const basePath = import.meta.env.DEV ? '../dist' : '/dist';
      
      return {
        mode: 'build',
        componentImports: {
          Button: () => this.safeImport(`${basePath}/core/button.es.js`),
          Card: () => this.safeImport(`${basePath}/core/card.es.js`),
        },
        styleImports: [`${basePath}/style.css`], // Import built CSS
      };
    }
  }

  private async safeImport(path: string): Promise<any> {
    try {
      // 在开发环境中，使用绝对路径从根目录开始
      const importPath = import.meta.env.DEV ? 
        path.replace('../dist', '/dist') : 
        path;
      
      return await import(/* @vite-ignore */ importPath);
    } catch (error) {
      console.warn(`Failed to import ${path}. Make sure to build the project first with 'pnpm build'.`);
      console.warn('Falling back to source mode imports...');
      
      // Fallback to source imports if build imports fail
      if (path.includes('button')) {
        const { Button } = await import('@my-ui/core');
        return { default: Button };
      } else if (path.includes('card')) {
        const { Card } = await import('@my-ui/core');
        return { default: Card };
      }
      
      throw error;
    }
  }

  async loadStyles(): Promise<void> {
    const config = this.getModeConfig();
    
    // Remove existing style imports
    const existingStyles = document.querySelectorAll('link[data-playground-style]');
    existingStyles.forEach(style => style.remove());

    // Load new styles
    for (const styleUrl of config.styleImports) {
      try {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = styleUrl;
        link.setAttribute('data-playground-style', 'true');
        
        // Add error handling for CSS loading
        link.onerror = () => {
          console.warn(`Failed to load CSS from ${styleUrl}. Make sure to build the project first with 'pnpm build'.`);
        };
        
        document.head.appendChild(link);
      } catch (error) {
        console.warn(`Failed to load styles from ${styleUrl}:`, error);
      }
    }
  }
}

export const modeSwitcher = new ModeSwitcherService();