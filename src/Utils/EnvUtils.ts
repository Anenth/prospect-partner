export enum ENV {
  MODE = 'MODE',
  BASE_URL = 'BASE_URL',
  PROD= 'PROD',
  DEV= 'DEV',
  APP_VERSION= 'VITE_APP_VERSION',
  API_BASE_URL = 'VITE_API_BASE_URL',
  DB_PASSWORD='VITE_DB_PASSWORD',
  SUPABASE_URL = 'VITE_SUPABASE_URL',
  SUPABASE_KEY = 'VITE_SUPABASE_KEY',
}

type Env = {
  [ENV.APP_VERSION]: string;
  [ENV.API_BASE_URL]: string;
  [ENV.MODE]: 'development' | 'production';
  [ENV.BASE_URL]: string;
  [ENV.PROD]: boolean;
  [ENV.DEV]: boolean;
  [ENV.DB_PASSWORD]: string;
  [ENV.SUPABASE_URL]: string;
  [ENV.SUPABASE_KEY]: string;
}

export function getEnvVariable(key: ENV): string | undefined {
  return import.meta.env[key];
}

export function isProd(): boolean {
  return getEnvVariable(ENV.MODE) === 'production';
}

export function baseURL(): string {
  return getEnvVariable(ENV.API_BASE_URL) || 'localhost:3000';
}

export function appVersion(): string {
  return getEnvVariable(ENV.APP_VERSION) ||'x.x.x';
}
export function getSupabaseCred(): {
  url: string;
  key: string;
} {
  return {
    url: getEnvVariable(ENV.SUPABASE_URL) || '',
    key: getEnvVariable(ENV.SUPABASE_KEY) || '',
  }
}
