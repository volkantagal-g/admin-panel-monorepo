import { generateComponentId } from '@shared/utils/generateComponentId';

export const RECIPE_STATUSES = {
  INACTIVE: 0,
  ACTIVE: 1,
};

export const RECIPE_STATUSES_LABELS = {
  0: { tr: 'Pasif', en: 'Inactive' },
  1: { tr: 'Aktif', en: 'Active' },
};

export const DOMAIN_TYPES = {
  GETIR10: 1,
  MARKET: 3,
};

export const DOMAIN_TYPES_LABELS = {
  1: { tr: 'Getir10', en: 'Getir10' },
  3: { tr: 'GetirBüyük', en: 'GetirMore' },
};

export const RECIPES_COMPONENT_IDS = {
  RECIPE_INFO: generateComponentId(['recipeInfo']),
  TAGS: generateComponentId(['tags']),
  PRODUCTS: generateComponentId(['products']),
  INGREDIENTS: generateComponentId(['ingredients']),
  PREPARATION: generateComponentId(['preparation']),
  SEGMENTS: generateComponentId(['segments']),
};

export const TAG_TYPES = {
  SERVING: 'serving',
  DURATION: 'duration',
  FREETEXT: 'freetext',
};

export const domainTypes = {
  1: { en: 'Getir10', tr: 'Getir10' },
  3: { en: 'GetirMore', tr: 'GetirBüyük' },
};
