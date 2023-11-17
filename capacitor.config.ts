import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'recipe.app',
  appName: 'recipe-app',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
