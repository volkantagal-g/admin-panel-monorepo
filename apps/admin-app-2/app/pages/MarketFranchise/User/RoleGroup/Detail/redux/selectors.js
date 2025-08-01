import { isEmpty } from 'lodash';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKET_FRANCHISE.USER.ROLE_GROUP.DETAIL;

export const franchiseUserRoleGroupDetailSelector = {
  getData: state => {
    const data = state[reducerKey]?.franchiseUserRoleGroupDetail?.data;

    if (!isEmpty(data)) {
      data.hasGlobalAccess = data.hasGlobalAccess || false;
      data.countries = data.countries || [];
    }

    return data;
  },
  getIsPending: state => state[reducerKey]?.franchiseUserRoleGroupDetail.isPending,
};

export const franchiseUserRoleListSelector = {
  getData: state => state[reducerKey]?.franchiseUserRoleList.data,
  getIsPending: state => state[reducerKey]?.franchiseUserRoleList.isPending,
};

export const franchiseReportListSelector = {
  getData: state => state[reducerKey]?.franchiseReportList.data,
  getIsPending: state => state[reducerKey]?.franchiseReportList.isPending,
};
