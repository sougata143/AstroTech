import React from 'react';
import { View } from 'react-native';
import AstrologicalVisualizationHub from '../src/components/visualizations/AstrologicalVisualizationHub';
import { mockData } from '../src/utils/mockData';

export default function Home() {
  return (
    <View style={{ flex: 1 }}>
      <AstrologicalVisualizationHub data={mockData} />
    </View>
  );
} 