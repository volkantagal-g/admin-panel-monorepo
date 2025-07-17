/* eslint-disable no-param-reassign */
import { isEmpty } from 'lodash';

import type { CourierStatusCounts, OperationStats, OperationsWarehouse } from './types';
import { NOT_APPLICABLE_VALUE } from './constants';
import { getLangKey } from '@shared/i18n';
import type { WarehouseCourierCountsAndId } from '@shared/api/businessMonitoring/types';

export const TOTALS_ROW_ID = 'totalsRow';

type Data = {
  courierStatusCounts: CourierStatusCounts;
  operationStats: OperationStats;
};

export function formatDataForCitiesToTableRows(
  { data, cities, warehouses, selectedDomainType }: {
  data: Data,
  cities: ICity[],
  warehouses: OperationsWarehouse[],
  selectedDomainType: number,
},
) {
  if (isEmpty(data) || isEmpty(cities) || isEmpty(warehouses)) return [];
  const totalRow : Row = getRowTemplate(TOTALS_ROW_ID, 'Total');
  const tableRows = [totalRow];

  const { courierStatusCounts, operationStats } = data;
  const warehouseMap = createWarehouseMap(warehouses);

  cities.forEach(city => {
    const cityId = city._id;
    // city operation data is an object with domainType as key and array of objects as value like;
    // { 1: [{CourierStatusCounts}, {CourierStatusCounts}], 2: [{CourierStatusCounts}, {CourierStatusCounts}] }
    const cityOperationData = operationStats[cityId] || {};
    const rowTemplate: Row = getRowTemplate(cityId, city.name[getLangKey()]);
    formatCityRowForOperations({ baseRow: rowTemplate, cityOperationData });

    const cityCourierStats = courierStatusCounts.selectedCountryCitiesData?.[cityId]?.cityTotal.warehouses || [];
    formatCityRowForCouriers({ baseRow: rowTemplate, cityCourierStats, warehouseMap, selectedDomainType });

    tableRows.push(rowTemplate);

    // update total row
    totalRow.activeOrders += rowTemplate.activeOrders;
    totalRow.redBasket += rowTemplate.redBasket;
    totalRow.late += rowTemplate.late;
    totalRow.compliantUnitCount += rowTemplate.compliantUnitCount;
    totalRow.complianceTotalUnitCount += rowTemplate.complianceTotalUnitCount;
    totalRow.utilizedUnitCount += rowTemplate.utilizedUnitCount;
    totalRow.utilizableTotalUnitCount += rowTemplate.utilizableTotalUnitCount;
    totalRow.aggressionUnitCount += rowTemplate.aggressionUnitCount;
    totalRow.aggressionTotal += rowTemplate.aggressionTotal;
    totalRow.lowerETATotal += rowTemplate.lowerETATotal;
    totalRow.upperETATotal += rowTemplate.upperETATotal;
    totalRow.totalOrderCountWithETA += rowTemplate.totalOrderCountWithETA;
  });

  totalRow.utilization = totalRow.utilizableTotalUnitCount ? (totalRow.utilizedUnitCount * 100) / totalRow.utilizableTotalUnitCount : NOT_APPLICABLE_VALUE;
  totalRow.compliance = totalRow.complianceTotalUnitCount ? (totalRow.compliantUnitCount * 100) / totalRow.complianceTotalUnitCount : NOT_APPLICABLE_VALUE;
  totalRow.aggression = totalRow.aggressionTotal ? totalRow.aggressionTotal / totalRow.aggressionUnitCount : NOT_APPLICABLE_VALUE;
  totalRow.lowerETAAvg = totalRow.totalOrderCountWithETA ? totalRow.lowerETATotal / totalRow.totalOrderCountWithETA : NOT_APPLICABLE_VALUE;
  totalRow.upperETAAvg = totalRow.totalOrderCountWithETA ? totalRow.upperETATotal / totalRow.totalOrderCountWithETA : NOT_APPLICABLE_VALUE;

  return tableRows;
}

