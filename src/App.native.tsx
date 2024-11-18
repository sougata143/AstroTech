import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Platform } from 'react-native';
import AstrologicalVisualizationHub from './components/visualizations/AstrologicalVisualizationHub';
import { mockData } from './utils/mockData';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Charts" 
        component={AstrologicalVisualizationHub}
        initialParams={{ data: mockData }}
      />
      {/* Add other tab screens */}
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: Platform.OS !== 'web',
              cardStyle: { backgroundColor: '#fff' }
            }}
          >
            <Stack.Screen 
              name="MainTabs" 
              component={MainTabs}
              options={{
                headerShown: false
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
} 