import { PlanetaryPosition } from '../types/Predictions';
import { Yoga } from './YogaCalculator';

export class AdvancedYogaCalculator {
  static calculatePanchangaYogas(
    planetaryPositions: PlanetaryPosition[],
    birthDate: Date
  ): Yoga[] {
    const yogas: Yoga[] = [];
    
    // Calculate Pancha Mahapurusha Yogas
    this.calculateMahapurushaYogas(planetaryPositions, yogas);
    
    // Calculate Raja Yogas
    this.calculateRajaYogas(planetaryPositions, yogas);
    
    // Calculate Dhana Yogas
    this.calculateDhanaYogas(planetaryPositions, yogas);
    
    // Calculate Vipreet Raja Yogas
    this.calculateVipreetRajaYogas(planetaryPositions, yogas);

    return yogas;
  }

  private static calculateMahapurushaYogas(positions: PlanetaryPosition[], yogas: Yoga[]) {
    const mahapurushaYogas = [
      {
        planet: 'Mars',
        houses: [1, 4, 7, 10],
        name: 'Ruchaka Yoga',
        effects: [
          'Physical strength and vitality',
          'Leadership qualities',
          'Military or sports success',
          'Commanding personality'
        ]
      },
      {
        planet: 'Mercury',
        houses: [1, 4, 7, 10],
        name: 'Bhadra Yoga',
        effects: [
          'Intelligence and wisdom',
          'Success in business',
          'Good communication skills',
          'Scholarly achievements'
        ]
      },
      // Add more Mahapurusha Yogas...
    ];

    mahapurushaYogas.forEach(yoga => {
      const planet = positions.find(p => p.planet === yoga.planet);
      if (planet && yoga.houses.includes(planet.house)) {
        yogas.push({
          name: yoga.name,
          type: 'raja',
          strength: this.calculateYogaStrength(planet.longitude),
          description: `${yoga.name} formed by ${planet.planet}`,
          effects: yoga.effects
        });
      }
    });
  }

  private static calculateVipreetRajaYogas(positions: PlanetaryPosition[], yogas: Yoga[]) {
    const vipreetYogas = [
      {
        name: 'Harsha Yoga',
        houses: [6, 8, 12],
        planets: ['Sun', 'Moon'],
        effects: [
          'Unexpected gains through difficulties',
          'Success after initial setbacks',
          'Hidden strengths revealed'
        ]
      },
      // Add more Vipreet Raja Yogas...
    ];

    vipreetYogas.forEach(yoga => {
      const qualifyingPlanets = positions.filter(
        p => yoga.planets.includes(p.planet) && yoga.houses.includes(p.house)
      );

      if (qualifyingPlanets.length >= 2) {
        yogas.push({
          name: yoga.name,
          type: 'other',
          strength: this.calculateVipreetYogaStrength(qualifyingPlanets),
          description: `${yoga.name} formed by ${qualifyingPlanets.map(p => p.planet).join(' and ')}`,
          effects: yoga.effects
        });
      }
    });
  }

  private static calculateYogaStrength(longitude: number): number {
    // Calculate strength based on planetary dignity and position
    const nakshatra = Math.floor(longitude * 27 / 360);
    const pada = Math.floor((longitude % (360/27)) / (360/108));
    
    // Implement more sophisticated strength calculation
    return (nakshatra + pada) / 36; // Normalized between 0 and 1
  }

  private static calculateVipreetYogaStrength(planets: PlanetaryPosition[]): number {
    // Calculate strength based on multiple planetary positions
    return planets.reduce((acc, planet) => 
      acc + this.calculateYogaStrength(planet.longitude), 0
    ) / planets.length;
  }

  private static isAuspiciousNakshatra(longitude: number): boolean {
    const auspiciousNakshatras = [0, 3, 5, 7, 10, 13, 15, 17, 20, 23, 25];
    const nakshatra = Math.floor(longitude * 27 / 360);
    return auspiciousNakshatras.includes(nakshatra);
  }
} 