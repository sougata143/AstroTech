export interface AstrologicalPeriod {
  startDate: Date;
  endDate: Date;
  planet: string;
  effect: string;
  intensity: 'positive' | 'neutral' | 'negative';
  areas: string[];  // Life areas affected
}

export interface Predictions {
  overview: string;
  periods: AstrologicalPeriod[];
  recommendations: string[];
  favorableDates: Date[];
  challengingDates: Date[];
} 