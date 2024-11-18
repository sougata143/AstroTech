import { PlanetaryPosition } from '../types/Predictions';

interface DetailedInterpretation {
  general: {
    nature: string;
    significations: string[];
    qualities: string[];
    influence: string;
  };
  houses: Record<number, {
    effects: string[];
    opportunities: string[];
    challenges: string[];
    recommendations: string[];
  }>;
  aspects: Record<number, {
    type: string;
    effect: string;
    areas: string[];
    recommendations: string[];
  }>;
  transits: {
    favorable: string[];
    challenging: string[];
    neutral: string[];
    timing: {
      bestTime: string;
      challengingTime: string;
      preparation: string[];
    };
  };
}

export class DetailedPlanetaryInterpreter {
  private static readonly PLANETARY_INTERPRETATIONS: Record<string, DetailedInterpretation> = {
    Sun: {
      general: {
        nature: 'Natural significator of soul, authority, and vitality',
        significations: [
          'Self-expression',
          'Leadership abilities',
          'Government relations',
          'Father figure',
          'Physical vitality'
        ],
        qualities: [
          'Masculine energy',
          'Hot and dry nature',
          'Royal disposition',
          'Command and authority'
        ],
        influence: 'Governs overall life direction and soul purpose'
      },
      houses: {
        1: {
          effects: [
            'Strong personality and leadership qualities',
            'Natural authority and command',
            'Physical vitality and good health'
          ],
          opportunities: [
            'Leadership positions',
            'Government service',
            'Public recognition'
          ],
          challenges: [
            'Ego-related issues',
            'Tendency to dominate',
            'Health sensitivity to heat'
          ],
          recommendations: [
            'Practice humility while maintaining authority',
            'Regular exercise for vitality',
            'Develop leadership skills consciously'
          ]
        },
        // Add interpretations for other houses...
      },
      aspects: {
        0: { // Conjunction
          type: 'Powerful fusion of energies',
          effect: 'Intensifies solar qualities',
          areas: ['Leadership', 'Authority', 'Recognition'],
          recommendations: [
            'Channel the intense energy constructively',
            'Balance power with responsibility',
            'Focus on personal growth'
          ]
        },
        60: { // Sextile
          type: 'Harmonious opportunity',
          effect: 'Supports solar expression',
          areas: ['Creativity', 'Leadership development', 'Social recognition'],
          recommendations: [
            'Take initiative in favorable circumstances',
            'Develop creative leadership',
            'Build beneficial relationships'
          ]
        },
        // Add other aspects...
      },
      transits: {
        favorable: [
          'Excellent for career advancement',
          'Good time for government dealings',
          'Period of increased vitality'
        ],
        challenging: [
          'Watch for ego conflicts',
          'Health needs extra attention',
          'Authority may be challenged'
        ],
        neutral: [
          'Normal period for personal growth',
          'Maintain regular routines',
          'Focus on balanced development'
        ],
        timing: {
          bestTime: 'During sunrise and the first 2 hours after',
          challengingTime: 'During solar eclipses or when combust',
          preparation: [
            'Strengthen physical constitution',
            'Develop leadership qualities',
            'Build authentic authority'
          ]
        }
      }
    },
    Moon: {
      general: {
        nature: 'Significator of mind, emotions, and adaptability',
        significations: [
          'Emotional nature',
          'Mental stability',
          'Mother figure',
          'Public interactions',
          'Comfort and nurturing'
        ],
        qualities: [
          'Feminine energy',
          'Cool and moist nature',
          'Receptive disposition',
          'Emotional intelligence'
        ],
        influence: 'Governs emotional well-being and mental peace'
      },
      houses: {
        1: {
          effects: [
            'Highly sensitive and intuitive nature',
            'Strong emotional intelligence',
            'Public appeal and popularity'
          ],
          opportunities: [
            'Success in public dealings',
            'Emotional leadership',
            'Nurturing roles'
          ],
          challenges: [
            'Emotional sensitivity',
            'Mood fluctuations',
            'Need for emotional security'
          ],
          recommendations: [
            'Develop emotional stability practices',
            'Regular meditation or mindfulness',
            'Create nurturing environments'
          ]
        },
        // Add other houses...
      },
      aspects: {
        // Add aspects...
      },
      transits: {
        // Add transit interpretations...
      }
    },
    // Add other planets...
  };

  static interpretPlanet(
    planet: PlanetaryPosition,
    house: number,
    aspects: Array<{ planet: string; angle: number }>,
    transitingPlanets: PlanetaryPosition[]
  ) {
    const baseInterpretation = this.PLANETARY_INTERPRETATIONS[planet.planet];
    if (!baseInterpretation) return null;

    const houseEffects = this.getHouseEffects(planet.planet, house);
    const aspectEffects = this.interpretAspects(planet.planet, aspects);
    const transitEffects = this.interpretTransits(planet.planet, transitingPlanets);

    return {
      ...baseInterpretation,
      currentPosition: {
        house: houseEffects,
        aspects: aspectEffects,
        transits: transitEffects
      },
      recommendations: this.generateRecommendations(
        planet.planet,
        house,
        aspects,
        transitingPlanets
      )
    };
  }

  private static getHouseEffects(planet: string, house: number) {
    const interpretation = this.PLANETARY_INTERPRETATIONS[planet];
    return interpretation?.houses[house] || {
      effects: [],
      opportunities: [],
      challenges: [],
      recommendations: []
    };
  }

  private static interpretAspects(
    planet: string,
    aspects: Array<{ planet: string; angle: number }>
  ) {
    const interpretation = this.PLANETARY_INTERPRETATIONS[planet];
    return aspects.map(aspect => ({
      ...interpretation?.aspects[aspect.angle],
      withPlanet: aspect.planet
    })).filter(Boolean);
  }

  private static interpretTransits(
    planet: string,
    transitingPlanets: PlanetaryPosition[]
  ) {
    const interpretation = this.PLANETARY_INTERPRETATIONS[planet];
    const currentTransits = transitingPlanets.filter(p => p.planet === planet);
    
    return {
      current: interpretation?.transits,
      specific: currentTransits.map(transit => ({
        position: transit.longitude,
        effects: this.getTransitEffects(planet, transit)
      }))
    };
  }

  private static getTransitEffects(planet: string, transit: PlanetaryPosition) {
    // Implement specific transit effects based on planetary positions
    return [];
  }

  private static generateRecommendations(
    planet: string,
    house: number,
    aspects: Array<{ planet: string; angle: number }>,
    transitingPlanets: PlanetaryPosition[]
  ): string[] {
    const interpretation = this.PLANETARY_INTERPRETATIONS[planet];
    if (!interpretation) return [];

    const recommendations = [
      ...interpretation.houses[house]?.recommendations || [],
      ...aspects.flatMap(aspect => 
        interpretation.aspects[aspect.angle]?.recommendations || []
      ),
      ...interpretation.transits.timing.preparation
    ];

    return [...new Set(recommendations)];
  }
} 