interface PlanetaryEffectDetails {
  psychological: {
    positive: string[];
    negative: string[];
    development: string[];
    challenges: string[];
  };
  physical: {
    health: string[];
    energy: string[];
    vitality: string[];
    challenges: string[];
  };
  spiritual: {
    growth: string[];
    awareness: string[];
    practices: string[];
    challenges: string[];
  };
  material: {
    career: string[];
    wealth: string[];
    opportunities: string[];
    challenges: string[];
  };
  karmic: {
    lessons: string[];
    pastLife: string[];
    resolution: string[];
    growth: string[];
  };
}

export class DetailedPlanetaryEffects {
  private static readonly PLANETARY_EFFECTS: Record<string, PlanetaryEffectDetails> = {
    Sun: {
      psychological: {
        positive: [
          'Enhanced self-confidence',
          'Strong willpower',
          'Clear sense of purpose',
          'Natural leadership abilities'
        ],
        negative: [
          'Ego conflicts',
          'Excessive pride',
          'Domineering tendencies',
          'Authority issues'
        ],
        development: [
          'Identity formation',
          'Self-expression',
          'Personal authority',
          'Creative manifestation'
        ],
        challenges: [
          'Balancing ego needs',
          'Managing power dynamics',
          'Handling criticism',
          'Delegation skills'
        ]
      },
      physical: {
        health: [
          'Heart vitality',
          'Bone density',
          'Immune system strength',
          'Overall vitality'
        ],
        energy: [
          'High stamina',
          'Natural vigor',
          'Physical resilience',
          'Strong recovery ability'
        ],
        vitality: [
          'Robust constitution',
          'Good circulation',
          'Strong life force',
          'Physical endurance'
        ],
        challenges: [
          'Heat sensitivity',
          'Blood pressure issues',
          'Eye strain',
          'Heart stress'
        ]
      },
      spiritual: {
        growth: [
          'Soul purpose awareness',
          'Divine connection',
          'Spiritual leadership',
          'Inner light activation'
        ],
        awareness: [
          'Higher self connection',
          'Divine masculine energy',
          'Spiritual authority',
          'Light body activation'
        ],
        practices: [
          'Sun meditation',
          'Solar pranayama',
          'Light visualization',
          'Power mantras'
        ],
        challenges: [
          'Spiritual pride',
          'Divine ego',
          'Power misuse',
          'Authority attachment'
        ]
      },
      material: {
        career: [
          'Leadership positions',
          'Government roles',
          'Executive success',
          'Public recognition'
        ],
        wealth: [
          'Status acquisition',
          'Gold investments',
          'Authority positions',
          'Recognition rewards'
        ],
        opportunities: [
          'Political connections',
          'Leadership roles',
          'Government contracts',
          'Public platforms'
        ],
        challenges: [
          'Position maintenance',
          'Status pressure',
          'Public scrutiny',
          'Authority challenges'
        ]
      },
      karmic: {
        lessons: [
          'Proper use of power',
          'Authentic leadership',
          'Divine service',
          'Ego transcendence'
        ],
        pastLife: [
          'Authority positions',
          'Leadership roles',
          'Power dynamics',
          'Recognition patterns'
        ],
        resolution: [
          'Power balance',
          'Authority wisdom',
          'Leadership maturity',
          'Ego integration'
        ],
        growth: [
          'Divine leadership',
          'Spiritual authority',
          'Power wisdom',
          'Soul purpose'
        ]
      }
    },
    Moon: {
      psychological: {
        positive: [
          'Emotional intelligence',
          'Intuitive understanding',
          'Nurturing capacity',
          'Empathic abilities'
        ],
        negative: [
          'Emotional volatility',
          'Dependency issues',
          'Mood fluctuations',
          'Security fears'
        ],
        development: [
          'Emotional maturity',
          'Intuitive development',
          'Nurturing skills',
          'Inner security'
        ],
        challenges: [
          'Emotional boundaries',
          'Attachment patterns',
          'Security needs',
          'Dependency balance'
        ]
      },
      physical: {
        health: [
          'Digestive harmony',
          'Hormonal balance',
          'Fluid regulation',
          'Reproductive health'
        ],
        energy: [
          'Cyclic vitality',
          'Emotional energy',
          'Nurturing power',
          'Regenerative ability'
        ],
        vitality: [
          'Fluid balance',
          'Hormonal vitality',
          'Emotional resilience',
          'Adaptive strength'
        ],
        challenges: [
          'Water retention',
          'Hormonal imbalance',
          'Digestive sensitivity',
          'Sleep disturbances'
        ]
      },
      spiritual: {
        growth: [
          'Divine feminine connection',
          'Intuitive awakening',
          'Emotional wisdom',
          'Soul nurturing'
        ],
        awareness: [
          'Psychic development',
          'Spiritual sensitivity',
          'Divine mother connection',
          'Soul memory access'
        ],
        practices: [
          'Moon meditation',
          'Intuitive development',
          'Emotional healing',
          'Divine feminine rituals'
        ],
        challenges: [
          'Emotional attachment',
          'Spiritual dependency',
          'Psychic boundaries',
          'Intuitive overwhelm'
        ]
      },
      material: {
        career: [
          'Counseling roles',
          'Nurturing professions',
          'Public service',
          'Emotional work'
        ],
        wealth: [
          'Property investments',
          'Emotional assets',
          'Public ventures',
          'Family wealth'
        ],
        opportunities: [
          'Public connections',
          'Emotional work',
          'Family business',
          'Property deals'
        ],
        challenges: [
          'Financial security',
          'Emotional investments',
          'Public exposure',
          'Family responsibilities'
        ]
      },
      karmic: {
        lessons: [
          'Emotional wisdom',
          'Nurturing balance',
          'Security understanding',
          'Family patterns'
        ],
        pastLife: [
          'Maternal roles',
          'Family patterns',
          'Emotional trauma',
          'Security issues'
        ],
        resolution: [
          'Emotional healing',
          'Family karma',
          'Nurturing wisdom',
          'Security integration'
        ],
        growth: [
          'Divine mothering',
          'Emotional mastery',
          'Soul nurturing',
          'Family wisdom'
        ]
      }
    }
    // Add other planets...
  };

