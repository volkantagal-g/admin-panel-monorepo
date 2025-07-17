import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.GL_SHOP_EXTERNAL_TRANSACTION}_`;

export const { Types, Creators } = createActions({
  createExternalTransactionRequest: { body: null },
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
  getShopByIdRequest: { shopId: null },
  getShopByIdSuccess: { data: {} },
  getShopByIdFailure: { error: null },
  getDeferredPaymentDateOptionsRequest: { partnerId: null },
  getDeferredPaymentDateOptionsSuccess: { data: {} },
  getDeferredPaymentDateOptionsFailure: { error: null },
  destroyDeferredPaymentDateOptions: {},
  initPage: null,
  destroyPage: null,
}, { prefix });
