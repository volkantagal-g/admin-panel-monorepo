import { t } from '@shared/i18n';

export const REASON_AREA_MAX_CHAR_LIMIT = 100;

export const getDatePickerHelpMessage = (isPaused: boolean, pausedUntil: string) => {
  if (!isPaused) return t('shopPaybackStatus:ACTIVE_HELP_MESSAGE');
  if (pausedUntil) return t('shopPaybackStatus:PAUSED_HELP_MESSAGE');
  return t('shopPaybackStatus:INDEFINITELY_PAUSED_HELP_MESSAGE');
};

export const REQUEST_TYPE = {
  SINGLE_SHOP: 0,
  ALL_SHOPS: 1,
  EXPORT_SHOPS: 2,
} as const;

export const REQUEST_TYPE_OPTIONS = {
  [REQUEST_TYPE.SINGLE_SHOP]: { tr: 'Tekil İşletme', en: 'Single Shop' },
  [REQUEST_TYPE.ALL_SHOPS]: { tr: 'Tüm İşletmeler', en: 'All Shops' },
  [REQUEST_TYPE.EXPORT_SHOPS]: { tr: 'İşletmeleri Aktar', en: 'Export Shops' },
};

export const ACTION_TYPES = {
  PAUSE: 1,
  RESUME: 2,
} as const;

export const ACTION_TYPE_OPTIONS = {
  [ACTION_TYPES.PAUSE]: { tr: 'Durdur', en: 'Pause' },
  [ACTION_TYPES.RESUME]: { tr: 'Devam Ettir', en: 'Resume' },
};

export const MARKETPLACE_API_DATE_FORMAT = 'YYYY-MM-DD';
export const EXCEL_TEMPLATE_URL = 'https://cdn.getiryemek.com/misc/marketplace_carsi_odeme_durumu.xlsx';
