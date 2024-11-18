import Constants from 'expo-constants';

export interface Environment {
  API_URL: string;
  GOOGLE_MAPS_API_KEY: string;
  SENTRY_DSN: string;
  ENVIRONMENT: 'development' | 'staging' | 'production';
}

const ENV = {
  development: {
    API_URL: 'http://localhost:3000',
    GOOGLE_MAPS_API_KEY: 'your-dev-key',
    SENTRY_DSN: 'your-dev-dsn',
    ENVIRONMENT: 'development'
  },
  staging: {
    API_URL: 'https://staging-api.astrotech.com',
    GOOGLE_MAPS_API_KEY: 'your-staging-key',
    SENTRY_DSN: 'your-staging-dsn',
    ENVIRONMENT: 'staging'
  },
  production: {
    API_URL: 'https://api.astrotech.com',
    GOOGLE_MAPS_API_KEY: 'your-prod-key',
    SENTRY_DSN: 'your-prod-dsn',
    ENVIRONMENT: 'production'
  }
} as const;

export default function getEnvironment(): Environment {
  const environment = Constants.expoConfig?.extra?.environment || 'development';
  return ENV[environment as keyof typeof ENV];
} 