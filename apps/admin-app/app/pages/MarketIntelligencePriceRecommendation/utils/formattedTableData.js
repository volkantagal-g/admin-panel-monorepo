import { calculateBundleIndex, calculateBundleStatus } from './calculate';

export const formattedTableData = tableData => {
  const newTableData = [];
  tableData.forEach(element => {
    if (element) {
      const tempElement = { ...element };
      tempElement.new_price = tempElement.price;
      tempElement.price_change = 0;
      if (
        tempElement.bundle_product_infos &&
        tempElement.bundle_product_infos !== '' &&
        tempElement.bundle_product_infos?.length > 0
      ) {
        element.bundle_product_infos.map((bundleData, index) => {
          tempElement.bundle_product_infos[index] = {
            ...bundleData,
            bundle_index: calculateBundleIndex(bundleData, tempElement.price),
            bundle_status: calculateBundleStatus(
              calculateBundleIndex(bundleData, tempElement.price),
            ),
          };
          return tempElement.bundle_product_infos[index];
        });
      }
      newTableData.push(tempElement);
    }
  });
  return newTableData;
};
