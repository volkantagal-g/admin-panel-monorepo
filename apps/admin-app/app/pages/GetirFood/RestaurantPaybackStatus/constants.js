import { t } from '@shared/i18n';

export const REASON_AREA_MAX_CHAR_LIMIT = 100;

export const getDatePickerHelpMessage = (isPaused, pausedUntil) => {
  if (!isPaused) return t('foodRestaurantPaybackStatus:ACTIVE_HELP_MESSAGE');
  if (pausedUntil) return t('foodRestaurantPaybackStatus:PAUSED_HELP_MESSAGE');
  return t('foodRestaurantPaybackStatus:INDEFINITELY_PAUSED_HELP_MESSAGE');
};

export const ACTION_TYPES = {
  PAUSE: 1,
  RESUME: 2,
};

export const ACTION_TYPE_VALUES = {
  [ACTION_TYPES.PAUSE]: { tr: 'Durdur', en: 'Pause' },
  [ACTION_TYPES.RESUME]: { tr: 'Devam Ettir', en: 'Resume' },
};
