interface HouseInterpretation {
  significations: string[];
  areas: string[];
  effects: {
    positive: string[];
    negative: string[];
  };
  planets: Record<string, {
    effects: string[];
    strengths: string[];
    challenges: string[];
    recommendations: string[];
  }>;
}

export class DetailedHousePlanetInterpretations {
  private static readonly HOUSE_INTERPRETATIONS: Record<number, HouseInterpretation> = {
    1: {
      significations: [
        'Self-image and personality',
        'Physical appearance and constitution',
        'Early childhood and upbringing',
        'General life direction'
      ],
      areas: [
        'Personal projects and initiatives',
        'Self-development',
        'Physical health',
        'Personal brand and image'
      ],
      effects: {
        positive: [
          'Strong personality development',
          'Good health and vitality',
          'Natural leadership abilities',
          'Clear sense of direction'
        ],
        negative: [
          'Identity confusion',
          'Health challenges',
          'Lack of direction',
          'Self-image issues'
        ]
      },
      planets: {
        Sun: {
          effects: [
            'Enhanced leadership qualities',
            'Strong vitality and health',
            'Clear sense of purpose'
          ],
          strengths: [
            'Natural authority',
            'Strong willpower',
            'Good physical constitution'
          ],
          challenges: [
            'Ego issues',
            'Overconfidence',
            'Authority conflicts'
          ],
          recommendations: [
            'Develop leadership skills',
            'Focus on personal growth',
            'Maintain physical health'
          ]
        },
        Moon: {
          effects: [
            'Emotional sensitivity',
            'Strong intuition',
            'Public recognition'
          ],
          strengths: [
            'Emotional intelligence',
            'Public appeal',
            'Adaptability'
          ],
          challenges: [
            'Emotional volatility',
            'Mood swings',
            'Public scrutiny'
          ],
          recommendations: [
            'Practice emotional balance',
            'Develop public speaking',
            'Maintain privacy'
          ]
        }
        // Add other planets...
      }
    },
    2: {
      significations: [
        'Wealth and material possessions',
        'Family values and traditions',
        'Speech and communication',
        'Early education'
      ],
      areas: [
        'Financial planning',
        'Asset management',
        'Family relationships',
        'Value systems'
      ],
      effects: {
        positive: [
          'Financial prosperity',
          'Strong family bonds',
          'Good communication skills',
          'Strong values'
        ],
        negative: [
          'Financial struggles',
          'Family conflicts',
          'Communication issues',
          'Value conflicts'
        ]
      },
      planets: {
        Jupiter: {
          effects: [
            'Financial expansion',
            'Family growth',
            'Wisdom in speech'
          ],
          strengths: [
            'Wealth accumulation',
            'Family harmony',
            'Knowledge sharing'
          ],
          challenges: [
            'Overexpansion',
            'Family responsibilities',
            'Truth vs diplomacy'
          ],
          recommendations: [
            'Plan investments wisely',
            'Nurture family relationships',
            'Develop communication skills'
          ]
        }
        // Add other planets...
      }
    }
    // Add other houses...
  };

  static getHouseInterpretation(house: number): HouseInterpretation | null {
    return this.HOUSE_INTERPRETATIONS[house] || null;
  }

  static getPlanetInHouseInterpretation(house: number, planet: string) {
    return this.HOUSE_INTERPRETATIONS[house]?.planets[planet] || null;
  }

  static analyzeHousePlanetCombination(
    house: number,
    planet: string,
    strength: number
  ): {
    effects: string[];
    recommendations: string[];
  } {
    const interpretation = this.getPlanetInHouseInterpretation(house, planet);
    if (!interpretation) return { effects: [], recommendations: [] };

    const effects = interpretation.effects.filter((_, index) => 
      strength > 0.5 ? index < Math.ceil(interpretation.effects.length * strength) : index < 2
    );

    const recommendations = interpretation.recommendations.filter((_, index) =>
      strength < 0.5 ? index < Math.ceil(interpretation.recommendations.length * (1 - strength)) : index < 2
    );

    return { effects, recommendations };
  }

  static getDetailedHouseAnalysis(
    house: number,
    planets: Array<{ planet: string; strength: number }>
  ) {
    const houseInterpretation = this.getHouseInterpretation(house);
    if (!houseInterpretation) return null;

    const planetaryEffects = planets.map(({ planet, strength }) =>
      this.analyzeHousePlanetCombination(house, planet, strength)
    );

    return {
      significations: houseInterpretation.significations,
      areas: houseInterpretation.areas,
      effects: houseInterpretation.effects,
      planetaryInfluences: planets.map((p, i) => ({
        planet: p.planet,
        strength: p.strength,
        effects: planetaryEffects[i].effects,
        recommendations: planetaryEffects[i].recommendations
      }))
    };
  }
} 