interface KutaResult {
  score: number;
  maxScore: number;
  details: {
    description: string;
    positivePoints: string[];
    challenges: string[];
    recommendations: string[];
  };
}

export class KutaCalculator {
  // Varna points based on bride and groom's zodiac signs
  private static readonly VARNA_POINTS: Record<string, number> = {
    Brahmin: 4, // Gemini, Virgo, Sagittarius, Pisces
    Kshatriya: 3, // Aries, Leo, Scorpio
    Vaishya: 2, // Taurus, Libra, Capricorn
    Shudra: 1 // Cancer, Aquarius
  };

  // Vashya compatibility between zodiac signs
  private static readonly VASHYA_COMPATIBILITY: Record<string, string[]> = {
    Chatushpad: ['Aries', 'Taurus', 'Leo', 'Sagittarius'],
    Manav: ['Gemini', 'Virgo', 'Libra', 'Aquarius'],
    Jalachar: ['Cancer', 'Scorpio', 'Pisces'],
    Vanchar: ['Capricorn']
  };

  // Tara compatibility based on birth nakshatras
  private static readonly TARA_COMPATIBILITY: number[][] = [
    [8, 6, 4, 2, 0, 8, 6, 4, 2], // Ashwini group
    [6, 4, 2, 0, 8, 6, 4, 2, 0], // Bharani group
    [4, 2, 0, 8, 6, 4, 2, 0, 8], // Krittika group
    // Add more nakshatra groups...
  ];

  // Yoni compatibility between nakshatras
  private static readonly YONI_COMPATIBILITY: Record<string, number[][]> = {
    Horse: [[4, 2, 1, 3], [2, 4, 2, 1], [1, 2, 4, 2], [3, 1, 2, 4]],
    Elephant: [[4, 3, 2, 1], [3, 4, 3, 2], [2, 3, 4, 3], [1, 2, 3, 4]],
    // Add more yoni combinations...
  };

  static calculateVarnaKuta(brideRashi: string, groomRashi: string): KutaResult {
    const brideVarna = this.getVarna(brideRashi);
    const groomVarna = this.getVarna(groomRashi);
    const score = this.calculateVarnaScore(brideVarna, groomVarna);

    return {
      score,
      maxScore: 1,
      details: {
        description: `Varna compatibility between ${brideVarna} and ${groomVarna}`,
        positivePoints: this.getVarnaPositivePoints(brideVarna, groomVarna),
        challenges: this.getVarnaChallenges(brideVarna, groomVarna),
        recommendations: this.getVarnaRecommendations(brideVarna, groomVarna)
      }
    };
  }

  static calculateVashyaKuta(brideRashi: string, groomRashi: string): KutaResult {
    const brideVashya = this.getVashyaGroup(brideRashi);
    const groomVashya = this.getVashyaGroup(groomRashi);
    const score = this.calculateVashyaScore(brideVashya, groomVashya);

    return {
      score,
      maxScore: 2,
      details: {
        description: `Vashya compatibility between ${brideVashya} and ${groomVashya}`,
        positivePoints: this.getVashyaPositivePoints(brideVashya, groomVashya),
        challenges: this.getVashyaChallenges(brideVashya, groomVashya),
        recommendations: this.getVashyaRecommendations(brideVashya, groomVashya)
      }
    };
  }

  static calculateTaraKuta(brideNakshatra: number, groomNakshatra: number): KutaResult {
    const taraScore = this.calculateTaraScore(brideNakshatra, groomNakshatra);
    
    return {
      score: taraScore,
      maxScore: 3,
      details: {
        description: `Tara compatibility between birth stars`,
        positivePoints: this.getTaraPositivePoints(taraScore),
        challenges: this.getTaraChallenges(taraScore),
        recommendations: this.getTaraRecommendations(taraScore)
      }
    };
  }

