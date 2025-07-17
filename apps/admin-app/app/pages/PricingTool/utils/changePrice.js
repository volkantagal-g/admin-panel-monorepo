import _ from 'lodash';

import {
  calculateSales,
  calculateMarginNewGross,
  calculatePercentage,
  calculateWithDiscountedPrice,
  calculateCostd,
  isDiscountedPrice,
} from './calculate';

export const specialRound = number => (number * 100).toFixed(1);

export const getSubcategoryPercentage = (tableData, showAandM) => {
  let sumTotal = 0;
  let oldTotal = 0;

  tableData.forEach(e => {
    sumTotal += e.new_price * e.total_sales;
    oldTotal += (showAandM ? isDiscountedPrice(e) : e.price) * e.total_sales;
  });
  return { percentage: specialRound((sumTotal - oldTotal) / oldTotal) };
};

export const changeProductPrice = (tableData, priceType, record, value, funcType, showAandM) => {
  const newTableData = tableData.map(item => ({ ...item }));

  const productId = record.product_id;

  if (!(newTableData.find(e => e.product_id === productId))) {
    return { percentage: 0, newTableData };
  }
  if (['price_change', 'new_price'].includes(funcType)) {
    newTableData.find(e => e.product_id === productId)[funcType] = value;
    if (funcType === 'new_price') {
      newTableData.find(e => e.product_id === productId).price_change = (100 * (value - isDiscountedPrice(record)))
        / isDiscountedPrice(record);
    }
    else {
      newTableData.find(e => e.product_id === productId).new_price = parseFloat(isDiscountedPrice(record) * (1 + value / 100), 2);
    }
  }
  else {
    newTableData.find(e => e.product_id === productId).new_ssr = value;
  }
  const newAandM = (calculateCostd(record, priceType, newTableData.find(e => e.product_id === productId).new_price) * (1 - record.new_ssr / 100));
  const newAandMGross = newAandM * calculateSales(record, priceType, showAandM, newTableData.find(e => e.product_id === productId).new_price);
  newTableData.find(e => e.product_id === productId).new_aandm_product = newAandM;
  newTableData.find(e => e.product_id === productId).new_aandm_gross =
  (newTableData.find(e => e.product_id === productId).new_price < record[priceType] ? newAandMGross : record.aandm_gross);

  const differecenAandMProduct = newAandM - record.aandm;
  const differenceAandMGross = ((newTableData.find(e => e.product_id === productId).new_price
  < record[priceType] ? newAandMGross : record.aandm_gross) - record.aandm_gross);
  const differenceAandMPercentage = calculatePercentage(record.aandm, newAandM);
  newTableData.find(e => e.product_id === productId).difference_aandm_product = differecenAandMProduct;
  newTableData.find(e => e.product_id === productId).difference_aandm_gross = differenceAandMGross;
  newTableData.find(e => e.product_id === productId).difference_aandm_percentage = differenceAandMPercentage;

  const weeklySalesPredicted = calculateSales(record, priceType, true, newTableData.find(e => e.product_id === productId).new_price);
  const weeklySalesPredictedPercentage = calculatePercentage(record.total_sales, weeklySalesPredicted);
  newTableData.find(e => e.product_id === productId).weekly_sales_predicted = weeklySalesPredicted;
  newTableData.find(e => e.product_id === productId).weekly_sales_predicted_percentage = weeklySalesPredictedPercentage;

  const weeklyTotalBasketPredicted = (parseFloat(newTableData.find(e => e.product_id === productId).new_price) * weeklySalesPredicted);
  const weeklyTotalBasketPredictedPercentage = calculatePercentage(calculateWithDiscountedPrice(record, priceType, showAandM)
    * parseFloat(record.total_sales), weeklyTotalBasketPredicted);
  newTableData.find(e => e.product_id === productId).weekly_total_basket_predicted = weeklyTotalBasketPredicted;
  newTableData.find(e => e.product_id === productId).weekly_total_basket_predicted_percentage = weeklyTotalBasketPredictedPercentage;

  const marginCurrentProduct = calculateWithDiscountedPrice(record, priceType, showAandM) - record.wholesaleprice;
  const marginCurrentProductPercentage = (100 * marginCurrentProduct) / calculateWithDiscountedPrice(record, priceType, showAandM);
  newTableData.find(e => e.product_id === productId).margin_current_product = marginCurrentProduct;
  newTableData.find(e => e.product_id === productId).margin_current_product_percentage = marginCurrentProductPercentage;

  const marginCurrentGross = marginCurrentProduct * record.total_sales;
  newTableData.find(e => e.product_id === productId).margin_current_gross = marginCurrentGross;

  const marginNewGross = calculateMarginNewGross(record, priceType, showAandM, newTableData.find(e => e.product_id === productId).new_price);
  newTableData.find(e => e.product_id === productId).margin_new_gross = marginNewGross;

  const marginNewProduct = parseFloat(newTableData.find(e => e.product_id === productId).new_price - record.wholesaleprice);
  const marginNewProductPercentage = newTableData.find(e => e.product_id === productId).new_price > 0 ?
    (100 * (newTableData.find(e => e.product_id === productId).new_price - record.wholesaleprice))
  / newTableData.find(e => e.product_id === productId).new_price : 0;
  newTableData.find(e => e.product_id === productId).margin_new_product = marginNewProduct;
  newTableData.find(e => e.product_id === productId).margin_new_product_percentage = marginNewProductPercentage;

  const marginDifferenceProduct = marginNewProduct - marginCurrentProduct;
  newTableData.find(e => e.product_id === productId).margin_difference_product = marginDifferenceProduct;
  newTableData.find(e => e.product_id === productId).margin_difference_product_percentage = calculatePercentage(marginCurrentProduct, marginNewProduct);

  const marginDifferenceGross = marginNewGross - marginCurrentGross;
  newTableData.find(e => e.product_id === productId).margin_difference_gross = marginDifferenceGross;
  newTableData.find(e => e.product_id === productId).margin_difference_gross_percentage = calculatePercentage(marginCurrentGross, marginNewGross);

  newTableData.find(e => e.product_id === productId).struck_price_margin_difference =
    calculatePercentage(marginCurrentProductPercentage, marginNewProductPercentage);

  const { percentage } = getSubcategoryPercentage(newTableData, showAandM);
  return { percentage, newTableData };
};

