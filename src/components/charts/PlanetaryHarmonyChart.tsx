import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

interface Props {
  relationships?: Array<{
    planets: [string, string];
    relationship: 'friend' | 'neutral' | 'enemy';
    strength: number;
  }>;
  onRelationshipSelect?: (planets: [string, string]) => void;
}

export default function PlanetaryHarmonyChart({ 
  relationships = [], 
  onRelationshipSelect 
}: Props) {
  if (!relationships || relationships.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No planetary relationships available</Text>
      </View>
    );
  }

  const handleRelationshipSelect = (planets: [string, string]) => {
    onRelationshipSelect?.(planets);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Planetary Relationships</Text>
      {relationships.map((rel, index) => (
        <View 
          key={index} 
          style={styles.relationshipCard}
          onTouchEnd={() => handleRelationshipSelect(rel.planets)}
        >
          <Text style={styles.planetPair}>
            {rel.planets[0]} - {rel.planets[1]}
          </Text>
          <Text style={[
            styles.relationshipType,
            { color: getRelationshipColor(rel.relationship) }
          ]}>
            {rel.relationship.toUpperCase()}
          </Text>
          <View style={styles.strengthBar}>
            <View 
              style={[
                styles.strengthFill,
                { 
                  width: `${rel.strength * 100}%`,
                  backgroundColor: getRelationshipColor(rel.relationship)
                }
              ]} 
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

function getRelationshipColor(relationship: string): string {
  switch (relationship) {
    case 'friend': return '#4CAF50';
    case 'neutral': return '#FFC107';
    case 'enemy': return '#F44336';
    default: return '#9E9E9E';
  }
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
  relationshipCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  planetPair: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  relationshipType: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  strengthBar: {
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
  },
  strengthFill: {
    height: '100%',
    borderRadius: 2,
  },
}); 