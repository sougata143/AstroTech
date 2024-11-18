import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

interface Muhurta {
  startTime: Date;
  endTime: Date;
  name: string;
  quality: 'auspicious' | 'neutral' | 'inauspicious';
  activities: string[];
}

interface Props {
  muhurtas?: Muhurta[];
  onMuhurtaSelect?: (muhurta: Muhurta) => void;
}

export default function MuhurtaTimingChart({ 
  muhurtas = [], 
  onMuhurtaSelect 
}: Props) {
  if (!muhurtas || muhurtas.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No muhurta timings available</Text>
      </View>
    );
  }

  const formatTime = (date: Date | undefined) => {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
      return 'Invalid time';
    }
    try {
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      console.error('Error formatting time:', error);
      return 'Invalid time';
    }
  };

  const getQualityColor = (quality: Muhurta['quality']): string => {
    switch (quality) {
      case 'auspicious': return '#4CAF50';
      case 'neutral': return '#FFC107';
      case 'inauspicious': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Muhurta Timings</Text>
      {muhurtas.map((muhurta, index) => (
        <View 
          key={index} 
          style={[
            styles.muhurtaCard,
            { borderLeftColor: getQualityColor(muhurta.quality) }
          ]}
          onTouchEnd={() => onMuhurtaSelect?.(muhurta)}
        >
          <Text style={styles.muhurtaName}>{muhurta.name}</Text>
          <Text style={styles.timingText}>
            {formatTime(muhurta.startTime)} - {formatTime(muhurta.endTime)}
          </Text>
          <Text style={[
            styles.qualityText,
            { color: getQualityColor(muhurta.quality) }
          ]}>
            {muhurta.quality.toUpperCase()}
          </Text>
          <View style={styles.activitiesContainer}>
            {muhurta.activities.map((activity, actIndex) => (
              <Text key={actIndex} style={styles.activityText}>• {activity}</Text>
            ))}
          </View>
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
  muhurtaCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderLeftWidth: 4,
  },
  muhurtaName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  timingText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  qualityText: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 8,
  },
  activitiesContainer: {
    marginTop: 8,
  },
  activityText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 2,
  },
}); 