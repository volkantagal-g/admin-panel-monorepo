import { createContentHTML } from '@app/pages/NotificationCenter/utils';
import { NOTIFICATION_CENTER_STATUS } from '@app/pages/NotificationCenter/constants';
import { PAGE_TYPES } from '@shared/constants/marketing/pageTypes';

export const NormalizeNotificationCenterFormValues = (values, type) => {
  const [validFrom, validUntil] = values.dateRange;

  let tempValues = {
    ...values,
    validFrom: validFrom.toISOString(),
    validUntil: validUntil.toISOString(),
  };

  tempValues?.contents?.languages?.forEach(language => {
    tempValues = {
      ...tempValues,
      contents: {
        ...tempValues.contents,
        details: {
          ...tempValues.contents.details,
          [language]: {
            ...tempValues.contents.details[language],
            contentHtml: createContentHTML(values.contents.details[language].contentHtml),
          },
        },
      },
    };
  });

  delete tempValues.dateRange;
  if (type === PAGE_TYPES.NOTIFICATION_NEW) {
    tempValues.status = NOTIFICATION_CENTER_STATUS.INACTIVE;
  }

  return tempValues;
};
