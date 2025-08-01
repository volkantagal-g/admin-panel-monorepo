import moment from 'moment';

import * as Yup from 'yup';

import { SELLING_PRICE_TYPES } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/constants';
import { MARKET_PRODUCT_SUPPORT_TYPE, STRUCK_PRICE_SUPPORTER_TYPE } from '@shared/shared/constants';
import { UPDATE_REQUEST_TYPES } from '@app/pages/MarketProduct/Pricing/constants';
import { getDiffObj, setNullToEmptyStringDeep } from '@shared/utils/common';

export const getInitialValues = data => {
  const initialValue = { isDiscounted: !!data?.financials, pricingType: data?.priceTypeId };

  if (data?.financials?.isFreeProduct === false) {
    initialValue.discountedProvider = STRUCK_PRICE_SUPPORTER_TYPE.GETIR_FINANCED;
  }
  if (data?.financials?.supplierSupportRate && data?.financials?.supplierSupportRate !== 0) {
    initialValue.discountedProvider = STRUCK_PRICE_SUPPORTER_TYPE.SUPPLIER.toString();
    initialValue.supportRate = data?.financials?.supplierSupportRate;
  }
  if (data?.financials?.thirdPartySupportRate && data?.financials?.thirdPartySupportRate !== 0) {
    initialValue.discountedProvider = STRUCK_PRICE_SUPPORTER_TYPE.THIRD_PARTY.toString();
    initialValue.supportRate = data?.financials?.thirdPartySupportRate;
  }
  if (data?.financials?.supplierSupportAmount && data?.financials?.supplierSupportAmount !== 0) {
    initialValue.discountedProvider = STRUCK_PRICE_SUPPORTER_TYPE.SUPPLIER.toString();
    initialValue.supportAmount = data?.financials?.supplierSupportAmount;
  }
  if (data?.financials?.thirdPartySupportAmount && data?.financials?.thirdPartySupportAmount !== 0) {
    initialValue.discountedProvider = STRUCK_PRICE_SUPPORTER_TYPE.THIRD_PARTY.toString();
    initialValue.supportAmount = data?.financials?.thirdPartySupportAmount;
  }
  if (data?.financials?.isFreeProduct) {
    initialValue.discountedProvider = STRUCK_PRICE_SUPPORTER_TYPE.FREE;
  }

  if (data?.financials) {
    initialValue.specialOffers = data?.financials?.isShownUnderSpecialOffers;
    initialValue.isAmount = data?.financials?.isAmount;
  }

  if (data?.priceTypeId === SELLING_PRICE_TYPES.DOMAIN) {
    initialValue.domainPrice = data?.price;
    initialValue.domainType = data?.domainType?.toString();
    if (initialValue?.isDiscounted) {
      initialValue.dateRangesDomain = [moment(data?.startDate), moment(data?.endDate)];
    }
  }
  if (data?.priceTypeId === SELLING_PRICE_TYPES.WAREHOUSE) {
    initialValue.warehouseId = data?.warehouseId;
    initialValue.domainType = data?.domainType?.toString();
    initialValue.dateRangesWarehouse = [moment(data?.startDate), moment(data?.endDate)];
    initialValue.warehousePrice = data?.price;
  }
  if (data?.priceTypeId === SELLING_PRICE_TYPES.WASTE) {
    initialValue.warehouseId = data?.warehouseId;
    initialValue.domainType = data?.domainType?.toString();
    initialValue.dateRangesWaste = [moment(data?.startDate), moment(data?.endDate)];
    initialValue.wastePrice = data?.price;
    initialValue.limit = data?.limit;
  }

  if (initialValue?.supportRate) {
    initialValue.supportRate *= 100;
  }

  return initialValue;
};

const handleFinancialObject = ({ discountedProvider, supportRate, specialOffers, showAsAmount, supportAmount }, initialValue) => {
  const supportAmountValue = supportAmount ?? initialValue?.supportAmount;
  const supportRateValue = supportRate ?? initialValue?.supportRate;
  let financial = {
    isFreeProduct: false,
    isAmount: showAsAmount ?? initialValue?.isAmount ?? false,
    isShownUnderSpecialOffers: specialOffers ?? initialValue?.specialOffers,
  };

  switch (Number(discountedProvider ?? initialValue?.discountedProvider)) {
    case STRUCK_PRICE_SUPPORTER_TYPE.FREE:
      financial.isFreeProduct = true;
      if (financial?.isAmount) {
        financial.supplierSupportAmount = 0;
        financial.thirdPartySupportAmount = 0;
      }
      else {
        financial.supplierSupportRate = 0;
        financial.thirdPartySupportRate = 0;
      }
      break;
    case STRUCK_PRICE_SUPPORTER_TYPE.GETIR_FINANCED:
      financial.isFreeProduct = false;
      if (financial?.isAmount) {
        financial.supplierSupportAmount = 0;
        financial.thirdPartySupportAmount = 0;
      }
      else {
        financial.supplierSupportRate = 0;
        financial.thirdPartySupportRate = 0;
      }
      break;
    case STRUCK_PRICE_SUPPORTER_TYPE.SUPPLIER:
      financial.isFreeProduct = false;
      if (financial?.isAmount) {
        financial.supplierSupportAmount = supportAmountValue;
        financial.thirdPartySupportAmount = 0;
      }
      else {
        financial.supplierSupportRate = supportRateValue / 100;
        financial.thirdPartySupportRate = 0;
      }
      break;
    case STRUCK_PRICE_SUPPORTER_TYPE.THIRD_PARTY:
      financial.isFreeProduct = false;
      if (financial?.isAmount) {
        financial.thirdPartySupportAmount = supportAmountValue;
        financial.supplierSupportAmount = 0;
      }
      else {
        financial.thirdPartySupportRate = supportRateValue / 100;
        financial.supplierSupportRate = 0;
      }
      break;
    default:
      financial = { ...financial };
  }

  return financial;
};

