import { DetailedRelationshipCalculator } from './DetailedRelationshipCalculator';
import { PlanetaryHarmony } from './ExtendedKutaCalculator';

interface RelationshipStrength {
  score: number;
  factors: {
    aspect: number;
    dignity: number;
    house: number;
    nakshatra: number;
  };
  details: {
    strengths: string[];
    challenges: string[];
  };
}

export class AdvancedRelationshipCalculator extends DetailedRelationshipCalculator {
  private static readonly HOUSE_COMPATIBILITY = {
    1: [1, 5, 7, 9, 11],  // Best houses for relationship harmony
    2: [2, 7, 11],        // Houses for financial stability
    3: [3, 6, 11],        // Communication and short journeys
    4: [4, 7, 10],        // Emotional security and domestic harmony
    5: [1, 5, 9],         // Romance and creativity
    6: [6, 8, 12],        // Service and health
    7: [1, 4, 7, 10],     // Partnership and marriage
    8: [6, 8, 12],        // Transformation and joint resources
    9: [1, 5, 9],         // Higher learning and spirituality
    10: [4, 7, 10],       // Career and social status
    11: [2, 3, 11],       // Gains and aspirations
    12: [6, 8, 12]        // Spirituality and isolation
  };

  private static readonly NAKSHATRA_COMPATIBILITY = {
    // Nakshatras grouped by temperament
    DIVINE: ['Ashwini', 'Pushya', 'Hasta', 'Swati', 'Anuradha', 'Revati'],
    HUMAN: ['Bharani', 'Rohini', 'Uttara Phalguni', 'Uttara Ashadha', 'Uttara Bhadrapada'],
    DEMONIC: ['Krittika', 'Ardra', 'Aslesha', 'Magha', 'Vishakha', 'Jyeshtha']
  };

  static calculateIntellectualCompatibility(relationships: PlanetaryHarmony[]): RelationshipStrength {
    const mercuryRelations = this.getPlanetaryRelations('Mercury', relationships);
    const jupiterRelations = this.getPlanetaryRelations('Jupiter', relationships);
    const moonRelations = this.getPlanetaryRelations('Moon', relationships);

    const factors = {
      aspect: this.calculateAspectStrength([...mercuryRelations, ...jupiterRelations, ...moonRelations]),
      dignity: this.calculateDignityStrength([...mercuryRelations, ...jupiterRelations, ...moonRelations]),
      house: this.calculateHouseStrength([...mercuryRelations, ...jupiterRelations, ...moonRelations]),
      nakshatra: this.calculateNakshatraStrength([...mercuryRelations, ...jupiterRelations, ...moonRelations])
    };

    const score = Object.values(factors).reduce((sum, value) => sum + value, 0) / 4;

    return {
      score,
      factors,
      details: this.generateIntellectualDetails(factors)
    };
  }

  static calculateEmotionalDepthCompatibility(relationships: PlanetaryHarmony[]): RelationshipStrength {
    const moonRelations = this.getPlanetaryRelations('Moon', relationships);
    const venusRelations = this.getPlanetaryRelations('Venus', relationships);
    const jupiterRelations = this.getPlanetaryRelations('Jupiter', relationships);

    const factors = {
      aspect: this.calculateAspectStrength([...moonRelations, ...venusRelations, ...jupiterRelations]),
      dignity: this.calculateDignityStrength([...moonRelations, ...venusRelations, ...jupiterRelations]),
      house: this.calculateHouseStrength([...moonRelations, ...venusRelations, ...jupiterRelations]),
      nakshatra: this.calculateNakshatraStrength([...moonRelations, ...venusRelations, ...jupiterRelations])
    };

    const score = Object.values(factors).reduce((sum, value) => sum + value, 0) / 4;

    return {
      score,
      factors,
      details: this.generateEmotionalDetails(factors)
    };
  }

  static calculateSpiritualCompatibility(relationships: PlanetaryHarmony[]): RelationshipStrength {
    const jupiterRelations = this.getPlanetaryRelations('Jupiter', relationships);
    const ketuRelations = this.getPlanetaryRelations('Ketu', relationships);
    const saturnRelations = this.getPlanetaryRelations('Saturn', relationships);

    const factors = {
      aspect: this.calculateAspectStrength([...jupiterRelations, ...ketuRelations, ...saturnRelations]),
      dignity: this.calculateDignityStrength([...jupiterRelations, ...ketuRelations, ...saturnRelations]),
      house: this.calculateHouseStrength([...jupiterRelations, ...ketuRelations, ...saturnRelations]),
      nakshatra: this.calculateNakshatraStrength([...jupiterRelations, ...ketuRelations, ...saturnRelations])
    };

    const score = Object.values(factors).reduce((sum, value) => sum + value, 0) / 4;

    return {
      score,
      factors,
      details: this.generateSpiritualDetails(factors)
    };
  }

  private static getPlanetaryRelations(planet: string, relationships: PlanetaryHarmony[]): PlanetaryHarmony[] {
    return relationships.filter(r => r.planets.includes(planet));
  }

