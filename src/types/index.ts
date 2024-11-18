export interface LagnaChart {
  ascendant: {
    longitude: number;
    sign: string;
    nakshatra: string;
    pada: number;
  };
  houses: Array<{
    house: number;
    longitude: number;
    sign: string;
    signLord: string;
  }>;
  planets: Array<{
    planet: string;
    longitude: number;
    house: number;
    sign: string;
    nakshatra: string;
    pada: number;
    isRetrograde: boolean;
    aspects: Array<{
      planet: string;
      aspect: string;
      angle: number;
      strength: number;
    }>;
  }>;
}

export interface AppData {
  lagnaChart: LagnaChart;
  planetaryAnalysis: any; // Define specific type if needed
  houseAnalysis: any; // Define specific type if needed
  planetaryHarmonies: any; // Define specific type if needed
  relationshipAnalysis: any; // Define specific type if needed
  dashaTimeline: any; // Define specific type if needed
  muhurtaTimings: any; // Define specific type if needed
} 