import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

interface DashaPeriod {
  planet: string;
  startDate: Date;
  endDate: Date;
  subPeriods?: DashaPeriod[];
  significance: string[];
}

interface Props {
  periods?: DashaPeriod[];
  onPeriodSelect?: (period: DashaPeriod) => void;
}

export default function DashaTimeline({ periods = [], onPeriodSelect }: Props) {
  if (!periods || periods.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No dasha periods available</Text>
      </View>
    );
  }

  const formatDate = (date: Date | undefined) => {
    if (!date) return 'Invalid date';
    try {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  const renderSubPeriods = (subPeriods?: DashaPeriod[]) => {
    if (!subPeriods || subPeriods.length === 0) return null;

    return (
      <View style={styles.subPeriodsContainer}>
        <Text style={styles.subPeriodsTitle}>Sub Periods:</Text>
        {subPeriods.map((subPeriod, subIndex) => (
          <Text key={subIndex} style={styles.subPeriodText}>
            {subPeriod.planet}: {formatDate(subPeriod.startDate)} - {formatDate(subPeriod.endDate)}
          </Text>
        ))}
      </View>
    );
  };

  const renderSignificance = (significance: string[]) => {
    if (!significance || significance.length === 0) return null;

    return (
      <View style={styles.significanceContainer}>
        {significance.map((sig, sigIndex) => (
          <Text key={sigIndex} style={styles.significanceText}>• {sig}</Text>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dasha Timeline</Text>
      {periods.map((period, index) => (
        <View 
          key={index} 
          style={styles.periodCard}
          onTouchEnd={() => onPeriodSelect?.(period)}
        >
          <Text style={styles.planetName}>{period.planet}</Text>
          <Text style={styles.dateRange}>
            {formatDate(period.startDate)} - {formatDate(period.endDate)}
          </Text>
          {renderSignificance(period.significance)}
          {renderSubPeriods(period.subPeriods)}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  periodCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  planetName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  dateRange: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  significanceContainer: {
    marginBottom: 12,
  },
  significanceText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 2,
    paddingLeft: 8,
  },
  subPeriodsContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  subPeriodsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  subPeriodText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
    paddingLeft: 8,
  },
}); 