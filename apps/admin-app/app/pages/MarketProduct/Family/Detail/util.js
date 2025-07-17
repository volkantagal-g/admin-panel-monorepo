import { get } from 'lodash';

import { getLangKey } from '@shared/i18n';

export const transformFamilyDetailData = data => {
  const newData = [];
  if (!data || !data?.prices) {
    return newData;
  }
  Object.keys(data?.prices).forEach(productId => {
    newData.push({
      productId,
      productName: get(data?.prices[productId].name, [getLangKey()], ''),
      isLeadProduct: productId === data.leadProductId,
      recommendationPrice: data?.prices[productId]?.discountedPrice?.price,
      ...data?.prices[productId],
    });
  });
  return newData.sort((a, b) => {
    return b.kviScore - a.kviScore;
  });
};

export const filteredData = (data, filter) => {
  let fData = data;
  if (filter?.productIds?.length) {
    fData = fData.filter(r => filter.productIds.includes(r.productId));
  }
  if (filter?.productName?.length) {
    fData = fData.filter(r => r?.productName?.toUpperCase()?.includes(filter?.productName?.toUpperCase()));
  }
  if (filter?.status?.length) {
    fData = fData.filter(r => filter.status.includes(r.status));
  }
  if (filter?.domainTypes?.length) {
    fData = fData.filter(r => {
      let flag = false;
      r.domainTypes.forEach(dt => {
        flag = flag || filter.domainTypes.includes(dt.toString());
      });
      return flag;
    });
  }
  return fData;
};
