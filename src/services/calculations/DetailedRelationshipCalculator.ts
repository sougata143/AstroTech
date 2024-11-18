import { PlanetaryHarmony } from './ExtendedKutaCalculator';
import { RelationshipCompatibilityCalculator } from './RelationshipCompatibilityCalculator';

interface DetailedCompatibilityArea extends CompatibilityArea {
  subAreas: {
    name: string;
    score: number;
    maxScore: number;
    influence: string[];
    potential: string[];
  }[];
  timing: {
    favorable: string[];
    challenging: string[];
    peakPeriods: string[];
  };
}

export class DetailedRelationshipCalculator extends RelationshipCompatibilityCalculator {
  static calculateFinancialCompatibility(relationships: PlanetaryHarmony[]): number {
    let score = 0;
    const maxScore = 20;

    // Venus-Jupiter Relationship
    const venusJupiterRelation = relationships.find(r => 
      r.planets.includes('Venus') && r.planets.includes('Jupiter')
    );
    if (venusJupiterRelation) {
      score += this.getRelationshipScore(venusJupiterRelation) * 7;
    }

    // Mercury-Venus Relationship
    const mercuryVenusRelation = relationships.find(r => 
      r.planets.includes('Mercury') && r.planets.includes('Venus')
    );
    if (mercuryVenusRelation) {
      score += this.getRelationshipScore(mercuryVenusRelation) * 7;
    }

    // Jupiter-Mercury Relationship
    const jupiterMercuryRelation = relationships.find(r => 
      r.planets.includes('Jupiter') && r.planets.includes('Mercury')
    );
    if (jupiterMercuryRelation) {
      score += this.getRelationshipScore(jupiterMercuryRelation) * 6;
    }

    return Math.min(score, maxScore);
  }

  static calculateFamilyCompatibility(relationships: PlanetaryHarmony[]): number {
    let score = 0;
    const maxScore = 20;

    // Moon-Venus Relationship
    const moonVenusRelation = relationships.find(r => 
      r.planets.includes('Moon') && r.planets.includes('Venus')
    );
    if (moonVenusRelation) {
      score += this.getRelationshipScore(moonVenusRelation) * 7;
    }

    // Jupiter-Moon Relationship
    const jupiterMoonRelation = relationships.find(r => 
      r.planets.includes('Jupiter') && r.planets.includes('Moon')
    );
    if (jupiterMoonRelation) {
      score += this.getRelationshipScore(jupiterMoonRelation) * 7;
    }

    // Venus-Jupiter Relationship
    const venusJupiterRelation = relationships.find(r => 
      r.planets.includes('Venus') && r.planets.includes('Jupiter')
    );
    if (venusJupiterRelation) {
      score += this.getRelationshipScore(venusJupiterRelation) * 6;
    }

    return Math.min(score, maxScore);
  }

  static calculateSocialCompatibility(relationships: PlanetaryHarmony[]): number {
    let score = 0;
    const maxScore = 20;

    // Venus-Sun Relationship
    const venusSunRelation = relationships.find(r => 
      r.planets.includes('Venus') && r.planets.includes('Sun')
    );
    if (venusSunRelation) {
      score += this.getRelationshipScore(venusSunRelation) * 7;
    }

    // Mercury-Moon Relationship
    const mercuryMoonRelation = relationships.find(r => 
      r.planets.includes('Mercury') && r.planets.includes('Moon')
    );
    if (mercuryMoonRelation) {
      score += this.getRelationshipScore(mercuryMoonRelation) * 7;
    }

    // Jupiter-Sun Relationship
    const jupiterSunRelation = relationships.find(r => 
      r.planets.includes('Jupiter') && r.planets.includes('Sun')
    );
    if (jupiterSunRelation) {
      score += this.getRelationshipScore(jupiterSunRelation) * 6;
    }

    return Math.min(score, maxScore);
  }

