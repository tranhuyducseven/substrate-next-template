/**
 * This file will export all env with typing for app to use
 * Flow: Add into .env => bind into next.config => export in env.ts
 */

import getConfig from "next/config";

interface IRuntimeConfig {
  IS_DEV: boolean;
  TEAM_NAME: string;
  APP_NAME: string;
  PROVIDER_SOCKET: string;
}

const { publicRuntimeConfig } = getConfig();

/**
 * True if running in production
 */
export const {
  IS_DEV = false,
  TEAM_NAME,
  APP_NAME,
  PROVIDER_SOCKET,
} = publicRuntimeConfig as IRuntimeConfig;
