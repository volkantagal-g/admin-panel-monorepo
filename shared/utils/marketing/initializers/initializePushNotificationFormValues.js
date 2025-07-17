import moment from 'moment';

import { getDefaultCountry, getDefaultPhoneLanguages } from './sharedInitializers';
import { NOTIFICATION_SEND_TYPE } from '@app/pages/PushNotification/constants';
import { DRAFT_TYPES } from '@shared/components/Marketing/DraftImporter/constant';

export const initializePushNotificationFormValues = () => {
  return {
    targetCountry: getDefaultCountry(),
    validDates: [moment().subtract(15, 'minutes'), moment().endOf('day')],
    phoneLanguages: getDefaultPhoneLanguages(),
    sendingType: NOTIFICATION_SEND_TYPE.ONE_SHOT,
    daysOfWeek: [],
    controls: { type: [] },
  };
};

export const initializePushNotificationDetailFormValues = values => {
  // Transform backend contents array to FE object structure
  const { contents: rawContents = [] } = values;
  const { phoneLanguages, contents } = rawContents.reduce(
    (acc, { imageUrl, message, phoneLanguage, title, imageName }) => {
      acc.phoneLanguages.push(phoneLanguage);
      acc.contents[phoneLanguage] = { title, message, imageUrl, imageName };
      return acc;
    },
    { phoneLanguages: [], contents: {} },
  );

  // Handle template and excludedTemplate
  const buildTemplate = template => {
    if (!template) return { type: null };
    const base = { type: template.type };
    if (template.type === DRAFT_TYPES.CSV) {
      return {
        ...base,
        csv: {
          csvName: template.csvName ?? '',
          originalFileName: template.originalFileName ?? '',
        },
      };
    }
    if (template.type === DRAFT_TYPES.DRAFT) {
      return {
        ...base,
        draft: {
          id: template.draftId ?? '',
          query: template.draftQuery ?? [],
        },
      };
    }
    return base;
  };

  // Build daysOfWeek if present
  const daysOfWeek = Array.isArray(values.daysOfWeek)
    ? values.daysOfWeek.map(day => [0, day - 1])
    : [];

  return {
    ...values,
    phoneLanguages,
    contents,
    template: buildTemplate(values.template),
    excludedTemplate: buildTemplate(values.excludedTemplate),
    notificationCategory: values.notificationCategory ?? null,
    validDates: [moment(values.startDate), moment(values.dueDate)],
    ...(daysOfWeek.length > 0 && { daysOfWeek }),
  };
};
