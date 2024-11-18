import { BirthDetails } from '../../types/BirthDetails';
import { Predictions, AstrologicalPeriod } from '../../types/Predictions';
import { SuryaSiddhantaCalculator } from './SuryaSiddhanta';

interface PlanetaryPosition {
  planet: string;
  longitude: number;
  house: number;
  nakshatra: string;
  pada: number;
}

interface TransitEffect {
  planet: string;
  effect: string;
  intensity: 'positive' | 'neutral' | 'negative';
  areas: string[];
}

export class PredictionCalculator {
  private static readonly NAKSHATRAS = [
    'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
    'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
    'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
    'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
    'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
  ];

  private static readonly PLANETS = {
    SUN: { name: 'Sun', kararaka: 'soul' },
    MOON: { name: 'Moon', kararaka: 'mind' },
    MARS: { name: 'Mars', kararaka: 'strength' },
    MERCURY: { name: 'Mercury', kararaka: 'communication' },
    JUPITER: { name: 'Jupiter', kararaka: 'wisdom' },
    VENUS: { name: 'Venus', kararaka: 'relationships' },
    SATURN: { name: 'Saturn', kararaka: 'longevity' },
    RAHU: { name: 'Rahu', kararaka: 'materialistic desires' },
    KETU: { name: 'Ketu', kararaka: 'spirituality' }
  };

  static async calculateFuturePredictions(
    birthDetails: BirthDetails,
    predictionStartDate: Date,
    predictionEndDate: Date
  ): Promise<Predictions> {
    const birthPlanetaryPositions = await SuryaSiddhantaCalculator
      .calculatePlanetaryPositions(
        birthDetails.dateOfBirth,
        birthDetails.birthPlace.latitude,
        birthDetails.birthPlace.longitude
      );

    const currentPlanetaryPositions = await SuryaSiddhantaCalculator
      .calculatePlanetaryPositions(
        new Date(),
        birthDetails.birthPlace.latitude,
        birthDetails.birthPlace.longitude
      );

    const periods = await this.calculateTransitPeriods(
      birthPlanetaryPositions,
      predictionStartDate,
      predictionEndDate
    );

    return {
      overview: this.generateOverview(periods),
      periods,
      recommendations: this.generateRecommendations(periods),
      favorableDates: await this.calculateFavorableDates(predictionStartDate, predictionEndDate),
      challengingDates: await this.calculateChallengingDates(predictionStartDate, predictionEndDate)
    };
  }

  private static async calculateTransitPeriods(
    birthPositions: PlanetaryPosition[],
    startDate: Date,
    endDate: Date
  ): Promise<AstrologicalPeriod[]> {
    const periods: AstrologicalPeriod[] = [];
    const transitPositions = await this.calculateDailyTransits(startDate, endDate);

    transitPositions.forEach(transit => {
      const effects = this.analyzeTransitEffects(transit, birthPositions);
      effects.forEach(effect => {
        periods.push({
          startDate: transit.date,
          endDate: this.calculateEffectEndDate(transit.date, effect.planet),
          planet: effect.planet,
          effect: effect.effect,
          intensity: effect.intensity,
          areas: effect.areas
        });
      });
    });

    return this.consolidatePeriods(periods);
  }

  private static async calculateDailyTransits(startDate: Date, endDate: Date) {
    // Calculate planetary positions for each day in the range
    const transits = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const positions = await SuryaSiddhantaCalculator.calculatePlanetaryPositions(
        currentDate,
        0, // Using neutral latitude/longitude for transit calculations
        0
      );
      transits.push({ date: new Date(currentDate), positions });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return transits;
  }

  private static analyzeTransitEffects(
    transit: { date: Date; positions: PlanetaryPosition[] },
    birthPositions: PlanetaryPosition[]
  ): TransitEffect[] {
    const effects: TransitEffect[] = [];

    transit.positions.forEach(transitPos => {
      const birthPos = birthPositions.find(pos => pos.planet === transitPos.planet);
      if (!birthPos) return;

      const aspect = this.calculatePlanetaryAspect(transitPos.longitude, birthPos.longitude);
      if (this.isSignificantAspect(aspect)) {
        effects.push(this.generateTransitEffect(transitPos.planet, aspect));
      }
    });

    return effects;
  }

  private static calculatePlanetaryAspect(transit: number, natal: number): number {
    let aspect = Math.abs(transit - natal);
    if (aspect > 180) aspect = 360 - aspect;
    return aspect;
  }

  private static isSignificantAspect(aspect: number): boolean {
    const significantAspects = [0, 60, 90, 120, 180];
    return significantAspects.some(sig => Math.abs(aspect - sig) <= 3);
  }

