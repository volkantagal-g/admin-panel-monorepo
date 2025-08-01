import _ from 'lodash';

import { DOMAIN_FILTER_TYPES, GETIR_MARKET_DOMAIN_TYPES, WAREHOUSE_BUSY_STATUS } from '@shared/shared/constants';

export const mapDataToDashboard = data => {
  const totalWarehousesCount = data.liveMapData.length;
  let plannedTotal = 0;
  let total = 0;
  let busyWarehouseCount = 0;
  let utilizedTotal = 0;
  let utilizableTotal = 0;
  let belowCourierPlan = 0;
  let orderCountTotal = 0;
  let availableHoursTotal = 0;

  if (data.liveMapData.length) {
    data.liveMapData.forEach(warehouse => {
      total += warehouse.total;
      plannedTotal += warehouse.planned;
      utilizableTotal += warehouse.utilizableTotal;
      utilizedTotal += warehouse.utilized;
      const isCompliant = warehouse.planned - warehouse.total <= 1;
      const isBusy = warehouse.warehouseObject.status === WAREHOUSE_BUSY_STATUS;

      busyWarehouseCount += isBusy ? 1 : 0;
      belowCourierPlan += isCompliant ? 1 : 0;
    }, 0);
  }

  if (data.operationTimeSeriesData.length) {
    data.operationTimeSeriesData.forEach(warehouse => {
      orderCountTotal += warehouse.order_count;
      availableHoursTotal += warehouse.available_hours;
    });
  }

  const busyWarehouseRatio = totalWarehousesCount ? (busyWarehouseCount / totalWarehousesCount) * 100 : 0;
  const compliance = plannedTotal ? (total / plannedTotal) * 100 : 100;
  const utilization = utilizableTotal ? (utilizedTotal / utilizableTotal) * 100 : 100;
  const throughput = availableHoursTotal ? orderCountTotal / availableHoursTotal : 0;

  return { busyWarehouseRatio, compliance, belowCourierPlan, utilization, throughput: throughput.toFixed(1) };
};

export const filterLiveMapData = (courierWarehousesData, props) => {
  const { selectedDomainType, domainFilterType } = props;
  return courierWarehousesData.filter(warehouse => {
    if (!warehouse.warehouseObject) {
      return false;
    }

    const stringDomainTypes = warehouse.warehouseObject.domainTypes.filter(domainType => {
      return _.includes(GETIR_MARKET_DOMAIN_TYPES, domainType);
    }).sort((a, b) => a - b).map(domainType => domainType.toString());

    return domainFilterType === DOMAIN_FILTER_TYPES.INCLUDES ? stringDomainTypes.some(domainType => {
      return selectedDomainType === domainType;
    }) : _.isEqual(selectedDomainType, stringDomainTypes.join(''));
  });
};
