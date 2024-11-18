import { Stack, SplashScreen } from 'expo-router';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreenLib from 'expo-splash-screen';
import * as Font from 'expo-font';
import { useColorScheme } from 'react-native';
import { ThemeProvider } from '@react-navigation/native';
import * as Sentry from 'sentry-expo';
import getEnvironment from '../config/env';

// Keep splash screen visible while we fetch resources
SplashScreenLib.preventAutoHideAsync();

// Initialize Sentry
const env = getEnvironment();
Sentry.init({
  dsn: env.SENTRY_DSN,
  enableInExpoDevelopment: true,
  debug: env.ENVIRONMENT !== 'production',
});

export default function Layout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make API calls, etc.
        await Font.loadAsync({
          'CustomFont-Regular': require('../assets/fonts/CustomFont-Regular.ttf'),
          'CustomFont-Bold': require('../assets/fonts/CustomFont-Bold.ttf'),
        });
      } catch (e) {
        Sentry.Native.captureException(e);
      } finally {
        await SplashScreenLib.hideAsync();
      }
    }

    prepare();
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : LightTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen 
            name="home" 
            options={{ 
              title: 'AstroTech',
              headerTitleAlign: 'center'
            }} 
          />
        </Stack>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}

const DarkTheme = {
  dark: true,
  colors: {
    primary: '#BB86FC',
    background: '#121212',
    card: '#1E1E1E',
    text: '#FFFFFF',
    border: '#272729',
    notification: '#BB86FC',
  },
};

const LightTheme = {
  dark: false,
  colors: {
    primary: '#6200EE',
    background: '#FFFFFF',
    card: '#FFFFFF',
    text: '#000000',
    border: '#E5E5E5',
    notification: '#6200EE',
  },
}; 