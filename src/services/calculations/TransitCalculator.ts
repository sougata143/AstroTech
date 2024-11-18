import { PlanetaryPosition } from '../types/Predictions';

interface TransitPeriod {
  planet: string;
  startDate: Date;
  endDate: Date;
  house: number;
  aspects: Array<{
    planet: string;
    aspect: number;
    nature: 'beneficial' | 'neutral' | 'challenging';
  }>;
  effect: string;
  significance: number; // 0-1
}

export class TransitCalculator {
  private static readonly ASPECT_ORBS = {
    conjunction: 8,
    opposition: 8,
    trine: 8,
    square: 7,
    sextile: 6
  };

  private static readonly PLANET_SPEEDS = {
    Sun: 1,
    Moon: 13.2,
    Mars: 0.524,
    Mercury: 1.383,
    Jupiter: 0.083,
    Venus: 1.2,
    Saturn: 0.034,
    Rahu: -0.053,
    Ketu: -0.053
  };

  static async calculateTransitPeriods(
    birthChart: PlanetaryPosition[],
    startDate: Date,
    endDate: Date
  ): Promise<TransitPeriod[]> {
    const periods: TransitPeriod[] = [];
    const significantDates = this.findSignificantDates(startDate, endDate, birthChart);

    for (const date of significantDates) {
      const transitPositions = await this.calculatePlanetaryPositions(date);
      const newPeriods = this.analyzeTransits(transitPositions, birthChart, date);
      periods.push(...newPeriods);
    }

    return this.consolidateTransitPeriods(periods);
  }

  private static findSignificantDates(
    startDate: Date,
    endDate: Date,
    birthChart: PlanetaryPosition[]
  ): Date[] {
    const dates: Date[] = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      if (this.isSignificantDate(currentDate, birthChart)) {
        dates.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }

  private static isSignificantDate(date: Date, birthChart: PlanetaryPosition[]): boolean {
    // Check for special tithi, nakshatra, yoga combinations
    const tithi = this.calculateTithi(date);
    const nakshatra = this.calculateNakshatra(date);
    const yoga = this.calculateYoga(date);

    // Check for planetary aspects
    const transitPositions = this.calculatePlanetaryPositions(date);
    const hasSignificantAspects = this.hasSignificantAspects(transitPositions, birthChart);

    return (
      this.isAuspiciousTithi(tithi) ||
      this.isAuspiciousNakshatra(nakshatra) ||
      this.isAuspiciousYoga(yoga) ||
      hasSignificantAspects
    );
  }

  private static calculateTithi(date: Date): number {
    // Implement tithi calculation based on lunar day
    return 0;
  }

  private static calculateNakshatra(date: Date): number {
    // Implement nakshatra calculation
    return 0;
  }

  private static calculateYoga(date: Date): number {
    // Implement yoga calculation
    return 0;
  }

  private static isAuspiciousTithi(tithi: number): boolean {
    const auspiciousTithis = [2, 5, 7, 10, 11, 13];
    return auspiciousTithis.includes(tithi);
  }

  private static isAuspiciousNakshatra(nakshatra: number): boolean {
    const auspiciousNakshatras = [1, 3, 5, 7, 10, 13, 15, 17, 20, 23, 25];
    return auspiciousNakshatras.includes(nakshatra);
  }

  private static isAuspiciousYoga(yoga: number): boolean {
    const auspiciousYogas = [4, 6, 8, 9, 12, 14, 16, 19, 21, 24, 26];
    return auspiciousYogas.includes(yoga);
  }

  private static hasSignificantAspects(
    transitPositions: PlanetaryPosition[],
    birthChart: PlanetaryPosition[]
  ): boolean {
    for (const transit of transitPositions) {
      for (const natal of birthChart) {
        const aspect = this.calculateAspect(transit.longitude, natal.longitude);
        if (this.isSignificantAspect(aspect, transit.planet, natal.planet)) {
          return true;
        }
      }
    }
    return false;
  }

  private static calculateAspect(pos1: number, pos2: number): number {
    let diff = Math.abs(pos1 - pos2);
    if (diff > 180) diff = 360 - diff;
    return diff;
  }

  private static isSignificantAspect(
    aspect: number,
    transitPlanet: string,
    natalPlanet: string
  ): boolean {
    const significantAspects = [0, 60, 90, 120, 180];
    const orb = this.getAspectOrb(transitPlanet, natalPlanet);
    
    return significantAspects.some(sig => Math.abs(aspect - sig) <= orb);
  }

  private static getAspectOrb(planet1: string, planet2: string): number {
    // Adjust orb based on planets involved
    if (planet1 === 'Sun' || planet2 === 'Sun') return 10;
    if (planet1 === 'Moon' || planet2 === 'Moon') return 12;
    return 8;
  }

  private static consolidateTransitPeriods(periods: TransitPeriod[]): TransitPeriod[] {
    return periods.reduce((acc, period) => {
      const existingPeriod = acc.find(p =>
        p.planet === period.planet &&
        Math.abs(p.endDate.getTime() - period.startDate.getTime()) <= 86400000
      );

      if (existingPeriod) {
        existingPeriod.endDate = period.endDate;
        existingPeriod.significance = Math.max(existingPeriod.significance, period.significance);
        existingPeriod.aspects = [...existingPeriod.aspects, ...period.aspects];
      } else {
        acc.push(period);
      }

      return acc;
    }, [] as TransitPeriod[]);
  }

  private static calculatePlanetaryPositions(date: Date): PlanetaryPosition[] {
    // Implement actual planetary position calculations
    return [];
  }
} 