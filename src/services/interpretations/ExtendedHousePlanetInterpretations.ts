import { DetailedHousePlanetInterpretations } from './DetailedHousePlanetInterpretations';

interface ExtendedHouseAnalysis {
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

export class ExtendedHousePlanetInterpretations extends DetailedHousePlanetInterpretations {
  private static readonly EXTENDED_HOUSE_ANALYSIS: Record<number, ExtendedHouseAnalysis> = {
    1: {
      basicSignifications: [
        'Physical appearance and constitution',
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
    },
    2: {
      basicSignifications: [
        'Wealth and possessions',
        'Family and values',
        'Speech and communication',
        'Early education'
      ],
      advancedSignifications: {
        career: [
          'Income through career',
          'Professional values',
          'Business acumen',
          'Work-related resources'
        ],
        relationships: [
          'Family relationships',
          'Value alignment in partnerships',
          'Communication in relationships',
          'Shared resources'
        ],
        spirituality: [
          'Spiritual values',
          'Sacred speech',
          'Material detachment',
          'Spiritual wealth'
        ],
        health: [
          'Eating habits',
          'Face and throat',
          'Dental health',
          'Speech-related health'
        ],
        wealth: [
          'Accumulated wealth',
          'Savings and investments',
          'Financial stability',
          'Material security'
        ]
      },
      // Add remaining house details...
    }
    // Add remaining houses...
  };

  static getExtendedHouseAnalysis(
    houseNumber: number,
    planets: Array<{ planet: string; strength: number }>,
    aspects: Array<{ planet: string; aspect: string; strength: number }>
  ): ExtendedHouseAnalysis | null {
    const analysis = this.EXTENDED_HOUSE_ANALYSIS[houseNumber];
    if (!analysis) return null;

    // Customize analysis based on planetary positions and aspects
    return {
      ...analysis,
      planetaryInfluences: this.customizePlanetaryInfluences(analysis.planetaryInfluences, planets),
      aspectInfluences: this.customizeAspectInfluences(analysis.aspectInfluences, aspects)
    };
  }

  private static customizePlanetaryInfluences(
    baseInfluences: ExtendedHouseAnalysis['planetaryInfluences'],
    planets: Array<{ planet: string; strength: number }>
  ) {
    const customized = { ...baseInfluences };
    
    planets.forEach(({ planet, strength }) => {
      if (customized[planet]) {
        if (strength > 0.7) {
          customized[planet].positive = [
            ...customized[planet].positive,
            ...this.getAdditionalPositiveEffects(planet)
          ];
        } else if (strength < 0.3) {
          customized[planet].negative = [
            ...customized[planet].negative,
            ...this.getAdditionalNegativeEffects(planet)
          ];
        }
      }
    });

    return customized;
  }

  private static customizeAspectInfluences(
    baseAspects: ExtendedHouseAnalysis['aspectInfluences'],
    aspects: Array<{ planet: string; aspect: string; strength: number }>
  ) {
    // Customize aspect influences based on actual aspects
    return baseAspects;
  }

  private static getAdditionalPositiveEffects(planet: string): string[] {
    // Add planet-specific additional positive effects
    return [];
  }

  private static getAdditionalNegativeEffects(planet: string): string[] {
    // Add planet-specific additional negative effects
    return [];
  }
} 