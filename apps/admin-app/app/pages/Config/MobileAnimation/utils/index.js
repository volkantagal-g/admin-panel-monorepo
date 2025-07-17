import { createMap } from '@shared/utils/common';

export const CONFIGS = {
  MOBILE_ANIMATION_SPLASH: 'co:general:mobile:INIT_ANIMATION_SPLASH',
  MOBILE_ANIMATION_GENERAL: 'co:general:mobile:INIT_ANIMATION_GENERAL',
  MOBILE_ANIMATION_ONBOARDING: 'co:general:mobile:INIT_ANIMATION_ONBOARDING',
};

export const MARKET_CONFIG_QUERY_TYPES = {
  ARRAY: 'Array',
  BOOLEAN: 'Boolean',
  NUMBER: 'Number',
  OBJECT: 'Object',
  STRING: 'String',
};

export const CONFIG_NAME = {
  MOBILE_ANIMATION_SPLASH: { en: 'Splash', tr: 'Splash' },
  MOBILE_ANIMATION_GENERAL: { en: 'General', tr: 'General' },
  MOBILE_ANIMATION_ONBOARDING: { en: 'Onboarding', tr: 'Onboarding' },
};

export const CONFIG_KEY_NAME = {
  General: 'GENERAL',
  Splash: 'SPLASH',
  Onboarding: 'ONBOARDING',
};

export const UPDATE_SIGNED_URL_PARAMS = {
  bucket: 'getir',
  folder: 'mobile-animations',
};

export const getConfigValue = value => {
  return createMap(value, { field: 'lang' });
};
