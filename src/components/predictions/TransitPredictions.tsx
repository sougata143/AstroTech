import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { format } from 'date-fns';

interface Transit {
  planet: string;
  transitingHouse: number;
  aspectingPlanets: Array<{
    planet: string;
    aspect: number;
    nature: 'beneficial' | 'neutral' | 'challenging';
  }>;
  startDate: Date;
  endDate: Date;
  effect: string;
}

interface Props {
  transits: Transit[];
}

export default function TransitPredictions({ transits }: Props) {
  const getTransitColor = (transit: Transit) => {
    const challengingAspects = transit.aspectingPlanets.filter(
      asp => asp.nature === 'challenging'
    ).length;
    const beneficialAspects = transit.aspectingPlanets.filter(
      asp => asp.nature === 'beneficial'
    ).length;

    if (challengingAspects > beneficialAspects) return '#FBE9E7';
    if (beneficialAspects > challengingAspects) return '#E8F5E9';
    return '#F5F5F5';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current Transits</Text>
      <ScrollView style={styles.scrollContainer}>
        {transits.map((transit, index) => (
          <View
            key={`${transit.planet}-${index}`}
            style={[
              styles.transitCard,
              { backgroundColor: getTransitColor(transit) }
            ]}
          >
            <Text style={styles.planetName}>{transit.planet}</Text>
            <Text style={styles.transitInfo}>
              Transiting House {transit.transitingHouse}
            </Text>
            <Text style={styles.dateRange}>
              {format(transit.startDate, 'MMM d')} - {format(transit.endDate, 'MMM d, yyyy')}
            </Text>
            <Text style={styles.effect}>{transit.effect}</Text>
            
            <View style={styles.aspectsContainer}>
              {transit.aspectingPlanets.map((aspect, idx) => (
                <Text
                  key={idx}
                  style={[
                    styles.aspect,
                    { color: aspect.nature === 'challenging' ? '#D32F2F' : '#388E3C' }
                  ]}
                >
                  {aspect.planet} ({aspect.aspect}°)
                </Text>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
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
    paddingHorizontal: 16,
  },
  scrollContainer: {
    paddingHorizontal: 16,
  },
  transitCard: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  planetName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  transitInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  dateRange: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  effect: {
    fontSize: 16,
    marginBottom: 12,
  },
  aspectsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  aspect: {
    fontSize: 14,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
}); 