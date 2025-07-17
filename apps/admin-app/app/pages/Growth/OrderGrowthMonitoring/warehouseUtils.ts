import {
  CityOperationStatsType,
  CourierStatusCountsWithCourierPlanType,
  FormattedOrderGrowthMonitoringDataType,
  SingleWarehouseStatsType,
  Warehouse,
  WarehouseStatsType,
} from '@app/pages/Growth/OrderGrowthMonitoring/orderGrowthMonitoring';

export const formatOrderGrowthMonitoringWarehouseData = (
  { courierStatusCountsWithCourierPlan, cityOperationStats, warehouseStats, warehouses } :
    {
      courierStatusCountsWithCourierPlan: CourierStatusCountsWithCourierPlanType,
      cityOperationStats: CityOperationStatsType,
      warehouseStats: WarehouseStatsType[],
      warehouses: Warehouse[],
    },
) => {
  const formattedData: FormattedOrderGrowthMonitoringDataType[] = [];

  // loop through each warehouse

  Object.values(warehouses || {}).forEach(warehouseData => {
    const totalNetRevenueByWarehouse = calculateTotalNetRevenueByWarehouse(
      { warehouseId: warehouseData?.id, warehouseStats, domainTypes: warehouseData?.domainTypes },
    );
    const courierStatDataByWarehouseId = getCourierStatDataByWarehouseId({ courierData: courierStatusCountsWithCourierPlan, warehouseId: warehouseData?.id });
    const domainTypeFormattedData = getDomainTypesFormattedData({
      warehouseStats,
      warehouseId: warehouseData?.id,
      cityOperationStats,
      courierData: courierStatusCountsWithCourierPlan,
      warehouses,
    });

    formattedData.push({
      rowFirst: {
        id: warehouseData?.id,
        name: warehouseData?.name,
        operationalDomainTypes: warehouseData?.domainTypes,
        status: warehouseData?.status,
      },
      total: {
        netRevenue: { todayValue: totalNetRevenueByWarehouse },
        utilization: courierStatDataByWarehouseId?.utilization,
      },
      ...domainTypeFormattedData,
    });
  });
  return formattedData;
};

// find the warehouse stats for the given warehouseId and calculate the total net revenue
function calculateTotalNetRevenueByWarehouse(
  { warehouseStats, warehouseId, domainTypes }:
    { warehouseStats: WarehouseStatsType[], warehouseId: string, domainTypes: number[] },
) {
  let totalNetRevenue = 0;
  (domainTypes || []).forEach(domainType => {
    const domainData = warehouseStats?.[domainType];
    const warehouseData = (domainData || [])
      // field names of food and locals are different (snake_case) because data comes from data-api-gw rather than panel-data-srv (postgres)
      .find(data => (data?.warehouse ? data.warehouse === warehouseId : data?.warehouse_id === warehouseId));
    if (warehouseData) {
      totalNetRevenue += warehouseData?.netRevenueTaxExcluded || warehouseData?.net_revenue_tax_excluded || 0;
    }
  });
  return totalNetRevenue;
}

function getDomainTypesFormattedData(
  { warehouseStats, warehouseId, cityOperationStats, courierData, warehouses }:
    {
      warehouseStats: WarehouseStatsType[],
      warehouseId: string,
      cityOperationStats: CityOperationStatsType,
      courierData: CourierStatusCountsWithCourierPlanType,
      warehouses: Warehouse[],
    },
) {
  const domainTypeFormattedData = {};

  Object.keys(warehouseStats || {}).forEach(domainType => {
    const domainData = warehouseStats?.[domainType];
    const courierStats = getCourierStatDataByWarehouseId({ courierData, warehouseId });

    // operationalDomainTypes breakdown by integrationType, so we should loop through each domainType
    const operationalDomainTypes = warehouses?.find(warehouseData => warehouseData?.id === warehouseId)?.domainTypes;

    const warehouseOperationStatsByDomainType = cityOperationStats?.[warehouseId]?.[domainType];
    if (courierStats || domainData || warehouseOperationStatsByDomainType) {
      // field names of food and locals are different (snake_case) because data comes from data-api-gw rather than panel-data-srv (postgres)
      const warehouseDomainData = domainData
        .find((data: SingleWarehouseStatsType) => (data?.warehouse ? data?.warehouse === warehouseId : data?.warehouse_id === warehouseId));

      domainTypeFormattedData[domainType] = {
        // courierStats do not have domainType breakdown,
        // so we should show the courier stats only if the domainType of the warehouse is in the operationalDomainTypes
        courierStats: operationalDomainTypes?.includes(warehouseDomainData?.domainType) ? { ...courierStats } : null,
        redBasket: warehouseOperationStatsByDomainType?.reduce((acc, curr) => acc + (curr?.getirRelatedErrorBasketCount || 0), 0),
        totalOrders: { todayValue: warehouseDomainData?.orderCount || warehouseDomainData?.order_count },
        orderDurations: {
          '0-29': warehouseOperationStatsByDomainType?.reduce((acc, curr) => acc + (curr?.['0-29'] || 0), 0),
          '30-59': warehouseOperationStatsByDomainType?.reduce((acc, curr) => acc + (curr?.['30-59'] || 0), 0),
          '60-89': warehouseOperationStatsByDomainType?.reduce((acc, curr) => acc + (curr?.['60-89'] || 0), 0),
          '90-119': warehouseOperationStatsByDomainType?.reduce((acc, curr) => acc + (curr?.['90-119'] || 0), 0),
          '+90': warehouseOperationStatsByDomainType?.reduce((acc, curr) => acc + (curr?.['+90'] || 0), 0),
          '-90': warehouseOperationStatsByDomainType?.reduce((acc, curr) => acc + (curr?.['-90'] || 0), 0),
        },
        activeOrders: warehouseOperationStatsByDomainType?.reduce((acc, curr) => acc + (curr?.totalOrderCount || 0), 0),
      };

      domainTypeFormattedData[domainType].courierStats = {
        ...domainTypeFormattedData[domainType].courierStats,
        calculatedUtilizationRate:
          (domainTypeFormattedData[domainType]?.courierStats?.utilized || 0) / (domainTypeFormattedData[domainType]?.courierStats?.utilizableTotal || 1),
      };
    }
  });
  return domainTypeFormattedData;
}

function getCourierStatDataByWarehouseId(
  { courierData, warehouseId }:
    { courierData: CourierStatusCountsWithCourierPlanType, warehouseId: string },
) {
  return courierData?.selectedCityData?.cityTotal?.warehouses?.find(warehouseData => warehouseData?.warehouseId === warehouseId);
}
