export interface Yoga {
  name: string;
  type: 'raja' | 'dhana' | 'kesari' | 'gajakesari' | 'other';
  strength: number; // 0-1
  description: string;
  effects: string[];
}

export class YogaCalculator {
  static calculateYogas(planetaryPositions: PlanetaryPosition[]): Yoga[] {
    const yogas: Yoga[] = [];
    
    // Calculate Raj Yogas
    this.calculateRajYogas(planetaryPositions, yogas);
    
    // Calculate Dhana Yogas
    this.calculateDhanaYogas(planetaryPositions, yogas);
    
    // Calculate Kesari Yogas
    this.calculateKesariYogas(planetaryPositions, yogas);
    
    return yogas;
  }

  private static calculateRajYogas(positions: PlanetaryPosition[], yogas: Yoga[]) {
    // Check for mutual aspect between Jupiter and Moon
    const jupiter = positions.find(p => p.planet === 'Jupiter');
    const moon = positions.find(p => p.planet === 'Moon');
    
    if (jupiter && moon) {
      const angle = Math.abs(jupiter.longitude - moon.longitude);
      if (angle === 120 || angle === 60 || angle === 0) {
        yogas.push({
          name: 'Gaja Kesari Yoga',
          type: 'raja',
          strength: this.calculateYogaStrength(angle),
          description: 'Powerful yoga for success and leadership',
          effects: [
            'Enhanced leadership abilities',
            'Success in career',
            'Good reputation',
            'Financial prosperity'
          ]
        });
      }
    }
  }

  private static calculateDhanaYogas(positions: PlanetaryPosition[], yogas: Yoga[]) {
    // Check for Venus-Jupiter combination
    const venus = positions.find(p => p.planet === 'Venus');
    const jupiter = positions.find(p => p.planet === 'Jupiter');
    
    if (venus && jupiter) {
      const angle = Math.abs(venus.longitude - jupiter.longitude);
      if (angle <= 10 || Math.abs(angle - 120) <= 10) {
        yogas.push({
          name: 'Lakshmi Yoga',
          type: 'dhana',
          strength: this.calculateYogaStrength(angle),
          description: 'Yoga for wealth and prosperity',
          effects: [
            'Financial gains',
            'Material comforts',
            'Business success',
            'Luxurious lifestyle'
          ]
        });
      }
    }
  }

  private static calculateKesariYogas(positions: PlanetaryPosition[], yogas: Yoga[]) {
    // Implementation of Kesari Yoga calculations
    const moon = positions.find(p => p.planet === 'Moon');
    const jupiter = positions.find(p => p.planet === 'Jupiter');
    
    if (moon && jupiter) {
      const angle = Math.abs(moon.longitude - jupiter.longitude);
      if ([0, 60, 120].includes(Math.floor(angle))) {
        yogas.push({
          name: 'Kesari Yoga',
          type: 'kesari',
          strength: this.calculateYogaStrength(angle),
          description: 'Yoga for intelligence and success',
          effects: [
            'Enhanced intelligence',
            'Academic success',
            'Good decision-making ability',
            'Recognition in society'
          ]
        });
      }
    }
  }

  private static calculateYogaStrength(angle: number): number {
    // Calculate yoga strength based on the exactness of the angle
    const perfectAngles = [0, 60, 120, 180];
    const closestPerfectAngle = perfectAngles.reduce((prev, curr) => 
      Math.abs(curr - angle) < Math.abs(prev - angle) ? curr : prev
    );
    
    const deviation = Math.abs(angle - closestPerfectAngle);
    return Math.max(0, 1 - (deviation / 10)); // Strength reduces as deviation increases
  }
} 