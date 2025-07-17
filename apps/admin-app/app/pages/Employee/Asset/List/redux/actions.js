import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.EMPLOYEE.DETAIL_ASSET_LIST}_`;

export const { Types, Creators } = createActions({
  getEmployeeAssetListRequest: { employeeId: null },
  getEmployeeAssetListSuccess: { data: [] },
  getEmployeeAssetListFailure: { error: null },

  returnEmployeeAssetRequest: { employeeId: null, assetId: null, assignmentId: null, returnDate: null, returnNote: null, returnDeviceStatus: null },
  returnEmployeeAssetSuccess: { data: null },
  returnEmployeeAssetFailure: { error: null },

  getAvailableAssetsRequest: { deviceType: null, t: null, payrollCountryCode: null },
  getAvailableAssetsSuccess: { data: null },
  getAvailableAssetsFailure: { error: null },

  assignEmployeeAssetRequest: { employeeId: null, asset: null, assignDate: null, assignNote: null, deviceType: null, payrollCountryCode: null, t: null },
  assignEmployeeAssetSuccess: { data: null },
  assignEmployeeAssetFailure: { error: null },

  printEmployeeAssets: { t: null, employeeId: null },
  printReturnAssetsForm: { t: null, employeeId: null },

  getEmployeeNonPrivateInformationRequest: { employeeId: null },
  getEmployeeNonPrivateInformationSuccess: { data: null },
  getEmployeeNonPrivateInformationFailure: { error: null },

  partialAssetsReturnRequest: { assets: null, employeeId: null },
  partialAssetsReturnSuccess: { data: null },
  partialAssetsReturnFailure: { error: null },

  assignmentConfirmedByEmployeeRequest: { assignmentId: null, isConfirmed: null },
  assignmentConfirmedByEmployeeSuccess: { data: null },
  assignmentConfirmedByEmployeeFailure: { error: null },

  returnConfirmedByEmployeeRequest: { assignmentId: null, isConfirmed: null },
  returnConfirmedByEmployeeSuccess: { data: null },
  returnConfirmedByEmployeeFailure: { error: null },

  initPage: null,
  destroyPage: null,
}, { prefix });
