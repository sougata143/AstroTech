import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { devUtils } from './utils/development';
import { DebugOverlay } from './components/development/DebugOverlay';

// Import your screens/components here
import HomeScreen from './screens/HomeScreen';
import { AstrologicalVisualizationHub } from './components/AstrologicalVisualizationHub';
// import PredictionsScreen from './screens/PredictionsScreen';
// etc...

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    if (__DEV__) {
      devUtils.enableLiveReload();
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen 
            name="Chart" 
            component={AstrologicalVisualizationHub}
            options={{ title: 'Astrological Chart' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      {__DEV__ && <DebugOverlay />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
}); 