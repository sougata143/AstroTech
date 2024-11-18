import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { AstrologicalPeriod } from '../../types/Predictions';

interface Props {
  periods?: AstrologicalPeriod[];
}

export default function PeriodsList({ periods }: Props) {
  if (!periods?.length) return null;

  const renderPeriod = ({ item }: { item: AstrologicalPeriod }) => (
    <View style={[styles.periodCard, styles[item.intensity]]}>
      <Text style={styles.planetName}>{item.planet}</Text>
      <Text style={styles.dateRange}>
        {item.startDate.toLocaleDateString()} - {item.endDate.toLocaleDateString()}
      </Text>
      <Text style={styles.effect}>{item.effect}</Text>
      <View style={styles.areasContainer}>
        {item.areas.map((area, index) => (
          <Text key={index} style={styles.area}>
            {area}
          </Text>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Astrological Periods</Text>
      <FlatList
        data={periods}
        renderItem={renderPeriod}
        keyExtractor={(item: AstrologicalPeriod, index: number) => `${item.planet}-${index}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  periodCard: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  planetName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateRange: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  effect: {
    fontSize: 16,
    marginTop: 8,
  },
  areasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  area: {
    fontSize: 12,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginTop: 4,
  },
  positive: {
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  neutral: {
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
  },
  negative: {
    borderLeftWidth: 4,
    borderLeftColor: '#F44336',
  },
}); 