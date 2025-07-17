import { getLangKey } from '@shared/i18n';

const createSelectOption = (items, valueKey, labelKey, isNumber = false) => {
  return (
    items &&
    items.map(item => ({
      value: isNumber ? Number(item[valueKey]) : String(item[valueKey]),
      label: item[labelKey][getLangKey()] || item[labelKey],
    }))
  );
};

export default createSelectOption;
