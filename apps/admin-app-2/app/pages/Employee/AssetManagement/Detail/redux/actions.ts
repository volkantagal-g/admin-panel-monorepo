import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.ASSET_MANAGEMENT.DETAIL}_`;

export const { Types, Creators } = createActions({
  getAssetByIdRequest: { assetId: null },
  getAssetByIdSuccess: { asset: null },
  getAssetByIdFailure: { error: null },

  updateAssetRequest: {
    assetId: null,
    updateData: null,
    typeData: null,
    onSuccess: null,
  },
  updateAssetSuccess: { asset: null },
  updateAssetFailure: { error: null },

  assignAssetRequest: {
    assetId: null,
    employeeId: null,
    assignmentStartDate: null,
    assignmentEndDate: null,
    assignmentPeriodType: null,
    note: null,
    onSuccess: null,
  },
  assignAssetSuccess: {},
  assignAssetFailure: { error: null },

  unassignAssetRequest: {
    assetId: null,
    assignmentReturnDate: null,
    assignableStatus: null,
    assignableStatusReason: null,
    note: null,
    onSuccess: null,
  },
  unassignAssetSuccess: {},
  unassignAssetFailure: { error: null },

  initPage: null,
  destroyPage: null,
}, { prefix });
