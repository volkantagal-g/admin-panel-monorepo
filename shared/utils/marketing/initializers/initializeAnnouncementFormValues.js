import { formatDate, getDefaultCountry, getDefaultDeviceTypes, getDefaultPhoneLanguages, getDefaultValidDates } from './sharedInitializers';
import { normalizeHtmlContentForWYSIWYG } from '@app/pages/Announcement/utils';

export const initializeAnnouncementFormValues = () => {
  return {
    country: getDefaultCountry(),
    validDates: getDefaultValidDates(15, false),
    phoneLanguages: getDefaultPhoneLanguages(),
    deviceTypes: getDefaultDeviceTypes(),
  };
};

export const initializeAnnouncementDetailFormValues = values => {
  const validFrom = formatDate(values.validFrom);
  const validUntil = formatDate(values.validUntil);
  const dateRange = [validFrom, validUntil];

  const phoneLanguages = values.phoneLanguages || [];
  const originalPromoContentHTML = values.promo?.promoContentHTML || {};
  const normalizedPromoContentHTML = {};

  phoneLanguages.forEach(lang => {
    if (originalPromoContentHTML[lang]) {
      normalizedPromoContentHTML[lang] = normalizeHtmlContentForWYSIWYG(originalPromoContentHTML[lang]);
    }
  });

  const validRanges = values?.validRanges?.map(range => ({
    start: formatDate(range.start),
    end: formatDate(range.end),
  }));

  const tempValues = {
    dateRange,
    contents: values.contents || {},
    domainType: values.domainTypes?.[0],
    accessibilityLabel: values?.accessibilityLabel?.[values.phoneLanguages?.[0]],
    validRanges,
    promo: {
      ...values.promo,
      promoContentHTML: normalizedPromoContentHTML,
    },
  };

  return {
    ...values,
    ...tempValues,
  };
};
