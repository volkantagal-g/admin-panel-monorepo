import axios from '@shared/axios/common';

const getirDriveDashboard = '/getirDrive/dashboard';

export const getInstantVehicleStatus = async params => {
  const { data } = await axios({
    method: 'POST',
    url: `${getirDriveDashboard}/instant-vehicle-status`,
    data: params,
  });

  return { data };
};
export const getRentalStatus = async params => {
  const { data } = await axios({
    method: 'POST',
    url: `${getirDriveDashboard}/rental-status`,
    data: params,
  });

  return { data };
};
export const getFinancial = async params => {
  const { data } = await axios({
    method: 'POST',
    url: `${getirDriveDashboard}/financial`,
    data: params,
  });

  return { data };
};
export const getFinancialDistribution = async params => {
  const { data } = await axios({
    method: 'POST',
    url: `${getirDriveDashboard}/financial-distribution`,
    data: params,
  });

  return { data };
};
export const getVehicleBasedStats = async params => {
  const { data } = await axios({
    method: 'POST',
    url: `${getirDriveDashboard}/vehicle-based-stats`,
    data: params,
  });

  return { data };
};
export const getClientDistribution = async params => {
  const { data } = await axios({
    method: 'POST',
    url: `${getirDriveDashboard}/client-distribution`,
    data: params,
  });

  return { data };
};
export const getNewClientDistribution = async params => {
  const { data } = await axios({
    method: 'POST',
    url: `${getirDriveDashboard}/new-client-distribution`,
    data: params,
  });

  return { data };
};
export const getCleaningScoreCounts = async params => {
  const { data } = await axios({
    method: 'POST',
    url: `${getirDriveDashboard}/cleaning-score-counts`,
    data: params,
  });

  return { data };
};
export const getRateCounts = async params => {
  const { data } = await axios({
    method: 'POST',
    url: `${getirDriveDashboard}/rate-counts`,
    data: params,
  });

  return { data };
};
export const getRentTimeSeries = async params => {
  const { data } = await axios({
    method: 'POST',
    url: `${getirDriveDashboard}/rent-time-series`,
    data: params,
  });

  return { data };
};
export const getNetRevenueTimeSeries = async params => {
  const { data } = await axios({
    method: 'POST',
    url: `${getirDriveDashboard}/net-revenue-time-series`,
    data: params,
  });

  return { data };
};
export const getExternalSourcesSummary = async params => {
  const { data } = await axios({
    method: 'POST',
    url: `${getirDriveDashboard}/external-sources-summary`,
    data: params,
  });

  return { data };
};
export const getRentalCountByNetRevenue = async params => {
  const { data } = await axios({
    method: 'POST',
    url: `${getirDriveDashboard}/rental-count-by-net-revenue`,
    data: params,
  });

  return { data };
};
export const getRentalCountByDuration = async params => {
  const { data } = await axios({
    method: 'POST',
    url: `${getirDriveDashboard}/rental-count-by-duration`,
    data: params,
  });

  return { data };
};
export const getRentalCountByDistance = async params => {
  const { data } = await axios({
    method: 'POST',
    url: `${getirDriveDashboard}/rental-count-by-distance`,
    data: params,
  });

  return { data };
};
export const getDailyFrequency = async params => {
  const { data } = await axios({
    method: 'POST',
    url: `${getirDriveDashboard}/daily-frequency`,
    data: params,
  });

  return { data };
};
export const getPromoDistribution = async params => {
  const { data } = await axios({
    method: 'POST',
    url: `${getirDriveDashboard}/promo-distribution`,
    data: params,
  });

  return { data };
};
export const getRentalTypeDistribution = async params => {
  const { data } = await axios({
    method: 'POST',
    url: `${getirDriveDashboard}/rental-type-distribution`,
    data: params,
  });

  return { data };
};