  private static calculateAspectStrength(relations: PlanetaryHarmony[]): number {
    const aspectWeights = {
      conjunction: 1.0,
      trine: 0.8,
      sextile: 0.6,
      square: 0.4,
      opposition: 0.2
    };

    return relations.reduce((strength, relation) => {
      const aspectType = this.getAspectType(relation);
      return strength + (aspectWeights[aspectType as keyof typeof aspectWeights] || 0);
    }, 0) / relations.length;
  }

  private static calculateDignityStrength(relations: PlanetaryHarmony[]): number {
    const dignityWeights = {
      exalted: 1.0,
      ownSign: 0.8,
      friendly: 0.6,
      neutral: 0.4,
      debilitated: 0.2
    };

    return relations.reduce((strength, relation) => {
      const dignity = this.getPlanetaryDignity(relation);
      return strength + (dignityWeights[dignity as keyof typeof dignityWeights] || 0);
    }, 0) / relations.length;
  }

  private static calculateHouseStrength(relations: PlanetaryHarmony[]): number {
    return relations.reduce((strength, relation) => {
      const house = this.getHousePosition(relation);
      const compatibleHouses = this.HOUSE_COMPATIBILITY[house as keyof typeof this.HOUSE_COMPATIBILITY] || [];
      return strength + (compatibleHouses.length ? 1 : 0);
    }, 0) / relations.length;
  }

  private static calculateNakshatraStrength(relations: PlanetaryHarmony[]): number {
    return relations.reduce((strength, relation) => {
      const nakshatra = this.getNakshatra(relation);
      const temperament = this.getNakshatraTemperament(nakshatra);
      return strength + (temperament === 'DIVINE' ? 1 : temperament === 'HUMAN' ? 0.6 : 0.3);
    }, 0) / relations.length;
  }

  private static getAspectType(relation: PlanetaryHarmony): string {
    // Implement aspect type determination
    return 'conjunction';
  }

  private static getPlanetaryDignity(relation: PlanetaryHarmony): string {
    // Implement dignity determination
    return 'neutral';
  }

  private static getHousePosition(relation: PlanetaryHarmony): number {
    // Implement house position determination
    return 1;
  }

  private static getNakshatra(relation: PlanetaryHarmony): string {
    // Implement nakshatra determination
    return 'Ashwini';
  }

  private static getNakshatraTemperament(nakshatra: string): string {
    for (const [temperament, nakshatras] of Object.entries(this.NAKSHATRA_COMPATIBILITY)) {
      if (nakshatras.includes(nakshatra)) {
        return temperament;
      }
    }
    return 'HUMAN';
  }

  private static generateIntellectualDetails(factors: RelationshipStrength['factors']): RelationshipStrength['details'] {
    return {
      strengths: [
        factors.aspect > 0.7 ? 'Strong mental connection and understanding' : '',
        factors.dignity > 0.7 ? 'Compatible intellectual approaches' : '',
        factors.house > 0.7 ? 'Favorable positions for mental growth' : '',
        factors.nakshatra > 0.7 ? 'Natural intellectual harmony' : ''
      ].filter(Boolean),
      challenges: [
        factors.aspect < 0.3 ? 'Different thinking patterns' : '',
        factors.dignity < 0.3 ? 'Intellectual conflicts possible' : '',
        factors.house < 0.3 ? 'Mental growth may require effort' : '',
        factors.nakshatra < 0.3 ? 'Different learning styles' : ''
      ].filter(Boolean)
    };
  }

  private static generateEmotionalDetails(factors: RelationshipStrength['factors']): RelationshipStrength['details'] {
    return {
      strengths: [
        factors.aspect > 0.7 ? 'Deep emotional connection' : '',
        factors.dignity > 0.7 ? 'Natural emotional understanding' : '',
        factors.house > 0.7 ? 'Supportive emotional environment' : '',
        factors.nakshatra > 0.7 ? 'Harmonious emotional expression' : ''
      ].filter(Boolean),
      challenges: [
        factors.aspect < 0.3 ? 'Emotional distance possible' : '',
        factors.dignity < 0.3 ? 'Different emotional needs' : '',
        factors.house < 0.3 ? 'Emotional growth challenges' : '',
        factors.nakshatra < 0.3 ? 'Different emotional expressions' : ''
      ].filter(Boolean)
    };
  }

  private static generateSpiritualDetails(factors: RelationshipStrength['factors']): RelationshipStrength['details'] {
    return {
      strengths: [
        factors.aspect > 0.7 ? 'Strong spiritual connection' : '',
        factors.dignity > 0.7 ? 'Shared spiritual values' : '',
        factors.house > 0.7 ? 'Supportive spiritual environment' : '',
        factors.nakshatra > 0.7 ? 'Natural spiritual harmony' : ''
      ].filter(Boolean),
      challenges: [
        factors.aspect < 0.3 ? 'Different spiritual paths' : '',
        factors.dignity < 0.3 ? 'Conflicting beliefs possible' : '',
        factors.house < 0.3 ? 'Spiritual growth challenges' : '',
        factors.nakshatra < 0.3 ? 'Different spiritual expressions' : ''
      ].filter(Boolean)
    };
  }
} 