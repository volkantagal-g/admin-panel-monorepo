import { BUNDLE_CHECK_LIMITS, CALCULATE_OVERALL_TYPE } from '../constants';
import { isValidate } from './common';

export const calculatePercentage = (oldPrice, newPrice) => {
  const currentPercentage =
    (newPrice - oldPrice < 0.5 && newPrice - oldPrice > -0.5) || oldPrice === 0
      ? 0
      : parseFloat(100 * ((newPrice - oldPrice) / oldPrice)).toFixed(1);
  if (currentPercentage === 'NaN' || currentPercentage === 'undefined') {
    return '';
  }
  return currentPercentage;
};

export const calculateOverallOtherIndex = (
  competitor,
  valueType = 'old',
  filteredTableData,
  priceType,
) => {
  let sumCompetitorPrice = 0;

  let newSumGetirPrice = 0;
  let currentSumGetirPrice = 0;

  filteredTableData.forEach(element => {
    if (
      element?.competitor_product_infos &&
      element &&
      element?.competitor_product_infos[competitor]
    ) {
      const current = element?.is_direct_match ?
        element?.competitor_product_infos[competitor]?.competitor_price : parseFloat(
          ((100 +
          element.competitor_product_infos[competitor].competitor_parameter) *
          element.competitor_product_infos[competitor].competitor_price) /
          100,
        );
      if (current !== '' && current && current !== 'NaN') {
        sumCompetitorPrice += parseFloat(current);
      }
      newSumGetirPrice += parseFloat(element?.new_price);
      currentSumGetirPrice += parseFloat(element[priceType || 'price']);
    }
  });
  const newIndex =
    (100 * (newSumGetirPrice / sumCompetitorPrice))?.toFixed(2) === 'NaN'
      ? 0
      : 100 * (newSumGetirPrice / sumCompetitorPrice);

  const currentIndex =
    (100 * (currentSumGetirPrice / sumCompetitorPrice))?.toFixed(2) === 'NaN'
      ? 0
      : 100 * (currentSumGetirPrice / sumCompetitorPrice);
  return valueType === 'old' ? currentIndex?.toFixed(1) : newIndex?.toFixed(1);
};

export const calculateOverallIndex = (
  competitor,
  valueType = CALCULATE_OVERALL_TYPE.OLD,
  filteredTableData,
  priceType,
) => {
  let newSumIndex = 0;
  let sumIndex = 0;
  let count = 0;

  filteredTableData.forEach(element => {
    if (
      element?.competitor_product_infos &&
      element &&
      element?.competitor_product_infos[competitor]
    ) {
      const current = element?.is_direct_match ?
        element?.competitor_product_infos[competitor]?.competitor_price : parseFloat(
          ((100 +
          element.competitor_product_infos[competitor].competitor_parameter) *
          element.competitor_product_infos[competitor].competitor_price) /
          100,
        );
      if (current !== '' && current && current !== 'NaN') {
        sumIndex += 100 * (element[priceType] / current);
        newSumIndex += 100 * (element.new_price / current);
        count += 1;
      }
    }
  });

  const newIndex = (newSumIndex / count)?.toFixed(1);
  const currentIndex = (sumIndex / count)?.toFixed(1);

  return valueType === CALCULATE_OVERALL_TYPE.OLD ? currentIndex : newIndex;
};

export const calculateOverallWeightedIndex = (
  competitor,
  valueType = CALCULATE_OVERALL_TYPE.OLD,
  filteredTableData,
  priceType,
) => {
  let newSumWeightedIndex = 0;
  let sumWeightedIndex = 0;

  let totalNetrevenue = 0;
  filteredTableData.forEach(element => {
    if (
      element?.competitor_product_infos &&
      element &&
      element?.competitor_product_infos[competitor]
    ) {
      totalNetrevenue +=
        isValidate(element.netrevenue)
          ? parseFloat(element.netrevenue)
          : 0;
    }
  });
  filteredTableData.forEach(element => {
    if (
      element?.competitor_product_infos &&
      element &&
      element?.competitor_product_infos[competitor]
    ) {
      const current = element?.is_direct_match ?
        element?.competitor_product_infos[competitor]?.competitor_price : parseFloat(
          ((100 +
            element.competitor_product_infos[competitor].competitor_parameter) *
            element.competitor_product_infos[competitor].competitor_price) /
            100,
        );
      if (isValidate(current) && current !== 'NaN') {
        const productWeighted = isValidate(element.netrevenue)
          ? element.netrevenue / totalNetrevenue
          : 0;
        sumWeightedIndex +=
          100 * (element[priceType] / current) * productWeighted;
        newSumWeightedIndex +=
          100 * (element.new_price / current) * productWeighted;
      }
    }
  });

  const newIndex = newSumWeightedIndex?.toFixed(1);
  const currentIndex = sumWeightedIndex?.toFixed(1);
  return valueType === CALCULATE_OVERALL_TYPE.OLD ? currentIndex : newIndex;
};

export const calculateBundleIndex = (bundleData, price) => {
  const bundleIndex = 100 * ((bundleData.bundle_product_price) / price);
  return bundleIndex;
};

export const calculateBundleStatus = bundleIndex => {
  return (
    !(bundleIndex < BUNDLE_CHECK_LIMITS.min ||
    bundleIndex >= BUNDLE_CHECK_LIMITS.max)
  );
};
