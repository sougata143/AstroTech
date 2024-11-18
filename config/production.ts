import { ExpoConfig } from '@expo/config-types';

const productionConfig: Partial<ExpoConfig> = {
  name: 'AstroTech',
  slug: 'astrotech',
  scheme: 'astrotech',
  extra: {
    environment: 'production',
    apiUrl: 'https://api.astrotech.com',
    enableTestMode: false,
    debugMode: false,
    analyticsEnabled: true,
  },
  updates: {
    enabled: true,
    fallbackToCacheTimeout: 0,
    url: 'https://u.expo.dev/your-project-id'
  },
  ios: {
    bundleIdentifier: 'com.yourcompany.astrotech'
  },
  android: {
    package: 'com.yourcompany.astrotech'
  },
  hooks: {
    postPublish: [
      {
        file: 'sentry-expo/upload-sourcemaps',
        config: {
          organization: 'your-sentry-org',
          project: 'astrotech'
        }
      }
    ]
  }
};

export default productionConfig; 