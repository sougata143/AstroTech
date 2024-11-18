import { Image } from 'react-native';

const assetMap = new Map<string, number>();

export function registerAsset(localPath: string, moduleId: number) {
  assetMap.set(localPath, moduleId);
}

export function getAssetByPath(localPath: string) {
  return assetMap.get(localPath);
}

// Pre-register navigation assets
registerAsset(
  '@react-navigation/elements/src/assets/back-icon.png',
  require('@react-navigation/elements/src/assets/back-icon.png')
);

export default {
  registerAsset,
  getAssetByPath
}; 