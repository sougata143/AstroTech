import { ConfigPlugin, withAppBuildGradle, withInfoPlist, withXcodeProject } from '@expo/config-plugins';

const withCustomNativeModules: ConfigPlugin = (config) => {
  // iOS Configuration
  config = withInfoPlist(config, (config) => {
    config.modResults.NSLocationWhenInUseUsageDescription = 
      'AstroTech needs your location to calculate accurate astrological positions.';
    config.modResults.NSLocationAlwaysUsageDescription = 
      'AstroTech needs your location to calculate accurate astrological positions.';
    config.modResults.NSCalendarsUsageDescription = 
      'AstroTech needs calendar access to set reminders for astrological events.';
    config.modResults.NSPhotoLibraryUsageDescription = 
      'AstroTech needs photo access to save charts and diagrams.';
    return config;
  });

  // iOS Project Configuration
  config = withXcodeProject(config, async (config) => {
    const xcodeProject = config.modResults;
    
    // Add frameworks
    xcodeProject.addFramework('CoreLocation.framework', { weak: true });
    xcodeProject.addFramework('EventKit.framework', { weak: true });
    xcodeProject.addFramework('Photos.framework', { weak: true });

    return config;
  });

  // Android Configuration
  config = withAppBuildGradle(config, (config) => {
    config.modResults.contents = config.modResults.contents.replace(
      /apply plugin: "com.android.application"/g,
      `apply plugin: "com.android.application"

def enableProguardInReleaseBuilds = true
def enableSeparateBuildPerCPUArchitecture = true`
    );

    return config;
  });

  return config;
};

export default withCustomNativeModules; 