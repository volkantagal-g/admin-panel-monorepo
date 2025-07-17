import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.GETIR_DRIVE.DASHBOARD;

export const instantVehicleStatusSelector = {
  getIsPending: state => state?.[reduxKey]?.instantVehicleStatus?.isPending,
  getData: state => state?.[reduxKey]?.instantVehicleStatus?.data,
};

export const rentalStatusSelector = {
  getIsPending: state => state?.[reduxKey]?.rentalStatus?.isPending,
  getData: state => state?.[reduxKey]?.rentalStatus?.data,
};

export const financialSelector = {
  getIsPending: state => state?.[reduxKey]?.financial?.isPending,
  getData: state => state?.[reduxKey]?.financial?.data,
};

export const financialDistributionSelector = {
  getIsPending: state => state?.[reduxKey]?.financialDistribution?.isPending,
  getData: state => state?.[reduxKey]?.financialDistribution?.data,
};

export const vehicleBasedStatsSelector = {
  getIsPending: state => state?.[reduxKey]?.vehicleBasedStats?.isPending,
  getData: state => state?.[reduxKey]?.vehicleBasedStats?.data,
};

export const clientDistributionSelector = {
  getIsPending: state => state?.[reduxKey]?.clientDistribution?.isPending,
  getData: state => state?.[reduxKey]?.clientDistribution?.data,
};

export const newClientDistributionSelector = {
  getIsPending: state => state?.[reduxKey]?.newClientDistribution?.isPending,
  getData: state => state?.[reduxKey]?.newClientDistribution?.data,
};

export const cleaningScoreCountsSelector = {
  getIsPending: state => state?.[reduxKey]?.cleaningScoreCounts?.isPending,
  getData: state => state?.[reduxKey]?.cleaningScoreCounts?.data,
};

export const rateCountsSelector = {
  getIsPending: state => state?.[reduxKey]?.rateCounts?.isPending,
  getData: state => state?.[reduxKey]?.rateCounts?.data,
};

export const rentTimeSeriesSelector = {
  getIsPending: state => state?.[reduxKey]?.rentTimeSeries?.isPending,
  getData: state => state?.[reduxKey]?.rentTimeSeries?.data,
};

export const netRevenueTimeSeriesSelector = {
  getIsPending: state => state?.[reduxKey]?.netRevenueTimeSeries?.isPending,
  getData: state => state?.[reduxKey]?.netRevenueTimeSeries?.data,
};

export const externalSourcesSummaryCurrentSelector = {
  getIsPending: state => state?.[reduxKey]?.externalSourcesSummaryCurrent?.isPending,
  getData: state => state?.[reduxKey]?.externalSourcesSummaryCurrent?.data,
};

export const externalSourcesSummaryPreviousSelector = {
  getIsPending: state => state?.[reduxKey]?.externalSourcesSummaryPrevious?.isPending,
  getData: state => state?.[reduxKey]?.externalSourcesSummaryPrevious?.data,
};

export const rentalCountByNetRevenueSelector = {
  getIsPending: state => state?.[reduxKey]?.rentalCountByNetRevenue?.isPending,
  getData: state => state?.[reduxKey]?.rentalCountByNetRevenue?.data,
};

export const rentalCountByDurationSelector = {
  getIsPending: state => state?.[reduxKey]?.rentalCountByDuration?.isPending,
  getData: state => state?.[reduxKey]?.rentalCountByDuration?.data,
};

export const rentalCountByDistanceSelector = {
  getIsPending: state => state?.[reduxKey]?.rentalCountByDistance?.isPending,
  getData: state => state?.[reduxKey]?.rentalCountByDistance?.data,
};

export const dailyFrequencySelector = {
  getIsPending: state => state?.[reduxKey]?.dailyFrequency?.isPending,
  getData: state => state?.[reduxKey]?.dailyFrequency?.data,
};

export const promoDistributionSelector = {
  getIsPending: state => state?.[reduxKey]?.promoDistribution?.isPending,
  getData: state => state?.[reduxKey]?.promoDistribution?.data,
};

export const rentalTypeDistributionSelector = {
  getIsPending: state => state?.[reduxKey]?.rentalTypeDistribution?.isPending,
  getData: state => state?.[reduxKey]?.rentalTypeDistribution?.data,
};
