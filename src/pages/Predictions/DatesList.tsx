import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  favorableDates?: Date[];
  challengingDates?: Date[];
}

export default function DatesList({ favorableDates, challengingDates }: Props) {
  if (!favorableDates?.length && !challengingDates?.length) return null;

  const renderDates = (dates: Date[] = [], type: 'favorable' | 'challenging') => (
    <View style={styles.dateSection}>
      <Text style={styles.dateTypeTitle}>
        {type === 'favorable' ? 'Favorable Dates' : 'Challenging Dates'}
      </Text>
      <View style={styles.datesContainer}>
        {dates.map((date, index) => (
          <View
            key={index}
            style={[
              styles.dateChip,
              type === 'favorable' ? styles.favorableChip : styles.challengingChip,
            ]}
          >
            <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Important Dates</Text>
      {favorableDates?.length ? renderDates(favorableDates, 'favorable') : null}
      {challengingDates?.length ? renderDates(challengingDates, 'challenging') : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  dateSection: {
    marginBottom: 16,
  },
  dateTypeTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  datesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dateChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  favorableChip: {
    backgroundColor: '#E8F5E9',
  },
  challengingChip: {
    backgroundColor: '#FFEBEE',
  },
  dateText: {
    fontSize: 14,
  },
}); 