export function formatDataForSelectedCity(
  { data, warehouses, selectedDomainType } : {
  data: Data,
  warehouses: OperationsWarehouse[],
  selectedDomainType: number,
},
) {
  if (isEmpty(data) || isEmpty(warehouses)) return [];
  const totalRow : Row = getRowTemplate(TOTALS_ROW_ID, 'Total');
  const tableRows = [totalRow];

  const { courierStatusCounts, operationStats } = data;

  const warehouseMap = createWarehouseMap(warehouses);
  const courierStats = courierStatusCounts.selectedCityData?.cityTotal.warehouses || [];
  const courierStatsMap = createWarehouseCourierStatsMap(courierStats);

  const warehouseIdsFromOperationStats = Object.keys(operationStats);
  const warehouseIdsFromCourierStats = courierStats.map(stats => stats.warehouseId);
  const uniqWarehouseIds = [...new Set([...warehouseIdsFromOperationStats, ...warehouseIdsFromCourierStats])];

  uniqWarehouseIds
    .filter(id => warehouseMap.has(id))
    .filter(id => !selectedDomainType || warehouseMap.get(id)?.domainTypes.includes(selectedDomainType))
    .forEach(warehouseId => {
      const populatedWarehouse = warehouseMap.get(warehouseId) as OperationsWarehouse;
      const rowTemplate: Row = getRowTemplate(warehouseId, populatedWarehouse.name);

      const aggRes = aggressionLogic(populatedWarehouse, rowTemplate.aggressionUnitCount, rowTemplate.aggressionTotal);
      rowTemplate.aggressionUnitCount = aggRes.count;
      rowTemplate.aggressionTotal = aggRes.total;
      rowTemplate.aggression = aggRes.value;

      const warehouseOperationStats = operationStats[warehouseId] || {};
      formatWarehouseRowForOperations({ baseRow: rowTemplate, warehouseOperationStats });

      const warehouseCourierStats = courierStatsMap.get(warehouseId);
      formatWarehouseRowForCouriers({ baseRow: rowTemplate, courierStats: warehouseCourierStats, warehouseMap, selectedDomainType });

      tableRows.push(rowTemplate);

      // update total row
      totalRow.activeOrders += rowTemplate.activeOrders;
      totalRow.redBasket += rowTemplate.redBasket;
      totalRow.late += rowTemplate.late;
      totalRow.compliantUnitCount += rowTemplate.compliantUnitCount;
      totalRow.complianceTotalUnitCount += rowTemplate.complianceTotalUnitCount;
      totalRow.utilizedUnitCount += rowTemplate.utilizedUnitCount;
      totalRow.utilizableTotalUnitCount += rowTemplate.utilizableTotalUnitCount;
      totalRow.aggressionUnitCount += rowTemplate.aggressionUnitCount;
      totalRow.aggressionTotal += rowTemplate.aggressionTotal;
      totalRow.lowerETATotal += rowTemplate.lowerETATotal;
      totalRow.upperETATotal += rowTemplate.upperETATotal;
      totalRow.totalOrderCountWithETA += rowTemplate.totalOrderCountWithETA;
      totalRow.slottedOrderCount += rowTemplate.slottedOrderCount;
    });

  totalRow.utilization = totalRow.utilizableTotalUnitCount ? (totalRow.utilizedUnitCount * 100) / totalRow.utilizableTotalUnitCount : NOT_APPLICABLE_VALUE;
  totalRow.compliance = totalRow.complianceTotalUnitCount ? (totalRow.compliantUnitCount * 100) / totalRow.complianceTotalUnitCount : NOT_APPLICABLE_VALUE;
  totalRow.aggression = totalRow.aggressionTotal ? totalRow.aggressionTotal / totalRow.aggressionUnitCount : NOT_APPLICABLE_VALUE;
  totalRow.lowerETAAvg = totalRow.totalOrderCountWithETA ? totalRow.lowerETATotal / totalRow.totalOrderCountWithETA : NOT_APPLICABLE_VALUE;
  totalRow.upperETAAvg = totalRow.totalOrderCountWithETA ? totalRow.upperETATotal / totalRow.totalOrderCountWithETA : NOT_APPLICABLE_VALUE;

  return tableRows;
}

function getRowTemplate(id: string, name: string) {
  return {
    activeOrders: 0,
    redBasket: 0,
    late: 0,
    compliance: NOT_APPLICABLE_VALUE as number | string,
    // aggregation values so that we can calculate total compliance later
    compliantUnitCount: 0,
    complianceTotalUnitCount: 0,
    aggression: NOT_APPLICABLE_VALUE as number | string,
    aggressionUnitCount: 0,
    aggressionTotal: 0,
    // For utilization logic, check https://bitbucket.org/getirdev/panel-live-business-monitoring-cron/src/898ba743927f0cda085011846f3e5112ef579644/src/services/courier.ts#lines-11:28
    utilization: NOT_APPLICABLE_VALUE as number | string,
    // aggregation values so that we can calculate total utilization later
    utilizedUnitCount: 0,
    utilizableTotalUnitCount: 0,
    lowerETATotal: 0, // for summing up row values
    upperETATotal: 0,
    totalOrderCountWithETA: 0,
    lowerETAAvg: NOT_APPLICABLE_VALUE as string | number, // for average calculation
    upperETAAvg: NOT_APPLICABLE_VALUE as string | number,
    slottedOrderCount: 0,
    name: name || '-' as string,
    id: id || '-' as string,
  };
}