export const changeExcelProductPrice = (newRecord, priceType, record, value, funcType, showAandM) => {
  const newTableData = _.cloneDeep(newRecord);

  if (!newTableData) {
    return { percentage: 0, newTableData };
  }
  if (['price_change', 'new_price'].includes(funcType)) {
    newTableData[funcType] = value;
    if (funcType === 'new_price') {
      newTableData.price_change = (100 * (value - isDiscountedPrice(record)))
        / isDiscountedPrice(record);
    }
    else {
      newTableData.new_price = parseFloat(isDiscountedPrice(record) * (1 + value / 100), 2);
    }
  }
  else {
    newTableData.new_ssr = value;
  }
  const newAandM = (calculateCostd(record, priceType, newTableData.new_price) * (1 - record.new_ssr / 100));
  const newAandMGross = newAandM * calculateSales(record, priceType, showAandM, newTableData.new_price);
  newTableData.new_aandm_product = newAandM;
  newTableData.new_aandm_gross =
  (newTableData.new_price < record[priceType] ? newAandMGross : record.aandm_gross);

  const differecenAandMProduct = newAandM - record.aandm;
  const differenceAandMGross = ((newTableData.new_price
  < record[priceType] ? newAandMGross : record.aandm_gross) - record.aandm_gross);
  const differenceAandMPercentage = calculatePercentage(record.aandm, newAandM);

  newTableData.difference_aandm_product = differecenAandMProduct;
  newTableData.difference_aandm_gross = differenceAandMGross;
  newTableData.difference_aandm_percentage = differenceAandMPercentage;

  const weeklySalesPredicted = calculateSales(record, priceType, true, newTableData.new_price);
  const weeklySalesPredictedPercentage = calculatePercentage(record.total_sales, weeklySalesPredicted);
  newTableData.weekly_sales_predicted = weeklySalesPredicted;
  newTableData.weekly_sales_predicted_percentage = weeklySalesPredictedPercentage;

  const weeklyTotalBasketPredicted = (parseFloat(newTableData.new_price) * weeklySalesPredicted);
  const weeklyTotalBasketPredictedPercentage = calculatePercentage(calculateWithDiscountedPrice(record, priceType, showAandM)
    * parseFloat(record.total_sales), weeklyTotalBasketPredicted);
  newTableData.weekly_total_basket_predicted = weeklyTotalBasketPredicted;
  newTableData.weekly_total_basket_predicted_percentage = weeklyTotalBasketPredictedPercentage;

  const marginCurrentProduct = calculateWithDiscountedPrice(record, priceType, showAandM) - record.wholesaleprice;
  const marginCurrentProductPercentage = (100 * marginCurrentProduct) / calculateWithDiscountedPrice(record, priceType, showAandM);
  newTableData.margin_current_product = marginCurrentProduct;
  newTableData.margin_current_product_percentage = marginCurrentProductPercentage;

  const marginCurrentGross = marginCurrentProduct * record.total_sales;
  newTableData.margin_current_gross = marginCurrentGross;

  const marginNewGross = calculateMarginNewGross(record, priceType, showAandM, newTableData.new_price);
  newTableData.margin_new_gross = marginNewGross;

  const marginNewProduct = parseFloat(newTableData.new_price - record.wholesaleprice);
  const marginNewProductPercentage = newTableData.new_price > 0 ?
    (100 * (newTableData.new_price - record.wholesaleprice))
  / newTableData.new_price : 0;
  newTableData.margin_new_product = marginNewProduct;
  newTableData.margin_new_product_percentage = marginNewProductPercentage;

  const marginDifferenceProduct = marginNewProduct - marginCurrentProduct;
  newTableData.margin_difference_product = marginDifferenceProduct;
  newTableData.margin_difference_product_percentage = calculatePercentage(marginCurrentProduct, marginNewProduct);

  const marginDifferenceGross = marginNewGross - marginCurrentGross;
  newTableData.margin_difference_gross = marginDifferenceGross;
  newTableData.margin_difference_gross_percentage = calculatePercentage(marginCurrentGross, marginNewGross);

  newTableData.struck_price_margin_difference =
    calculatePercentage(marginCurrentProductPercentage, marginNewProductPercentage);

  return { newTableData };
};
