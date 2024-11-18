import { PlanetaryHarmony } from './ExtendedKutaCalculator';

interface CompatibilityArea {
  name: string;
  score: number;
  maxScore: number;
  details: {
    strengths: string[];
    challenges: string[];
    recommendations: string[];
  };
}

export class RelationshipCompatibilityCalculator {
  static calculateMentalCompatibility(relationships: PlanetaryHarmony[]): number {
    let score = 0;
    const maxScore = 20;

    // Mercury-Moon Relationship
    const mercuryMoonRelation = relationships.find(r => 
      r.planets.includes('Mercury') && r.planets.includes('Moon')
    );
    if (mercuryMoonRelation) {
      score += this.getRelationshipScore(mercuryMoonRelation) * 7;
    }

    // Mercury-Jupiter Relationship
    const mercuryJupiterRelation = relationships.find(r => 
      r.planets.includes('Mercury') && r.planets.includes('Jupiter')
    );
    if (mercuryJupiterRelation) {
      score += this.getRelationshipScore(mercuryJupiterRelation) * 7;
    }

    // Moon-Jupiter Relationship
    const moonJupiterRelation = relationships.find(r => 
      r.planets.includes('Moon') && r.planets.includes('Jupiter')
    );
    if (moonJupiterRelation) {
      score += this.getRelationshipScore(moonJupiterRelation) * 6;
    }

    return Math.min(score, maxScore);
  }

  static calculateEmotionalHarmony(relationships: PlanetaryHarmony[]): number {
    let score = 0;
    const maxScore = 20;

    // Moon-Venus Relationship
    const moonVenusRelation = relationships.find(r => 
      r.planets.includes('Moon') && r.planets.includes('Venus')
    );
    if (moonVenusRelation) {
      score += this.getRelationshipScore(moonVenusRelation) * 8;
    }

    // Moon-Mars Relationship
    const moonMarsRelation = relationships.find(r => 
      r.planets.includes('Moon') && r.planets.includes('Mars')
    );
    if (moonMarsRelation) {
      score += this.getRelationshipScore(moonMarsRelation) * 6;
    }

    // Venus-Mars Relationship
    const venusMarsRelation = relationships.find(r => 
      r.planets.includes('Venus') && r.planets.includes('Mars')
    );
    if (venusMarsRelation) {
      score += this.getRelationshipScore(venusMarsRelation) * 6;
    }

    return Math.min(score, maxScore);
  }

  static calculateSpiritualConnection(relationships: PlanetaryHarmony[]): number {
    let score = 0;
    const maxScore = 20;

    // Jupiter-Saturn Relationship
    const jupiterSaturnRelation = relationships.find(r => 
      r.planets.includes('Jupiter') && r.planets.includes('Saturn')
    );
    if (jupiterSaturnRelation) {
      score += this.getRelationshipScore(jupiterSaturnRelation) * 7;
    }

    // Jupiter-Ketu Relationship
    const jupiterKetuRelation = relationships.find(r => 
      r.planets.includes('Jupiter') && r.planets.includes('Ketu')
    );
    if (jupiterKetuRelation) {
      score += this.getRelationshipScore(jupiterKetuRelation) * 7;
    }

    // Saturn-Ketu Relationship
    const saturnKetuRelation = relationships.find(r => 
      r.planets.includes('Saturn') && r.planets.includes('Ketu')
    );
    if (saturnKetuRelation) {
      score += this.getRelationshipScore(saturnKetuRelation) * 6;
    }

    return Math.min(score, maxScore);
  }

  static calculatePhysicalChemistry(relationships: PlanetaryHarmony[]): number {
    let score = 0;
    const maxScore = 20;

    // Mars-Venus Relationship
    const marsVenusRelation = relationships.find(r => 
      r.planets.includes('Mars') && r.planets.includes('Venus')
    );
    if (marsVenusRelation) {
      score += this.getRelationshipScore(marsVenusRelation) * 8;
    }

    // Sun-Mars Relationship
    const sunMarsRelation = relationships.find(r => 
      r.planets.includes('Sun') && r.planets.includes('Mars')
    );
    if (sunMarsRelation) {
      score += this.getRelationshipScore(sunMarsRelation) * 6;
    }

    // Venus-Sun Relationship
    const venusSunRelation = relationships.find(r => 
      r.planets.includes('Venus') && r.planets.includes('Sun')
    );
    if (venusSunRelation) {
      score += this.getRelationshipScore(venusSunRelation) * 6;
    }

    return Math.min(score, maxScore);
  }

