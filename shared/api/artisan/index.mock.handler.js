import * as MOCKS from './index.mock.data';

// Refund Options

const getArtisanRefundOptionsUrl = '/artisan/getArtisanRefundOptions';

const getArtisanRefundOptionsMockOptions = {
  url: getArtisanRefundOptionsUrl,
  successData: MOCKS.mockedArtisanRefundOptions,
};

// Cancel Options

const getArtisanOrderCancelOptionsUrl = '/artisan/getArtisanOrderCancelOptions';

const getArtisanOrderCancelOptionsMockOptions = {
  url: getArtisanOrderCancelOptionsUrl,
  successData: MOCKS.mockedArtisanOrderCancelOptions,
};

// Courier Routes

const getArtisanOrderCourierRoutesUrl = '/artisan/getArtisanOrderCourierRoutes';

const getArtisanOrderCourierRoutesOptions = {
  url: getArtisanOrderCourierRoutesUrl,
  method: 'get',
  successData: MOCKS.mockedArtisanOrderCourierRoutes,
};

// Order Detail

const getArtisanOrderDetailUrl = '/artisan/getArtisanOrderDetail';

const getArtisanOrderDetailMockOptions = {
  url: getArtisanOrderDetailUrl,
  handler: req => {
    const { id } = req.body;
    const response = { ...MOCKS.mockedArtisanOrderDetail, _id: id };
    return { data: response };
  },
};

// Return Availability

const getReturnAvailabilityUrl = '/localsReturn/getReturnAvailability/:orderId';

const getReturnAvailabilityOptions = {
  url: getReturnAvailabilityUrl,
  method: 'get',
  successData: MOCKS.mockedReturnAvailability,
};

// getArtisanTypes

const getArtisanTypesUrl = '/artisan/getArtisanTypes';

const getArtisanTypesMockOptions = {
  url: getArtisanTypesUrl,
  successData: MOCKS.mockedArtisanTypes,
};

export default [
  getArtisanRefundOptionsMockOptions,
  getArtisanOrderCancelOptionsMockOptions,
  getArtisanOrderDetailMockOptions,
  getArtisanOrderCourierRoutesOptions,
  getReturnAvailabilityOptions,
  getArtisanTypesMockOptions,
];
