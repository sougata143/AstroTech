import React, { useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator, Text } from 'react-native';
import { BirthDetails } from '../../types/BirthDetails';
import { PredictionCalculator } from '../../services/calculations/PredictionCalculator';
import { Predictions } from '../../types/Predictions';
import PredictionOverview from './PredictionOverview';
import PeriodsList from './PeriodsList';
import RecommendationsList from './RecommendationsList';
import DatesList from './DatesList';
import { styles } from './styles';
import DashaTimeline from '../../components/predictions/DashaTimeline';
import PlanetaryChart from '../../components/predictions/PlanetaryChart';

interface Props {
  birthDetails: BirthDetails;
  predictionRange: {
    startDate: Date;
    endDate: Date;
  };
}

export default function PredictionsPage({ birthDetails, predictionRange }: Props) {
  const [predictions, setPredictions] = useState<Predictions | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPredictions();
  }, [birthDetails, predictionRange]);

  const loadPredictions = async () => {
    try {
      setLoading(true);
      const result = await PredictionCalculator.calculateFuturePredictions(
        birthDetails,
        predictionRange.startDate,
        predictionRange.endDate
      );
      setPredictions(result);
    } catch (err) {
      setError('Failed to calculate predictions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <PlanetaryChart planetaryPositions={predictions?.planetaryPositions || []} />
      <DashaTimeline dashaPeriods={predictions?.dashaPeriods || []} />
      <PredictionOverview overview={predictions?.overview} />
      <PeriodsList periods={predictions?.periods} />
      <RecommendationsList recommendations={predictions?.recommendations} />
      <DatesList 
        favorableDates={predictions?.favorableDates}
        challengingDates={predictions?.challengingDates}
      />
    </ScrollView>
  );
} 