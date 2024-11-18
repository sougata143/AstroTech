import { ConfigPlugin, withInfoPlist, withAndroidManifest } from '@expo/config-plugins';

const withCustomConfig: ConfigPlugin = (config) => {
  // Modify iOS config
  config = withInfoPlist(config, (config) => {
    config.modResults.UIRequiredDeviceCapabilities = [
      'armv7'
    ];
    config.modResults.UIStatusBarStyle = 'UIStatusBarStyleDarkContent';
    return config;
  });

  // Modify Android config
  config = withAndroidManifest(config, (config) => {
    const mainApplication = config.modResults.manifest.application[0];
    mainApplication.$['android:allowBackup'] = 'true';
    mainApplication.$['android:largeHeap'] = 'true';
    mainApplication.$['android:usesCleartextTraffic'] = 'true';
    return config;
  });

  return config;
};

export default withCustomConfig; 