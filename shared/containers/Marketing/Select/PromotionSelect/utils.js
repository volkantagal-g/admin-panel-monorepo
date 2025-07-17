import { promoStatusOptions } from '@shared/containers/Marketing/Select/PromotionSelect/constantValues';
import { PROMO_STATUS, PROMO_TYPE } from '@shared/containers/Marketing/Select/PromotionSelect/constants';
import { LOCAL_PROMO_SEARCH_FIELDS } from '@app/pages/Popup/constants';

export const filterMarketPromoData = promoList => {
  return promoList.filter(promo => promo.status === PROMO_STATUS.ACTIVE).map(values => {
    return {
      value: values?._id,
      label: values?.promoCode,
    };
  });
};

export const filterLocalsPromoData = promoList => {
  return promoList?.data?.content?.filter(values => values.status === PROMO_STATUS.ACTIVE).map(values => {
    return {
      value: values?.id,
      label: values?.promoCode,
    };
  });
};

export const filterFoodPromoData = promoList => {
  return promoList?.result?.data?.filter(item => item.status === promoStatusOptions[PROMO_STATUS.ACTIVE].en).map(values => {
    return {
      value: values?.id,
      label: values?.metadata?.code,
    };
  });
};

export const getPromoQueryParamsForTargetDomain = (promoType, searchString) => {
  if (PROMO_TYPE.FOOD_PROMO === promoType) {
    return {
      search: searchString,
      'sort.field': 'validityPeriod.validFrom',
      'sort.type': '1',
      limit: 10,
      page: '1',
    };
  }

  if (PROMO_TYPE.LOCALS_PROMO === promoType) {
    return {
      promoCode: searchString,
      status: LOCAL_PROMO_SEARCH_FIELDS.status,
      page: 0,
      size: 1,
    };
  }
  return {};
};
