import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  recommendations?: string[];
}

export default function RecommendationsList({ recommendations }: Props) {
  if (!recommendations?.length) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommendations</Text>
      {recommendations.map((recommendation, index) => (
        <View key={index} style={styles.recommendationItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.recommendationText}>{recommendation}</Text>
        </View>
      ))}
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
  recommendationItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  bullet: {
    fontSize: 16,
    marginRight: 8,
  },
  recommendationText: {
    fontSize: 16,
    flex: 1,
    lineHeight: 24,
  },
}); 