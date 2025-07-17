import { createPromoContentHTML } from '@app/pages/Announcement/utils';
import { ANNOUNCEMENT_STATUS, ANNOUNCEMENT_TYPE, PROMO_TARGET } from '@app/pages/Announcement/constants';
import { GETIR_LOCALS_DOMAIN_TYPE } from '@shared/shared/constants';
import { PAGE_TYPES } from '@shared/constants/marketing/pageTypes';
import { CLIENT_APP_ACTION_TYPE } from '@shared/containers/Marketing/ClientAppActions/constants';

export const NormalizeAnnouncementFormValues = (values, type) => {
  const [validFrom, validUntil] = values?.dateRange || [];

  const accessibilityLabel = {};
  const promoContentHTML = values?.promo?.promoContentHTML || {};
  const promoBodyContentHTML = {};

  values?.phoneLanguages?.forEach(lang => {
    accessibilityLabel[lang] = values?.accessibilityLabel;
    if (values.promo?.promoContentHTML?.[lang]) {
      promoBodyContentHTML[lang] = values.promo.promoContentHTML[lang];
      promoContentHTML[lang] = createPromoContentHTML(values.promo.promoContentHTML[lang]);
    }
  });

  const tempValues = {
    ...values,
    type: ANNOUNCEMENT_TYPE.PROMO_PAGE,
    promo: {
      ...values.promo,
      promoBodyContentHTML,
      promoContentHTML,
    },
    validFrom: validFrom.toISOString(),
    validUntil: validUntil.toISOString(),
    promoTarget: values.domainType === GETIR_LOCALS_DOMAIN_TYPE ? PROMO_TARGET.LOCALS : PROMO_TARGET.DEFAULT,
    title: values.promo.titleV2,
    picURL: values.promo.picURL,
    description: values.promo.descriptionV2,
    domainTypes: [values.domainType],
    accessibilityLabel,
  };

  // If there is an action and if the action type is REDIRECT_TO_GETIRFINANCE_BNPL_COMMUNICATION_SDK then add the componentType into action data.
  if (values?.promo?.button?.action && values?.promo?.button?.action?.type === CLIENT_APP_ACTION_TYPE.REDIRECT_TO_GETIRFINANCE_BNPL_COMMUNICATION_SDK) {
    tempValues.promo.button.action = {
      ...tempValues.promo.button.action,
      data: {
        ...tempValues.promo.button.action.data,
        componentType: 'announcement',
      },
      ownerService: values.domainType,
    };
  }

  delete tempValues.domainType;
  delete tempValues.dateRange;

  if (type === PAGE_TYPES.ANNOUNCEMENT_NEW) {
    tempValues.status = ANNOUNCEMENT_STATUS.INACTIVE;
  }

  return tempValues;
};
