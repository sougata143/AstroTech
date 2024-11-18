import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { DashaPeriod } from '../../services/calculations/DashaCalculator';

interface Props {
  dashaPeriods: DashaPeriod[];
}

export default function DashaTimeline({ dashaPeriods }: Props) {
  const screenWidth = Dimensions.get('window').width;
  const totalYears = 120; // Total Vimshottari Dasha cycle
  const pixelsPerYear = screenWidth / 20; // Show 20 years at a time

  const getWidth = (startDate: Date, endDate: Date) => {
    const years = (endDate.getTime() - startDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
    return years * pixelsPerYear;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dasha Timeline</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
        <View style={styles.timeline}>
          {dashaPeriods.map((period, index) => (
            <View
              key={`${period.planet}-${index}`}
              style={[
                styles.periodBlock,
                {
                  width: getWidth(period.startDate, period.endDate),
                  backgroundColor: getPlanetColor(period.planet),
                },
              ]}
            >
              <Text style={styles.planetName}>{period.planet}</Text>
              <Text style={styles.dateRange}>
                {period.startDate.getFullYear()} - {period.endDate.getFullYear()}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const getPlanetColor = (planet: string): string => {
  const colors: Record<string, string> = {
    Sun: '#FFB74D',
    Moon: '#E0E0E0',
    Mars: '#EF5350',
    Rahu: '#90A4AE',
    Jupiter: '#FDD835',
    Saturn: '#616161',
    Mercury: '#66BB6A',
    Ketu: '#78909C',
    Venus: '#F06292',
  };
  return colors[planet] || '#000000';
};

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
  timeline: {
    flexDirection: 'row',
    height: 100,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  periodBlock: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginRight: 2,
    padding: 8,
  },
  planetName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  dateRange: {
    color: '#fff',
    fontSize: 10,
  },
}); 