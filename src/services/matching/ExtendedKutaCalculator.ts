import { KutaCalculator, KutaResult } from './KutaCalculator';

interface PlanetaryHarmony {
  planets: [string, string];
  relationship: 'friend' | 'neutral' | 'enemy';
  strength: number;
  effects: string[];
}

export class ExtendedKutaCalculator extends KutaCalculator {
  private static readonly GRAHA_MAITRI_POINTS: Record<string, Record<string, number>> = {
    Sun: {
      Moon: 5,
      Mars: 5,
      Jupiter: 5,
      Mercury: 0,
      Venus: -1,
      Saturn: -1
    },
    Moon: {
      Sun: 4,
      Mars: 4,
      Mercury: 4,
      Jupiter: 5,
      Venus: 5,
      Saturn: 0
    },
    Mars: {
      Sun: 5,
      Moon: 4,
      Mercury: 0,
      Jupiter: 5,
      Venus: -1,
      Saturn: 0
    },
    Mercury: {
      Sun: 0,
      Moon: 4,
      Mars: 0,
      Jupiter: 5,
      Venus: 5,
      Saturn: 4
    },
    Jupiter: {
      Sun: 5,
      Moon: 5,
      Mars: 5,
      Mercury: 5,
      Venus: 0,
      Saturn: -1
    },
    Venus: {
      Sun: -1,
      Moon: 5,
      Mars: -1,
      Mercury: 5,
      Jupiter: 0,
      Saturn: 5
    },
    Saturn: {
      Sun: -1,
      Moon: 0,
      Mars: 0,
      Mercury: 4,
      Jupiter: -1,
      Venus: 5
    }
  };

  private static readonly GANA_TYPES = {
    Dev: ['Ashwini', 'Mrigashira', 'Punarvasu', 'Pushya', 'Hasta', 'Swati', 'Anuradha', 'Shravana', 'Revati'],
    Manushya: ['Bharani', 'Rohini', 'Ardra', 'Purva Phalguni', 'Uttara Phalguni', 'Purva Ashadha', 'Uttara Ashadha', 'Purva Bhadrapada', 'Uttara Bhadrapada'],
    Rakshasa: ['Krittika', 'Ashlesha', 'Magha', 'Chitra', 'Vishakha', 'Jyeshtha', 'Mula', 'Dhanishta', 'Shatabhisha']
  };

  private static readonly MAHENDRA_NAKSHATRAS = [
    'Ashwini', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu',
    'Pushya', 'Uttara Phalguni', 'Hasta', 'Swati', 'Anuradha',
    'Mula', 'Uttara Ashadha', 'Shravana', 'Uttara Bhadrapada', 'Revati'
  ];

  static calculateGrahaMaitriKuta(bridePlanet: string, groomPlanet: string): KutaResult {
    const score = this.calculateGrahaMaitriScore(bridePlanet, groomPlanet);
    
    return {
      score,
      maxScore: 5,
      details: {
        description: `Planetary friendship between ${bridePlanet} and ${groomPlanet}`,
        positivePoints: this.getGrahaMaitriPositivePoints(bridePlanet, groomPlanet, score),
        challenges: this.getGrahaMaitriChallenges(bridePlanet, groomPlanet, score),
        recommendations: this.getGrahaMaitriRecommendations(bridePlanet, groomPlanet, score)
      }
    };
  }

  static calculateGanaKuta(brideNakshatra: string, groomNakshatra: string): KutaResult {
    const brideGana = this.getGanaType(brideNakshatra);
    const groomGana = this.getGanaType(groomNakshatra);
    const score = this.calculateGanaScore(brideGana, groomGana);

    return {
      score,
      maxScore: 6,
      details: {
        description: `Temperamental compatibility between ${brideGana} and ${groomGana} ganas`,
        positivePoints: this.getGanaPositivePoints(brideGana, groomGana),
        challenges: this.getGanaChallenges(brideGana, groomGana),
        recommendations: this.getGanaRecommendations(brideGana, groomGana)
      }
    };
  }

  static calculateMahendraKuta(brideNakshatra: string, groomNakshatra: string): KutaResult {
    const isMahendra = this.isMahendraNakshatra(brideNakshatra, groomNakshatra);
    
    return {
      score: isMahendra ? 1 : 0,
      maxScore: 1,
      details: {
        description: 'Mahendra Kuta analysis',
        positivePoints: isMahendra ? ['Auspicious Mahendra combination present'] : [],
        challenges: isMahendra ? [] : ['Mahendra combination not present'],
        recommendations: this.getMahendraRecommendations(isMahendra)
      }
    };
  }

  static analyzePlanetaryHarmony(
    bridePlanets: string[],
    groomPlanets: string[]
  ): PlanetaryHarmony[] {
    const harmonies: PlanetaryHarmony[] = [];

    bridePlanets.forEach(bridePlanet => {
      groomPlanets.forEach(groomPlanet => {
        const relationship = this.getPlanetaryRelationship(bridePlanet, groomPlanet);
        const strength = this.calculateRelationshipStrength(bridePlanet, groomPlanet);

        harmonies.push({
          planets: [bridePlanet, groomPlanet],
          relationship,
          strength,
          effects: this.getPlanetaryHarmonyEffects(bridePlanet, groomPlanet, relationship)
        });
      });
    });

    return harmonies;
  }

