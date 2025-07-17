import * as MOCKS from './index.mock.data';

const appOpenUrl = '/gis/heatmap/getAppOpenLocations';
const missedOrderUrl = '/gis/heatmap/getAppOpenLocations';
const downloadUrl = '/gis/heatmap/getAppOpenLocations';
const succesfulOrderUrl = '/gis/heatmap/getAppOpenLocations';

const getAppOpenLocationsOptions = {
  url: appOpenUrl,
  method: 'post',
  successData: MOCKS.mockedAppOpen,
};
const getMissedOrderLocationsOptions = {
  url: missedOrderUrl,
  method: 'post',
  successData: MOCKS.mockedMissedOrders,
};
const getDownloadLocationsOptions = {
  url: downloadUrl,
  method: 'post',
  successData: MOCKS.mockedDownloads,
};
const getSuccessfulOrderLocations = {
  url: succesfulOrderUrl,
  method: 'post',
  successData: MOCKS.mockedSuccesfulOrders,
};

export default [getAppOpenLocationsOptions,
  getMissedOrderLocationsOptions,
  getDownloadLocationsOptions,
  getSuccessfulOrderLocations];
