import { isDiscountedPrice } from './calculate';

export const formattedTableData = (tableData, showAandM) => {
  const newTableData = [];
  if (showAandM) {
    tableData.forEach(element => {
      const tempElement = { ...element };
      tempElement.new_price = isDiscountedPrice(element);
      tempElement.margin_current_product = isDiscountedPrice(element) - element.wholesaleprice;
      tempElement.margin_current_product_percentage = (100 * (isDiscountedPrice(element) - element.wholesaleprice)) / isDiscountedPrice(element);
      tempElement.margin_current_gross = (isDiscountedPrice(element) - element.wholesaleprice) * element.total_sales;

      tempElement.margin_new_gross = tempElement.margin_current_gross;
      tempElement.margin_new_product = tempElement.margin_current_product;
      tempElement.margin_new_product_percentage = tempElement.margin_current_product_percentage;
      tempElement.struck_price_margin_difference = 0;
      tempElement.margin_difference_product = 0;
      tempElement.margin_difference_product_percentage = 0;

      tempElement.margin_difference_gross = 0;
      tempElement.margin_difference_gross_percentage = 0;
      tempElement.price_change = 0;

      tempElement.weekly_total_basket_predicted = tempElement.weekly_sales_basket;
      tempElement.weekly_total_basket_predicted_percentage = 0;

      newTableData.push(tempElement);
    });
  }
  else {
    tableData.forEach(element => {
      const tempElement = { ...element };
      tempElement.new_price = element.price;
      tempElement.price_change = 0;
      tempElement.margin_current_product = element.price - element.wholesaleprice;
      tempElement.margin_current_product_percentage = (100 * (element.price - element.wholesaleprice)) / element.price;
      tempElement.margin_current_gross = (element.price - element.wholesaleprice) * element.total_sales;

      tempElement.margin_new_gross = element.margin_current_gross;
      tempElement.margin_new_product = element.margin_current_product;
      tempElement.margin_new_product_percentage = element.margin_current_product_percentage;
      tempElement.struck_price_margin_difference = 0;
      tempElement.margin_difference_product = 0;
      tempElement.margin_difference_product_percentage = 0;

      tempElement.margin_difference_gross = 0;
      tempElement.margin_difference_gross_percentage = 0;
      tempElement.price_change = 0;

      newTableData.push(tempElement);
    });
  }
  return newTableData;
};
