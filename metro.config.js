const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add asset handling configuration
config.resolver.assetExts.push('png', 'jpg', 'jpeg', 'gif');

// Add platform-specific file extensions
config.resolver.sourceExts = [
  'jsx',
  'js',
  'ts',
  'tsx',
  'json',
  'android.jsx',
  'android.js',
  'android.ts',
  'android.tsx',
  'web.jsx',
  'web.js', 
  'web.ts',
  'web.tsx'
];

module.exports = config; 