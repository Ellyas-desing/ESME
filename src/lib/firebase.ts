import { FirebaseOptions, getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

function getFirebaseConfig(): FirebaseOptions {
  const config = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  };
  const missingValues = Object.entries(config)
    .filter(([, value]) => !value)
    .map(([name]) => name);

  if (missingValues.length > 0) {
    throw new Error(`Configure no .env.local: ${missingValues.join(', ')}.`);
  }

  return config;
}

export function getFirebaseAuth() {
  const app = getApps().length > 0 ? getApp() : initializeApp(getFirebaseConfig());
  return getAuth(app);
}
