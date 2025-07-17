import { isEmpty } from 'lodash';

import { getLangKey } from '@shared/i18n';
import { numberFormatter, percentFormatter } from '../../utils';

export const ROW_TYPES = {
  CITY: 'CITY',
  WAREHOUSE: 'WAREHOUSE',
};

const createRow = ({
  id,
  rowName,
  currentData = {},
  currentDomainData = {},
  cityCurrentData = {},
  previousData = {},
  rowType,
  classes,
}) => {
  const ComparisonColumn = ({ current, previous }) => (
    <div className={classes.twoRowContainer}>
      {numberFormatter(current)}
      <span
        className={[
          current < previous
            ? classes.textDanger
            : classes.textSuccess,
          classes.textSmall,
        ].join(' ')}
      >
        {percentFormatter(
          (current - previous) / previous || 0,
        )}
      </span>
    </div>
  );

  let orderRatio = percentFormatter(currentData.orderCount / currentDomainData.orderCount || 0);
  let vatIncludedRevenueRatio = percentFormatter(currentData.netRevenue / currentDomainData.netRevenue || 0);
  let netRevenuePerOrder = numberFormatter(currentData.netRevenue / currentData.orderCount || 0);
  const missedOrderRatio = percentFormatter(currentData.missedOrderCount / currentData.orderCount || 0);
  if (rowType === ROW_TYPES.WAREHOUSE) {
    orderRatio = percentFormatter(currentData.orderCount / cityCurrentData.orderCount || 0);
    vatIncludedRevenueRatio = percentFormatter(currentData.netRevenue / cityCurrentData.netRevenue || 0);
    netRevenuePerOrder = numberFormatter(currentData.netRevenue / currentData.orderCount || 0);
  }

  return ({
    key: id,
    rowType,
    rowName,
    orderRatio,
    missedOrderRatio,
    vatIncludedRevenueRatio,
    missedOrderRatioNumber: currentData.missedOrderCount / currentData.orderCount || 0,
    orderCount: currentData.orderCount,
    netRevenuePerOrder,
    order: rowType === ROW_TYPES.CITY ? (
      <ComparisonColumn current={currentData.orderCount} previous={previousData.orderCount} />
    ) : numberFormatter(currentData.orderCount),
    missedOrderCount: currentData.missedOrderCount,
    missedOrder: rowType === ROW_TYPES.CITY ? (
      <ComparisonColumn current={currentData.missedOrderCount} previous={previousData.missedOrderCount} />
    ) : numberFormatter(currentData.missedOrderCount),
    netRevenue: currentData.netRevenue,
    vatIncludedRevenue: rowType === ROW_TYPES.CITY ? (
      <ComparisonColumn current={currentData.netRevenue} previous={previousData.netRevenue} />
    ) : numberFormatter(currentData.netRevenue),
    ...(rowType === ROW_TYPES.CITY && { children: [] }),
  });
};

export const formatTableData = ({ data, warehousesMap, citiesMap, classes }) => {
  const formattedData = [];

  if (!(data || data?.current || data?.previous) || !warehousesMap || !citiesMap) {
    return formattedData;
  }

  Object.keys(data?.current?.cities || {}).forEach(cityId => {
    const cityName = citiesMap[cityId]?.name[getLangKey()];
    const currentData = data?.current?.cities[cityId] || {};
    const previousData = data?.previous?.cities[cityId] || {};
    const cityRow = createRow({
      id: cityId,
      rowName: cityName,
      currentDomainData: data.current,
      previousDomainData: data.previous,
      rowType: ROW_TYPES.CITY,
      currentData,
      previousData,
      classes,
    });

    if (!isEmpty(currentData.warehouses)) {
      Object.keys(currentData.warehouses).forEach(warehouseId => {
        const foundWarehouse = warehousesMap[warehouseId];
        if (!foundWarehouse) return;

        const warehouseRow = createRow({
          id: warehouseId,
          rowName: foundWarehouse?.name,
          currentData: currentData.warehouses[warehouseId],
          cityCurrentData: currentData,
          rowType: ROW_TYPES.WAREHOUSE,
        });

        cityRow.children.push(warehouseRow);
      });
    }

    formattedData.push(cityRow);
  });

  return formattedData;
};
