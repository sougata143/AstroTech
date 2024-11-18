interface PlanetaryInfluence {
  planet: string;
  strength: number;
  dignity: 'exalted' | 'moolatrikona' | 'own' | 'friendly' | 'neutral' | 'enemy' | 'debilitated';
  house: number;
  aspects: Array<{
    planet: string;
    type: string;
    strength: number;
  }>;
}

interface YogaCombination {
  name: string;
  type: 'raja' | 'dhana' | 'vidya' | 'karma' | 'moksha';
  planets: string[];
  houses: number[];
  strength: number;
  effects: {
    primary: string[];
    secondary: string[];
    challenges: string[];
  };
  timing: {
    activation: Date;
    peak: Date;
    completion: Date;
  };
  remedies: {
    gemstones: string[];
    mantras: string[];
    rituals: string[];
    charities: string[];
  };
}

export class AdvancedPlanetaryCombinations {
  private static readonly SPECIAL_COMBINATIONS = {
    RajaYogas: [
      {
        name: 'Gaja-Kesari Yoga',
        planets: ['Jupiter', 'Moon'],
        conditions: [
          { type: 'aspect', angle: 120 },
          { type: 'aspect', angle: 60 },
          { type: 'aspect', angle: 0 }
        ],
        effects: {
          primary: [
            'Leadership abilities',
            'Social recognition',
            'Success in public life'
          ],
          secondary: [
            'Good education',
            'International travel',
            'Governmental favor'
          ],
          challenges: [
            'High expectations from others',
            'Public scrutiny',
            'Family responsibilities'
          ]
        }
      },
      {
        name: 'Budh-Aditya Yoga',
        planets: ['Sun', 'Mercury'],
        conditions: [
          { type: 'conjunction', maxDegrees: 10 }
        ],
        effects: {
          primary: [
            'Intelligence',
            'Administrative skills',
            'Political success'
          ],
          secondary: [
            'Good communication',
            'Writing abilities',
            'Strategic thinking'
          ],
          challenges: [
            'Mental stress',
            'Over-analysis',
            'Decision-making pressure'
          ]
        }
      }
    ],
    DhanaYogas: [
      {
        name: 'Lakshmi Yoga',
        planets: ['Jupiter', 'Venus'],
        conditions: [
          { type: 'lordship', houses: [1, 9] },
          { type: 'aspect', angle: 120 }
        ],
        effects: {
          primary: [
            'Wealth accumulation',
            'Financial wisdom',
            'Business success'
          ],
          secondary: [
            'Social status',
            'Luxury lifestyle',
            'Philanthropic tendencies'
          ],
          challenges: [
            'Material attachment',
            'Family expectations',
            'Resource management'
          ]
        }
      }
    ],
    MokshaYogas: [
      {
        name: 'Kailas Yoga',
        planets: ['Saturn', 'Jupiter', 'Ketu'],
        conditions: [
          { type: 'aspect', planets: ['Saturn', 'Jupiter'], angle: 120 },
          { type: 'conjunction', planets: ['Jupiter', 'Ketu'], maxDegrees: 10 }
        ],
        effects: {
          primary: [
            'Spiritual enlightenment',
            'Detachment',
            'Divine knowledge'
          ],
          secondary: [
            'Teaching abilities',
            'Philosophical insight',
            'Meditation prowess'
          ],
          challenges: [
            'Material disinterest',
            'Worldly disconnection',
            'Family obligations'
          ]
        }
      }
    ]
  };

  static calculateAdvancedCombinations(
    planetaryPositions: PlanetaryInfluence[]
  ): YogaCombination[] {
    const combinations: YogaCombination[] = [];

    // Check for Raja Yogas
    this.checkRajaYogas(planetaryPositions, combinations);
    
    // Check for Dhana Yogas
    this.checkDhanaYogas(planetaryPositions, combinations);
    
    // Check for Moksha Yogas
    this.checkMokshaYogas(planetaryPositions, combinations);

    return combinations;
  }

  private static checkRajaYogas(
    positions: PlanetaryInfluence[],
    combinations: YogaCombination[]
  ): void {
    this.SPECIAL_COMBINATIONS.RajaYogas.forEach(yoga => {
      if (this.checkYogaConditions(yoga, positions)) {
        combinations.push(this.createYogaCombination(yoga, positions, 'raja'));
      }
    });
  }

  private static checkDhanaYogas(
    positions: PlanetaryInfluence[],
    combinations: YogaCombination[]
  ): void {
    this.SPECIAL_COMBINATIONS.DhanaYogas.forEach(yoga => {
      if (this.checkYogaConditions(yoga, positions)) {
        combinations.push(this.createYogaCombination(yoga, positions, 'dhana'));
      }
    });
  }

  private static checkMokshaYogas(
    positions: PlanetaryInfluence[],
    combinations: YogaCombination[]
  ): void {
    this.SPECIAL_COMBINATIONS.MokshaYogas.forEach(yoga => {
      if (this.checkYogaConditions(yoga, positions)) {
        combinations.push(this.createYogaCombination(yoga, positions, 'moksha'));
      }
    });
  }

  private static checkYogaConditions(
    yoga: any,
    positions: PlanetaryInfluence[]
  ): boolean {
    return yoga.conditions.every((condition: any) => {
      switch (condition.type) {
        case 'aspect':
          return this.checkAspectCondition(condition, positions, yoga.planets);
        case 'conjunction':
          return this.checkConjunctionCondition(condition, positions, yoga.planets);
        case 'lordship':
          return this.checkLordshipCondition(condition, positions, yoga.planets);
        default:
          return false;
      }
    });
  }

  private static checkAspectCondition(
    condition: any,
    positions: PlanetaryInfluence[],
    planets: string[]
  ): boolean {
    // Implement aspect checking logic
    return true;
  }

  private static checkConjunctionCondition(
    condition: any,
    positions: PlanetaryInfluence[],
    planets: string[]
  ): boolean {
    // Implement conjunction checking logic
    return true;
  }

  private static checkLordshipCondition(
    condition: any,
    positions: PlanetaryInfluence[],
    planets: string[]
  ): boolean {
    // Implement lordship checking logic
    return true;
  }

  private static createYogaCombination(
    yoga: any,
    positions: PlanetaryInfluence[],
    type: YogaCombination['type']
  ): YogaCombination {
    const involvedPlanets = positions.filter(p => yoga.planets.includes(p.planet));
    const strength = this.calculateYogaStrength(involvedPlanets);
    
    return {
      name: yoga.name,
      type,
      planets: yoga.planets,
      houses: involvedPlanets.map(p => p.house),
      strength,
      effects: yoga.effects,
      timing: this.calculateYogaTiming(involvedPlanets),
      remedies: this.getYogaRemedies(yoga, strength)
    };
  }

  private static calculateYogaStrength(planets: PlanetaryInfluence[]): number {
    return planets.reduce((acc, planet) => acc + planet.strength, 0) / planets.length;
  }

  private static calculateYogaTiming(planets: PlanetaryInfluence[]): YogaCombination['timing'] {
    // Implement timing calculation logic
    return {
      activation: new Date(),
      peak: new Date(),
      completion: new Date()
    };
  }

  private static getYogaRemedies(yoga: any, strength: number): YogaCombination['remedies'] {
    // Implement remedies based on yoga type and strength
    return {
      gemstones: [],
      mantras: [],
      rituals: [],
      charities: []
    };
  }
} 