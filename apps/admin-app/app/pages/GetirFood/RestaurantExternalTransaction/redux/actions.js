import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  createExternalTransactionRequest: { params: null },
  createExternalTransactionSuccess: { data: {} },
  createExternalTransactionFailure: { error: null },
  validateBulkExternalTransactionExcelRequest: { file: null, manualType: null, onSuccess: null },
  validateBulkExternalTransactionExcelSuccess: null,
  validateBulkExternalTransactionExcelFailure: { error: null },
  importBulkExternalTransactionExcelRequest: { fileName: null, manualType: null, selectedDeferredPaymentDateOption: null },
  importBulkExternalTransactionExcelSuccess: null,
  importBulkExternalTransactionExcelFailure: { error: null },
  getExternalTransactionReportRequest: { params: null },
  getExternalTransactionReportSuccess: null,
  getExternalTransactionReportFailure: { error: null },
  getOrderFinancialsByOrderIdRequest: { orderId: null },
  getOrderFinancialsByOrderIdSuccess: { data: {} },
  getOrderFinancialsByOrderIdFailure: { error: null },
  destroyOrderFinancialsByOrderIdData: {},
  getRestaurantByIdRequest: { restaurantId: null },
  getRestaurantByIdSuccess: { data: {} },
  getRestaurantByIdFailure: { error: null },
  getDeferredPaymentDateOptionsRequest: { partnerId: null },
  getDeferredPaymentDateOptionsSuccess: { data: {} },
  getDeferredPaymentDateOptionsFailure: { error: null },
  destroyDeferredPaymentDateOptions: {},
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.FOOD.RESTAURANT_EXTERNAL_TRANSACTION}_` });
