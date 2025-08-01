import * as Yup from 'yup';

import { MARKET_PRODUCT_SUPPORT_TYPE, STRUCK_PRICE_SUPPORTER_TYPE } from '@shared/shared/constants';
import { getirMarketDomainTypes } from '@app/pages/MarketProduct/constantValues';
import { getLangKey, t } from '@shared/i18n';
import { InfoIcon } from '@shared/components/GUI';
import { SELLING_PRICE_TYPES, REQUEST_TYPES } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/constants';

export const validationSchema = (_, { isStruckPriceSelected, priceType, supportType }) => Yup.object().shape({
  domainType: Yup.string().required(),
  domainPrice: Yup.number().min(0).when('a', (a, schema) => {
    if (priceType === SELLING_PRICE_TYPES.DOMAIN) {
      return schema.required();
    }
    return schema;
  }),
  warehouseIds: Yup.array().max(10, t('marketProductPageV2:SELLING_PRICE_INFO_MESSAGES.WAREHOUSES_LENGTH')).of(Yup.string()).nullable()
    .when('a', (a, schema) => {
      if (priceType === SELLING_PRICE_TYPES.WAREHOUSE) {
        return schema.required();
      }
      return schema;
    }),
  warehousePrice: Yup.number().min(0).when('a', (a, schema) => {
    if (priceType === SELLING_PRICE_TYPES.WAREHOUSE) {
      return schema.required();
    }
    return schema;
  }),
  dateRanges: Yup.array().of(Yup.date()).when('a', (a, schema) => {
    if (priceType === SELLING_PRICE_TYPES.WAREHOUSE) {
      return schema.required();
    }
    return schema;
  }),
  discountedDateRanges: Yup.array().of(Yup.date()).when('a', (a, schema) => {
    if (isStruckPriceSelected && priceType === SELLING_PRICE_TYPES.DOMAIN) {
      return schema.required();
    }
    return schema;
  }),
  providerType: Yup.string().when('a', (a, schema) => {
    if (isStruckPriceSelected) {
      return schema.required();
    }
    return schema;
  }),
  supportRate: Yup.number().when('providerType', {
    is: val => (Number(val) === STRUCK_PRICE_SUPPORTER_TYPE.SUPPLIER || Number(val) === STRUCK_PRICE_SUPPORTER_TYPE.THIRD_PARTY)
      && supportType === MARKET_PRODUCT_SUPPORT_TYPE.PERCENT,
    then: schema => schema.min(0).max(100).required(),
    otherwise: schema => schema,
  }),
  supplierId: Yup.string().when('providerType', {
    is: val => (Number(val) === STRUCK_PRICE_SUPPORTER_TYPE.SUPPLIER || Number(val) === STRUCK_PRICE_SUPPORTER_TYPE.THIRD_PARTY),
    then: schema => schema.required(),
    otherwise: schema => schema,
  }),
  supportAmount: Yup.number().when('providerType', {
    is: val => (Number(val) === STRUCK_PRICE_SUPPORTER_TYPE.SUPPLIER || Number(val) === STRUCK_PRICE_SUPPORTER_TYPE.THIRD_PARTY)
      && supportType === MARKET_PRODUCT_SUPPORT_TYPE.AMOUNT,
    then: schema => schema.min(0).required(),
    otherwise: schema => schema,
  }),
});

