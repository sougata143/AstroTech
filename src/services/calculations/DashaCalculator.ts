export interface DashaPeriod {
  planet: string;
  startDate: Date;
  endDate: Date;
  subPeriods: DashaPeriod[];
}

interface PlanetDuration {
  planet: string;
  years: number;
}

export class DashaCalculator {
  private static readonly MAHADASHA_PERIODS: PlanetDuration[] = [
    { planet: 'Sun', years: 6 },
    { planet: 'Moon', years: 10 },
    { planet: 'Mars', years: 7 },
    { planet: 'Rahu', years: 18 },
    { planet: 'Jupiter', years: 16 },
    { planet: 'Saturn', years: 19 },
    { planet: 'Mercury', years: 17 },
    { planet: 'Ketu', years: 7 },
    { planet: 'Venus', years: 20 }
  ];

  static calculateVimshottariDasha(birthDate: Date, birthNakshatra: number, birthNakshatraPada: number): DashaPeriod[] {
    const nakshatraLord = this.getNakshatraLord(birthNakshatra);
    const startIndex = this.MAHADASHA_PERIODS.findIndex(p => p.planet === nakshatraLord);
    const dashas: DashaPeriod[] = [];
    let currentDate = new Date(birthDate);

    for (let i = 0; i < this.MAHADASHA_PERIODS.length; i++) {
      const planetIndex = (startIndex + i) % this.MAHADASHA_PERIODS.length;
      const period = this.MAHADASHA_PERIODS[planetIndex];
      const endDate = new Date(currentDate);
      endDate.setFullYear(endDate.getFullYear() + period.years);

      dashas.push({
        planet: period.planet,
        startDate: new Date(currentDate),
        endDate: new Date(endDate),
        subPeriods: this.calculateAntarDasha(currentDate, period.planet, period.years)
      });

      currentDate = new Date(endDate);
    }

    return dashas;
  }

  private static calculateAntarDasha(startDate: Date, mainPlanet: string, years: number): DashaPeriod[] {
    const antarDashas: DashaPeriod[] = [];
    let currentDate = new Date(startDate);

    this.MAHADASHA_PERIODS.forEach(period => {
      const duration = (years * period.years) / 120;
      const endDate = new Date(currentDate);
      endDate.setFullYear(endDate.getFullYear() + Math.floor(duration));
      endDate.setMonth(endDate.getMonth() + Math.floor((duration % 1) * 12));

      antarDashas.push({
        planet: period.planet,
        startDate: new Date(currentDate),
        endDate: new Date(endDate),
        subPeriods: [] // Can add PratyantarDasha calculation here if needed
      });

      currentDate = new Date(endDate);
    });

    return antarDashas;
  }

  private static getNakshatraLord(nakshatra: number): string {
    const lords = ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'];
    return lords[nakshatra % 9];
  }
} 