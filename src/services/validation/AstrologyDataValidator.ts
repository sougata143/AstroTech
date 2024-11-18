import { AppData, LagnaChart } from '../../types';

interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

interface ValidationError {
  field: string;
  message: string;
  code: string;
}

interface ValidationWarning {
  field: string;
  message: string;
  code: string;
}

export class AstrologyDataValidator {
  static validateAppData(data: AppData): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    // Validate Lagna Chart
    if (!data.lagnaChart) {
      errors.push({
        field: 'lagnaChart',
        message: 'Lagna chart is required',
        code: 'MISSING_LAGNA_CHART'
      });
    } else {
      const lagnaValidation = this.validateLagnaChart(data.lagnaChart);
      errors.push(...lagnaValidation.errors);
      warnings.push(...lagnaValidation.warnings);
    }

    // Add other validations as needed
    this.validatePlanetaryAnalysis(data.planetaryAnalysis, errors, warnings);
    this.validateHouseAnalysis(data.houseAnalysis, errors, warnings);
    this.validatePlanetaryHarmonies(data.planetaryHarmonies, errors, warnings);
    this.validateRelationshipAnalysis(data.relationshipAnalysis, errors, warnings);
    this.validateDashaTimeline(data.dashaTimeline, errors, warnings);
    this.validateMuhurtaTimings(data.muhurtaTimings, errors, warnings);

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  private static validateLagnaChart(chart: LagnaChart): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    // Validate Ascendant
    if (!chart.ascendant) {
      errors.push({
        field: 'ascendant',
        message: 'Ascendant is required',
        code: 'MISSING_ASCENDANT'
      });
    } else {
      this.validateAscendant(chart.ascendant, errors, warnings);
    }

    // Validate Houses
    if (!Array.isArray(chart.houses) || chart.houses.length !== 12) {
      errors.push({
        field: 'houses',
        message: 'Exactly 12 houses are required',
        code: 'INVALID_HOUSES_COUNT'
      });
    } else {
      chart.houses.forEach((house, index) => {
        this.validateHouse(house, index + 1, errors, warnings);
      });
    }

    // Validate Planets
    if (!Array.isArray(chart.planets)) {
      errors.push({
        field: 'planets',
        message: 'Planets array is required',
        code: 'MISSING_PLANETS'
      });
    } else {
      chart.planets.forEach(planet => {
        this.validatePlanet(planet, errors, warnings);
      });
    }

