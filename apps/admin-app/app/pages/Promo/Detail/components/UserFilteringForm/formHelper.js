import * as Yup from 'yup';

export const validationSchema = () => {
  return Yup.object().shape({
    useLimit: Yup.number().required(),
    useLimitPerDay: Yup.number().required(),
    minSucOrderCount: Yup.number().required(),
    maxSucOrderCount: Yup.number().required(),
    minSucFoodOrderCount: Yup.number().required(),
    maxSucFoodOrderCount: Yup.number().required(),
    minSucMarketOrderCount: Yup.number().required(),
    maxSucMarketOrderCount: Yup.number().required(),
    minSucWaterOrderCount: Yup.number().required(),
    maxSucWaterOrderCount: Yup.number().required(),
    minSucKuzeydenOrderCount: Yup.number().required(),
    maxSucKuzeydenOrderCount: Yup.number().required(),
    minSucGorillasOrderCount: Yup.number().required(),
    maxSucGorillasOrderCount: Yup.number().required(),
    reqDaysAfterLastOrder: Yup.number().required(),
    reqDaysAfterLastFoodOrder: Yup.number().required(),
    orderLimitCount: Yup.number().required(),
  });
};

export const getOnlyModifiedValuesBeforeSubmit = ({ values }) => {
  return { ...values };
};

export const getInitialValues = promo => {
  const initialValues = {
    useLimit: promo.useLimit ?? 1,
    useLimitPerDay: promo.useLimitPerDay || 0,
    minSucOrderCount: promo.minSucOrderCount || 0,
    maxSucOrderCount: promo.maxSucOrderCount ?? -1,
    minSucFoodOrderCount: promo.minSucFoodOrderCount || 0,
    maxSucFoodOrderCount: promo.maxSucFoodOrderCount ?? -1,
    minSucMarketOrderCount: promo.minSucMarketOrderCount || 0,
    maxSucMarketOrderCount: promo.maxSucMarketOrderCount ?? -1,
    minSucWaterOrderCount: promo.minSucWaterOrderCount || 0,
    maxSucWaterOrderCount: promo.maxSucWaterOrderCount ?? -1,
    minSucKuzeydenOrderCount: promo.minSucKuzeydenOrderCount || 0,
    maxSucKuzeydenOrderCount: promo.maxSucKuzeydenOrderCount || 0,
    minSucGorillasOrderCount: promo.minSucGorillasOrderCount || 0,
    maxSucGorillasOrderCount: promo.maxSucGorillasOrderCount || 0,
    reqDaysAfterLastOrder: promo.reqDaysAfterLastOrder || 0,
    reqDaysAfterLastFoodOrder: promo.reqDaysAfterLastFoodOrder || 0,
    orderLimitCount: promo.orderLimitCount || 0,
    isPublic: promo.isPublic || false,
    isOnlyPremiumDeviceModels: promo.isOnlyPremiumDeviceModels || false,
    isHealthCareProfessionalsPromo: promo.isHealthCareProfessionalsPromo || false,
    isLocalCountryPhoneCodeRequired: promo.isLocalCountryPhoneCodeRequired || false,
  };
  return initialValues;
};
