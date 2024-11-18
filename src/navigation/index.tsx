import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AstrologicalVisualizationHub from '../components/visualizations/AstrologicalVisualizationHub';
import { mockData } from '../utils/mockData';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Charts" 
        component={AstrologicalVisualizationHub}
        initialParams={{ data: mockData }}
      />
      {/* Add other screens */}
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={MainStack} />
      {/* Add other tabs */}
    </Tab.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Main" component={TabNavigator} />
      {/* Add other drawer screens */}
    </Drawer.Navigator>
  );
}

export default Platform.select({
  native: TabNavigator,
  default: DrawerNavigator
}); 