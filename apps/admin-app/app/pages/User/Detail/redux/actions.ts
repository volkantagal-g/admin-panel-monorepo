import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getUserByIdRequest: { id: null },
  getUserByIdSuccess: { data: {} },
  getUserByIdFailure: { error: null },

  updateUserRequest: { id: null, updateData: {}, afterSuccess: null },
  updateUserSuccess: { data: {} },
  updateUserFailure: { error: null },

  activateUserRequest: { id: null },
  activateUserSuccess: { data: {} },
  activateUserFailure: { error: null },

  inActivateUserRequest: { id: null, refetchRoles: false },
  inActivateUserSuccess: { data: {} },
  inActivateUserFailure: { error: null },

  addRolesToUserRequest: { userId: null, roleIds: null, afterSuccess: null },
  addRolesToUserSuccess: { data: {} },
  addRolesToUserFailure: { error: null },

  updateRoleMemberTypeRequest: { roleId: null, userId: null, memberType: null, expiryDate: null, afterSuccess: null },
  updateRoleMemberTypeSuccess: { data: {} },
  updateRoleMemberTypeFailure: { error: null },

  deleteRoleMembershipRequest: { roleId: null, userId: null },
  deleteRoleMembershipSuccess: { data: {} },
  deleteRoleMembershipFailure: { error: null },

  getUserTotalPermissionsRequest: { userId: null },
  getUserTotalPermissionsSuccess: { data: [] },
  getUserTotalPermissionsFailure: { error: null },

  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.USER.DETAIL}_` });
