import { GETIR_DOMAIN_TYPE_CODES } from '@shared/shared/constants';

export const PALETTE_TYPES = [
  {
    value: 'diverging',
    label: 'Diverging',

  },
  {
    value: 'sequential',
    label: 'Sequential',
  },
];

export const CLASS_TYPES = [
  {
    value: 'neutral',
    label: 'Neutral Breaks',

  },
  {
    value: 'equalInterval',
    label: 'Equal Interval',
  },
];

export const CUSTOM_STYLE_SPEC = {
  type: 'fill',
  paint: {
    'fill-color': ['get', 'color'],
    'fill-opacity': 0.8,
  },
};

export const DEFAULT_MAP_OPTIONS = {
  CENTER: [41, 29],
  ZOOM_LEVEL: 12,
};

export const GETIR_DOMAIN_TYPES = [...GETIR_DOMAIN_TYPE_CODES];
