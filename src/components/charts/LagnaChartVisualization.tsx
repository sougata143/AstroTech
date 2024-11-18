import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LagnaChart } from '../../types/LagnaChart';

interface Props {
  lagnaChart?: LagnaChart;
  onHouseSelect?: (house: number) => void;
  onPlanetSelect?: (planet: string) => void;
}

export default function LagnaChartVisualization({ lagnaChart, onHouseSelect, onPlanetSelect }: Props) {
  if (!lagnaChart) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading chart data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Chart Visualization</Text>
      {/* Add your chart visualization logic here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
}); 