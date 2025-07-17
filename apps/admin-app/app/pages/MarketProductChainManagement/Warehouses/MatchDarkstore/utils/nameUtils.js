import { getLangKey } from '@shared/i18n';

export const getName = item => {
  if (!item) return '';

  const lang = getLangKey(item, 'name');
  if (lang) {
    const nameKey = `name${lang.toUpperCase()}`;
    return item[nameKey] || '';
  }

  return item?.nameTR || item?.nameEN || '';
};
