import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  overview?: string;
}

export default function PredictionOverview({ overview }: Props) {
  if (!overview) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Overview</Text>
      <Text style={styles.content}>{overview}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
}); 