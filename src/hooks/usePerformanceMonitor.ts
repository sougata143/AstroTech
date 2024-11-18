import { useEffect, useRef } from 'react';
import { devUtils } from '../utils/development';
import { DEV_CONFIG } from '../config/development';

export function usePerformanceMonitor(componentName: string) {
  const renderCount = useRef(0);

  useEffect(() => {
    if (DEV_CONFIG.logLevel === 'debug') {
      renderCount.current++;
      console.log(`[Performance] ${componentName} rendered ${renderCount.current} times`);
    }
  });

  return {
    logRender: (props: any) => devUtils.logRenderUpdate(componentName, props),
    measureOperation: (label: string, callback: () => void) => 
      devUtils.measurePerformance(`${componentName}:${label}`, callback)
  };
} 