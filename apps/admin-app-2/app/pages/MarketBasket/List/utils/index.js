import { getLangKey } from '@shared/i18n';

export const getSelectOptionsFromEntries = obj => Object.entries(obj).map(
  ([key, value]) => {
    return {
      value: key,
      label: value[getLangKey()],
    };
  },
);
