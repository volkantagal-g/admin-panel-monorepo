import { useMemo } from 'react';

import { DAILY_SUMMARY_SORT_TYPE } from '../constants';

export function useSortOptions({ t, sortTypeConfig = DAILY_SUMMARY_SORT_TYPE }) {
  const sortTypeOptions = useMemo(() => {
    const sortTypeValues = Object.values(sortTypeConfig);
    return sortTypeValues.map(value => {
      const labelTranslationKey = `DAILY_SUMMARY_${value}`;
      const label = t(labelTranslationKey);
      return {
        label,
        value,
      };
    });
  }, [t, sortTypeConfig]);
  return sortTypeOptions;
}
