interface RitualMaterials {
  primary: string[];
  secondary: string[];
  optional: string[];
  substitutes: Record<string, string[]>;
}

interface RitualStep {
  name: string;
  duration: string;
  mantras: string[];
  materials: string[];
  procedure: string[];
  mudras?: string[];
  precautions: string[];
}

interface RitualTiming {
  muhurta: string[];
  weekDay: string[];
  tithi: string[];
  nakshatra: string[];
  yoga: string[];
  karana: string[];
  avoidance: string[];
}

export class RitualProcedures {
  private static readonly RITUAL_MATERIALS: Record<string, RitualMaterials> = {
    yantra: {
      primary: [
        'Copper plate',
        'Gold plate',
        'Silver plate',
        'Sacred thread',
        'Sandal paste',
        'Kumkum',
        'Turmeric'
      ],
      secondary: [
        'Flowers',
        'Incense',
        'Camphor',
        'Ghee lamp',
        'Pure water'
      ],
      optional: [
        'Specific gemstones',
        'Colored cloth',
        'Specific herbs'
      ],
      substitutes: {
        'Copper plate': ['Bronze plate', 'Brass plate'],
        'Gold plate': ['Copper plate with gold coating'],
        'Silver plate': ['German silver plate'],
        'Sacred thread': ['New cotton thread'],
      }
    },
    gemstone: {
      primary: [
        'Selected gemstone',
        'Gold/Silver ring',
        'Sacred thread',
        'Specific herbs',
        'Purified water'
      ],
      secondary: [
        'Specific flowers',
        'Dhoop/Incense',
        'Ghee lamp',
        'Sandalwood paste'
      ],
      optional: [
        'Yantra',
        'Crystal',
        'Specific oils'
      ],
      substitutes: {
        'Gold ring': ['Silver ring', 'Panchdhatu ring'],
        'Sacred thread': ['Cotton thread'],
        'Sandalwood paste': ['Turmeric paste']
      }
    }
  };

  private static readonly RITUAL_STEPS: Record<string, RitualStep[]> = {
    yantraEnergization: [
      {
        name: 'Preparation',
        duration: '30 minutes',
        mantras: ['Om Gam Ganapataye Namaha'],
        materials: ['Bath items', 'Clean clothes', 'Puja items'],
        procedure: [
          'Take ritual bath before sunrise',
          'Wear clean, light-colored clothes',
          'Clean the puja area',
          'Arrange all materials in clockwise order'
        ],
        precautions: [
          'Maintain silence',
          'Avoid eating before ritual',
          'Keep mind pure and focused'
        ]
      },
      {
        name: 'Purification',
        duration: '15 minutes',
        mantras: [
          'Om Apavitrah Pavitro Va',
          'Om Bhur Bhuvah Svah'
        ],
        materials: [
          'Copper/brass vessel',
          'Gangajal',
          'Tulsi leaves',
          'Kumkum'
        ],
        procedure: [
          'Purify hands with water',
          'Perform achamana',
          'Sprinkle water on items',
          'Apply tilak'
        ],
        mudras: [
          'Anjali Mudra',
          'Avahana Mudra'
        ],
        precautions: [
          'Use only right hand',
          'Maintain proper sitting posture',
          'Face proper direction'
        ]
      },
      {
        name: 'Main Ritual',
        duration: '1 hour',
        mantras: [
          'Specific yantra beej mantra',
          'Deity mantras',
          'Protection mantras'
        ],
        materials: [
          'Prepared yantra',
          'Ritual items',
          'Offerings'
        ],
        procedure: [
          'Install yantra at auspicious time',
          'Perform nyasa',
          'Offer specific items',
          'Recite mantras',
          'Perform prana pratishtha'
        ],
        mudras: [
          'Specific yantra mudras',
          'Prana Mudra'
        ],
        precautions: [
          'Follow exact sequence',
          'Maintain concentration',
          'Avoid interruptions'
        ]
      }
    ],
    gemstoneEnergization: [
      {
        name: 'Preparation',
        duration: '20 minutes',
        mantras: ['Om Namah Shivaya'],
        materials: [
          'Selected gemstone',
          'Purification items',
          'Ritual materials'
        ],
        procedure: [
          'Clean gemstone with proper method',
          'Prepare ritual area',
          'Set up altar',
          'Arrange materials'
        ],
        precautions: [
          'Handle gemstone carefully',
          'Maintain purity',
          'Follow timing'
        ]
      },
      {
        name: 'Energization',
        duration: '45 minutes',
        mantras: [
          'Planetary beej mantras',
          'Specific gemstone mantras'
        ],
        materials: [
          'Energized gemstone',
          'Sacred items',
          'Offering materials'
        ],
        procedure: [
          'Perform initial prayers',
          'Energize with mantras',
          'Charge with specific energies',
          'Final empowerment'
        ],
        mudras: [
          'Shakti Mudra',
          'Prithvi Mudra'
        ],
        precautions: [
          'Maintain energy flow',
          'Avoid distractions',
          'Follow proper sequence'
        ]
      }
    ]
  };

  private static readonly TIMING_REQUIREMENTS: Record<string, RitualTiming> = {
    yantra: {
      muhurta: ['Brahma', 'Abhijit'],
      weekDay: ['Sunday', 'Thursday'],
      tithi: ['Shukla Pratipada', 'Shukla Panchami'],
      nakshatra: ['Pushya', 'Hasta', 'Shravan'],
      yoga: ['Siddha', 'Shubha'],
      karana: ['Bava', 'Balava'],
      avoidance: [
        'Amavasya',
        'Eclipses',
        'Bhadra Kaal'
      ]
    },
    gemstone: {
      muhurta: ['Abhijit', 'Vijaya'],
      weekDay: ['Specific to planet'],
      tithi: ['Shukla Paksha'],
      nakshatra: ['Planet specific'],
      yoga: ['Siddha', 'Shubha', 'Vridhhi'],
      karana: ['Bava', 'Balava', 'Kaulava'],
      avoidance: [
        'Rahu Kaal',
        'Eclipses',
        'Amavasya'
      ]
    }
  };

  static getRitualProcedure(
    type: 'yantra' | 'gemstone',
    planetaryInfluence: string,
    timing: Date
  ): {
    materials: RitualMaterials;
    steps: RitualStep[];
    timing: RitualTiming;
  } {
    return {
      materials: this.RITUAL_MATERIALS[type],
      steps: this.RITUAL_STEPS[`${type}Energization`],
      timing: this.TIMING_REQUIREMENTS[type]
    };
  }

  static validateRitualTiming(
    proposedTime: Date,
    requirements: RitualTiming
  ): {
    isAuspicious: boolean;
    reasons: string[];
    nextAuspiciousTime?: Date;
  } {
    // Implement timing validation logic
    return {
      isAuspicious: true,
      reasons: ['All conditions met'],
    };
  }

  static getSubstitutes(
    material: string,
    type: 'yantra' | 'gemstone'
  ): string[] {
    return this.RITUAL_MATERIALS[type].substitutes[material] || [];
  }
} 