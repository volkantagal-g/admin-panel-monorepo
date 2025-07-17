import axios from '@shared/axios/common';
import { GetWarehouseOrderStatsType } from './type';

const getirMarketDashboard = '/getirMarket/dashboard';

export type GetWarehouseOrderStatsParams = {
  startDate: string;
  endDate: string;
  cities: string[];
  hours: number[];
  domainTypes: number[];
  integrationTypes: string[];
};

export async function getWarehouseOrderStats(params: GetWarehouseOrderStatsParams) {
  const response = await axios.post<GetWarehouseOrderStatsType>(
    `${getirMarketDashboard}/getWarehouseOrderStats`,
    params,
  );

  return response.data;
}
