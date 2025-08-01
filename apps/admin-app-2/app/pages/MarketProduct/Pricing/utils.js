import moment from 'moment-timezone';

import { getLangKey } from '@shared/i18n';
import { SELLING_PRICE_TYPE_NAMES, DENIED_COUNTRIES_ON_OPERATIONS_SET } from '@app/pages/MarketProduct/Pricing/constants';

export const getPriceTypeOptions = () => {
  return Object.entries(SELLING_PRICE_TYPE_NAMES).map(([key, value]) => {
    return {
      value: key.toString(),
      label: value[getLangKey()],
    };
  });
};
export const selectFormatter = data => data?.map(item => ({ value: item?._id, label: item?.name?.[getLangKey()] }));

export const modifiedPriceTableList = (priceData, products, warehouses) => {
  const tableData = [];
  priceData?.forEach(price => {
    tableData.push({
      ...price,
      productName: products?.find(product => product?._id === price?.productId)?.name?.[getLangKey()],
      warehouseName: warehouses?.find(warehouse => warehouse?._id === price?.warehouseId)?.name,
    });
  });
  return tableData;
};

export const handleErrorMessages = error => {
  const errorData = error.response.data;
  let errorMessages = errorData?.message;
  let errorMessage = '';
  if (errorMessages?.message) {
    errorMessages = errorMessages.message;
    for (let i = 0; i < errorMessages.length; i += 1) {
      errorMessage += `ISSUE: ${errorMessages[i].message} ,`;
    }
  }
  else {
    errorMessage = errorMessages;
  }
  return errorMessage;
};

export const getCountryTimeZoneFormatter = date => {
  const storedCountry = localStorage.getItem('selectedCountry');
  if (storedCountry) {
    return moment.utc(date).tz(JSON.parse(storedCountry)?.timezones[0]?.timezone).format();
  }
  return date;
};

export const convertAmountToRate = (amount, price) => {
  return Math.round((amount / price) * 100);
};

export const convertRateToAmount = (rate, price) => {
  return Math.floor((rate * price) / 100);
};

export const isAllowedToOperate = selectedCountry => {
  if (DENIED_COUNTRIES_ON_OPERATIONS_SET.has(selectedCountry?.code?.alpha2)) {
    return false;
  }
  return true;
};
