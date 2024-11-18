import { PlanetaryPosition } from '../types/Predictions';
import { Yoga } from './YogaCalculator';

export class MahapurushaYogaCalculator {
  private static readonly MAHAPURUSHA_YOGAS = [
    {
      planet: 'Saturn',
      houses: [1, 4, 7, 10],
      name: 'Sasa Yoga',
      effects: [
        'Long life and endurance',
        'Success through persistent effort',
        'Authority in organization',
        'Respect in society'
      ]
    },
    {
      planet: 'Jupiter',
      houses: [1, 4, 7, 10],
      name: 'Hamsa Yoga',
      effects: [
        'Wisdom and knowledge',
        'Spiritual inclination',
        'Teaching abilities',
        'Prosperity and fame'
      ]
    },
    {
      planet: 'Venus',
      houses: [1, 4, 7, 10],
      name: 'Malavya Yoga',
      effects: [
        'Artistic talents',
        'Physical beauty',
        'Luxurious lifestyle',
        'Success in relationships'
      ]
    },
    {
      planet: 'Mercury',
      houses: [1, 4, 7, 10],
      name: 'Bhadra Yoga',
      effects: [
        'Intelligence and wit',
        'Success in business',
        'Good communication skills',
        'Literary achievements'
      ]
    },
    {
      planet: 'Mars',
      houses: [1, 4, 7, 10],
      name: 'Ruchaka Yoga',
      effects: [
        'Physical strength',
        'Leadership qualities',
        'Military success',
        'Technical skills'
      ]
    }
  ];

  static calculateMahapurushaYogas(positions: PlanetaryPosition[]): Yoga[] {
    const yogas: Yoga[] = [];
    
    this.MAHAPURUSHA_YOGAS.forEach(yogaType => {
      const planet = positions.find(p => p.planet === yogaType.planet);
      if (planet && this.isInOwnSign(planet) && yogaType.houses.includes(planet.house)) {
        yogas.push({
          name: yogaType.name,
          type: 'raja',
          strength: this.calculateYogaStrength(planet, positions),
          description: `${yogaType.name} formed by ${planet.planet} in ${this.getHouseName(planet.house)}`,
          effects: yogaType.effects
        });
      }
    });

    return yogas;
  }

  private static isInOwnSign(planet: PlanetaryPosition): boolean {
    const ownSigns = {
      Sun: [120], // Leo
      Moon: [90], // Cancer
      Mars: [0, 210], // Aries and Scorpio
      Mercury: [60, 150], // Gemini and Virgo
      Jupiter: [240, 330], // Sagittarius and Pisces
      Venus: [30, 180], // Taurus and Libra
      Saturn: [270, 300], // Capricorn and Aquarius
    };

    const planetSigns = ownSigns[planet.planet as keyof typeof ownSigns] || [];
    const planetSign = Math.floor(planet.longitude / 30) * 30;
    return planetSigns.includes(planetSign);
  }

  private static getHouseName(house: number): string {
    const houseNames = [
      'Ascendant', 'Wealth', 'Siblings', 'Home',
      'Children', 'Enemies', 'Partnership', 'Transformation',
      'Fortune', 'Career', 'Gains', 'Losses'
    ];
    return houseNames[house - 1];
  }

  private static calculateYogaStrength(planet: PlanetaryPosition, allPositions: PlanetaryPosition[]): number {
    let strength = 1.0;

    // Adjust strength based on aspects
    allPositions.forEach(pos => {
      if (pos.planet !== planet.planet) {
        const aspect = Math.abs(pos.longitude - planet.longitude);
        if (this.isHarmfulAspect(aspect)) {
          strength *= 0.8;
        } else if (this.isBeneficialAspect(aspect)) {
          strength *= 1.2;
        }
      }
    });

    // Adjust for retrograde motion
    if (planet.isRetrograde) {
      strength *= 0.9;
    }

    // Adjust for planetary dignity
    if (this.isInOwnSign(planet)) {
      strength *= 1.5;
    } else if (this.isInExaltation(planet)) {
      strength *= 2.0;
    } else if (this.isInDebilitation(planet)) {
      strength *= 0.5;
    }

    return Math.min(Math.max(strength, 0), 1);
  }

  private static isHarmfulAspect(aspect: number): boolean {
    return Math.abs(aspect - 90) < 3 || Math.abs(aspect - 180) < 3;
  }

  private static isBeneficialAspect(aspect: number): boolean {
    return Math.abs(aspect - 120) < 3 || Math.abs(aspect - 60) < 3;
  }

  private static isInExaltation(planet: PlanetaryPosition): boolean {
    const exaltationDegrees = {
      Sun: 10, // Aries
      Moon: 33, // Taurus
      Mars: 298, // Capricorn
      Mercury: 165, // Virgo
      Jupiter: 95, // Cancer
      Venus: 357, // Pisces
      Saturn: 200, // Libra
    };

    const exaltationDegree = exaltationDegrees[planet.planet as keyof typeof exaltationDegrees];
    return exaltationDegree !== undefined && 
           Math.abs(planet.longitude - exaltationDegree) < 6;
  }

  private static isInDebilitation(planet: PlanetaryPosition): boolean {
    const debilitationDegrees = {
      Sun: 190, // Libra
      Moon: 213, // Scorpio
      Mars: 118, // Cancer
      Mercury: 345, // Pisces
      Jupiter: 275, // Capricorn
      Venus: 177, // Virgo
      Saturn: 20, // Aries
    };

    const debilitationDegree = debilitationDegrees[planet.planet as keyof typeof debilitationDegrees];
    return debilitationDegree !== undefined && 
           Math.abs(planet.longitude - debilitationDegree) < 6;
  }
} 