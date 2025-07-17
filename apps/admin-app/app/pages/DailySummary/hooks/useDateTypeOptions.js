import { Tooltip } from 'antd';
import { useMemo } from 'react';

import { DAILY_SUMMARY_DATE_TYPE } from '../constants';

export function useDateTypeOptions({ t, dateTypeConfig = DAILY_SUMMARY_DATE_TYPE }) {
  const dateTypeOptions = useMemo(() => {
    const dateTypeValues = Object.values(dateTypeConfig);
    return dateTypeValues.map(value => {
      const tooltipTranslationKey = `DAILY_SUMMARY_${value}`;
      const labelTranslationKey = `DAILY_SUMMARY_${value}_SHORT`;
      const label = (
        <Tooltip title={t(tooltipTranslationKey)} placement="top" autoAdjustOverflow={false}>
          <b>{t(labelTranslationKey)}</b>
        </Tooltip>
      );
      return {
        label,
        value,
      };
    });
  }, [t, dateTypeConfig]);

  return dateTypeOptions;
}
