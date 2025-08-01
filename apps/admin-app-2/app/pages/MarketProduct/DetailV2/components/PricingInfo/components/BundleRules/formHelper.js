import * as Yup from 'yup';

import { STRUCK_PRICE_SUPPORTER_TYPE } from '@shared/shared/constants';
import { DISCOUNT_TYPE } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/constants';
import { getLangKey } from '@shared/i18n';

export const validationSchema = (
  values,
  { productIdsOfBundlePricing } = [],
) => {
  const yupSchemaBundlePricing = Yup.object().shape({
    ruleset: Yup.object().shape({
      type: Yup.number().required(),
      value: Yup.number().min(0).required().when('type', { is: DISCOUNT_TYPE.PERCENTAGE, then: Yup.number().min(0).max(100).required() }),
    }),
    providerType: Yup.number(),
    supplierId: Yup.string().when('providerType', { is: STRUCK_PRICE_SUPPORTER_TYPE.THIRD_PARTY, then: Yup.string().required() }),
    supportRate: Yup.number().when('providerType', (providerType, schema) => {
      if (
        Number(providerType) === STRUCK_PRICE_SUPPORTER_TYPE.THIRD_PARTY ||
        Number(providerType) === STRUCK_PRICE_SUPPORTER_TYPE.SUPPLIER
      ) {
        return schema.moreThan(0).max(100).required();
      }
      return schema;
    }),
  });

  const validationObjects = {};

  productIdsOfBundlePricing?.forEach(id => {
    validationObjects[id] = yupSchemaBundlePricing;
  });

  return Yup.object().shape({ ...validationObjects });
};

export const getIds = (values = []) => values?.map(({ id }) => id);

export const getProviderType = values => {
  let providerType = STRUCK_PRICE_SUPPORTER_TYPE.GETIR_FINANCED;

  if (values?.isFreeProduct) {
    providerType = STRUCK_PRICE_SUPPORTER_TYPE.FREE;
  }
  if (
    Number(values?.supplierSupportRate) > 0 ||
    Number(values?.supplierSupportAmount) > 0
  ) {
    providerType = STRUCK_PRICE_SUPPORTER_TYPE.SUPPLIER;
  }
  if (
    Number(values?.thirdPartySupportRate) > 0 ||
    Number(values?.thirdPartySupportAmount) > 0
  ) {
    providerType = STRUCK_PRICE_SUPPORTER_TYPE.THIRD_PARTY;
  }

  return providerType;
};

export const getSupportRate = data => {
  let supportRate = 0;
  if (getProviderType(data) === STRUCK_PRICE_SUPPORTER_TYPE.THIRD_PARTY) {
    supportRate = data?.thirdPartySupportRate;
  }
  if (getProviderType(data) === STRUCK_PRICE_SUPPORTER_TYPE.SUPPLIER) {
    supportRate = data?.supplierSupportRate;
  }

  return supportRate;
};

export const getSupportAmount = data => {
  let supportAmount = 0;
  if (getProviderType(data) === STRUCK_PRICE_SUPPORTER_TYPE.THIRD_PARTY) {
    supportAmount = data?.thirdPartySupportAmount;
  }
  if (getProviderType(data) === STRUCK_PRICE_SUPPORTER_TYPE.SUPPLIER) {
    supportAmount = data?.supplierSupportAmount;
  }

  return supportAmount;
};

export const getInitialValues = ({ filteredSubProducts }) => {
  const initialValues = {};

  filteredSubProducts?.forEach(data => {
    initialValues[data.id] = {
      ...data,
      providerType: getProviderType(data?.financials)?.toString(),
      supportRate: getSupportRate(data?.financials) * 100,
      supplierId: data?.financials?.supplierId,
      price: data?.ruleset?.originalPrice,
    };
  });

  return initialValues;
};

