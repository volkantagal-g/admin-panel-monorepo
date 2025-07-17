import { getLangKey } from '@shared/i18n';

export function getTranslatedText(t, item) {
  if (!item) {
    return '';
  }
  const hasInbuiltTranslation = typeof item === 'object' && Object.keys(item).includes('en');
  return hasInbuiltTranslation ? item[getLangKey()] : t(item);
}
