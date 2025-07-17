export type WarehouseCourierCounts = {
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
}

export type WarehouseCourierCountsAndId = WarehouseCourierCounts & { warehouseId: string };

export type CourierStatusCountWithCourierPlanResponse = {
  selectedCityData?: {
    cityTotal: {
      total: WarehouseCourierCounts,
      warehouses: WarehouseCourierCountsAndId[],
    },
    byVehicleTypes: {
      [vehicleType: string]: {
        total: WarehouseCourierCounts,
        warehouses: WarehouseCourierCountsAndId[],
      } | undefined,
    },
  },
  selectedCountryCitiesData?: {
    [cityId: string]: {
      cityTotal: {
        total: WarehouseCourierCounts,
        warehouses: WarehouseCourierCountsAndId[],
      },
      byVehicleTypes: {
        [vehicleType: string]: {
          total: WarehouseCourierCounts,
          warehouses: WarehouseCourierCountsAndId[],
        } | undefined,
      },
    } | undefined,
  },
  selectedCountryTotalData?: {
    total: WarehouseCourierCounts,
    byVehicleTypes: {
      [vehicleType: string]: WarehouseCourierCounts | undefined,
    },
  },
  selectedDivisionTotalData?: {
    total: WarehouseCourierCounts,
    byVehicleTypes: {
      [vehicleType: string]: WarehouseCourierCounts | undefined,
    },
  },
  worldWideTotalData?: {
    total: WarehouseCourierCounts,
    byVehicleTypes: {
      [vehicleType: string]: WarehouseCourierCounts | undefined,
    },
  },
  debug: {},
};

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
  slottedOrderCount: number;
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

export type CountryCitiesOperationStats = {
  countryCitiesStats: {
    [key: string]: {
      [key: number]: OrderStats[];
    };
  }
}

export type CityOperationStats = {
  cityStats: {
    [key: string]: {
      [key: number]: OrderStats[];
    };
  }
}
