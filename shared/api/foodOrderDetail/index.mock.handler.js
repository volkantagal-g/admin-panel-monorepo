import * as MOCKS from './index.mock.data';

// Order Detail

const getFoodOrderDetailUrl = '/foodOrder/getFoodOrderDetail';

const getFoodOrderDetailMockOptions = {
  url: getFoodOrderDetailUrl,
  handler: req => {
    const { foodOrderId } = req.body;
    const response = { ...MOCKS.mockedFoodOrderDetail, _id: foodOrderId };
    return { data: response };
  },
};

// Cancel Options

const getFoodOrderCancelOptionsUrl = '/foodOrder/getFoodOrderCancelOptions';

const getFoodOrderCancelOptionsMockOptions = {
  url: getFoodOrderCancelOptionsUrl,
  successData: MOCKS.mockedFoodOrderCancelOptions,
};

// Change Options

const getFoodOrderChangeOptionsUrl = '/foodOrder/getFoodOrderChangeOptions';

const getFoodOrderChangeOptionsMockOptions = {
  url: getFoodOrderChangeOptionsUrl,
  successData: MOCKS.mockedFoodOrderChangeOptions,
};

// // Available Change Types

const getAvailableChangeTypesForOrderUrl = '/foodOrder/getAvailableChangeTypesForOrder';

const getAvailableChangeTypesForOrderMockOptions = {
  url: getAvailableChangeTypesForOrderUrl,
  successData: MOCKS.mockedAvailableChangeTypesForOrder,
};

// Insight Inquiry

const getInsightInquiryUrl = '/foodInsight/getOrderInsightInquiry';

const getInsightInquiryOptions = {
  url: getInsightInquiryUrl,
  successData: MOCKS.mockedInsightInquiry,
};

// Agreement Data

const getAgreementDataUrl = '/foodOrder/getAgreementData';

const getAgreementDataOptions = {
  url: getAgreementDataUrl,
  successData: MOCKS.mockedAgreementData,
};

export default [
  getFoodOrderDetailMockOptions,
  getFoodOrderCancelOptionsMockOptions,
  getFoodOrderChangeOptionsMockOptions,
  getAvailableChangeTypesForOrderMockOptions,
  getInsightInquiryOptions,
  getAgreementDataOptions,
];