  static generateDetailedAnalysis(relationships: PlanetaryHarmony[]): Record<string, DetailedCompatibilityArea> {
    const basicAnalysis = super.generateDetailedAnalysis(relationships);
    
    return {
      ...basicAnalysis,
      financial: {
        name: 'Financial Compatibility',
        score: this.calculateFinancialCompatibility(relationships),
        maxScore: 20,
        details: {
          strengths: [
            'Shared financial values',
            'Compatible money management styles',
            'Similar financial goals',
            'Complementary earning potential'
          ],
          challenges: [
            'Different spending habits',
            'Financial priority differences',
            'Resource management conflicts',
            'Investment style variations'
          ],
          recommendations: [
            'Create shared financial goals',
            'Develop joint budgeting system',
            'Regular financial planning sessions',
            'Respect individual financial autonomy'
          ]
        },
        subAreas: [
          {
            name: 'Money Management',
            score: 15,
            maxScore: 20,
            influence: [
              'Mercury-Venus harmony indicates good financial planning',
              'Jupiter influence suggests prosperity potential'
            ],
            potential: [
              'Joint business ventures',
              'Investment partnerships',
              'Shared assets management'
            ]
          },
          {
            name: 'Financial Goals',
            score: 16,
            maxScore: 20,
            influence: [
              'Saturn-Jupiter aspect shows long-term planning ability',
              'Venus placement indicates shared values'
            ],
            potential: [
              'Long-term wealth building',
              'Property investments',
              'Retirement planning'
            ]
          }
        ],
        timing: {
          favorable: [
            'Jupiter transit periods',
            'Venus-Jupiter conjunctions',
            'Mercury direct phases'
          ],
          challenging: [
            'Saturn-Mars aspects',
            'Mercury retrograde periods',
            'Eclipse phases'
          ],
          peakPeriods: [
            'Jupiter mahadasha',
            'Venus-Jupiter dasha periods',
            'Mercury-Jupiter dasha periods'
          ]
        }
      },
      family: {
        name: 'Family Compatibility',
        score: this.calculateFamilyCompatibility(relationships),
        maxScore: 20,
        details: {
          strengths: [
            'Strong family values alignment',
            'Compatible parenting styles',
            'Shared family goals',
            'Extended family harmony'
          ],
          challenges: [
            'Family tradition differences',
            'Parenting approach variations',
            'Extended family dynamics',
            'Family responsibility balance'
          ],
          recommendations: [
            'Discuss family expectations',
            'Create shared family traditions',
            'Balance family commitments',
            'Respect family boundaries'
          ]
        },
        subAreas: [
          {
            name: 'Parenting Compatibility',
            score: 17,
            maxScore: 20,
            influence: [
              'Moon-Jupiter harmony indicates nurturing environment',
              'Saturn influence shows responsibility'
            ],
            potential: [
              'Effective co-parenting',
              'Child development focus',
              'Family tradition creation'
            ]
          },
          {
            name: 'Extended Family Relations',
            score: 15,
            maxScore: 20,
            influence: [
              'Venus-Moon aspect shows family harmony',
              'Jupiter placement indicates family growth'
            ],
            potential: [
              'Strong family bonds',
              'Multigenerational harmony',
              'Family support system'
            ]
          }
        ],
        timing: {
          favorable: [
            'Moon transit periods',
            'Jupiter-Venus conjunctions',
            'Venus direct phases'
          ],
          challenging: [
            'Saturn-Mars aspects',
            'Rahu transit periods',
            'Eclipse phases'
          ],
          peakPeriods: [
            'Moon mahadasha',
            'Jupiter-Venus dasha periods',
            'Venus mahadasha periods'
          ]
        }
      },
      social: {
        name: 'Social Compatibility',
        score: this.calculateSocialCompatibility(relationships),
        maxScore: 20,
        details: {
          strengths: [
            'Compatible social styles',
            'Shared friend circles',
            'Similar social values',
            'Public life harmony'
          ],
          challenges: [
            'Social energy differences',
            'Friend circle integration',
            'Public vs private life balance',
            'Social obligation management'
          ],
          recommendations: [
            'Balance social activities',
            'Respect social preferences',
            'Create shared social circle',
            'Maintain individual friendships'
          ]
        },
        subAreas: [
          {
            name: 'Social Life Balance',
            score: 16,
            maxScore: 20,
            influence: [
              'Venus-Sun harmony indicates social grace',
              'Mercury influence shows communication skill'
            ],
            potential: [
              'Active social life',
              'Community involvement',
              'Social network building'
            ]
          },
          {
            name: 'Public Image',
            score: 14,
            maxScore: 20,
            influence: [
              'Sun-Jupiter aspect shows public recognition',
              'Venus placement indicates social charm'
            ],
            potential: [
              'Social leadership',
              'Community recognition',
              'Public relations'
            ]
          }
        ],
        timing: {
          favorable: [
            'Venus transit periods',
            'Sun-Jupiter conjunctions',
            'Mercury direct phases'
          ],
          challenging: [
            'Saturn-Mars aspects',
            'Mercury retrograde periods',
            'Eclipse phases'
          ],
          peakPeriods: [
            'Venus mahadasha',
            'Sun-Jupiter dasha periods',
            'Mercury mahadasha periods'
          ]
        }
      }
    };
  }
} 