export const getFinancials = ({
  providerType,
  supportRate,
  isShownUnderSpecialOffers,
  isBundle,
  supportAmount,
  isAmount,
  initialValue,
  supplierId,
  suppliers,
}) => {
  const supportAmountValue = supportAmount ?? initialValue?.supportAmount;
  const supportRateValue = supportRate ?? initialValue?.supportRate;
  let financials = {
    isFreeProduct: false,
    isShownUnderSpecialOffers: isShownUnderSpecialOffers ?? false,
  };
  if (isBundle) {
    financials.supplierSupportRate = 0;
    financials.thirdPartySupportRate = 0;
    if (Number(providerType) === STRUCK_PRICE_SUPPORTER_TYPE.SUPPLIER) {
      financials.supplierSupportRate = supportRate / 100;
      financials.thirdPartySupportRate = 0;
      financials.isFreeProduct = false;
      financials.supplierId = supplierId;
      financials.supplierSAPCode = suppliers?.find(
        ({ _id }) => _id === financials?.supplierId,
      )?.supplierReferenceId;
    }
    if (Number(providerType) === STRUCK_PRICE_SUPPORTER_TYPE.THIRD_PARTY) {
      financials.supplierSupportRate = 0;
      financials.thirdPartySupportRate = supportRate / 100;
      financials.isFreeProduct = false;
      financials.supplierId = supplierId;
      financials.supplierSAPCode = suppliers?.find(
        ({ _id }) => _id === financials?.supplierId,
      )?.supplierReferenceId;
    }
    if (Number(providerType) === STRUCK_PRICE_SUPPORTER_TYPE.FREE) {
      financials.supplierSupportRate = 0;
      financials.thirdPartySupportRate = 0;
      financials.isFreeProduct = true;
    }

    return financials;
  }

  financials.isAmount = isAmount ?? initialValue?.isAmount ?? false;
  switch (Number(providerType ?? initialValue?.providerType)) {
    case STRUCK_PRICE_SUPPORTER_TYPE.FREE:
      financials.isFreeProduct = true;
      if (financials?.isAmount) {
        financials.supplierSupportAmount = 0;
        financials.thirdPartySupportAmount = 0;
      }
      else {
        financials.supplierSupportRate = 0;
        financials.thirdPartySupportRate = 0;
      }
      break;
    case STRUCK_PRICE_SUPPORTER_TYPE.GETIR_FINANCED:
      financials.isFreeProduct = false;
      if (financials?.isAmount) {
        financials.supplierSupportAmount = 0;
        financials.thirdPartySupportAmount = 0;
      }
      else {
        financials.supplierSupportRate = 0;
        financials.thirdPartySupportRate = 0;
      }
      break;
    case STRUCK_PRICE_SUPPORTER_TYPE.SUPPLIER:
      financials.isFreeProduct = false;
      if (financials?.isAmount) {
        financials.supplierSupportAmount = supportAmountValue;
        financials.thirdPartySupportAmount = 0;
        financials.supplierId = supplierId;
      }
      else {
        financials.supplierSupportRate = supportRateValue / 100;
        financials.thirdPartySupportRate = 0;
        financials.supplierId = supplierId;
      }
      break;
    case STRUCK_PRICE_SUPPORTER_TYPE.THIRD_PARTY:
      financials.isFreeProduct = false;
      if (financials?.isAmount) {
        financials.thirdPartySupportAmount = supportAmountValue;
        financials.supplierSupportAmount = 0;
        financials.supplierId = supplierId;
      }
      else {
        financials.thirdPartySupportRate = supportRateValue / 100;
        financials.supplierSupportRate = 0;
        financials.supplierId = supplierId;
      }
      break;
    default:
      financials = { ...financials };
  }
  return financials;
};

export const getBundlePricings = (formValues, suppliers) => {
  return formValues?.map(formValue => {
    const { productId, supportRate, providerType, supplierId, ruleset } = formValue;

    const requestBody = {
      productId,
      financials: getFinancials({
        providerType,
        supportRate,
        isBundle: true,
        supplierId,
        suppliers,
      }),
    };
    if (ruleset?.type && (ruleset?.value || ruleset?.value === 0)) {
      requestBody.ruleset = {
        type: ruleset.type,
        value: ruleset.value,
      };
    }

    return requestBody;
  });
};

export const DOMAIN_TYPES = {
  g10: 1,
  g30: 3,
  getirwater: 4,
};

export const filterBundleSubProducts = (data, selectedDomainType) => {
  if (selectedDomainType) {
    const filteredData = data?.filter(
      ({ domainType }) => domainType === selectedDomainType,
    );
    if (filteredData?.length) {
      return { defaultValue: selectedDomainType, list: filteredData };
    }
  }

  const g10 =
    data?.filter(({ domainType }) => domainType === DOMAIN_TYPES.g10) || [];
  const g30 = data?.filter(({ domainType }) => domainType === DOMAIN_TYPES.g30);
  const getirwater = data?.filter(
    ({ domainType }) => domainType === DOMAIN_TYPES.getirwater,
  );

  if (g10?.length) {
    return { defaultValue: DOMAIN_TYPES.g10, list: g10 };
  }
  if (g30?.length) {
    return { defaultValue: DOMAIN_TYPES.g30, list: g30 };
  }
  if (getirwater?.length) {
    return { defaultValue: DOMAIN_TYPES.getirwater, list: getirwater };
  }

  return { defaultValue: DOMAIN_TYPES.g10, list: g10 };
};

export const getSubProductsByNameAndImages = (bundleProductList, products) => {
  const modifiedBundleProductList = [];
  bundleProductList?.forEach(bundleProduct => {
    modifiedBundleProductList[bundleProduct?.id] = {
      ...bundleProduct,
      productName: products?.find(
        product => product?._id === bundleProduct?.productId,
      )?.name?.[getLangKey()],
      picURL: products?.find(
        product => product?._id === bundleProduct?.productId,
      )?.picURL,
    };
  });
  return modifiedBundleProductList;
};

export const calculateFreshPrice = (price = 0, count = 1) => {
  return price / count;
};
