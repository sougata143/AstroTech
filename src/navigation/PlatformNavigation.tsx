import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export function PlatformNavigation() {
  return Platform.select({
    web: <WebNavigation />,
    default: <MobileNavigation />
  });
}

function WebNavigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeStack} />
        <Drawer.Screen name="Charts" component={ChartsStack} />
        <Drawer.Screen name="Predictions" component={PredictionsStack} />
        <Drawer.Screen name="Settings" component={SettingsStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

function MobileNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Charts" component={ChartsStack} />
        <Tab.Screen name="Predictions" component={PredictionsStack} />
        <Tab.Screen name="Settings" component={SettingsStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      {/* Add other screens */}
    </Stack.Navigator>
  );
}

// Add other stack navigators similarly 