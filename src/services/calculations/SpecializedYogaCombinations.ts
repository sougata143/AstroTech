import { ExtendedYogaCombinations, PlanetaryInfluence, YogaCombination } from './ExtendedYogaCombinations';

interface YogaStrengthFactors {
  planetaryStrength: number;
  houseStrength: number;
  aspectStrength: number;
  transitStrength: number;
  temporalStrength: number;
}

export class SpecializedYogaCombinations extends ExtendedYogaCombinations {
  private static readonly SPECIALIZED_COMBINATIONS = {
    VidhyaYogas: [
      {
        name: 'Sharada Yoga',
        planets: ['Jupiter', 'Mercury', 'Moon'],
        conditions: [
          { type: 'house', planet: 'Jupiter', houses: [1, 4, 5, 9] },
          { type: 'aspect', planets: ['Mercury', 'Moon'], angle: 120 },
          { type: 'dignity', planet: 'Jupiter', dignities: ['exalted', 'own', 'moolatrikona'] }
        ],
        effects: {
          primary: [
            'Exceptional learning ability',
            'Teaching excellence',
            'Research aptitude'
          ],
          secondary: [
            'Writing skills',
            'Public speaking',
            'Academic success'
          ],
          challenges: [
            'Balancing knowledge pursuit',
            'Information overload',
            'Perfectionism in learning'
          ]
        },
        activation: {
          age: 12,
          duration: 'lifelong',
          peakPeriods: ['Jupiter-Mercury dasha', 'Mercury-Jupiter dasha']
        }
      }
    ],
    RajaYogas: [
      {
        name: 'Indra Yoga',
        planets: ['Sun', 'Jupiter', 'Moon'],
        conditions: [
          { type: 'house', planet: 'Sun', houses: [1, 4, 7, 10] },
          { type: 'aspect', planets: ['Jupiter', 'Moon'], angle: 120 },
          { type: 'dignity', planet: 'Sun', dignities: ['exalted', 'own'] }
        ],
        effects: {
          primary: [
            'Political success',
            'Leadership positions',
            'Government authority'
          ],
          secondary: [
            'Social influence',
            'Administrative skills',
            'Public recognition'
          ],
          challenges: [
            'Power management',
            'Public scrutiny',
            'Leadership pressure'
          ]
        },
        activation: {
          age: 32,
          duration: '48 years',
          peakPeriods: ['Sun-Jupiter dasha', 'Jupiter-Sun dasha']
        }
      }
    ],
    DhanaYogas: [
      {
        name: 'Kuber Yoga',
        planets: ['Venus', 'Jupiter', 'Mercury', 'Moon'],
        conditions: [
          { type: 'house', planet: 'Venus', houses: [2, 5, 9, 11] },
          { type: 'aspect', planets: ['Jupiter', 'Mercury'], angle: 120 },
          { type: 'aspect', planets: ['Moon', 'Venus'], angle: 120 },
          { type: 'dignity', planet: 'Venus', dignities: ['exalted', 'own'] }
        ],
        effects: {
          primary: [
            'Massive wealth accumulation',
            'Business empire',
            'Financial mastery'
          ],
          secondary: [
            'Investment skills',
            'Economic influence',
            'Prosperity creation'
          ],
          challenges: [
            'Wealth management',
            'Resource allocation',
            'Financial responsibilities'
          ]
        },
        activation: {
          age: 24,
          duration: '36 years',
          peakPeriods: ['Venus-Jupiter dasha', 'Jupiter-Venus dasha']
        }
      }
    ]
  };

  static calculateSpecializedYogas(
    planetaryPositions: PlanetaryInfluence[],
    birthDate: Date
  ): YogaCombination[] {
    const basicYogas = this.calculateExtendedCombinations(planetaryPositions);
    const specializedYogas = this.calculateSpecialCombinations(planetaryPositions, birthDate);
    
    return [...basicYogas, ...specializedYogas];
  }

  private static calculateSpecialCombinations(
    positions: PlanetaryInfluence[],
    birthDate: Date
  ): YogaCombination[] {
    const yogas: YogaCombination[] = [];

    Object.entries(this.SPECIALIZED_COMBINATIONS).forEach(([type, combinations]) => {
      combinations.forEach(yoga => {
        if (this.checkSpecializedConditions(yoga, positions)) {
          const strength = this.calculateDetailedYogaStrength(yoga, positions, birthDate);
          yogas.push(this.createSpecializedYogaCombination(yoga, positions, type, strength));
        }
      });
    });

    return yogas;
  }