  static calculateYoniKuta(brideNakshatra: number, groomNakshatra: number): KutaResult {
    const brideYoni = this.getYoniAnimal(brideNakshatra);
    const groomYoni = this.getYoniAnimal(groomNakshatra);
    const score = this.calculateYoniScore(brideYoni, groomYoni);

    return {
      score,
      maxScore: 4,
      details: {
        description: `Yoni compatibility between ${brideYoni} and ${groomYoni}`,
        positivePoints: this.getYoniPositivePoints(brideYoni, groomYoni),
        challenges: this.getYoniChallenges(brideYoni, groomYoni),
        recommendations: this.getYoniRecommendations(brideYoni, groomYoni)
      }
    };
  }

  private static getVarna(rashi: string): string {
    const varnaMap: Record<string, string> = {
      Gemini: 'Brahmin',
      Virgo: 'Brahmin',
      Sagittarius: 'Brahmin',
      Pisces: 'Brahmin',
      Aries: 'Kshatriya',
      Leo: 'Kshatriya',
      Scorpio: 'Kshatriya',
      Taurus: 'Vaishya',
      Libra: 'Vaishya',
      Capricorn: 'Vaishya',
      Cancer: 'Shudra',
      Aquarius: 'Shudra'
    };
    return varnaMap[rashi] || 'Unknown';
  }

  private static calculateVarnaScore(brideVarna: string, groomVarna: string): number {
    const bridePoints = this.VARNA_POINTS[brideVarna] || 0;
    const groomPoints = this.VARNA_POINTS[groomVarna] || 0;
    
    if (groomPoints >= bridePoints) {
      return 1;
    }
    return 0;
  }

  private static getVashyaGroup(rashi: string): string {
    for (const [group, signs] of Object.entries(this.VASHYA_COMPATIBILITY)) {
      if (signs.includes(rashi)) {
        return group;
      }
    }
    return 'Unknown';
  }

  private static calculateVashyaScore(brideVashya: string, groomVashya: string): number {
    // Implement Vashya scoring logic based on traditional rules
    if (brideVashya === groomVashya) return 2;
    if (this.areVashyaCompatible(brideVashya, groomVashya)) return 1;
    return 0;
  }

  private static areVashyaCompatible(group1: string, group2: string): boolean {
    const compatibilityMap: Record<string, string[]> = {
      Chatushpad: ['Manav'],
      Manav: ['Chatushpad', 'Jalachar'],
      Jalachar: ['Manav', 'Vanchar'],
      Vanchar: ['Jalachar']
    };
    return compatibilityMap[group1]?.includes(group2) || false;
  }

  private static calculateTaraScore(bride: number, groom: number): number {
    const birthStarDifference = (groom - bride + 27) % 27;
    const taraGroup = Math.floor(birthStarDifference / 3);
    return this.TARA_COMPATIBILITY[0][taraGroup]; // Using first row as example
  }

  private static getYoniAnimal(nakshatra: number): string {
    const yoniAnimals = [
      'Horse', 'Elephant', 'Sheep', 'Snake', 'Dog', 'Cat', 'Rat', 'Cow',
      'Buffalo', 'Tiger', 'Deer', 'Monkey', 'Mongoose', 'Lion', 'Horse'
    ];
    return yoniAnimals[nakshatra % yoniAnimals.length];
  }

  private static calculateYoniScore(bride: string, groom: string): number {
    if (!this.YONI_COMPATIBILITY[bride] || !this.YONI_COMPATIBILITY[groom]) return 0;
    const brideIndex = Object.keys(this.YONI_COMPATIBILITY).indexOf(bride);
    const groomIndex = Object.keys(this.YONI_COMPATIBILITY).indexOf(groom);
    return this.YONI_COMPATIBILITY[bride][brideIndex][groomIndex];
  }

  // Helper methods for generating analysis points
  private static getVarnaPositivePoints(bride: string, groom: string): string[] {
    // Implement positive points based on Varna combination
    return [];
  }

  private static getVarnaChallenges(bride: string, groom: string): string[] {
    // Implement challenges based on Varna combination
    return [];
  }

  private static getVarnaRecommendations(bride: string, groom: string): string[] {
    // Implement recommendations based on Varna combination
    return [];
  }

  // Similar helper methods for other kutas...
} 