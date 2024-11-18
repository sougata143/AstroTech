export const DEV_CONFIG = {
  enableDevTools: true,
  logLevel: 'debug',
  apiTimeout: 30000,
  refreshInterval: 5000,
  enableLiveReload: true,
  enableHotReload: true,
  showDebugOverlay: __DEV__,
  debugHost: 'localhost:8081'
};

export const LIVE_RELOAD_CONFIG = {
  enabled: true,
  port: 8081,
  hostname: 'localhost',
  watchFolders: ['src'],
  excludeFiles: [
    /\.git/,
    /\.log/,
    /node_modules/,
    /\.expo/,
    /\.vscode/
  ],
  debounceMs: 300
}; 