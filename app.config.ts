import 'dotenv/config';

export default {
  expo: {
    name: 'Arbor Impact',
    slug: 'arbor-impact',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      bundleIdentifier: 'io.arbor.client',
      supportsTablet: true,
    },
    android: {
      package: 'io.arbor.client',
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
    },
    web: {
      favicon: './assets/favicon.png',
    },
    plugins: [
      [
        'expo-image-picker',
        {
          photosPermission: 'The app accesses your photos to let you share them with your friends.',
        },
      ],
    ],
    extra: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
      eas: {
        projectId: '04c00a47-97b7-400b-9b24-a8a80cb66d29',
      },
    },
  },
  updates: {
    url: 'https://u.expo.dev/04c00a47-97b7-400b-9b24-a8a80cb66d29',
  },
  runtimeVersion: '1.0.0',
};