export const handleObjectStructure = (values, pricingType, isDiscounted, initialValue) => {
  const requestObject = { requestType: isDiscounted ? UPDATE_REQUEST_TYPES.DISCOUNTED_PRICE : UPDATE_REQUEST_TYPES.NORMAL_PRICE };

  if (pricingType === SELLING_PRICE_TYPES.DOMAIN) {
    requestObject.price = values?.domainPrice;
    if (isDiscounted) {
      const [validFrom, validUntil] = values?.dateRangesDomain ?? [];
      requestObject.startDate = validFrom;
      requestObject.endDate = validUntil;
      requestObject.financials = handleFinancialObject(values, initialValue);
    }
  }
  if (pricingType === SELLING_PRICE_TYPES.WAREHOUSE) {
    requestObject.price = values?.warehousePrice;
    const [validFrom, validUntil] = values?.dateRangesWarehouse ?? [];
    requestObject.startDate = validFrom;
    requestObject.endDate = validUntil;
    if (isDiscounted) {
      requestObject.financials = handleFinancialObject({ ...values }, initialValue);
    }
  }
  if (pricingType === SELLING_PRICE_TYPES.WASTE) {
    requestObject.price = values?.wastePrice;
    requestObject.limit = values?.limit;
    const [validFrom, validUntil] = values?.dateRangesWaste ?? [];
    requestObject.startDate = validFrom;
    requestObject.endDate = validUntil;
    if (isDiscounted) {
      requestObject.financials = handleFinancialObject({ ...values }, initialValue);
    }
  }

  return requestObject;
};

export const getOnlyModifiedValuesBeforeSubmit = ({
  initialValues,
  values,
}) => {
  const { newValues: changedValues } = getDiffObj(initialValues, values);
  setNullToEmptyStringDeep(changedValues);
  return changedValues;
};

export const validationSchema = (values, { supportType }) => Yup.object().shape({
  warehousePrice: Yup.number().min(0).when('a', (a, schema) => {
    if (values?.pricingType === SELLING_PRICE_TYPES.WAREHOUSE) {
      return schema.required();
    }
    return schema;
  }),
  wastePrice: Yup.number().min(0).when('a', (a, schema) => {
    if (values?.pricingType === SELLING_PRICE_TYPES.WASTE) {
      return schema.required();
    }
    return schema;
  }),

  supportRate: Yup.number().when('discountedProvider', {
    is: val => (Number(val) === STRUCK_PRICE_SUPPORTER_TYPE.SUPPLIER || Number(val) === STRUCK_PRICE_SUPPORTER_TYPE.THIRD_PARTY)
      && supportType === MARKET_PRODUCT_SUPPORT_TYPE.PERCENT,
    then: schema => schema.min(0).max(100).required(),
    otherwise: schema => schema,
  }),
  supportAmount: Yup.number().when('discountedProvider', {
    is: val => (Number(val) === STRUCK_PRICE_SUPPORTER_TYPE.SUPPLIER || Number(val) === STRUCK_PRICE_SUPPORTER_TYPE.THIRD_PARTY)
      && supportType === MARKET_PRODUCT_SUPPORT_TYPE.AMOUNT,
    then: schema => schema.min(0).required(),
    otherwise: schema => schema,
  }),
  dateRangesWarehouse: Yup.array().of(Yup.date()).when('a', (a, schema) => {
    if (values?.pricingType === SELLING_PRICE_TYPES.WAREHOUSE) {
      return schema.required();
    }
    return schema;
  }),
  dateRangesWaste: Yup.array().of(Yup.date()).when('a', (a, schema) => {
    if (values?.pricingType === SELLING_PRICE_TYPES.WASTE) {
      return schema.required();
    }
    return schema;
  }),
});
