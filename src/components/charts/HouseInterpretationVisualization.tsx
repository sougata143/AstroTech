import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

interface HouseSignificance {
  basicSignifications: string[];
  advancedSignifications: {
    career: string[];
    relationships: string[];
    spirituality: string[];
    health: string[];
    wealth: string[];
  };
}

interface Props {
  houseNumber: number;
  significance?: HouseSignificance;
  onAreaSelect?: (area: keyof HouseSignificance['advancedSignifications']) => void;
}

export default function HouseInterpretationVisualization({ 
  houseNumber, 
  significance,
  onAreaSelect 
}: Props) {
  if (!significance) {
    return (
      <View style={styles.container}>
        <Text>No house interpretation available</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>House {houseNumber} Interpretation</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Significations</Text>
        {significance.basicSignifications.map((sig, index) => (
          <Text key={index} style={styles.significationText}>• {sig}</Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Advanced Significations</Text>
        {Object.entries(significance.advancedSignifications).map(([area, significations]) => (
          <View key={area} style={styles.areaContainer}>
            <Text style={styles.areaTitle}>{area.charAt(0).toUpperCase() + area.slice(1)}</Text>
            {significations.map((sig, index) => (
              <Text key={index} style={styles.significationText}>• {sig}</Text>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  areaContainer: {
    marginBottom: 16,
  },
  areaTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#666',
  },
  significationText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
    paddingLeft: 8,
  },
}); 