type CourierStats = WarehouseCourierCountsAndId;

type Row = ReturnType<typeof getRowTemplate>;

function formatCityRowForOperations(
  { baseRow, cityOperationData }: {
  baseRow: Row,
  cityOperationData: OperationStats[string],
},
) {
  if (isEmpty(cityOperationData)) return;
  Object.keys(cityOperationData).forEach(domainType => {
    // array of objects have integrationType field like getir, n11, etc.
    const domainData = cityOperationData[domainType];
    domainData.forEach(data => {
      const late = (data.lateOnHandover || 0) +
      (data?.lateOnOnway || 0) +
      (data?.lateOnPrepared || 0) +
      (data?.lateOnPreparing || 0) +
      (data?.lateOnReached || 0) +
      (data?.lateOnVerifying || 0) +
      (data?.lateOnWaitingForPicker || 0);

      baseRow.activeOrders += data.totalOrderCount || 0;
      baseRow.lowerETATotal += data.lowerETA || 0;
      baseRow.upperETATotal += data.upperETA || 0;
      baseRow.totalOrderCountWithETA += data.totalOrderCountWithETA || 0;
      baseRow.redBasket += data.getirRelatedErrorBasketCount || 0;
      baseRow.late += late;
      baseRow.slottedOrderCount += data.slottedOrderCount || 0;
    });
  });

  baseRow.lowerETAAvg = baseRow.totalOrderCountWithETA ? baseRow.lowerETATotal / baseRow.totalOrderCountWithETA : NOT_APPLICABLE_VALUE;
  baseRow.upperETAAvg = baseRow.totalOrderCountWithETA ? baseRow.upperETATotal / baseRow.totalOrderCountWithETA : NOT_APPLICABLE_VALUE;
}

function formatWarehouseRowForOperations(
  { baseRow, warehouseOperationStats }:
    {
  baseRow: Row,
  warehouseOperationStats: OperationStats[string],
},
) {
  if (isEmpty(warehouseOperationStats)) return;
  Object.keys(warehouseOperationStats).forEach(domainType => {
    const domainData = warehouseOperationStats[domainType];
    // array of objects have integrationType field like getir, n11, etc.
    domainData.forEach(data => {
      const late = (data.lateOnHandover || 0) +
      (data?.lateOnOnway || 0) +
      (data?.lateOnPrepared || 0) +
      (data?.lateOnPreparing || 0) +
      (data?.lateOnReached || 0) +
      (data?.lateOnVerifying || 0) +
      (data?.lateOnWaitingForPicker || 0);

      baseRow.activeOrders += data.totalOrderCount || 0;
      baseRow.lowerETATotal += data.lowerETA || 0;
      baseRow.upperETATotal += data.upperETA || 0;
      baseRow.totalOrderCountWithETA += data.totalOrderCountWithETA || 0;
      baseRow.redBasket += data.getirRelatedErrorBasketCount || 0;
      baseRow.late += late;
      baseRow.slottedOrderCount += data.slottedOrderCount || 0;
    });
  });

  baseRow.lowerETAAvg = baseRow.totalOrderCountWithETA ? baseRow.lowerETATotal / baseRow.totalOrderCountWithETA : NOT_APPLICABLE_VALUE;
  baseRow.upperETAAvg = baseRow.totalOrderCountWithETA ? baseRow.upperETATotal / baseRow.totalOrderCountWithETA : NOT_APPLICABLE_VALUE;
}

function formatCityRowForCouriers(
  { baseRow, cityCourierStats, warehouseMap, selectedDomainType }: {
  baseRow: Row,
  cityCourierStats: CourierStats[],
  warehouseMap: Map<string, OperationsWarehouse>,
  selectedDomainType: number,
},
) {
  if (isEmpty(cityCourierStats)) return;
  cityCourierStats.forEach(courierStats => {
    const { warehouseId } = courierStats;
    const populatedWarehouse = warehouseMap.get(warehouseId);
    if (!populatedWarehouse) return;
    if (selectedDomainType && !populatedWarehouse.domainTypes.includes(selectedDomainType)) return;

    const utilRes = utilizationLogic(courierStats, baseRow.utilizedUnitCount, baseRow.utilizableTotalUnitCount);
    baseRow.utilizedUnitCount = utilRes.count;
    baseRow.utilizableTotalUnitCount = utilRes.total;
    const complianceRes = complianceLogic(courierStats, baseRow.compliantUnitCount, baseRow.complianceTotalUnitCount);
    baseRow.compliantUnitCount = complianceRes.compliant;
    baseRow.complianceTotalUnitCount = complianceRes.total;
    const aggressionRes = aggressionLogic(populatedWarehouse, baseRow.aggressionUnitCount, baseRow.aggressionTotal);
    baseRow.aggressionUnitCount = aggressionRes.count;
    baseRow.aggressionTotal = aggressionRes.total;
  });

  baseRow.utilization = baseRow.utilizableTotalUnitCount ? (baseRow.utilizedUnitCount * 100) / baseRow.utilizableTotalUnitCount : NOT_APPLICABLE_VALUE;
  baseRow.compliance = baseRow.complianceTotalUnitCount ? (baseRow.compliantUnitCount * 100) / baseRow.complianceTotalUnitCount : NOT_APPLICABLE_VALUE;
  baseRow.aggression = baseRow.aggressionTotal ? baseRow.aggressionTotal / baseRow.aggressionUnitCount : NOT_APPLICABLE_VALUE;
}

