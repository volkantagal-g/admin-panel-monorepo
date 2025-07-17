import { isEmpty } from 'lodash';
import moment from 'moment-timezone';

import { t } from '@shared/i18n';

export const getStartDate1 = () => moment().subtract(1, 'days').startOf('day');
export const getEndDate1 = () => moment().subtract(1, 'days').endOf('day');

export const getStartDate2 = () => moment().startOf('day');
export const getEndDate2 = () => moment().endOf('day');
export const getDisabledDate = currentMoment => currentMoment > moment();

export const getFormattedOrderRankData = comparisonData => {
  if (isEmpty(comparisonData)) return comparisonData;
  const firstOrderRankData = comparisonData.first.orderRank;
  const firstTotalCount = comparisonData.first.totalCount;

  const secondOrderRankData = comparisonData.second.orderRank;
  const secondTotalCount = comparisonData.second.totalCount;

  // Just to have all order rank keys in one object
  const mergedOrderRank = { ...firstOrderRankData, ...secondOrderRankData };

  const formatted = [];

  // For total row
  formatted.push({
    orderRank: t('global:TOTAL').toUpperCase(),
    firstCount: firstTotalCount,
    secondCount: secondTotalCount,
    firstPercentage: 100,
    secondPercentage: 100,
    diff: secondTotalCount - firstTotalCount,
    diffPercentage: ((secondTotalCount - firstTotalCount) * 100) / firstTotalCount,
  });

  Object.keys(mergedOrderRank).forEach(orderRank => {
    const firstCount = firstOrderRankData[orderRank] || 0;
    const secondCount = secondOrderRankData[orderRank] || 0;

    const firstPercentage = (firstCount * 100) / firstTotalCount || 0;
    const secondPercentage = (secondCount * 100) / secondTotalCount || 0;

    const diff = secondCount - firstCount;

    const diffPercentage = ((secondPercentage - firstPercentage) * 100) / firstPercentage;

    formatted.push({
      orderRank,
      firstCount,
      secondCount,
      firstPercentage,
      secondPercentage,
      diff,
      diffPercentage,
    });
  });

  return formatted;
};

export const getFormattedPromoUsageData = (comparisonData, promoIdToPromoCodeMap, minCount = 0, maxCount = Infinity) => {
  if (isEmpty(comparisonData) || isEmpty(promoIdToPromoCodeMap)) return [];

  const firstPromoUsage = comparisonData.first.promoUsage;
  const firstTotalCount = comparisonData.first.totalCount;

  const secondPromoUsage = comparisonData.second.promoUsage;
  const secondTotalCount = comparisonData.second.totalCount;

  // Just to have all promoId keys in one object
  const mergedUsage = { ...firstPromoUsage, ...secondPromoUsage };

  const formatted = [];

  // For total row
  formatted.push({
    promoCode: t('global:TOTAL').toUpperCase(),
    firstCount: firstTotalCount,
    secondCount: secondTotalCount,
    firstPercentage: 100,
    secondPercentage: 100,
    diff: secondTotalCount - firstTotalCount,
    diffPercentage: ((secondTotalCount - firstTotalCount) * 100) / firstTotalCount,
  });

  Object.keys(mergedUsage).forEach(promoId => {
    let promoCode = '';
    if (promoCode === 'ORGANIC') promoCode = t('global:ORGANIC');
    else {
      promoCode = promoIdToPromoCodeMap[promoId] || promoId;
    }
    const firstCount = firstPromoUsage[promoId] || 0;
    const secondCount = secondPromoUsage[promoId] || 0;

    if (firstCount < minCount || secondCount < minCount) return;
    if (firstCount > maxCount || secondCount > maxCount) return;

    const firstPercentage = (firstCount * 100) / firstTotalCount;
    const secondPercentage = (secondCount * 100) / secondTotalCount;

    const diff = secondCount - firstCount;

    const diffPercentage = ((secondPercentage - firstPercentage) * 100) / firstPercentage;

    formatted.push({
      promoCode,
      firstCount,
      secondCount,
      firstPercentage,
      secondPercentage,
      diff,
      diffPercentage,
    });
  });

  return formatted;
};

export const getFormattedPromoData = promos => {
  if (isEmpty(promos)) return {};
  // get promoId: promoCode map
  const formatted = promos.reduce((accumObj, promo) => {
    // eslint-disable-next-line no-param-reassign
    accumObj[promo._id] = promo.promoCode;

    return accumObj;
  }, {});

  return formatted;
};
