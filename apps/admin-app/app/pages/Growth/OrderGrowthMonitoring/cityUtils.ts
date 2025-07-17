import { getLangKey } from '@shared/i18n';
import {
  CalculatedCourierStatsType,
  CityType,
  CourierStatsByCityIdType,
  FormattedCityDataByDomainType,
  FormattedOrderGrowthMonitoringDataType,
  OperationStats,
  OrderGrowthMonitoringDataType,
  OrderGrowthMonitoringWarehouseType,
  Warehouse,
  WarehouseDomainTypeMapDataType,
} from '@app/pages/Growth/OrderGrowthMonitoring/orderGrowthMonitoring';
import { NOT_APPLICABLE_VALUE } from './constants';
import { OrderStats } from '@shared/api/businessMonitoring/types';

const langKey = getLangKey();
export const formatOrderGrowthMonitoringCitiesData =
  ({ data, cities, warehouses, operationStatsData }:
     {
       data: OrderGrowthMonitoringDataType,
       cities: CityType[],
       warehouses: Warehouse[],
       operationStatsData: OperationStats,
     }) => {
    const formattedData: FormattedOrderGrowthMonitoringDataType[] = [];
    // loop for each city
    (cities || {}).forEach((city: CityType) => {
      const cityId = city._id || city.id;
      const cityName = city?.name?.[langKey];
      const operationStatsByCity = operationStatsData?.[cityId];
      const domainTypesFormattedData = getDomainTypesFormattedData({ data, cityId, warehouses, operationStatsByCity });
      const calculatedNetRevenue = calculateNetRevenue({ data, cityId });
      const utilizationByCity = data?.courierStatusCountsWithCourierPlan?.selectedCountryCitiesData?.[cityId]?.cityTotal?.total?.utilization || 0;

      formattedData.push({
        rowFirst: {
          id: cityId,
          name: cityName,
          operationalDomainTypes: city?.operationalDomainTypes || [],
        },
        // calculate total values
        total: {
          netRevenue: { ...calculatedNetRevenue },
          utilization: utilizationByCity,
        },
        ...domainTypesFormattedData,
      });
    });

    const formattedTotalData = calculateTotalData({ data, formattedData });
    return formattedData.concat(formattedTotalData);
  };

export function calculateTotalData({ data, formattedData }:
    {data: OrderGrowthMonitoringDataType, formattedData: FormattedOrderGrowthMonitoringDataType[]}): FormattedOrderGrowthMonitoringDataType[] {
  const countryNetRevenueAndOrderData = data?.previousOrderCountsAndFinancial?.selectedCountryTotalData;
  const countryActiveOrderCounts = data?.activeOrderCounts?.selectedCountryTotalData;
  const totalUtilization = data?.courierStatusCountsWithCourierPlan?.selectedCountryTotalData?.total?.utilization;

  const formattedCountryTotalData: any = {
    rowFirst: {
      id: '',
      name: 'Total',
    },
    total: {
      utilization: totalUtilization,
      netRevenue: {},
    },
  };

  Object.entries(countryNetRevenueAndOrderData || {}).forEach(([domainType, domainTypeData]) => {
    formattedCountryTotalData.total = {
      ...formattedCountryTotalData.total,
      netRevenue: {
        todayValue: domainTypeData?.financial?.today?.netRevenueTaxExcluded,
        changeRateToday: domainTypeData?.financial?.yesterday?.netRevenueTaxExcludedGrowthComparedToToday,
        changeRateLastWeek: domainTypeData?.financial?.lastWeek?.netRevenueTaxExcludedGrowthComparedToToday,
      },
    };
    if (domainType !== 'total') {
      formattedCountryTotalData[domainType] = {
        activeOrders: countryActiveOrderCounts?.[domainType]?.active,
        totalOrders: {
          todayValue: domainTypeData?.orderCounts?.today.count,
          changeRateToday: domainTypeData?.orderCounts?.yesterday?.countGrowthComparedToToday,
          changeRateLastWeek: domainTypeData?.orderCounts?.lastWeek?.countGrowthComparedToToday,
        },
        orderDistribution: {
          batched: countryActiveOrderCounts?.[domainType]?.batchedRate,
          queued: countryActiveOrderCounts?.[domainType]?.queued,
        },
        orderDurations: countryActiveOrderCounts?.[domainType],
      };

      Object.values(formattedData).forEach(cityData => {
        formattedCountryTotalData[domainType] = {
          ...formattedCountryTotalData[domainType],
          courierStats: {
            planned: (formattedCountryTotalData[domainType]?.courierStats?.planned || 0) + (cityData[domainType]?.courierStats?.planned || 0),
            total: (formattedCountryTotalData[domainType]?.courierStats?.total || 0) + (cityData[domainType]?.courierStats?.total || 0),
            free: (formattedCountryTotalData[domainType]?.courierStats?.free || 0) + (cityData[domainType]?.courierStats?.free || 0),
            onDuty: (formattedCountryTotalData[domainType]?.courierStats?.onDuty || 0) + (cityData[domainType]?.courierStats?.onDuty || 0),
            onOrder: (formattedCountryTotalData[domainType]?.courierStats?.onOrder || 0) + (cityData[domainType]?.courierStats?.onOrder || 0),
            returning: (formattedCountryTotalData[domainType]?.courierStats?.returning || 0) + (cityData[domainType]?.courierStats?.returning || 0),
            busy: (formattedCountryTotalData[domainType]?.courierStats?.busy || 0) + (cityData[domainType]?.courierStats?.busy || 0),
            utilized: (formattedCountryTotalData[domainType]?.courierStats?.utilized || 0) + (cityData[domainType]?.courierStats?.utilized || 0),
            utilizableTotal: (formattedCountryTotalData[domainType]?.courierStats?.utilizableTotal || 0) +
              (cityData[domainType]?.courierStats?.utilizableTotal || 0),
            utilization: (formattedCountryTotalData[domainType]?.courierStats?.utilization || 0) + (cityData[domainType]?.courierStats?.utilization || 0),
            totalWarehouseCount: (formattedCountryTotalData[domainType]?.courierStats?.totalWarehouseCount || 0) +
              (cityData[domainType]?.courierStats?.totalWarehouseCount || 0),
          },
          redBasket: (formattedCountryTotalData[domainType]?.redBasket || 0) + (cityData[domainType]?.redBasket || 0),
          orderDistribution: {
            ...formattedCountryTotalData[domainType]?.orderDistribution,
            failed: (formattedCountryTotalData[domainType]?.orderDistribution?.failed || 0) + (cityData[domainType]?.orderDistribution?.failed || 0),
          },
        };
      });

      formattedCountryTotalData[domainType].courierStats.calculatedUtilizationRate =
        formattedCountryTotalData[domainType].courierStats.utilized / formattedCountryTotalData[domainType].courierStats.utilizableTotal;
    }
  });

  return formattedCountryTotalData;
}

