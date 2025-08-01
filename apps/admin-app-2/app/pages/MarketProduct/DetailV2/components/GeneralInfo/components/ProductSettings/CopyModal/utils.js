import _ from 'lodash';

export const prepareProductForGivenCountry = (marketProduct, country) => {
  const { currency } = country;
  const {
    code: { alpha: codeAlpha, numeric: codeNumeric },
    isSymbolFirst,
    symbol,
  } = currency;

  let newMarketProduct = _.pick(_.cloneDeep(marketProduct), [
    'additionalPropertyTables',
    'description',
    'shortDescription',
    'displayType',
    'bundleDisplayType',
    'domainTypes',
    'type',
    'subType',
    'ingredients',
    'isBundle',
    'unit',
    'isDeliveryFeeDiscountProduct',
    'isEnabled',
    'isExcludedFromMinimumBasketCalculation',
    'isMinimumBasketNonRequiredProduct',
    'isOnlyPromo',
    'isVisible',
    'keywords',
    'boostedKeywords',
    'name',
    'fullName',
    'displayName',
    'shortName',
    'picURL',
    'picURLs',
    'widePicURL',
    'tags',
    'upperLimit',
    'domainUpperLimits',
    'isPublic',
    'details',
    'barcodes',
  ]);

  newMarketProduct = {
    ...newMarketProduct,
    country: country?._id,
    countryCode: country?.code?.alpha2,
    keywords: _.omit(newMarketProduct?.keywords, 'str'),
    boostedKeywords: _.omit(newMarketProduct?.keywords, 'str'),
    currency: {
      symbol,
      codeAlpha,
      codeNumeric,
      isSymbolFirst,
    },
    copiedFrom: { product: marketProduct?._id, country: marketProduct?.country },
  };

  return newMarketProduct;
};