  private static generateTransitEffect(planet: string, aspect: number): TransitEffect {
    // Implement Vedic astrology rules for transit effects
    const planetInfo = this.PLANETS[planet as keyof typeof this.PLANETS];
    
    return {
      planet: planetInfo.name,
      effect: this.getAspectEffect(aspect, planetInfo),
      intensity: this.getAspectIntensity(aspect),
      areas: [planetInfo.kararaka]
    };
  }

  private static getAspectEffect(aspect: number, planetInfo: { name: string; kararaka: string }): string {
    // Implement specific Vedic interpretations
    switch (aspect) {
      case 0: return `Strong influence on ${planetInfo.kararaka}`;
      case 60: return `Favorable developments in ${planetInfo.kararaka}`;
      case 90: return `Challenges related to ${planetInfo.kararaka}`;
      case 120: return `Opportunities in ${planetInfo.kararaka}`;
      case 180: return `Major developments in ${planetInfo.kararaka}`;
      default: return `Subtle influence on ${planetInfo.kararaka}`;
    }
  }

  private static getAspectIntensity(aspect: number): 'positive' | 'neutral' | 'negative' {
    switch (aspect) {
      case 0:
      case 60:
      case 120:
        return 'positive';
      case 90:
      case 180:
        return 'negative';
      default:
        return 'neutral';
    }
  }

  private static consolidatePeriods(periods: AstrologicalPeriod[]): AstrologicalPeriod[] {
    // Merge overlapping periods with similar effects
    return periods.reduce((acc, period) => {
      const similar = acc.find(p => 
        p.planet === period.planet &&
        p.intensity === period.intensity &&
        Math.abs(p.endDate.getTime() - period.startDate.getTime()) <= 86400000
      );

      if (similar) {
        similar.endDate = period.endDate;
        similar.areas = [...new Set([...similar.areas, ...period.areas])];
      } else {
        acc.push(period);
      }

      return acc;
    }, [] as AstrologicalPeriod[]);
  }

  private static generateOverview(periods: AstrologicalPeriod[]): string {
    const effects = periods.reduce((acc, period) => {
      acc[period.intensity] = (acc[period.intensity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return `In the upcoming period, you will experience ${effects.positive || 0} positive, 
      ${effects.neutral || 0} neutral, and ${effects.negative || 0} challenging influences.`;
  }

  private static generateRecommendations(periods: AstrologicalPeriod[]): string[] {
    const recommendations: string[] = [];
    const challenges = periods.filter(p => p.intensity === 'negative');
    const opportunities = periods.filter(p => p.intensity === 'positive');

    challenges.forEach(period => {
      recommendations.push(`During ${period.planet}'s influence, be cautious with ${period.areas.join(', ')}`);
    });

    opportunities.forEach(period => {
      recommendations.push(`Utilize ${period.planet}'s positive influence for ${period.areas.join(', ')}`);
    });

    return recommendations;
  }

  private static async calculateFavorableDates(startDate: Date, endDate: Date): Promise<Date[]> {
    const favorableDates: Date[] = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const positions = await SuryaSiddhantaCalculator.calculatePlanetaryPositions(
        currentDate,
        0,
        0
      );
      if (this.isDateFavorable(positions)) {
        favorableDates.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return favorableDates;
  }

  private static async calculateChallengingDates(startDate: Date, endDate: Date): Promise<Date[]> {
    const challengingDates: Date[] = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const positions = await SuryaSiddhantaCalculator.calculatePlanetaryPositions(
        currentDate,
        0,
        0
      );
      if (this.isDateChallenging(positions)) {
        challengingDates.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return challengingDates;
  }

  private static calculateEffectEndDate(startDate: Date, planet: string): Date {
    const endDate = new Date(startDate);
    const transitDurations: Record<string, number> = {
      Sun: 1,
      Moon: 2.5,
      Mars: 7,
      Mercury: 7,
      Jupiter: 30,
      Venus: 21,
      Saturn: 60,
      Rahu: 180,
      Ketu: 180,
    };
    endDate.setDate(endDate.getDate() + (transitDurations[planet] || 1));
    return endDate;
  }

  private static isDateFavorable(positions: PlanetaryPosition[]): boolean {
    // Implement Vedic astrology logic for favorable dates
    return Math.random() > 0.7; // Placeholder implementation
  }

  private static isDateChallenging(positions: PlanetaryPosition[]): boolean {
    // Implement Vedic astrology logic for challenging dates
    return Math.random() > 0.8; // Placeholder implementation
  }
} 