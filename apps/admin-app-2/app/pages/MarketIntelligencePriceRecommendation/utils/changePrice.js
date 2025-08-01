import { calculateBundleIndex, calculateBundleStatus, calculatePercentage } from './calculate';

export const specialRound = number => (number * 100).toFixed(1);

export const getSubcategoryPercentage = tableData => {
  const percentage = calculatePercentage(
    tableData.reduce(
      (accumulator, current) => current?.price &&
        current?.new_price &&
        accumulator + parseFloat(current?.price),
      0,
    ),
    tableData.reduce(
      (accumulator, current) => current?.price &&
        current?.new_price &&
        accumulator + parseFloat(current?.new_price),
      0,
    ),
  );
  return { percentage };
};

export const changeProductPrice = (tableData, record, value, funcType) => {
  const newTableData = tableData.map(item => ({ ...item }));

  const productId = record?.getir_product_id;

  if (!newTableData.find(e => e?.getir_product_id === productId)) {
    return { percentage: 0, newTableData };
  }

  if (['price_change', 'new_price'].includes(funcType)) {
    newTableData.find(e => e?.getir_product_id === productId)[funcType] =
      value;
    if (funcType === 'new_price') {
      newTableData.find(e => e?.getir_product_id === productId).price_change =
        (100 * (value - record.price)) / record.price;
      newTableData.find(e => e?.getir_product_id === productId).new_margin =
        parseFloat(((value - record.wholesaleprice) / value) * 100, 3);
    }
    else {
      newTableData.find(e => e?.getir_product_id === productId).new_price =
        parseFloat(record.price * (1 + value / 100), 2);
    }
  }
  if (
    record.bundle_product_infos &&
    record.bundle_product_infos !== '' &&
    record.bundle_product_infos?.length > 0
  ) {
    record.bundle_product_infos.map((bundleData, index) => {
      newTableData.find(
        e => e?.getir_product_id === productId,
      ).bundle_product_infos[index] = {
        ...bundleData,
        bundle_index: calculateBundleIndex(
          bundleData,
          newTableData.find(e => e?.getir_product_id === productId).new_price,
        ),
        bundle_status: calculateBundleStatus(
          calculateBundleIndex(
            bundleData,
            newTableData.find(e => e?.getir_product_id === productId)
              .new_price,
          ),
        ),
      };
      return newTableData.find(
        e => e?.getir_product_id === productId,
      ).bundle_product_infos[index];
    });
  }
  const { percentage } = getSubcategoryPercentage(newTableData);
  return { percentage, newTableData };
};

export const changeAllPrice = (tableData, isRecommended) => {
  const newTableData = tableData.map(item => ({ ...item }));

  newTableData.forEach((data, dataIndex) => {
    const tempData = data;
    newTableData[dataIndex] = {
      ...data,
      price_change:
        !data?.final_alert && isRecommended && data?.final_result
          ? (100 * (data.final_result - data.price)) / data.price
          : 0,
      new_margin: parseFloat(
        !data.final_alert && isRecommended && data.final_result
          ? ((data.final_result - data.wholesaleprice) / data.final_result) *
              100
          : ((data.price - data.wholesaleprice) / data.price) * 100,
        3,
      ),
      new_price:
        !data.final_alert && isRecommended && data.final_result
          ? data.final_result
          : data.price,
      bundle_product_infos:
      tempData.bundle_product_infos &&
      tempData.bundle_product_infos !== '' &&
        tempData.bundle_product_infos?.length > 0
        ? tempData.bundle_product_infos.map(
          (element, index) => {
            tempData.bundle_product_infos[index] = {
              ...element,
              bundle_index: calculateBundleIndex(
                element,
                !tempData.final_alert && isRecommended && tempData.final_result
                  ? tempData.final_result
                  : tempData.price,
              ),
              bundle_status: calculateBundleStatus(
                calculateBundleIndex(
                  element,
                  !tempData.final_alert && isRecommended && tempData.final_result
                    ? tempData.final_result
                    : tempData.price,
                ),
              ),
            };
            return tempData.bundle_product_infos[index];
          },
        )
        : '',
    };
  });
  const { percentage } = getSubcategoryPercentage(newTableData);
  return { percentage, newTableData };
};