  private static calculateGrahaMaitriScore(planet1: string, planet2: string): number {
    const directScore = this.GRAHA_MAITRI_POINTS[planet1]?.[planet2] ?? 0;
    const reverseScore = this.GRAHA_MAITRI_POINTS[planet2]?.[planet1] ?? 0;
    return (directScore + reverseScore) / 2;
  }

  private static getGanaType(nakshatra: string): keyof typeof ExtendedKutaCalculator.GANA_TYPES {
    for (const [gana, nakshatras] of Object.entries(this.GANA_TYPES)) {
      if (nakshatras.includes(nakshatra)) {
        return gana as keyof typeof ExtendedKutaCalculator.GANA_TYPES;
      }
    }
    throw new Error(`Invalid nakshatra: ${nakshatra}`);
  }

  private static calculateGanaScore(gana1: string, gana2: string): number {
    if (gana1 === gana2) return 6;
    if ((gana1 === 'Dev' && gana2 === 'Manushya') || 
        (gana1 === 'Manushya' && gana2 === 'Dev')) return 5;
    if ((gana1 === 'Manushya' && gana2 === 'Rakshasa') || 
        (gana1 === 'Rakshasa' && gana2 === 'Manushya')) return 4;
    if ((gana1 === 'Dev' && gana2 === 'Rakshasa') || 
        (gana1 === 'Rakshasa' && gana2 === 'Dev')) return 3;
    return 0;
  }

  private static isMahendraNakshatra(bride: string, groom: string): boolean {
    return this.MAHENDRA_NAKSHATRAS.includes(bride) && 
           this.MAHENDRA_NAKSHATRAS.includes(groom);
  }

  private static getPlanetaryRelationship(planet1: string, planet2: string): 'friend' | 'neutral' | 'enemy' {
    const score = this.calculateGrahaMaitriScore(planet1, planet2);
    if (score >= 4) return 'friend';
    if (score <= 0) return 'enemy';
    return 'neutral';
  }

  private static calculateRelationshipStrength(planet1: string, planet2: string): number {
    const baseScore = this.calculateGrahaMaitriScore(planet1, planet2);
    return (baseScore + 1) / 6; // Normalize to 0-1 range
  }

  private static getPlanetaryHarmonyEffects(
    planet1: string,
    planet2: string,
    relationship: 'friend' | 'neutral' | 'enemy'
  ): string[] {
    const effects: string[] = [];
    
    switch (relationship) {
      case 'friend':
        effects.push(
          `Harmonious relationship between ${planet1} and ${planet2}`,
          'Supports mutual growth and development',
          'Enhances positive qualities of both planets'
        );
        break;
      case 'neutral':
        effects.push(
          `Balanced interaction between ${planet1} and ${planet2}`,
          'Neither supports nor hinders',
          'Requires conscious effort to maintain harmony'
        );
        break;
      case 'enemy':
        effects.push(
          `Challenging relationship between ${planet1} and ${planet2}`,
          'May create obstacles or conflicts',
          'Requires remedial measures for harmonization'
        );
        break;
    }

    return effects;
  }

  private static getGrahaMaitriPositivePoints(planet1: string, planet2: string, score: number): string[] {
    if (score >= 4) {
      return [
        `Strong friendship between ${planet1} and ${planet2}`,
        'Mutual support and enhancement',
        'Natural harmony in relationship'
      ];
    }
    return [];
  }

  private static getGrahaMaitriChallenges(planet1: string, planet2: string, score: number): string[] {
    if (score <= 0) {
      return [
        `Natural enmity between ${planet1} and ${planet2}`,
        'Potential conflicts in relationship',
        'Need for conscious harmonization'
      ];
    }
    return [];
  }

  private static getGrahaMaitriRecommendations(planet1: string, planet2: string, score: number): string[] {
    const recommendations: string[] = [];
    
    if (score <= 0) {
      recommendations.push(
        `Perform remedial measures for ${planet1} and ${planet2}`,
        'Practice mutual understanding and acceptance',
        'Consider astrological remedies for harmony'
      );
    } else if (score <= 3) {
      recommendations.push(
        'Maintain conscious awareness of planetary influences',
        'Regular spiritual practices for harmony',
        'Focus on common ground and shared values'
      );
    }

    return recommendations;
  }

  private static getGanaPositivePoints(gana1: string, gana2: string): string[] {
    if (gana1 === gana2) {
      return [
        'Perfect temperamental compatibility',
        'Natural understanding and harmony',
        'Shared values and perspectives'
      ];
    }
    return [];
  }

  private static getGanaChallenges(gana1: string, gana2: string): string[] {
    if (gana1 !== gana2) {
      return [
        'Different temperamental natures',
        'Need for adjustment and understanding',
        'Potential for misunderstandings'
      ];
    }
    return [];
  }

  private static getGanaRecommendations(gana1: string, gana2: string): string[] {
    if (gana1 !== gana2) {
      return [
        'Practice patience and understanding',
        'Respect differences in nature',
        'Focus on complementary qualities'
      ];
    }
    return [
      'Maintain natural harmony',
      'Build on shared strengths',
      'Nurture similar qualities'
    ];
  }

  private static getMahendraRecommendations(isMahendra: boolean): string[] {
    if (isMahendra) {
      return [
        'Utilize auspicious Mahendra combination',
        'Plan important events on Mahendra days',
        'Strengthen spiritual connection'
      ];
    }
    return [
      'Consider other auspicious combinations',
      'Focus on strengthening other aspects',
      'Perform compensatory remedial measures'
    ];
  }
} 