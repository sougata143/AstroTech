import { AdvancedPlanetaryCombinations, PlanetaryInfluence, YogaCombination } from './AdvancedPlanetaryCombinations';

export class ExtendedYogaCombinations extends AdvancedPlanetaryCombinations {
  private static readonly ADDITIONAL_COMBINATIONS = {
    DhanaYogas: [
      {
        name: 'Maha Lakshmi Yoga',
        planets: ['Jupiter', 'Venus', 'Moon'],
        conditions: [
          { type: 'aspect', planets: ['Jupiter', 'Venus'], angle: 120 },
          { type: 'aspect', planets: ['Moon', 'Jupiter'], angle: 120 }
        ],
        effects: {
          primary: [
            'Exceptional wealth accumulation',
            'Financial prosperity',
            'Material abundance'
          ],
          secondary: [
            'Social status',
            'Luxurious lifestyle',
            'International connections'
          ],
          challenges: [
            'Managing sudden wealth',
            'Balancing material and spiritual life',
            'Handling social responsibilities'
          ]
        }
      },
      {
        name: 'Kubera Yoga',
        planets: ['Mercury', 'Jupiter', 'Venus'],
        conditions: [
          { type: 'house', planet: 'Mercury', houses: [2, 5, 11] },
          { type: 'aspect', planets: ['Jupiter', 'Venus'], angle: 120 }
        ],
        effects: {
          primary: [
            'Business success',
            'Multiple sources of income',
            'Financial intelligence'
          ],
          secondary: [
            'Educational achievements',
            'Professional recognition',
            'Investment skills'
          ],
          challenges: [
            'Work-life balance',
            'Managing multiple ventures',
            'Decision paralysis'
          ]
        }
      }
    ],
    VidyaYogas: [
      {
        name: 'Saraswati Yoga',
        planets: ['Jupiter', 'Mercury', 'Venus'],
        conditions: [
          { type: 'house', planet: 'Mercury', houses: [1, 4, 5, 10] },
          { type: 'aspect', planets: ['Jupiter', 'Venus'], angle: 120 }
        ],
        effects: {
          primary: [
            'Academic excellence',
            'Artistic talents',
            'Creative abilities'
          ],
          secondary: [
            'Teaching skills',
            'Writing abilities',
            'Musical talents'
          ],
          challenges: [
            'Perfectionism',
            'Analysis paralysis',
            'High expectations'
          ]
        }
      },
      {
        name: 'Brahma Yoga',
        planets: ['Jupiter', 'Mercury', 'Sun'],
        conditions: [
          { type: 'house', planet: 'Jupiter', houses: [1, 4, 7, 10] },
          { type: 'aspect', planets: ['Mercury', 'Sun'], angle: 60 }
        ],
        effects: {
          primary: [
            'Spiritual wisdom',
            'Teaching abilities',
            'Leadership in education'
          ],
          secondary: [
            'Research capabilities',
            'Innovation skills',
            'Problem-solving abilities'
          ],
          challenges: [
            'Balancing material and spiritual pursuits',
            'Managing time',
            'Setting boundaries'
          ]
        }
      }
    ],
    KarmaYogas: [
      {
        name: 'Karma Siddhi Yoga',
        planets: ['Saturn', 'Mars', 'Sun'],
        conditions: [
          { type: 'house', planet: 'Saturn', houses: [10] },
          { type: 'aspect', planets: ['Mars', 'Sun'], angle: 120 }
        ],
        effects: {
          primary: [
            'Professional success',
            'Career achievements',
            'Authority positions'
          ],
          secondary: [
            'Leadership abilities',
            'Executive skills',
            'Project management'
          ],
          challenges: [
            'Work pressure',
            'High responsibilities',
            'Time management'
          ]
        }
      }
    ],
    MokshaYogas: [
      {
        name: 'Kaivalya Yoga',
        planets: ['Jupiter', 'Saturn', 'Ketu'],
        conditions: [
          { type: 'house', planet: 'Jupiter', houses: [12, 9, 5] },
          { type: 'aspect', planets: ['Saturn', 'Ketu'], angle: 120 }
        ],
        effects: {
          primary: [
            'Spiritual enlightenment',
            'Mystical experiences',
            'Divine knowledge'
          ],
          secondary: [
            'Teaching abilities',
            'Writing spiritual texts',
            'Guiding others'
          ],
          challenges: [
            'Material detachment',
            'Worldly responsibilities',
            'Family obligations'
          ]
        }
      }
    ]
  };

  static calculateExtendedCombinations(
    planetaryPositions: PlanetaryInfluence[]
  ): YogaCombination[] {
    const basicCombinations = super.calculateCombinations(planetaryPositions);
    const additionalCombinations = this.calculateAdditionalYogas(planetaryPositions);
    
    return [...basicCombinations, ...additionalCombinations];
  }

  private static calculateAdditionalYogas(
    positions: PlanetaryInfluence[]
  ): YogaCombination[] {
    const yogas: YogaCombination[] = [];

    // Check for Dhana Yogas
    this.ADDITIONAL_COMBINATIONS.DhanaYogas.forEach(yoga => {
      if (this.checkYogaConditions(yoga, positions)) {
        yogas.push(this.createYogaCombination(yoga, positions, 'dhana'));
      }
    });

    // Check for Vidya Yogas
    this.ADDITIONAL_COMBINATIONS.VidyaYogas.forEach(yoga => {
      if (this.checkYogaConditions(yoga, positions)) {
        yogas.push(this.createYogaCombination(yoga, positions, 'vidya'));
      }
    });

    // Check for Karma Yogas
    this.ADDITIONAL_COMBINATIONS.KarmaYogas.forEach(yoga => {
      if (this.checkYogaConditions(yoga, positions)) {
        yogas.push(this.createYogaCombination(yoga, positions, 'karma'));
      }
    });

    // Check for Moksha Yogas
    this.ADDITIONAL_COMBINATIONS.MokshaYogas.forEach(yoga => {
      if (this.checkYogaConditions(yoga, positions)) {
        yogas.push(this.createYogaCombination(yoga, positions, 'moksha'));
      }
    });

    return yogas;
  }

  private static checkYogaConditions(
    yoga: any,
    positions: PlanetaryInfluence[]
  ): boolean {
    return yoga.conditions.every((condition: any) => {
      switch (condition.type) {
        case 'house':
          return this.checkHouseCondition(condition, positions);
        case 'aspect':
          return this.checkAspectCondition(condition, positions);
        default:
          return false;
      }
    });
  }

  private static checkHouseCondition(
    condition: { planet: string; houses: number[] },
    positions: PlanetaryInfluence[]
  ): boolean {
    const planet = positions.find(p => p.planet === condition.planet);
    return planet ? condition.houses.includes(planet.house) : false;
  }

  private static checkAspectCondition(
    condition: { planets: string[]; angle: number },
    positions: PlanetaryInfluence[]
  ): boolean {
    const planet1 = positions.find(p => p.planet === condition.planets[0]);
    const planet2 = positions.find(p => p.planet === condition.planets[1]);
    
    if (!planet1 || !planet2) return false;
    
    const angle = Math.abs(planet1.longitude - planet2.longitude);
    return Math.abs(angle - condition.angle) <= 3; // 3-degree orb
  }
} 