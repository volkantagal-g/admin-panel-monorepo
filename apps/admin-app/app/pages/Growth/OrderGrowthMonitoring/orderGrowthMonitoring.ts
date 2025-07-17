export type FilterType = {
  selectedCity: string | null,
  selectedDomainTypes: number[],
  selectedWarehouses: string[],
}

export type CityType = {
  id: MongoIDType,
  _id: MongoIDType
  name: {
    en: string,
    tr: string,
  },
  operationalDomainTypes: number[],
}

export type FormattedCityType = {
  [id: string]: {
    name: string,
    id: MongoIDType,
    operationalDomainTypes: number[],
  }
}

export type Warehouse = {
  id: MongoIDType,
  _id: MongoIDType,
  name: string,
  domainTypes: number[],
  city: string,
  status: number,
}

export type WarehousesType = Warehouse[]

export type WarehouseDomainTypeMapDataType = {
  [key: string]: number[],
}

export type CourierStats = {
  planned: number,
  total: number,
  free: number,
  onDuty: number,
  onOrder: number,
  returning: number,
  busy: number,
  utilized: number,
  utilizableTotal: number,
  utilization: number,
  totalWarehouseCount?: number,
}

export type OrderGrowthMonitoringWarehouseType = CourierStats & {
  warehouseId: MongoIDType,
}

export type CourierStatsByCityIdType = CourierStats & {
  warehouseId: MongoIDType,
}

export type ActiveOrderCounts = {
  active: number,
  batched: number,
  batchedRate: number,
  queued: number,
  '0-29': number,
  '30-59': number,
  '60-89': number,
  '90-119': number,
  '+90': number,
  '-90': number,
}

export type OrderCounts = {
  today: {
    count: number,
  },
  yesterday: {
    countGrowthComparedToToday: number,
  },
  lastWeek: {
    countGrowthComparedToToday: number,
  },
  batchedRate: number,
}

export type FinancialData = {
  today: {
    netRevenueTaxExcluded: number;
    netRevenueTaxExcludedGrowthComparedToToday?: number;
  };
  yesterday: {
    netRevenueTaxExcluded: number;
    netRevenueTaxExcludedGrowthComparedToToday?: number;
  };
  lastWeek: {
    netRevenueTaxExcluded: number;
    netRevenueTaxExcludedGrowthComparedToToday?: number;
  };
  batchedRate: number;
};

export type PreviousOrderCountsAndFinancial = {
  orderCounts: OrderCounts,
  financial: FinancialData,
}

export type OrderGrowthMonitoringDataType = {
  activeOrderCounts: {
    selectedCountryCitiesData: {
      [key: string]: {
        [key: string]: ActiveOrderCounts,
      },
    },
    selectedCountryTotalData: {
      [key: string]: ActiveOrderCounts,
    }
  },
  courierStatusCountsWithCourierPlan: {
    selectedCountryCitiesData: {
      [key: string]: {
        cityTotal: {
          warehouses: OrderGrowthMonitoringWarehouseType[],
          total: OrderGrowthMonitoringWarehouseType,
        },
      },
    },
    selectedCountryTotalData: {
      total: CourierStatsByCityIdType,
    },
  },
  previousOrderCountsAndFinancial: {
    selectedCountryCitiesData: {
      [key: string]: {
        [key: string]: PreviousOrderCountsAndFinancial,
      },
    },
    selectedCountryTotalData: {
      total: {
        [domainType: string]: PreviousOrderCountsAndFinancial,
      },
    },
  },
}

export type FormattedCityDataByDomainType = {
  activeOrders: number,
  totalOrders: {
    todayValue: number,
    changeRateToday: number,
    changeRateLastWeek: number,
  },
  orderDistribution: {
    batched: number,
    queued: number,
    failed: number,
  },
  utilization: number,
  redBasket: number,
  courierStats: CourierStats,
  orderDurations: ActiveOrderCounts,
}

export type FormattedOrderGrowthMonitoringDataType = {
  rowFirst: {
    id: MongoIDType,
    name: string,
    operationalDomainTypes?: number[],
    status?: number,
  },
  total: {
    netRevenue: {
      todayValue: number,
      changeRateToday?: number,
      changeRateLastWeek?: number,
    },
    utilization: number,
  },
} & {
  [domainType: string]: FormattedCityDataByDomainType,
}

export type CsvExportDataType = {
  name: string,
  activeOrders?: number,
  totalOrders: number,
  redBasket?: number,
  planned?: number,
  total?: number,
  free?: number,
  busy?: number,
  onOrder?: number,
  returning?: number,
  courierUtilization?: number | null,
  orderPerCourier?: number | null,
}

export type CalculatedCourierStatsType = {
  [domainType: string]: CourierStats & {
    totalWarehouseCount: number,
    utilization: number | string,
    calculatedUtilizationRate?: number,
  }
}

export type PaginationType = {
  currentPage: number,
  rowsPerPage: number,
}

export type WarehouseDataType = {
  [key: string]: SingleWarehouseStatsType[],
}

export type WarehouseStatsType = SingleWarehouseStatsType[];

export type SingleWarehouseStatsType = {
  busyHours: number,
  domainType: number,
  idleHours: number,
  missedOrderCount: number,
  netRevenue: number,
  netRevenueTaxExcluded: number,
  orderCount: number,
  scheduledOrderCount: number,
  utilizedHours: number,
  warehouse: string,
  batchOrder: BatchOrderType[];
  warehouse_id: MongoIDType;
  net_revenue_tax_excluded: number;
  order_count: number;
}

// order growth monitoring warehouse data
export type OrderStats = {
  waitingForPicker: number;
  lateOnWaitingForPicker: number;
  verifying: number;
  lateOnVerifying: number;
  preparing: number;
  lateOnPreparing: number;
  prepared: number;
  lateOnPrepared: number;
  handover: number;
  lateOnHandover: number;
  onway: number;
  lateOnOnway: number;
  reached: number;
  lateOnReached: number;
  totalOrderCount: number;
  lowerETA: number;
  upperETA: number;
  totalOrderCountWithETA: number;
  getirRelatedErrorBasketCount: number;
  paymentErrorBasketCount: number;
  totalErrorBasketCount: number;
  '0-29': number;
  '30-59': number;
  '60-89': number;
  '90-119': number;
  '+90': number;
  '-90': number;
  integrationType: string;
}

export type CityOperationStatsType = {
  [key: string]: {
    [key: number]: OrderStats[];
  };
}

export type BatchOrderType = {
  warehouse: string;
  domainType: number;
  batchIndex: number;
  orderCount: number;
  nonQueuedOrderCount: number;
  checkoutToReachDuration: number;
  checkoutToReachDurationNonQueued: number;
};

export type CourierStatusCountsWithCourierPlanType = {
  selectedCityData: {
    cityTotal: {
      warehouses: WarehouseDataType[],
      total: CourierStats,
    },
  }
}

export type OperationStats = {
    [key: string]: {
      [key: number]: OrderStats[];
    }
}

export type OperationStatsForWarehouse = {
    [key: string]: {
      [key: number]: OrderStats[];
    }
}