  static getEffects(planet: string): PlanetaryEffectDetails | null {
    return this.PLANETARY_EFFECTS[planet] || null;
  }

  static getPsychologicalEffects(planet: string): PlanetaryEffectDetails['psychological'] | null {
    return this.PLANETARY_EFFECTS[planet]?.psychological || null;
  }

  static getPhysicalEffects(planet: string): PlanetaryEffectDetails['physical'] | null {
    return this.PLANETARY_EFFECTS[planet]?.physical || null;
  }

  static getSpiritualEffects(planet: string): PlanetaryEffectDetails['spiritual'] | null {
    return this.PLANETARY_EFFECTS[planet]?.spiritual || null;
  }

  static getMaterialEffects(planet: string): PlanetaryEffectDetails['material'] | null {
    return this.PLANETARY_EFFECTS[planet]?.material || null;
  }

  static getKarmicEffects(planet: string): PlanetaryEffectDetails['karmic'] | null {
    return this.PLANETARY_EFFECTS[planet]?.karmic || null;
  }

  static getEffectsByPhase(
    planet: string,
    phase: 'initiation' | 'peak' | 'completion'
  ): Partial<PlanetaryEffectDetails> {
    const effects = this.getEffects(planet);
    if (!effects) return {};

    switch (phase) {
      case 'initiation':
        return {
          psychological: {
            ...effects.psychological,
            development: effects.psychological.development.slice(0, 2),
            challenges: effects.psychological.challenges.slice(0, 2)
          },
          physical: {
            ...effects.physical,
            vitality: effects.physical.vitality.slice(0, 2),
            challenges: effects.physical.challenges.slice(0, 2)
          },
          spiritual: {
            ...effects.spiritual,
            growth: effects.spiritual.growth.slice(0, 2),
            practices: effects.spiritual.practices.slice(0, 2)
          }
        };
      case 'peak':
        return effects;
      case 'completion':
        return {
          psychological: {
            ...effects.psychological,
            positive: effects.psychological.positive.slice(-2),
            development: effects.psychological.development.slice(-2)
          },
          spiritual: {
            ...effects.spiritual,
            growth: effects.spiritual.growth.slice(-2),
            awareness: effects.spiritual.awareness.slice(-2)
          },
          karmic: effects.karmic
        };
    }
  }
} 