  private static checkSpecializedConditions(
    yoga: any,
    positions: PlanetaryInfluence[]
  ): boolean {
    return yoga.conditions.every((condition: any) => {
      switch (condition.type) {
        case 'house':
          return this.checkHouseCondition(condition, positions);
        case 'aspect':
          return this.checkAspectCondition(condition, positions);
        case 'dignity':
          return this.checkDignityCondition(condition, positions);
        default:
          return false;
      }
    });
  }

  private static checkDignityCondition(
    condition: { planet: string; dignities: string[] },
    positions: PlanetaryInfluence[]
  ): boolean {
    const planet = positions.find(p => p.planet === condition.planet);
    return planet ? condition.dignities.includes(planet.dignity) : false;
  }

  private static calculateDetailedYogaStrength(
    yoga: any,
    positions: PlanetaryInfluence[],
    birthDate: Date
  ): YogaStrengthFactors {
    const involvedPlanets = positions.filter(p => yoga.planets.includes(p.planet));
    
    return {
      planetaryStrength: this.calculatePlanetaryStrength(involvedPlanets),
      houseStrength: this.calculateHouseStrength(involvedPlanets),
      aspectStrength: this.calculateAspectStrength(involvedPlanets),
      transitStrength: this.calculateTransitStrength(involvedPlanets, birthDate),
      temporalStrength: this.calculateTemporalStrength(birthDate)
    };
  }

  private static calculatePlanetaryStrength(planets: PlanetaryInfluence[]): number {
    return planets.reduce((strength, planet) => {
      const dignityFactors = {
        exalted: 1.0,
        moolatrikona: 0.85,
        own: 0.75,
        friendly: 0.5,
        neutral: 0.25,
        enemy: 0.1,
        debilitated: 0
      };
      
      return strength + (dignityFactors[planet.dignity] || 0);
    }, 0) / planets.length;
  }

  private static calculateHouseStrength(planets: PlanetaryInfluence[]): number {
    const angularHouses = [1, 4, 7, 10];
    const succedentHouses = [2, 5, 8, 11];
    const cadentHouses = [3, 6, 9, 12];

    return planets.reduce((strength, planet) => {
      if (angularHouses.includes(planet.house)) return strength + 1;
      if (succedentHouses.includes(planet.house)) return strength + 0.75;
      if (cadentHouses.includes(planet.house)) return strength + 0.5;
      return strength;
    }, 0) / planets.length;
  }

  private static calculateAspectStrength(planets: PlanetaryInfluence[]): number {
    let totalStrength = 0;
    let aspectCount = 0;

    planets.forEach((p1, i) => {
      planets.slice(i + 1).forEach(p2 => {
        p1.aspects.forEach(aspect => {
          if (aspect.planet === p2.planet) {
            const aspectFactors = {
              conjunction: 1.0,
              trine: 0.8,
              sextile: 0.6,
              square: 0.4,
              opposition: 0.2
            };
            totalStrength += aspectFactors[aspect.type as keyof typeof aspectFactors] || 0;
            aspectCount++;
          }
        });
      });
    });

    return aspectCount > 0 ? totalStrength / aspectCount : 0;
  }

  private static calculateTransitStrength(
    planets: PlanetaryInfluence[],
    birthDate: Date
  ): number {
    // Implementation for transit strength calculation
    return 0.75; // Placeholder
  }

  private static calculateTemporalStrength(birthDate: Date): number {
    // Implementation for temporal strength based on planetary periods
    return 0.8; // Placeholder
  }

  private static createSpecializedYogaCombination(
    yoga: any,
    positions: PlanetaryInfluence[],
    type: string,
    strength: YogaStrengthFactors
  ): YogaCombination {
    const totalStrength = Object.values(strength).reduce((a, b) => a + b, 0) / 5;
    
    return {
      name: yoga.name,
      type: type.toLowerCase().replace('yogas', '') as YogaCombination['type'],
      planets: yoga.planets,
      houses: positions
        .filter(p => yoga.planets.includes(p.planet))
        .map(p => p.house),
      strength: totalStrength,
      effects: yoga.effects,
      timing: this.calculateYogaTiming(yoga.activation, positions),
      remedies: this.getYogaRemedies(yoga, totalStrength)
    };
  }
} 