import {
  getInstantVehicleStatus,
  getRentalStatus,
  getFinancial,
  getFinancialDistribution,
  getVehicleBasedStats,
  getClientDistribution,
  getNewClientDistribution,
  getCleaningScoreCounts,
  getRateCounts,
  getRentTimeSeries,
  getNetRevenueTimeSeries,
  getExternalSourcesSummary,
  getRentalCountByNetRevenue,
  getRentalCountByDuration,
  getRentalCountByDistance,
  getDailyFrequency,
  getPromoDistribution,
  getRentalTypeDistribution,
} from './index.mock.data';

const getirDriveDashboard = '/getirDrive/dashboard';

const instantVehicleStatus = {
  url: `${getirDriveDashboard}/instant-vehicle-status`,
  successData: getInstantVehicleStatus,
};

const rentalStatus = {
  url: `${getirDriveDashboard}/rental-status`,
  successData: getRentalStatus,
};

const financial = {
  url: `${getirDriveDashboard}/financial`,
  successData: getFinancial,
};

const financialDistribution = {
  url: `${getirDriveDashboard}/financial-distribution`,
  successData: getFinancialDistribution,
};

const vehicleBasedStats = {
  url: `${getirDriveDashboard}/vehicle-based-stats`,
  successData: getVehicleBasedStats,
};

const clientDistribution = {
  url: `${getirDriveDashboard}/client-distribution`,
  successData: getClientDistribution,
};

const newClientDistribution = {
  url: `${getirDriveDashboard}/new-client-distribution`,
  successData: getNewClientDistribution,
};

const cleaningScoreCounts = {
  url: `${getirDriveDashboard}/cleaning-score-counts`,
  successData: getCleaningScoreCounts,
};

const rateCounts = {
  url: `${getirDriveDashboard}/rate-counts`,
  successData: getRateCounts,
};

const rentTimeSeries = {
  url: `${getirDriveDashboard}/rent-time-series`,
  successData: getRentTimeSeries,
};

const netRevenueTimeSeries = {
  url: `${getirDriveDashboard}/net-revenue-time-series`,
  successData: getNetRevenueTimeSeries,
};

const externalSourcesSummary = {
  url: `${getirDriveDashboard}/external-sources-summary`,
  successData: getExternalSourcesSummary,
};

const rentalCountByNetRevenue = {
  url: `${getirDriveDashboard}/rental-count-by-net-revenue`,
  successData: getRentalCountByNetRevenue,
};

const rentalCountByDuration = {
  url: `${getirDriveDashboard}/rental-count-by-duration`,
  successData: getRentalCountByDuration,
};

const rentalCountByDistance = {
  url: `${getirDriveDashboard}/rental-count-by-distance`,
  successData: getRentalCountByDistance,
};

const dailyFrequency = {
  url: `${getirDriveDashboard}/daily-frequency`,
  successData: getDailyFrequency,
};

const promoDistribution = {
  url: `${getirDriveDashboard}/promo-distribution`,
  successData: getPromoDistribution,
};

const rentalTypeDistribution = {
  url: `${getirDriveDashboard}/rental-type-distribution`,
  successData: getRentalTypeDistribution,
};

export default [
  instantVehicleStatus,
  rentalStatus,
  financial,
  financialDistribution,
  vehicleBasedStats,
  clientDistribution,
  newClientDistribution,
  cleaningScoreCounts,
  rateCounts,
  rentTimeSeries,
  netRevenueTimeSeries,
  externalSourcesSummary,
  rentalCountByNetRevenue,
  rentalCountByDuration,
  rentalCountByDistance,
  dailyFrequency,
  promoDistribution,
  rentalTypeDistribution,
];
