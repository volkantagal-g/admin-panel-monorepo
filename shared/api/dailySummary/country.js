import axios from '@shared/axios/common';

const DAILY_SUMMARY_BASE_URL = '/dailySummary/country';

const getCustomHeaders = ({ headers }) => {
  return { ...(Array.isArray(headers.selectedDivisionCountries) && { divisionCountries: headers.selectedDivisionCountries }) };
};

export const getPermittedOrderCountsData = async ({ filters, dimension, headers }) => {
  const response = await axios({
    method: 'POST',
    url: `${DAILY_SUMMARY_BASE_URL}/getPermittedOrderCountsData`,
    data: { filters, dimension },
    headers: getCustomHeaders({ headers }),
  });
  return response.data;
};

export const getPermittedPromoUsedCountsData = async ({ filters, dimension, headers }) => {
  const response = await axios({
    method: 'POST',
    url: `${DAILY_SUMMARY_BASE_URL}/getPermittedPromoUsedCountsData`,
    data: { filters, dimension },
    headers: getCustomHeaders({ headers }),
  });
  return response.data;
};

export const getPermittedOrganicCountsData = async ({ filters, dimension, headers }) => {
  const response = await axios({
    method: 'POST',
    url: `${DAILY_SUMMARY_BASE_URL}/getPermittedOrganicCountsData`,
    data: { filters, dimension },
    headers: getCustomHeaders({ headers }),
  });
  return response.data;
};

export const getPermittedMissedCountsData = async ({ filters, dimension, headers }) => {
  const response = await axios({
    method: 'POST',
    url: `${DAILY_SUMMARY_BASE_URL}/getPermittedMissedCountsData`,
    data: { filters, dimension },
    headers: getCustomHeaders({ headers }),
  });
  return response.data;
};

export const getPermittedDemandCountsData = async ({ filters, dimension, headers }) => {
  const response = await axios({
    method: 'POST',
    url: `${DAILY_SUMMARY_BASE_URL}/getPermittedDemandCountsData`,
    data: { filters, dimension },
    headers: getCustomHeaders({ headers }),
  });
  return response.data;
};

export const getPermittedUniqueTabClickCountsData = async ({ filters, dimension, headers }) => {
  const response = await axios({
    method: 'POST',
    url: `${DAILY_SUMMARY_BASE_URL}/getPermittedUniqueTabClickCountsData`,
    data: { filters, dimension },
    headers: getCustomHeaders({ headers }),
  });
  return response.data;
};

export const getPermittedTotalTabClickCountsData = async ({ filters, dimension, headers }) => {
  const response = await axios({
    method: 'POST',
    url: `${DAILY_SUMMARY_BASE_URL}/getPermittedTotalTabClickCountsData`,
    data: { filters, dimension },
    headers: getCustomHeaders({ headers }),
  });
  return response.data;
};

export const getPermittedUniqueAppOpenCountsData = async ({ filters, dimension, headers }) => {
  const response = await axios({
    method: 'POST',
    url: `${DAILY_SUMMARY_BASE_URL}/getPermittedUniqueAppOpenCountsData`,
    data: { filters, dimension },
    headers: getCustomHeaders({ headers }),
  });
  return response.data;
};

export const getPermittedTotalAppOpenCountsData = async ({ filters, dimension, headers }) => {
  const response = await axios({
    method: 'POST',
    url: `${DAILY_SUMMARY_BASE_URL}/getPermittedTotalAppOpenCountsData`,
    data: { filters, dimension },
    headers: getCustomHeaders({ headers }),
  });
  return response.data;
};

export const getGetirJobsData = async ({ filters, headers }) => {
  const response = await axios({
    method: 'POST',
    url: `${DAILY_SUMMARY_BASE_URL}/getGetirJobsData`,
    data: { filters },
    headers: getCustomHeaders({ headers }),
  });
  return response.data;
};

// Financials
export const getPermittedFinancialData = async ({ filters, dimensions, headers }) => {
  const response = await axios({
    method: 'POST',
    url: `${DAILY_SUMMARY_BASE_URL}/getPermittedFinancialData`,
    data: { filters, dimensions },
    headers: getCustomHeaders({ headers }),
  });
  return response.data;
};

// GetirN11
export const getGetirN11Data = async ({ filters, headers }) => {
  const response = await axios({
    method: 'POST',
    url: `${DAILY_SUMMARY_BASE_URL}/getGetirN11Data`,
    data: { filters },
    headers: getCustomHeaders({ headers }),
  });
  return response.data;
};

// GetirKuzeyden
export const getGetirKuzeydenData = async ({ filters, headers }) => {
  const response = await axios({
    method: 'POST',
    url: `${DAILY_SUMMARY_BASE_URL}/getGetirKuzeydenData`,
    data: { filters },
    headers: getCustomHeaders({ headers }),
  });
  return response.data;
};

export const getGetirFoodData = async ({ filters, headers }) => {
  const response = await axios({
    method: 'POST',
    url: `${DAILY_SUMMARY_BASE_URL}/getGetirFoodData`,
    data: { filters },
    headers: getCustomHeaders({ headers }),
  });
  return response.data;
};

export const getGetirLocalsData = async ({ filters, headers }) => {
  const response = await axios({
    method: 'POST',
    url: `${DAILY_SUMMARY_BASE_URL}/getGetirLocalsData`,
    data: { filters },
    headers: getCustomHeaders({ headers }),
  });
  return response.data;
};

export const getGetirDriveData = async ({ filters, headers }) => {
  const response = await axios({
    method: 'POST',
    url: `${DAILY_SUMMARY_BASE_URL}/getGetirDriveData`,
    data: { filters },
    headers: getCustomHeaders({ headers }),
  });
  return response.data;
};

export const getGetirSelectData = async ({ filters, headers }) => {
  const response = await axios({
    method: 'POST',
    url: `${DAILY_SUMMARY_BASE_URL}/getGetirSelectData`,
    data: { filters },
    headers: getCustomHeaders({ headers }),
  });
  return response.data;
};

export const getGorillasData = async ({ filters, dimensions, headers }) => {
  const response = await axios({
    method: 'POST',
    url: `${DAILY_SUMMARY_BASE_URL}/getGorillasData`,
    data: { filters, dimensions },
    headers: getCustomHeaders({ headers }),
  });
  return response.data;
};

export const getGetirMarketIntegrationData = async ({ filters, dimensions, headers }) => {
  const response = await axios({
    method: 'POST',
    url: `${DAILY_SUMMARY_BASE_URL}/getGetirMarketIntegrationData`,
    data: { filters, dimensions },
    headers: getCustomHeaders({ headers }),
  });
  return response.data;
};
