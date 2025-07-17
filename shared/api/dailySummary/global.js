import axios from '@shared/axios/common';

const DAILY_SUMMARY_BASE_URL = '/dailySummary';

export const getPermittedOrderCountsData = async ({ filters, dimension }) => {
  const response = await axios({
    method: 'POST',
    url: `${DAILY_SUMMARY_BASE_URL}/getPermittedOrderCountsData`,
    data: { filters, dimension },
  });
  return response.data;
};

export const getPermittedPromoUsedCountsData = async ({ filters, dimension }) => {
  const response = await axios({
    method: 'POST',
    url: `${DAILY_SUMMARY_BASE_URL}/getPermittedPromoUsedCountsData`,
    data: { filters, dimension },
  });
  return response.data;
};

export const getPermittedOrganicCountsData = async ({ filters, dimension }) => {
  const response = await axios({
    method: 'POST',
    url: `${DAILY_SUMMARY_BASE_URL}/getPermittedOrganicCountsData`,
    data: { filters, dimension },
  });
  return response.data;
};

export const getPermittedMissedCountsData = async ({ filters, dimension }) => {
  const response = await axios({
    method: 'POST',
    url: `${DAILY_SUMMARY_BASE_URL}/getPermittedMissedCountsData`,
    data: { filters, dimension },
  });
  return response.data;
};

export const getPermittedDemandCountsData = async ({ filters, dimension }) => {
  const response = await axios({
    method: 'POST',
    url: `${DAILY_SUMMARY_BASE_URL}/getPermittedDemandCountsData`,
    data: { filters, dimension },
  });
  return response.data;
};

export const getPermittedUniqueTabClickCountsData = async ({ filters, dimension }) => {
  const response = await axios({
    method: 'POST',
    url: `${DAILY_SUMMARY_BASE_URL}/getPermittedUniqueTabClickCountsData`,
    data: { filters, dimension },
  });
  return response.data;
};

export const getPermittedTotalTabClickCountsData = async ({ filters, dimension }) => {
  const response = await axios({
    method: 'POST',
    url: `${DAILY_SUMMARY_BASE_URL}/getPermittedTotalTabClickCountsData`,
    data: { filters, dimension },
  });
  return response.data;
};

export const getTotalAppOpenCountsByCountryData = async ({ filters, dimensions }) => {
  const response = await axios({
    method: 'POST',
    url: `${DAILY_SUMMARY_BASE_URL}/getTotalAppOpenCountsByCountryData`,
    data: { filters, dimensions },
  });
  return response.data;
};

export const getUniqueAppOpenCountsByCountryData = async ({ filters, dimensions }) => {
  const response = await axios({
    method: 'POST',
    url: `${DAILY_SUMMARY_BASE_URL}/getUniqueAppOpenCountsByCountryData`,
    data: { filters, dimensions },
  });
  return response.data;
};

export const getGetirJobsData = async ({ filters, dimensions }) => {
  const response = await axios({
    method: 'POST',
    url: `${DAILY_SUMMARY_BASE_URL}/getGetirJobsData`,
    data: { filters, dimensions },
  });
  return response.data;
};

export const getGetirFoodData = async ({ filters, dimensions }) => {
  const response = await axios({
    method: 'POST',
    url: `${DAILY_SUMMARY_BASE_URL}/getGetirFoodData`,
    data: { filters, dimensions },
  });
  return response.data;
};

export const getGetirLocalsData = async ({ filters, dimensions }) => {
  const response = await axios({
    method: 'POST',
    url: `${DAILY_SUMMARY_BASE_URL}/getGetirLocalsData`,
    data: { filters, dimensions },
  });
  return response.data;
};

export const getGetirDriveData = async ({ filters, dimensions }) => {
  const response = await axios({
    method: 'POST',
    url: `${DAILY_SUMMARY_BASE_URL}/getGetirDriveData`,
    data: { filters, dimensions },
  });
  return response.data;
};

// Financials
export const getPermittedFinancialsData = async ({ filters, dimensions }) => {
  const response = await axios({
    method: 'POST',
    url: `${DAILY_SUMMARY_BASE_URL}/getPermittedFinancialsData`,
    data: { filters, dimensions },
  });
  return response.data;
};

// GetirN11
export const getGetirN11Data = async ({ filters, dimensions }) => {
  const response = await axios({
    method: 'POST',
    url: `${DAILY_SUMMARY_BASE_URL}/getGetirN11Data`,
    data: { filters, dimensions },
  });
  return response.data;
};

// GetirKuzeyden
export const getGetirKuzeydenData = async ({ filters, dimensions }) => {
  const response = await axios({
    method: 'POST',
    url: `${DAILY_SUMMARY_BASE_URL}/getGetirKuzeydenData`,
    data: { filters, dimensions },
  });
  return response.data;
};

// Founders Custom
export const getFoundersCustomOrderCountNetRevenueGMVData = async ({ filters }) => {
  const response = await axios({
    method: 'POST',
    url: `${DAILY_SUMMARY_BASE_URL}/getFoundersCustomOrderCountNetRevenueGMVData`,
    data: { filters },
  });

  return response.data;
};

// GetirSelect
export const getGetirSelectData = async ({ filters }) => {
  const response = await axios({
    method: 'POST',
    url: `${DAILY_SUMMARY_BASE_URL}/getGetirSelectData`,
    data: { filters },
  });
  return response.data;
};

// Gorillas
export const getGorillasData = async ({ filters, dimensions }) => {
  const response = await axios({
    method: 'POST',
    url: `${DAILY_SUMMARY_BASE_URL}/getGorillasData`,
    data: { filters, dimensions },
  });
  return response.data;
};

// GetirMarket Integration
export const getGetirMarketIntegrationData = async ({ filters, dimensions }) => {
  const response = await axios({
    method: 'POST',
    url: `${DAILY_SUMMARY_BASE_URL}/getGetirMarketIntegrationData`,
    data: { filters, dimensions },
  });
  return response.data;
};
