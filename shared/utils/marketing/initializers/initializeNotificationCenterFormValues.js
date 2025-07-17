import {
  formatDate,
  getDefaultContentLanguages,
  getDefaultCountry,
  getDefaultDeviceTypes,
  getDefaultPhoneLanguages,
  getDefaultValidDates,
} from './sharedInitializers';
import { DRAFT_TYPES } from '@shared/components/Marketing/DraftImporter/constant';
import { normalizeHtmlContentForWYSIWYG } from '@app/pages/NotificationCenter/utils';

export const initializeNotificationCenterFormValues = () => {
  return {
    country: getDefaultCountry(),
    validDates: getDefaultValidDates(15, false),
    phoneLanguages: getDefaultPhoneLanguages(),
    deviceTypes: getDefaultDeviceTypes(),
    contents: getDefaultContentLanguages(),
    clientImportTemplate: { type: DRAFT_TYPES.CSV },
  };
};

export const initializeNotificationCenterDetailFormValues = values => {
  const validFrom = formatDate(values.validFrom);
  const validUntil = formatDate(values.validUntil);

  const languages = values?.contents?.languages ?? [];
  const originalDetails = values?.contents?.details ?? {};

  // Build new details object with normalized HTML
  const details = languages.reduce((acc, language) => {
    acc[language] = {
      ...originalDetails[language],
      contentHtml: normalizeHtmlContentForWYSIWYG(originalDetails[language]?.contentHtml),
    };
    return acc;
  }, {});

  return {
    ...values,
    dateRange: [validFrom, validUntil],
    contents: {
      ...values.contents,
      details,
    },
  };
};