  static calculateLifeGoalsCompatibility(relationships: PlanetaryHarmony[]): number {
    let score = 0;
    const maxScore = 20;

    // Sun-Jupiter Relationship
    const sunJupiterRelation = relationships.find(r => 
      r.planets.includes('Sun') && r.planets.includes('Jupiter')
    );
    if (sunJupiterRelation) {
      score += this.getRelationshipScore(sunJupiterRelation) * 7;
    }

    // Sun-Saturn Relationship
    const sunSaturnRelation = relationships.find(r => 
      r.planets.includes('Sun') && r.planets.includes('Saturn')
    );
    if (sunSaturnRelation) {
      score += this.getRelationshipScore(sunSaturnRelation) * 7;
    }

    // Jupiter-Saturn Relationship
    const jupiterSaturnRelation = relationships.find(r => 
      r.planets.includes('Jupiter') && r.planets.includes('Saturn')
    );
    if (jupiterSaturnRelation) {
      score += this.getRelationshipScore(jupiterSaturnRelation) * 6;
    }

    return Math.min(score, maxScore);
  }

  private static getRelationshipScore(relationship: PlanetaryHarmony): number {
    switch (relationship.relationship) {
      case 'friend': return relationship.strength * 1.0;
      case 'neutral': return relationship.strength * 0.7;
      case 'enemy': return relationship.strength * 0.3;
      default: return 0;
    }
  }

  static generateDetailedAnalysis(relationships: PlanetaryHarmony[]): Record<string, CompatibilityArea> {
    return {
      mental: {
        name: 'Mental Compatibility',
        score: this.calculateMentalCompatibility(relationships),
        maxScore: 20,
        details: {
          strengths: [
            'Strong intellectual connection',
            'Similar thought processes',
            'Good communication potential',
            'Shared learning interests',
            'Compatible decision-making styles'
          ],
          challenges: [
            'Different learning styles',
            'Potential communication gaps',
            'Varying intellectual interests',
            'Different problem-solving approaches'
          ],
          recommendations: [
            'Engage in intellectual discussions',
            'Share learning experiences',
            'Practice active listening',
            'Respect different viewpoints',
            'Develop shared interests'
          ]
        }
      },
      emotional: {
        name: 'Emotional Harmony',
        score: this.calculateEmotionalHarmony(relationships),
        maxScore: 20,
        details: {
          strengths: [
            'Deep emotional understanding',
            'Natural emotional resonance',
            'Strong empathetic connection',
            'Similar emotional needs',
            'Compatible emotional expression'
          ],
          challenges: [
            'Different emotional processing styles',
            'Varying emotional needs',
            'Emotional expression differences',
            'Emotional boundary issues'
          ],
          recommendations: [
            'Practice emotional sharing',
            'Respect emotional boundaries',
            'Develop emotional awareness',
            'Create emotional safety',
            'Regular emotional check-ins'
          ]
        }
      },
      spiritual: {
        name: 'Spiritual Connection',
        score: this.calculateSpiritualConnection(relationships),
        maxScore: 20,
        details: {
          strengths: [
            'Shared spiritual values',
            'Deep spiritual connection',
            'Compatible spiritual practices',
            'Similar life philosophy',
            'Shared sense of purpose'
          ],
          challenges: [
            'Different spiritual paths',
            'Varying spiritual needs',
            'Philosophical differences',
            'Practice compatibility'
          ],
          recommendations: [
            'Share spiritual practices',
            'Respect spiritual differences',
            'Explore together',
            'Create spiritual space',
            'Support growth'
          ]
        }
      },
      physical: {
        name: 'Physical Chemistry',
        score: this.calculatePhysicalChemistry(relationships),
        maxScore: 20,
        details: {
          strengths: [
            'Strong physical attraction',
            'Compatible energy levels',
            'Natural physical harmony',
            'Shared physical interests',
            'Good activity compatibility'
          ],
          challenges: [
            'Different energy levels',
            'Physical need variations',
            'Activity preference differences',
            'Physical boundary issues'
          ],
          recommendations: [
            'Maintain physical connection',
            'Respect physical boundaries',
            'Share physical activities',
            'Balance energy levels',
            'Create physical harmony'
          ]
        }
      },
      lifeGoals: {
        name: 'Life Goals',
        score: this.calculateLifeGoalsCompatibility(relationships),
        maxScore: 20,
        details: {
          strengths: [
            'Aligned life vision',
            'Compatible ambitions',
            'Shared future goals',
            'Similar values',
            'Complementary aspirations'
          ],
          challenges: [
            'Different life priorities',
            'Career goal conflicts',
            'Value differences',
            'Timeline variations'
          ],
          recommendations: [
            'Regular goal discussions',
            'Create shared vision',
            'Support individual goals',
            'Plan together',
            'Review progress regularly'
          ]
        }
      }
    };
  }
} 