export function calculateNetRevenue({ data, cityId }: {data: OrderGrowthMonitoringDataType, cityId: string}) {
  const netRevenue = {
    todayValue: 0,
    yesterdayValue: 0,
    LastWeekValue: 0,
  };
  (Object.values(data?.previousOrderCountsAndFinancial?.selectedCountryCitiesData[cityId] || {})).forEach(domainTypeData => {
    netRevenue.todayValue += domainTypeData?.financial?.today?.netRevenueTaxExcluded || 0;
    netRevenue.yesterdayValue += domainTypeData?.financial?.yesterday?.netRevenueTaxExcluded || 0;
    netRevenue.LastWeekValue += domainTypeData?.financial?.lastWeek?.netRevenueTaxExcluded || 0;
  });
  const changeRateToday = netRevenue.yesterdayValue ?
    Math.trunc(((netRevenue.todayValue - netRevenue.yesterdayValue) / netRevenue.yesterdayValue) * 100) :
    NOT_APPLICABLE_VALUE;
  const changeRateLastWeek = netRevenue.LastWeekValue ?
    Math.trunc(((netRevenue.todayValue - netRevenue.LastWeekValue) / netRevenue.LastWeekValue) * 100) :
    NOT_APPLICABLE_VALUE;
  return {
    todayValue: netRevenue.todayValue,
    changeRateToday,
    changeRateLastWeek,
  };
}

