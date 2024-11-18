import { ExpoConfig } from '@expo/config-types';

const developmentConfig: Partial<ExpoConfig> = {
  name: 'AstroTech (Dev)',
  slug: 'astrotech-dev',
  scheme: 'astrotechdev',
  extra: {
    environment: 'development',
    apiUrl: 'http://localhost:3000',
    enableTestMode: true,
    debugMode: true,
    analyticsEnabled: false,
  },
  updates: {
    enabled: false,
  },
  ios: {
    bundleIdentifier: 'com.yourcompany.astrotech.dev'
  },
  android: {
    package: 'com.yourcompany.astrotech.dev'
  },
  plugins: [
    'expo-dev-client',
    'expo-dev-launcher',
    'expo-dev-menu'
  ]
};

export default developmentConfig; 