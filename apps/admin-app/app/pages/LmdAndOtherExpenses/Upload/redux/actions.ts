import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.LMD_AND_OTHER_EXPENSES.UPLOAD}`;

export const { Types, Creators } = createActions({
  uploadLastMileDeliveryCostRequest: { data: null },
  uploadLastMileDeliveryCostSuccess: {},
  uploadLastMileDeliveryCostFailed: {},

  uploadLogisticCostRequest: { data: null },
  uploadLogisticCostSuccess: { },
  uploadLogisticCostFailed: { },

  uploadOtherCostRequest: { data: null },
  uploadOtherCostSuccess: { data: null },
  uploadOtherCostFailed: { data: null },

  setErrors: { errors: null },
  resetUpload: {},

  initPage: null,
  destroyPage: null,
}, { prefix });
