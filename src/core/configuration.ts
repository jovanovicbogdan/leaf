import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import YAML from 'yaml';


// Feature flag types
interface FeatureFlags {
  FEATURE_FLAGS: {
    [key: string]: string;
  };
}

// CLI: npx cross-env ENV=staging
const envFile = path.join('src', 'env', `../env/.env.${process.env.ENV || 'staging'}`);
dotenv.config({ path: envFile });

// Utility function to get BASE_URL
export function getBaseUrl(): string {
  if (!process.env.BASE_URL) {
    throw new Error(
      `BASE_URL is not defined in the environment file: ${envFile}`,
    );
  }
  return process.env.BASE_URL;
}

// Utility function to get BASE_API_URL
export function getBaseApiUrl(): string {
  if (!process.env.BASE_API_URL) {
    throw new Error(
      `BASE_API_URL is not defined in the environment file: ${envFile}`,
    );
  }
  return process.env.BASE_API_URL;
}

// Read and parse feature flags from YAML file
const featureFlagsFile = fs.readFileSync(
  path.join('src', 'config', 'feature-flags.yml'),
  'utf8',
);

const featureFlags = YAML.parse(featureFlagsFile) as FeatureFlags;

export function getFeatureFlags(): FeatureFlags {
  return featureFlags;
}

// Only log in the main process (not in worker processes)
if (!process.env.TEST_WORKER_INDEX) {
  console.log(`Loaded environment file: ${envFile}`);
  console.log(`BASE_URL: ${process.env.BASE_URL}`);
  console.log(`BASE_API_URL: ${process.env.BASE_API_URL}`);
  console.log(`Feature Flags: ${JSON.stringify(featureFlags.FEATURE_FLAGS, null, 2)}`);
}