function formatWarehouseRowForCouriers(
  { baseRow, courierStats, warehouseMap }: {
  baseRow: Row,
  courierStats: CourierStats | undefined,
  warehouseMap: Map<string, OperationsWarehouse>,
  selectedDomainType: number,
},
) {
  if (!courierStats) return;
  const { warehouseId } = courierStats;
  const populatedWarehouse = warehouseMap.get(warehouseId) as OperationsWarehouse;

  const utilRes = utilizationLogic(courierStats, baseRow.utilizedUnitCount, baseRow.utilizableTotalUnitCount);
  baseRow.utilizedUnitCount = utilRes.count;
  baseRow.utilizableTotalUnitCount = utilRes.total;
  baseRow.utilization = utilRes.value;

  const complianceRes = complianceLogic(courierStats, baseRow.compliantUnitCount, baseRow.complianceTotalUnitCount);
  baseRow.compliantUnitCount = courierStats.total;
  baseRow.complianceTotalUnitCount = courierStats.planned;
  baseRow.compliance = complianceRes.value;

  const aggressionRes = aggressionLogic(populatedWarehouse, baseRow.aggressionUnitCount, baseRow.aggressionTotal);
  baseRow.aggressionUnitCount = aggressionRes.count;
  baseRow.aggressionTotal = aggressionRes.total;
  baseRow.aggression = aggressionRes.value;
}

function utilizationLogic(courierStats : CourierStats, prevUnitCount: number, prevTotal: number) {
  if (!courierStats.utilizableTotal) {
    return { value: NOT_APPLICABLE_VALUE, count: prevUnitCount, total: prevTotal };
  }
  const utilization = (courierStats.utilized * 100) / courierStats.utilizableTotal;
  return { value: utilization, count: prevUnitCount + courierStats.utilized, total: prevTotal + courierStats.utilizableTotal };
}

function complianceLogic(courierStats: CourierStats, prevCompliant: number, prevTotal: number) {
  if (!courierStats.planned) {
    // if nothing was planned, then compliance is not applicable
    return { value: NOT_APPLICABLE_VALUE, compliant: prevCompliant, total: prevTotal };
  }
  const isCompliant = courierStats.total >= courierStats.planned;
  const compliance = (courierStats.total * 100) / courierStats.planned;
  if (!isCompliant) {
    return { value: compliance, compliant: prevCompliant, total: prevTotal + 1 };
  }
  return { value: compliance, compliant: prevCompliant + 1, total: prevTotal + 1 };
}

function aggressionLogic(warehouse: OperationsWarehouse, prevUnitCount: number, prevTotal: number) {
  if (typeof warehouse.aggressionLevel !== 'number') {
    return { value: NOT_APPLICABLE_VALUE, count: prevUnitCount, total: prevTotal };
  }
  return { value: warehouse.aggressionLevel, count: prevUnitCount + 1, total: prevTotal + warehouse.aggressionLevel };
}

function createWarehouseMap(warehouses: OperationsWarehouse[]) {
  const warehouseMap = new Map() as Map<string, OperationsWarehouse>;
  if (!Array.isArray(warehouses) || warehouses.length === 0) return warehouseMap;

  warehouses.forEach(warehouse => {
    warehouseMap.set(warehouse._id, warehouse);
  });

  return warehouseMap;
}

function createWarehouseCourierStatsMap(courierStats: CourierStats[]) {
  const courierStatsMap = new Map() as Map<string, CourierStats>;
  if (!Array.isArray(courierStats) || courierStats.length === 0) return courierStatsMap;

  courierStats.forEach(stats => {
    courierStatsMap.set(stats.warehouseId, stats);
  });

  return courierStatsMap;
}
