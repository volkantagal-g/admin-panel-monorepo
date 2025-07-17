import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.FOOD.FINANCIAL_DASHBOARD_V2_DETAIL;

export const paymentDetailsSelector = {
  getData: state => {
    return {
      chainRestaurantPaymentInfo: state?.[reducerKey]?.paymentDetails?.data?.chainRestaurantPaymentInfo || [],
      chainRestaurantTotalCount: state?.[reducerKey]?.paymentDetails?.data?.chainRestaurantTotalCount || 0,
      singleRestaurantPaymentInfo: state?.[reducerKey]?.paymentDetails?.data?.singleRestaurantPaymentInfo || [],
      singleRestaurantTotalCount: state?.[reducerKey]?.paymentDetails?.data?.singleRestaurantTotalCount || 0,
    };
  },
  getIsPending: state => state?.[reducerKey]?.paymentDetails.isPending,
  getIsFirstRequestCompleted: state => state?.[reducerKey]?.isFirstRequestCompleted,
};

export const exportPaymentDetailExcelSelector = { getIsPending: state => state?.[reducerKey]?.exportPaymentDetailExcel?.isPending };