export function getDomainTypesFormattedData(
  { data, cityId, warehouses, operationStatsByCity }:
    {data: OrderGrowthMonitoringDataType, cityId: string, warehouses: Warehouse[], operationStatsByCity: { [key: string]: OrderStats[] }},
) {
  // formatted data for each domain type like 1: {}, 2: {}, 3: {} based on the cityId
  const domainTypesFormattedData: { [key: string]: FormattedCityDataByDomainType } = {};

  // get data from the endpoint based on the cityId
  const orderCountAndFinancialDataByCityId = data?.previousOrderCountsAndFinancial?.selectedCountryCitiesData[cityId];
  const activeOrderCounts = data?.activeOrderCounts?.selectedCountryCitiesData[cityId];
  const courierStatsByCityId = data?.courierStatusCountsWithCourierPlan?.selectedCountryCitiesData?.[cityId]?.cityTotal?.warehouses;

  // we need warehouseId to domainType mapping to calculate courier stats
  const warehouseDomainTypeMapData: WarehouseDomainTypeMapDataType = getWarehouseDomainTypeMapData({ warehouses });

  // we should check warehouseId to domainType mapping from the warehouse data
  // and calculate courier stats based on the domain type
  const calculatedCourierStats: CalculatedCourierStatsType = getCalculatedCourierStats(
    { courierStatsByCityId, warehouseDomainTypeMapData },
  );

  Object.entries(orderCountAndFinancialDataByCityId || {}).forEach(([domainType, domainTypeData]) => {
    let totalFailedOrders = 0;
    let totalGetirRelatedFailedOrders = 0;

    // operationStats data is used to calculate the total failed orders
    // data includes integrationType breakdown for each domain type if available like 'getir', 'n11'
    // because of this, we need to loop for each integrationType
    (operationStatsByCity?.[domainType] || []).forEach(operationData => {
      totalFailedOrders += operationData.totalErrorBasketCount;
      totalGetirRelatedFailedOrders += operationData.getirRelatedErrorBasketCount;
    });
    domainTypesFormattedData[domainType] = {
      activeOrders: activeOrderCounts?.[domainType]?.active,
      totalOrders: {
        todayValue: domainTypeData?.orderCounts?.today?.count,
        changeRateToday: domainTypeData?.orderCounts?.yesterday?.countGrowthComparedToToday,
        changeRateLastWeek: domainTypeData?.orderCounts?.lastWeek?.countGrowthComparedToToday,
      },
      orderDurations: {
        '0-29': activeOrderCounts?.[domainType]['0-29'] || 0,
        '30-59': activeOrderCounts?.[domainType]['30-59'] || 0,
        '60-89': activeOrderCounts?.[domainType]['60-89'] || 0,
        '90-119': activeOrderCounts?.[domainType]['90-119'] || 0,
        '+90': activeOrderCounts?.[domainType]['+90'] || 0,
        '-90': activeOrderCounts?.[domainType]['-90'] || 0,
        batched: activeOrderCounts?.[domainType].batched || 0,
        queued: activeOrderCounts?.[domainType].queued || 0,
        active: activeOrderCounts?.[domainType].active || 0,
        batchedRate: activeOrderCounts?.[domainType].batchedRate || 0,
      },
      orderDistribution: {
        batched: activeOrderCounts?.[domainType].batchedRate || 0,
        queued: activeOrderCounts?.[domainType].queued || 0,
        failed: totalFailedOrders,
      },
      courierStats: calculatedCourierStats[domainType] || {},
      redBasket: totalGetirRelatedFailedOrders,
    };
  });
  return domainTypesFormattedData;
}

function getCalculatedCourierStats(
  { courierStatsByCityId, warehouseDomainTypeMapData }:
    {courierStatsByCityId: CourierStatsByCityIdType[], warehouseDomainTypeMapData: WarehouseDomainTypeMapDataType},
) {
  const formattedCourierStats: CalculatedCourierStatsType = {};
  // loop for each courier stats by city id
  (courierStatsByCityId || []).forEach((courierStats: OrderGrowthMonitoringWarehouseType) => {
    const warehouseDomainTypes = warehouseDomainTypeMapData[courierStats?.warehouseId];

    // check if the warehouse domain type is included in the city operational domain types
    // if yes, then calculate the courier stats, otherwise skip
    (warehouseDomainTypes || []).forEach((domainType: number) => {
      if (warehouseDomainTypes?.includes(domainType)) {
        formattedCourierStats[domainType] = formattedCourierStats[domainType] || {
          planned: 0,
          total: 0,
          free: 0,
          onDuty: 0,
          onOrder: 0,
          returning: 0,
          busy: 0,
          utilized: 0,
          utilizableTotal: 0,
          utilization: 0,
          totalWarehouseCount: 0,
        };
        formattedCourierStats[domainType].planned += courierStats?.planned || 0;
        formattedCourierStats[domainType].total += courierStats?.total || 0;
        formattedCourierStats[domainType].free += courierStats?.free || 0;
        formattedCourierStats[domainType].onDuty += courierStats?.onDuty || 0;
        formattedCourierStats[domainType].onOrder += courierStats?.onOrder || 0;
        formattedCourierStats[domainType].returning += courierStats?.returning || 0;
        formattedCourierStats[domainType].busy += courierStats?.busy || 0;
        formattedCourierStats[domainType].utilized += courierStats?.utilized || 0;
        formattedCourierStats[domainType].utilization += courierStats?.utilization || 0;
        formattedCourierStats[domainType].utilizableTotal += courierStats?.utilizableTotal || 0;

        // if the warehouse is utilizable, increment the total warehouse count
        // this is used to calculate the total utilization rate
        if (courierStats?.utilizableTotal) {
          formattedCourierStats[domainType].totalWarehouseCount += 1;
        }
      }
      formattedCourierStats[domainType].calculatedUtilizationRate =
        formattedCourierStats[domainType].utilized / formattedCourierStats[domainType].utilizableTotal;
    });
  });

  return formattedCourierStats;
}

export function getWarehouseDomainTypeMapData({ warehouses }: {warehouses: Warehouse[]}) {
  const warehouseDomainTypeMap: WarehouseDomainTypeMapDataType = {};
  warehouses.forEach(warehouseData => {
    warehouseDomainTypeMap[warehouseData.id] = warehouseData.domainTypes;
  });
  return warehouseDomainTypeMap;
}
