import axios from '@shared/axios/common';

const GETIR_LOCALS_GROWTH_DASHBOARD_BASE_URL = '/getirLocals/growthDashboard';

export const getMissedOrderCountsOfDeliveryTypes = async ({ filters }) => {
  const response = await axios({
    method: 'POST',
    url: `${GETIR_LOCALS_GROWTH_DASHBOARD_BASE_URL}/getMissedOrderCountsOfDeliveryTypesByDomainTypeWithinDateRanges`,
    data: { filters },
  });
  return response.data;
};

export const getOrderCountsOfDeliveryTypes = async ({ filters }) => {
  const response = await axios({
    method: 'POST',
    url: `${GETIR_LOCALS_GROWTH_DASHBOARD_BASE_URL}/getOrderCountsOfDeliveryTypesByDomainTypeWithinDateRanges`,
    data: { filters },
  });
  return response.data;
};

export const getNetRevenuesOfDeliveryTypes = async ({ filters }) => {
  const response = await axios({
    method: 'POST',
    url: `${GETIR_LOCALS_GROWTH_DASHBOARD_BASE_URL}/getNetRevenuesOfDeliveryTypesByDomainTypeWithinDateRanges`,
    data: { filters },
  });
  return response.data;
};
