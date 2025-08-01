import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getFranchiseUserRoleGroupDetailRequest: { id: null },
  getFranchiseUserRoleGroupDetailSuccess: { data: {} },
  getFranchiseUserRoleGroupDetailFailure: { error: null },
  updateFranchiseUserRoleGroupRequest: { data: {}, id: null },
  updateFranchiseUserRoleGroupFailure: { error: null },
  getFranchiseUserRoleListRequest: { },
  getFranchiseUserRoleListSuccess: { data: {} },
  getFranchiseUserRoleListFailure: { error: null },
  getFranchiseReportListRequest: { },
  getFranchiseReportListSuccess: { data: {} },
  getFranchiseReportListFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.MARKET_FRANCHISE.USER.ROLE_GROUP.DETAIL}_` });