    return { isValid: errors.length === 0, errors, warnings };
  }

  private static validateAscendant(
    ascendant: LagnaChart['ascendant'],
    errors: ValidationError[],
    warnings: ValidationWarning[]
  ): void {
    if (typeof ascendant.longitude !== 'number' || ascendant.longitude < 0 || ascendant.longitude >= 360) {
      errors.push({
        field: 'ascendant.longitude',
        message: 'Longitude must be between 0 and 360 degrees',
        code: 'INVALID_LONGITUDE'
      });
    }

    if (!this.isValidZodiacSign(ascendant.sign)) {
      errors.push({
        field: 'ascendant.sign',
        message: 'Invalid zodiac sign',
        code: 'INVALID_SIGN'
      });
    }

    if (!this.isValidNakshatra(ascendant.nakshatra)) {
      errors.push({
        field: 'ascendant.nakshatra',
        message: 'Invalid nakshatra',
        code: 'INVALID_NAKSHATRA'
      });
    }

    if (typeof ascendant.pada !== 'number' || ascendant.pada < 1 || ascendant.pada > 4) {
      errors.push({
        field: 'ascendant.pada',
        message: 'Pada must be between 1 and 4',
        code: 'INVALID_PADA'
      });
    }
  }

  private static validateHouse(
    house: LagnaChart['houses'][0],
    houseNumber: number,
    errors: ValidationError[],
    warnings: ValidationWarning[]
  ): void {
    if (house.house !== houseNumber) {
      errors.push({
        field: `houses[${houseNumber - 1}].house`,
        message: `House number must be ${houseNumber}`,
        code: 'INVALID_HOUSE_NUMBER'
      });
    }

    if (typeof house.longitude !== 'number' || house.longitude < 0 || house.longitude >= 360) {
      errors.push({
        field: `houses[${houseNumber - 1}].longitude`,
        message: 'Longitude must be between 0 and 360 degrees',
        code: 'INVALID_LONGITUDE'
      });
    }

    if (!this.isValidZodiacSign(house.sign)) {
      errors.push({
        field: `houses[${houseNumber - 1}].sign`,
        message: 'Invalid zodiac sign',
        code: 'INVALID_SIGN'
      });
    }

    if (!this.isValidPlanet(house.signLord)) {
      errors.push({
        field: `houses[${houseNumber - 1}].signLord`,
        message: 'Invalid sign lord',
        code: 'INVALID_SIGN_LORD'
      });
    }
  }

  private static validatePlanet(
    planet: LagnaChart['planets'][0],
    errors: ValidationError[],
    warnings: ValidationWarning[]
  ): void {
    if (!this.isValidPlanet(planet.planet)) {
      errors.push({
        field: 'planet',
        message: 'Invalid planet name',
        code: 'INVALID_PLANET'
      });
    }

    if (typeof planet.longitude !== 'number' || planet.longitude < 0 || planet.longitude >= 360) {
      errors.push({
        field: 'longitude',
        message: 'Longitude must be between 0 and 360 degrees',
        code: 'INVALID_LONGITUDE'
      });
    }

    if (typeof planet.house !== 'number' || planet.house < 1 || planet.house > 12) {
      errors.push({
        field: 'house',
        message: 'House must be between 1 and 12',
        code: 'INVALID_HOUSE'
      });
    }

    if (!this.isValidZodiacSign(planet.sign)) {
      errors.push({
        field: 'sign',
        message: 'Invalid zodiac sign',
        code: 'INVALID_SIGN'
      });
    }

    if (!this.isValidNakshatra(planet.nakshatra)) {
      errors.push({
        field: 'nakshatra',
        message: 'Invalid nakshatra',
        code: 'INVALID_NAKSHATRA'
      });
    }

    if (typeof planet.pada !== 'number' || planet.pada < 1 || planet.pada > 4) {
      errors.push({
        field: 'pada',
        message: 'Pada must be between 1 and 4',
        code: 'INVALID_PADA'
      });
    }

    // Validate aspects
    if (Array.isArray(planet.aspects)) {
      planet.aspects.forEach((aspect, index) => {
        this.validateAspect(aspect, index, errors, warnings);
      });
    }
  }

  private static validateAspect(
    aspect: LagnaChart['planets'][0]['aspects'][0],
    index: number,
    errors: ValidationError[],
    warnings: ValidationWarning[]
  ): void {
    if (!this.isValidPlanet(aspect.planet)) {
      errors.push({
        field: `aspects[${index}].planet`,
        message: 'Invalid planet in aspect',
        code: 'INVALID_ASPECT_PLANET'
      });
    }

    if (!this.isValidAspectType(aspect.aspect)) {
      errors.push({
        field: `aspects[${index}].aspect`,
        message: 'Invalid aspect type',
        code: 'INVALID_ASPECT_TYPE'
      });
    }

    if (typeof aspect.angle !== 'number' || aspect.angle < 0 || aspect.angle > 360) {
      errors.push({
        field: `aspects[${index}].angle`,
        message: 'Angle must be between 0 and 360 degrees',
        code: 'INVALID_ASPECT_ANGLE'
      });
    }

    if (typeof aspect.strength !== 'number' || aspect.strength < 0 || aspect.strength > 1) {
      errors.push({
        field: `aspects[${index}].strength`,
        message: 'Strength must be between 0 and 1',
        code: 'INVALID_ASPECT_STRENGTH'
      });
    }
  }

  private static isValidZodiacSign(sign: string): boolean {
    const validSigns = [
      'Aries', 'Taurus', 'Gemini', 'Cancer', 
      'Leo', 'Virgo', 'Libra', 'Scorpio', 
      'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
    ];
    return validSigns.includes(sign);
  }

  private static isValidNakshatra(nakshatra: string): boolean {
    const validNakshatras = [
      'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
      'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
      'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
      'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
      'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
    ];
    return validNakshatras.includes(nakshatra);
  }

  private static isValidPlanet(planet: string): boolean {
    const validPlanets = [
      'Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter',
      'Venus', 'Saturn', 'Rahu', 'Ketu'
    ];
    return validPlanets.includes(planet);
  }

  private static isValidAspectType(aspect: string): boolean {
    const validAspects = [
      'Conjunction', 'Sextile', 'Square',
      'Trine', 'Opposition'
    ];
    return validAspects.includes(aspect);
  }

  // Add other validation methods for remaining data types
  private static validatePlanetaryAnalysis(data: any, errors: ValidationError[], warnings: ValidationWarning[]): void {
    // Implement planetary analysis validation
  }

  private static validateHouseAnalysis(data: any, errors: ValidationError[], warnings: ValidationWarning[]): void {
    // Implement house analysis validation
  }

  private static validatePlanetaryHarmonies(data: any, errors: ValidationError[], warnings: ValidationWarning[]): void {
    // Implement planetary harmonies validation
  }

  private static validateRelationshipAnalysis(data: any, errors: ValidationError[], warnings: ValidationWarning[]): void {
    // Implement relationship analysis validation
  }

  private static validateDashaTimeline(data: any, errors: ValidationError[], warnings: ValidationWarning[]): void {
    // Implement dasha timeline validation
  }

  private static validateMuhurtaTimings(data: any, errors: ValidationError[], warnings: ValidationWarning[]): void {
    // Implement muhurta timings validation
  }
} 