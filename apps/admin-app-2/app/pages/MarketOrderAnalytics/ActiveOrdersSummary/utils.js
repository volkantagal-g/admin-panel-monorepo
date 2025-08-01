import isEmpty from 'lodash/isEmpty';

import { getLangKey } from '@shared/i18n';
import { promoObjectiveTypes } from '@shared/shared/constantValues';
import { INTEGRATION_TYPE_TO_ACCESS_KEY, REST_OF_GETIR_ACCESS_KEY } from './constants';
import { lowerCaseN11 } from '../integrationTypeUtils';

export const getFormattedPromoStats = curPromoData => {
  if (isEmpty(curPromoData)) return [];
  const formattedPromos = curPromoData.map(promoData => {
    const formattedPromo = {};
    formattedPromo.promo = {
      code: promoData.promo.promoCode,
      bgColor: promoData.promo.bgColor || '#4CAF50',
      textColor: promoData.promo.textColor || '#FFFFFF',
    };
    const type = promoData.promo?.promoClassification?.objective;
    // can be organic, which doesn't have type
    formattedPromo.type = type ? promoObjectiveTypes?.[type]?.[getLangKey()] : '-';
    formattedPromo.warehouseCount = promoData.warehouses?.length || 0;
    formattedPromo.totalDiscount = promoData.totalDiscountAmount || 0;
    formattedPromo.avgDiscount = promoData.avgDiscountAmount || 0;

    formattedPromo.avgBasket = promoData.avgBasketAmount || 0;
    formattedPromo.orderCount = promoData.useCount || 0;
    formattedPromo._id = promoData.promo._id;

    return formattedPromo;
  });

  return formattedPromos;
};

export function getFilteredAndExcludedIntegrationTypes({
  canAccess,
  permittedIntegrationTypes,
  selectedIntegrationTypes = null,
}) {
  // if there is only one integration type selectable and the user only has access to that integration type, and nothing else
  // then it is forced
  if (permittedIntegrationTypes.length === 1 &&
    canAccess(INTEGRATION_TYPE_TO_ACCESS_KEY[permittedIntegrationTypes[0]]) &&
    !canAccess(REST_OF_GETIR_ACCESS_KEY)) {
    return {
      filtered: permittedIntegrationTypes,
      excluded: null,
      isForced: true,
    };
  }

  if (!canAccess(INTEGRATION_TYPE_TO_ACCESS_KEY[lowerCaseN11])) {
    return {
      filtered: selectedIntegrationTypes,
      excluded: [lowerCaseN11],
      isForced: false,
    };
  }

  return {
    filtered: selectedIntegrationTypes,
    excluded: null,
    isForced: false,
  };
}