const handleFinancialObject = ({ providerType, supportRate, supportAmount, showAsAmount, specialOffers, supplierId }) => {
  let financial = {
    isFreeProduct: false,
    isAmount: showAsAmount ?? false,
    isShownUnderSpecialOffers: specialOffers || false,
  };

  switch (Number(providerType)) {
    case STRUCK_PRICE_SUPPORTER_TYPE.FREE:
      financial.isFreeProduct = true;
      break;
    case STRUCK_PRICE_SUPPORTER_TYPE.GETIR_FINANCED:
      financial.isFreeProduct = false;
      break;
    case STRUCK_PRICE_SUPPORTER_TYPE.SUPPLIER:
      financial.isFreeProduct = false;
      financial.supplierId = supplierId;
      if (showAsAmount) {
        financial.supplierSupportAmount = supportAmount;
        financial.thirdPartySupportAmount = 0;
      }
      else {
        financial.supplierSupportRate = supportRate / 100;
        financial.thirdPartySupportRate = 0;
      }
      break;
    case STRUCK_PRICE_SUPPORTER_TYPE.THIRD_PARTY:
      financial.isFreeProduct = false;
      financial.supplierId = supplierId;
      if (showAsAmount) {
        financial.thirdPartySupportAmount = supportAmount;
        financial.supplierSupportAmount = 0;
      }
      else {
        financial.thirdPartySupportRate = supportRate / 100;
        financial.supplierSupportRate = 0;
      }
      break;
    default:
      financial = { ...financial };
  }

  return financial;
};

export const handleObjectStructure = ({
  dateRanges,
  discountedDateRanges,
  domainType,
  domainPrice, warehousePrice, productId, providerType,
  supportRate, warehouseIds, isDiscountedPrice, priceType, specialOffers, showAsAmount, supportAmount, supplierId,
}) => {
  const requestObject = {
    productId,
    priceType,
    requestType: REQUEST_TYPES.SELLING_PRICE,
  };

  if ((warehouseIds?.length && dateRanges?.length)) {
    const [validFrom, validUntil] = dateRanges;
    requestObject.startDate = validFrom;
    requestObject.endDate = validUntil;
  }

  if ((priceType === SELLING_PRICE_TYPES.DOMAIN && isDiscountedPrice && discountedDateRanges?.length)) {
    const [validFrom, validUntil] = discountedDateRanges;
    requestObject.startDate = validFrom;
    requestObject.endDate = validUntil;
  }
  if (domainType) {
    requestObject.domainType = Array.isArray(domainType) ? domainType : Number(domainType);
  }

  if (priceType === SELLING_PRICE_TYPES.DOMAIN) {
    requestObject.price = domainPrice;
  }
  if (priceType === SELLING_PRICE_TYPES.WAREHOUSE) {
    requestObject.price = warehousePrice;
    requestObject.warehouseIds = warehouseIds;
  }
  if (isDiscountedPrice) {
    requestObject.financials = handleFinancialObject({
      providerType,
      supportRate,
      supportAmount,
      showAsAmount,
      specialOffers,
      price: requestObject?.price,
      supplierId,
    });
  }
  if (requestObject?.financials) {
    requestObject.requestType = REQUEST_TYPES.DISCOUNTED_SELLING_PRICE;
  }
  return requestObject;
};

export const getDomainWarehouseDomainTypes = (availableDomainsForDiscountedPrices = []) => {
  const options = [];
  Object.entries(getirMarketDomainTypes).forEach(([key, value]) => {
    const domainTypeStatus = !availableDomainsForDiscountedPrices?.some(domainType => domainType?.toString() === key);
    options.push({
      value: key?.toString(),
      label:
  <span>{value?.[getLangKey()]} { domainTypeStatus ?
    <InfoIcon title={t('marketProductPageV2:SELLING_PRICE_INFO_MESSAGES.VALID_DOMAIN_PRICE_STATUS')} /> : ''}
  </span>,
      disabled: domainTypeStatus,
    });
  });
  return options;
};

export const getAvailableDomainsForDiscountedPrices = (availableDomainsForDiscountedPrices = [], selectedDomain) => {
  if (!selectedDomain) return false;

  return availableDomainsForDiscountedPrices?.includes(Number(selectedDomain));
};

export const struckPriceInitialValues = {
  discountedDateRanges: undefined,
  providerType: undefined,
  supportRate: undefined,
  specialOffers: false,
  supplierId: undefined,
};
export const initialValues = {
  warehouseIds: undefined,
  warehousePrice: undefined,
  domainType: undefined,
  domainPrice: undefined,
  dateRanges: undefined,
  priceType: SELLING_PRICE_TYPES.DOMAIN,
  ...struckPriceInitialValues,
};
