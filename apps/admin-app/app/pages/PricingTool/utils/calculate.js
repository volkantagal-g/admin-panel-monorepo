export const calculateWithDiscountedPrice = (record, priceType, isStrucked = false) => {
  return isStrucked
    ? record[record[priceType] > record.discounted_price
      ? 'discounted_price'
      : priceType]
    : record[priceType];
};

export const calculateSales = (record, priceType, isStrucked = false, newPrice) => {
  return parseFloat(Math.exp((Math.log(parseFloat(newPrice))
    - Math.log(parseFloat(calculateWithDiscountedPrice(record, priceType, isStrucked))))
    * record.price_elasticity
    + Math.log(parseInt(record.total_sales, 10))));
};

export const calculateCostd = (record, priceType, newPrice) => {
  return (parseFloat(record[priceType] - newPrice) *
    (1 - (parseFloat(record[priceType] - record.wholesaleprice) / parseFloat(record[priceType])))
  );
};

export const calculateMarginNewGross = (record, priceType, showAandM, newPrice) => {
  return (parseFloat(newPrice) - parseFloat(record.wholesaleprice))
    * calculateSales(record, priceType, showAandM, newPrice);
};

export const calculatePercentage = (oldPrice, newPrice) => {
  const currentPercentage = ((((newPrice - oldPrice) < 0.5) && (newPrice - oldPrice > -0.5))
  || oldPrice === 0) ? 0 : parseFloat(100 * ((newPrice - oldPrice) / oldPrice)).toFixed(1);
  if (currentPercentage === 'NaN' || currentPercentage === 'undefined') return '';
  return currentPercentage;
};

export const isDiscountedPrice = element => {
  return parseFloat(element.price) > parseFloat(element.discounted_price) ? parseFloat(element.discounted_price) : parseFloat(element.price);
};
