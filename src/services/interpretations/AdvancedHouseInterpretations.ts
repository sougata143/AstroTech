import { DetailedHousePlanetInterpretations } from './DetailedHousePlanetInterpretations';

interface HouseSignificance {
  basicSignifications: string[];
  advancedSignifications: {
    career: string[];
    relationships: string[];
    spirituality: string[];
    health: string[];
    wealth: string[];
  };
  planetaryInfluences: Record<string, {
    positive: string[];
    negative: string[];
    remedies: string[];
  }>;
  houseSignLordInfluence: {
    strong: string[];
    weak: string[];
    remedies: string[];
  };
  aspectInfluences: {
    benefic: string[];
    malefic: string[];
    mixed: string[];
  };
}

export class AdvancedHouseInterpretations extends DetailedHousePlanetInterpretations {
  private static readonly HOUSE_INTERPRETATIONS: Record<number, HouseSignificance> = {
    1: {
      basicSignifications: [
        'Physical body and appearance',
        'Personality and behavior',
        'Self-awareness and identity',
        'Life direction and personal projects'
      ],
      advancedSignifications: {
        career: [
          'Leadership abilities',
          'Professional image',
          'Career direction',
          'Public reputation'
        ],
        relationships: [
          'Self in relationships',
          'Personal boundaries',
          'Relationship needs',
          'Partnership approach'
        ],
        spirituality: [
          'Spiritual identity',
          'Personal dharma',
          'Soul purpose',
          'Spiritual direction'
        ],
        health: [
          'Physical vitality',
          'Body constitution',
          'Health awareness',
          'Natural healing ability'
        ],
        wealth: [
          'Personal earning capacity',
          'Self-made wealth',
          'Financial independence',
          'Money management skills'
        ]
      },
      planetaryInfluences: {
        Sun: {
          positive: [
            'Strong willpower',
            'Natural leadership',
            'Clear direction in life',
            'Good vitality'
          ],
          negative: [
            'Ego issues',
            'Domineering nature',
            'Excessive pride',
            'Health sensitivity'
          ],
          remedies: [
            'Ruby gemstone',
            'Sun meditation',
            'Surya Namaskar',
            'Copper charity'
          ]
        },
        Moon: {
          positive: [
            'Emotional intelligence',
            'Public appeal',
            'Adaptability',
            'Good intuition'
          ],
          negative: [
            'Emotional volatility',
            'Mood swings',
            'Public sensitivity',
            'Changeable nature'
          ],
          remedies: [
            'Pearl gemstone',
            'Moon meditation',
            'Water charity',
            'Silver donations'
          ]
        }
        // Add other planets...
      },
      houseSignLordInfluence: {
        strong: [
          'Clear sense of self',
          'Strong personality',
          'Good health',
          'Successful endeavors'
        ],
        weak: [
          'Identity confusion',
          'Low self-esteem',
          'Health issues',
          'Directionless'
        ],
        remedies: [
          'Strengthen house lord',
          'Planetary yoga enhancement',
          'Appropriate gemstones',
          'Specific mantras'
        ]
      },
      aspectInfluences: {
        benefic: [
          'Enhanced personality',
          'Good fortune',
          'Protection',
          'Success in endeavors'
        ],
        malefic: [
          'Physical challenges',
          'Obstacles',
          'Identity issues',
          'Direction problems'
        ],
        mixed: [
          'Complex personality',
          'Mixed results',
          'Learning through challenges',
          'Transformative experiences'
        ]
      }
    }
    // Add interpretations for other houses...
  };

  static getHouseInterpretation(houseNumber: number): HouseSignificance | null {
    return this.HOUSE_INTERPRETATIONS[houseNumber] || null;
  }

  static analyzeHouseLordStrength(
    houseNumber: number,
    lordStrength: number
  ): {
    level: 'strong' | 'moderate' | 'weak';
    effects: string[];
    recommendations: string[];
  } {
    const interpretation = this.getHouseInterpretation(houseNumber);
    if (!interpretation) return { level: 'moderate', effects: [], recommendations: [] };

    if (lordStrength >= 0.7) {
      return {
        level: 'strong',
        effects: interpretation.houseSignLordInfluence.strong,
        recommendations: []
      };
    } else if (lordStrength <= 0.3) {
      return {
        level: 'weak',
        effects: interpretation.houseSignLordInfluence.weak,
        recommendations: interpretation.houseSignLordInfluence.remedies
      };
    }

    return {
      level: 'moderate',
      effects: [
        'Mixed influence of house lord',
        'Variable results in house matters',
        'Need for balanced approach'
      ],
      recommendations: [
        'Regular strengthening practices',
        'Balanced remedial measures',
        'Periodic review and adjustment'
      ]
    };
  }

  static analyzePlanetaryInfluences(
    houseNumber: number,
    planets: Array<{ planet: string; strength: number }>
  ): {
    beneficInfluences: string[];
    maleficInfluences: string[];
    recommendations: string[];
  } {
    const interpretation = this.getHouseInterpretation(houseNumber);
    if (!interpretation) {
      return {
        beneficInfluences: [],
        maleficInfluences: [],
        recommendations: []
      };
    }

    const result = {
      beneficInfluences: [] as string[],
      maleficInfluences: [] as string[],
      recommendations: [] as string[]
    };

    planets.forEach(({ planet, strength }) => {
      const planetaryInfluence = interpretation.planetaryInfluences[planet];
      if (!planetaryInfluence) return;

      if (strength >= 0.6) {
        result.beneficInfluences.push(...planetaryInfluence.positive);
      } else if (strength <= 0.4) {
        result.maleficInfluences.push(...planetaryInfluence.negative);
        result.recommendations.push(...planetaryInfluence.remedies);
      }
    });

    return result;
  }

  static getAreaSpecificInterpretation(
    houseNumber: number,
    area: keyof HouseSignificance['advancedSignifications']
  ): string[] {
    const interpretation = this.getHouseInterpretation(houseNumber);
    return interpretation?.advancedSignifications[area] || [];
  }
} 