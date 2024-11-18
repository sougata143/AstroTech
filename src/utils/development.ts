import { DEV_CONFIG, LIVE_RELOAD_CONFIG } from '../config/development';

class DevelopmentUtils {
  private static instance: DevelopmentUtils;
  private debugListeners: Array<(message: string) => void> = [];

  private constructor() {
    if (__DEV__) {
      this.setupDebugListeners();
    }
  }

  static getInstance(): DevelopmentUtils {
    if (!DevelopmentUtils.instance) {
      DevelopmentUtils.instance = new DevelopmentUtils();
    }
    return DevelopmentUtils.instance;
  }

  private setupDebugListeners() {
    if (global.HermesInternal) {
      console.log('Running on Hermes Engine');
    }

    // Override console methods for better debugging
    if (DEV_CONFIG.enableDevTools) {
      const originalConsole = { ...console };
      
      console.log = (...args: any[]) => {
        originalConsole.log(...args);
        this.notifyDebugListeners('log', ...args);
      };

      console.warn = (...args: any[]) => {
        originalConsole.warn(...args);
        this.notifyDebugListeners('warn', ...args);
      };

      console.error = (...args: any[]) => {
        originalConsole.error(...args);
        this.notifyDebugListeners('error', ...args);
      };
    }
  }

  addDebugListener(listener: (message: string) => void) {
    this.debugListeners.push(listener);
  }

  removeDebugListener(listener: (message: string) => void) {
    this.debugListeners = this.debugListeners.filter(l => l !== listener);
  }

  private notifyDebugListeners(level: string, ...args: any[]) {
    const message = args.map(arg => 
      typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
    ).join(' ');
    
    this.debugListeners.forEach(listener => 
      listener(`[${level.toUpperCase()}] ${message}`)
    );
  }

  enableLiveReload() {
    if (!LIVE_RELOAD_CONFIG.enabled || !__DEV__) return;

    if (typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION__) {
      console.log('Redux DevTools detected');
    }

    // Setup live reload connection
    const ws = new WebSocket(
      `ws://${LIVE_RELOAD_CONFIG.hostname}:${LIVE_RELOAD_CONFIG.port}/debugger-proxy`
    );

    ws.onopen = () => {
      console.log('Live reload connected');
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'reload') {
        console.log('Reloading app...');
        // Trigger app reload
      }
    };

    ws.onerror = (error) => {
      console.warn('Live reload error:', error);
    };
  }

  logRenderUpdate(componentName: string, props: any) {
    if (DEV_CONFIG.logLevel === 'debug') {
      console.log(`[Render] ${componentName}`, { props });
    }
  }

  measurePerformance(label: string, callback: () => void) {
    if (DEV_CONFIG.logLevel === 'debug') {
      console.time(label);
      callback();
      console.timeEnd(label);
    } else {
      callback();
    }
  }
}

export const devUtils = DevelopmentUtils.getInstance(); 