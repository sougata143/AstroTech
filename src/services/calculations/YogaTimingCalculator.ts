import { PlanetaryInfluence } from './AdvancedPlanetaryCombinations';

interface YogaActivationPeriod {
  startDate: Date;
  peakDate: Date;
  endDate: Date;
  intensity: number;
  phases: {
    name: string;
    start: Date;
    end: Date;
    effects: string[];
  }[];
}

interface YogaStrengthFactors {
  planetaryStrength: number;
  houseStrength: number;
  aspectStrength: number;
  transitStrength: number;
  temporalStrength: number;
  dignityStrength: number;
  nakshtraStrength: number;
  lordshipStrength: number;
}

export class YogaTimingCalculator {
  private static readonly PLANETARY_SPEEDS = {
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

  private static readonly DIGNITY_STRENGTHS = {
    exalted: 1.0,
    moolatrikona: 0.85,
    own: 0.75,
    friendly: 0.5,
    neutral: 0.25,
    enemy: 0.1,
    debilitated: 0
  };

  private static readonly HOUSE_STRENGTHS = {
    angular: 1.0, // 1, 4, 7, 10
    succedent: 0.75, // 2, 5, 8, 11
    cadent: 0.5 // 3, 6, 9, 12
  };

  private static readonly ASPECT_STRENGTHS = {
    conjunction: 1.0,
    opposition: 0.8,
    trine: 0.8,
    square: 0.4,
    sextile: 0.6
  };

  static calculateYogaActivation(
    planets: PlanetaryInfluence[],
    birthDate: Date,
    currentDate: Date
  ): YogaActivationPeriod {
    const strength = this.calculateDetailedStrength(planets, birthDate, currentDate);
    const timing = this.calculateActivationTiming(planets, birthDate, currentDate);
    
    return {
      startDate: timing.startDate,
      peakDate: timing.peakDate,
      endDate: timing.endDate,
      intensity: this.calculateOverallStrength(strength),
      phases: this.calculateActivationPhases(timing, strength)
    };
  }

  private static calculateDetailedStrength(
    planets: PlanetaryInfluence[],
    birthDate: Date,
    currentDate: Date
  ): YogaStrengthFactors {
    return {
      planetaryStrength: this.calculatePlanetaryStrength(planets),
      houseStrength: this.calculateHouseStrength(planets),
      aspectStrength: this.calculateAspectStrength(planets),
      transitStrength: this.calculateTransitStrength(planets, currentDate),
      temporalStrength: this.calculateTemporalStrength(birthDate, currentDate),
      dignityStrength: this.calculateDignityStrength(planets),
      nakshtraStrength: this.calculateNakshatraStrength(planets),
      lordshipStrength: this.calculateLordshipStrength(planets)
    };
  }

  private static calculatePlanetaryStrength(planets: PlanetaryInfluence[]): number {
    return planets.reduce((total, planet) => {
      const baseStrength = planet.strength || 0;
      const speedFactor = this.PLANETARY_SPEEDS[planet.planet as keyof typeof this.PLANETARY_SPEEDS] || 1;
      const dignityFactor = this.DIGNITY_STRENGTHS[planet.dignity as keyof typeof this.DIGNITY_STRENGTHS] || 0.25;
      
      return total + (baseStrength * speedFactor * dignityFactor);
    }, 0) / planets.length;
  }

  private static calculateHouseStrength(planets: PlanetaryInfluence[]): number {
    return planets.reduce((total, planet) => {
      const houseType = this.getHouseType(planet.house);
      const houseStrength = this.HOUSE_STRENGTHS[houseType];
      return total + houseStrength;
    }, 0) / planets.length;
  }

  private static getHouseType(house: number): keyof typeof YogaTimingCalculator.HOUSE_STRENGTHS {
    if ([1, 4, 7, 10].includes(house)) return 'angular';
    if ([2, 5, 8, 11].includes(house)) return 'succedent';
    return 'cadent';
  }

  private static calculateAspectStrength(planets: PlanetaryInfluence[]): number {
    let totalStrength = 0;
    let aspectCount = 0;

    planets.forEach((p1, i) => {
      planets.slice(i + 1).forEach(p2 => {
        p1.aspects.forEach(aspect => {
          const aspectType = this.getAspectType(aspect.angle);
          if (aspectType) {
            totalStrength += this.ASPECT_STRENGTHS[aspectType];
            aspectCount++;
          }
        });
      });
    });

    return aspectCount > 0 ? totalStrength / aspectCount : 0;
  }

  private static getAspectType(angle: number): keyof typeof YogaTimingCalculator.ASPECT_STRENGTHS | null {
    const orb = 6; // Degree of orb allowed
    if (Math.abs(angle - 0) <= orb) return 'conjunction';
    if (Math.abs(angle - 180) <= orb) return 'opposition';
    if (Math.abs(angle - 120) <= orb) return 'trine';
    if (Math.abs(angle - 90) <= orb) return 'square';
    if (Math.abs(angle - 60) <= orb) return 'sextile';
    return null;
  }

  private static calculateTransitStrength(planets: PlanetaryInfluence[], currentDate: Date): number {
    // Implementation for transit strength calculation
    return 0.75; // Placeholder
  }

  private static calculateTemporalStrength(birthDate: Date, currentDate: Date): number {
    // Calculate strength based on temporal factors (dashas, etc.)
    return 0.8; // Placeholder
  }

  private static calculateDignityStrength(planets: PlanetaryInfluence[]): number {
    return planets.reduce((total, planet) => {
      const dignityFactor = this.DIGNITY_STRENGTHS[planet.dignity as keyof typeof this.DIGNITY_STRENGTHS] || 0.25;
      return total + dignityFactor;
    }, 0) / planets.length;
  }

  private static calculateNakshatraStrength(planets: PlanetaryInfluence[]): number {
    // Implementation for nakshatra strength calculation
    return 0.7; // Placeholder
  }

  private static calculateLordshipStrength(planets: PlanetaryInfluence[]): number {
    // Implementation for lordship strength calculation
    return 0.65; // Placeholder
  }

  private static calculateOverallStrength(factors: YogaStrengthFactors): number {
    const weights = {
      planetaryStrength: 0.2,
      houseStrength: 0.15,
      aspectStrength: 0.15,
      transitStrength: 0.1,
      temporalStrength: 0.1,
      dignityStrength: 0.1,
      nakshtraStrength: 0.1,
      lordshipStrength: 0.1
    };

    return Object.entries(factors).reduce((total, [factor, value]) => {
      const weight = weights[factor as keyof typeof weights];
      return total + (value * weight);
    }, 0);
  }

  private static calculateActivationTiming(
    planets: PlanetaryInfluence[],
    birthDate: Date,
    currentDate: Date
  ): {
    startDate: Date;
    peakDate: Date;
    endDate: Date;
  } {
    // Calculate activation timing based on planetary positions and transits
    const startDate = new Date(currentDate);
    const peakDate = new Date(currentDate);
    const endDate = new Date(currentDate);

    // Add implementation for precise timing calculations
    peakDate.setMonth(peakDate.getMonth() + 3);
    endDate.setMonth(endDate.getMonth() + 6);

    return { startDate, peakDate, endDate };
  }

  private static calculateActivationPhases(
    timing: { startDate: Date; peakDate: Date; endDate: Date },
    strength: YogaStrengthFactors
  ): YogaActivationPeriod['phases'] {
    const totalDuration = timing.endDate.getTime() - timing.startDate.getTime();
    const phases: YogaActivationPeriod['phases'] = [];

    // Initial Phase
    phases.push({
      name: 'Initial Activation',
      start: timing.startDate,
      end: new Date(timing.startDate.getTime() + totalDuration * 0.3),
      effects: [
        'Initial manifestation of yoga effects',
        'Gradual increase in influence',
        'Preparation phase'
      ]
    });

    // Peak Phase
    phases.push({
      name: 'Peak Manifestation',
      start: new Date(timing.startDate.getTime() + totalDuration * 0.3),
      end: new Date(timing.startDate.getTime() + totalDuration * 0.7),
      effects: [
        'Maximum yoga influence',
        'Strongest manifestation period',
        'Key opportunities and developments'
      ]
    });

    // Stabilization Phase
    phases.push({
      name: 'Stabilization',
      start: new Date(timing.startDate.getTime() + totalDuration * 0.7),
      end: timing.endDate,
      effects: [
        'Integration of yoga effects',
        'Long-term establishment',
        'Sustained benefits'
      ]
    });

    return phases;
  }
} 