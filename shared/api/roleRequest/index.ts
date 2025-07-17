import axios from '@shared/axios/common';
import { getUser } from '@shared/redux/selectors/auth';

export const createRoleRequest = ({
  roleId,
  requestReason,
  timeLimit,
  durationType,
  durationDays,
  endDate,
}: {
  roleId: MongoIDType,
} & Pick<RoleRequestType, 'requestReason' | 'timeLimit' | 'durationType' | 'durationDays' | 'endDate'>): Promise<RoleRequestType> => {
  const userId = getUser()?._id;
  return axios({
    method: 'POST',
    url: '/roleRequest/createRoleRequest',
    data: {
      roleId,
      requestReason,
      userId,
      timeLimit,
      durationType,
      durationDays,
      endDate,
    },
  }).then(response => {
    return response.data;
  });
};

export const approveOrCancelRoleRequest = ({
  roleRequestId,
  requestState,
  responseReason,
  status,
  timeLimit,
  durationType,
  durationDays,
  endDate,
}: {
  roleRequestId: MongoIDType,
  timeLimit?: string,
  durationType?: string,
  durationDays?: number,
  endDate?: Date
} & Pick<RoleRequestType, 'requestState' | 'status' | 'responseReason'>): Promise<RoleRequestType> => {
  return axios({
    method: 'POST',
    url: '/roleRequest/approveOrCancelRoleRequest',
    data: {
      roleRequestId,
      requestState,
      responseReason,
      status,
      timeLimit,
      durationType,
      durationDays,
      endDate,
    },
  }).then(response => {
    return response.data;
  });
};

export const updateRoleRequest = ({
  roleRequestId,
  requestState,
  responseReason,
  status,
}: { roleRequestId: MongoIDType } & Partial<Pick<RoleRequestType, 'requestState' | 'responseReason' | 'status'>>): Promise<RoleRequestType> => {
  return axios({
    method: 'POST',
    url: '/roleRequest/updateRoleRequest',
    data: { roleRequestId, requestState, responseReason, status },
  }).then(response => {
    return response.data;
  });
};

export const getUserRoleRequests = (): Promise<RoleRequestType[]> => {
  const userId = getUser()?._id;
  return axios({
    method: 'POST',
    url: '/roleRequest/getUserRoleRequests',
    data: { userId },
  }).then(response => {
    return response.data;
  });
};

export const getRoleRequestsForApprovalByRoleOwner = (): Promise<RoleRequestType[]> => {
  const userId = getUser()?._id;
  return axios({
    method: 'POST',
    url: '/roleRequest/getRoleRequestsForApprovalByRoleOwner',
    data: { userId },
  }).then(response => {
    return response.data;
  });
};

export const getRoleRequest = ({ id }: { id: MongoIDType }): Promise<RoleRequestType> => {
  return axios({
    method: 'POST',
    url: '/roleRequest/getRoleRequest',
    data: { id },
  }).then(response => {
    return response.data;
  });
};
