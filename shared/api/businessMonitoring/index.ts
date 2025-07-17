import axios from '@shared/axios/common';
import type {
  CountryCitiesOperationStats,
  CourierStatusCountWithCourierPlanResponse,
} from '@shared/api/businessMonitoring/types';

const BASE_URL = '/businessMonitoring';

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

export type CityOperationStatsObj = {
  [key: string]: {
    [key: number]: OrderStats[];
  };
}

export async function getCourierStatusCountsWithCourierPlanV2({ selectedCity, onlyCityData }: { selectedCity?: string, onlyCityData?: boolean } = {}) {
  const { data } = await axios({
    method: 'post',
    url: `${BASE_URL}/getCourierStatusCountsWithCourierPlan`,
    data: { selectedCity, onlyCityData },
  });

  const counts = data?.courierStatusCountsWithCourierPlan as CourierStatusCountWithCourierPlanResponse;
  return counts;
}

export async function getCityOperationStats(
  { selectedCityId, domainType, domainTypes, integrationType }:
  { selectedCityId: string, domainType?: number, domainTypes?: number[], integrationType?: string},
) {
  const { data } = await axios({
    method: 'post',
    url: `${BASE_URL}/getCityOperationStats`,
    data: { selectedCityId, domainType, domainTypes, integrationType },
  });
  const stats = data?.cityStats as CityOperationStatsObj;
  return stats;
}

export async function getCountryCitiesOperationStats(
  { domainType, domainTypes, integrationType }:
  { domainType?: number, domainTypes?: number[], integrationType?: string},
) {
  const { data } = await axios({
    method: 'post',
    url: `${BASE_URL}/getCountryCitiesOperationStats`,
    data: { domainType, domainTypes, integrationType },
  });
  const stats = data?.countryCitiesStats as CountryCitiesOperationStats;
  return stats;
}

export async function getBusinessMonitoringDataForLiveMap(payload: any) {
  const { data } = await axios({
    method: 'post',
    url: `${BASE_URL}/getBusinessMonitoringDataForLiveMap`,
    data: payload,
  });
  return data;
}
