interface MuhurtaTimings {
  start: Date;
  end: Date;
  quality: 'excellent' | 'good' | 'neutral' | 'inauspicious';
  suitableFor: string[];
  unsuitable: string[];
  planetaryLord: string;
  element: 'fire' | 'earth' | 'air' | 'water' | 'ether';
}

interface EnergizationProcedure {
  preparation: {
    time: MuhurtaTimings;
    materials: string[];
    purification: string[];
    mantras: string[];
  };
  mainRitual: {
    steps: string[];
    mantras: string[];
    duration: string;
    specialInstructions: string[];
  };
  completion: {
    steps: string[];
    mantras: string[];
    stabilization: string[];
  };
}

export class MuhurtaCalculator {
  static calculateMuhurtaTimings(date: Date = new Date()) {
    try {
      // Create a new date object for today at midnight
      const startOfDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        0, 0, 0, 0
      );

      // Create muhurta timings using the start of day as reference
      const muhurtaTimings = [
        {
          startTime: this.createTimeForDay(startOfDay, 6, 0),    // 6:00 AM
          endTime: this.createTimeForDay(startOfDay, 7, 30),     // 7:30 AM
          name: 'Brahma Muhurta',
          quality: 'auspicious' as const,
          activities: ['Meditation', 'Study', 'Spiritual practices']
        },
        {
          startTime: this.createTimeForDay(startOfDay, 8, 0),    // 8:00 AM
          endTime: this.createTimeForDay(startOfDay, 9, 0),      // 9:00 AM
          name: 'Abhijit Muhurta',
          quality: 'auspicious' as const,
          activities: ['Important work', 'New beginnings', 'Meetings']
        }
      ];

      return muhurtaTimings;
    } catch (error) {
      console.error('Error calculating muhurta timings:', error);
      return [];
    }
  }

  private static createTimeForDay(baseDate: Date, hours: number, minutes: number): Date {
    const newDate = new Date(baseDate);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    return newDate;
  }

  private static addHours(date: Date, hours: number): Date {
    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() + hours);
    return newDate;
  }

  private static addMinutes(date: Date, minutes: number): Date {
    const newDate = new Date(date);
    newDate.setMinutes(newDate.getMinutes() + minutes);
    return newDate;
  }

  static getMuhurtaQuality(date: Date): 'auspicious' | 'neutral' | 'inauspicious' {
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const timeInMinutes = hour * 60 + minutes;

    // Brahma Muhurta (4:24 AM - 5:12 AM)
    if (timeInMinutes >= 264 && timeInMinutes < 312) {
      return 'auspicious';
    }
    
    // Abhijit Muhurta (11:48 AM - 12:36 PM)
    if (timeInMinutes >= 708 && timeInMinutes < 756) {
      return 'auspicious';
    }

    // Add more muhurta time ranges and their qualities
    
    return 'neutral';
  }

  static getMuhurtaActivities(quality: 'auspicious' | 'neutral' | 'inauspicious'): string[] {
    switch (quality) {
      case 'auspicious':
        return [
          'Meditation',
          'Starting new ventures',
          'Important meetings',
          'Learning',
          'Spiritual practices'
        ];
      case 'neutral':
        return [
          'Regular daily activities',
          'Routine work',
          'Maintenance tasks'
        ];
      case 'inauspicious':
        return [
          'Rest',
          'Planning',
          'Internal work'
        ];
    }
  }

  static calculateEnergizationTiming(
    date: Date,
    latitude: number,
    longitude: number,
    purpose: string
  ): MuhurtaTimings | null {
    const muhurtas = this.calculateDailyMuhurtas(date, latitude, longitude);
    return muhurtas.find(m => 
      m.quality === 'excellent' && 
      m.suitableFor.some(s => s.toLowerCase().includes(purpose.toLowerCase()))
    ) || null;
  }

  static getEnergizationProcedure(
    itemType: 'yantra' | 'gemstone' | 'rudraksha',
    planetaryInfluence: string,
    timing: MuhurtaTimings
  ): EnergizationProcedure {
    return {
      preparation: {
        time: timing,
        materials: this.getPreparationMaterials(itemType, planetaryInfluence),
        purification: this.getPurificationSteps(itemType),
        mantras: this.getPreparationMantras(planetaryInfluence)
      },
      mainRitual: {
        steps: this.getMainRitualSteps(itemType, planetaryInfluence),
        mantras: this.getMainRitualMantras(planetaryInfluence),
        duration: this.getRitualDuration(itemType),
        specialInstructions: this.getSpecialInstructions(itemType, planetaryInfluence)
      },
      completion: {
        steps: this.getCompletionSteps(itemType),
        mantras: this.getCompletionMantras(planetaryInfluence),
        stabilization: this.getStabilizationProcedures(itemType)
      }
    };
  }

  private static calculateSunrise(date: Date, latitude: number, longitude: number): Date {
    // Implement astronomical calculation for sunrise
    // This should use proper astronomical algorithms
    return new Date(date.setHours(6, 0, 0, 0));
  }

  private static calculateSunset(date: Date, latitude: number, longitude: number): Date {
    // Implement astronomical calculation for sunset
    // This should use proper astronomical algorithms
    return new Date(date.setHours(18, 0, 0, 0));
  }

  private static calculatePeriodMuhurtas(
    startTime: Date,
    duration: number,
    count: number
  ): MuhurtaTimings[] {
    const muhurtaDuration = duration / count;
    const muhurtas: MuhurtaTimings[] = [];

    for (let i = 0; i < count; i++) {
      const start = new Date(startTime.getTime() + i * muhurtaDuration);
      const end = new Date(start.getTime() + muhurtaDuration);
      const qualities = this.MUHURTA_QUALITIES[i % Object.keys(this.MUHURTA_QUALITIES).length];

      muhurtas.push({
        start,
        end,
        quality: qualities.quality,
        suitableFor: qualities.suitableFor,
        unsuitable: qualities.unsuitable,
        planetaryLord: qualities.lord,
        element: qualities.element
      });
    }

    return muhurtas;
  }

  private static getPreparationMaterials(itemType: string, planet: string): string[] {
    const commonMaterials = [
      'Pure water',
      'Copper vessel',
      'White cloth',
      'Incense',
      'Camphor',
      'Flowers'
    ];

    const planetaryMaterials: Record<string, string[]> = {
      Sun: ['Red flowers', 'Copper vessel', 'Red sandalwood'],
      Moon: ['White flowers', 'Silver vessel', 'White sandalwood'],
      Mars: ['Red flowers', 'Copper vessel', 'Red sandalwood'],
      Mercury: ['Green flowers', 'Bronze vessel', 'Green sandalwood'],
      Jupiter: ['Yellow flowers', 'Gold vessel', 'Yellow sandalwood'],
      Venus: ['White flowers', 'Silver vessel', 'White sandalwood'],
      Saturn: ['Blue or black flowers', 'Iron vessel', 'Black sesame']
    };

    return [...commonMaterials, ...(planetaryMaterials[planet] || [])];
  }

  private static getPurificationSteps(itemType: string): string[] {
    const commonSteps = [
      'Clean the item with pure water',
      'Dry with a clean white cloth',
      'Expose to sunlight for purification',
      'Perform preliminary prayers'
    ];

    const specificSteps: Record<string, string[]> = {
      yantra: [
        'Draw sacred symbols with proper materials',
        'Establish proper orientation',
        'Create protective boundary'
      ],
      gemstone: [
        'Clean with specific herb mixture',
        'Energize with sound vibrations',
        'Purify with five elements'
      ],
      rudraksha: [
        'Soak in gangajal',
        'Apply vibhuti or sandal paste',
        'Recite Shiva mantras'
      ]
    };

    return [...commonSteps, ...(specificSteps[itemType] || [])];
  }

  private static getPreparationMantras(planet: string): string[] {
    const commonMantras = ['Om Gam Ganapataye Namaha'];
    
    const planetaryMantras: Record<string, string[]> = {
      Sun: ['Om Hram Hrim Hraum Sah Suryaya Namaha'],
      Moon: ['Om Shram Shrim Shraum Sah Chandraya Namaha'],
      Mars: ['Om Kram Krim Kraum Sah Kujaya Namaha'],
      Mercury: ['Om Bram Brim Braum Sah Budhaya Namaha'],
      Jupiter: ['Om Gram Grim Graum Sah Gurave Namaha'],
      Venus: ['Om Dram Drim Draum Sah Shukraya Namaha'],
      Saturn: ['Om Pram Prim Praum Sah Shanaye Namaha']
    };

    return [...commonMantras, ...(planetaryMantras[planet] || [])];
  }

  private static getMainRitualSteps(itemType: string, planet: string): string[] {
    // Implement main ritual steps based on item type and planetary influence
    return [];
  }

  private static getMainRitualMantras(planet: string): string[] {
    // Implement main ritual mantras based on planetary influence
    return [];
  }

  private static getRitualDuration(itemType: string): string {
    // Implement ritual duration calculation
    return '';
  }

  private static getSpecialInstructions(itemType: string, planet: string): string[] {
    // Implement special instructions based on item type and planetary influence
    return [];
  }

  private static getCompletionSteps(itemType: string): string[] {
    // Implement completion steps
    return [];
  }

  private static getCompletionMantras(planet: string): string[] {
    // Implement completion mantras
    return [];
  }

  private static getStabilizationProcedures(itemType: string): string[] {
    // Implement stabilization procedures
    return [];
  }
} 