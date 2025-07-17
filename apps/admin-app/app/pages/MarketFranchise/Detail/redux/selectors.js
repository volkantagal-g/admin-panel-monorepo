import { createSelector } from 'reselect';
import _ from 'lodash';

import { getStateObject } from '@shared/utils/common';
import { GETIR_10_DOMAIN_TYPE, GETIR_MARKET_DOMAIN_TYPE, REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKET_FRANCHISE.DETAIL;

export const marketFranchisesSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'marketFranchise');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsActivated: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'marketFranchise');
    },
    ({ data }) => {
      return _.get(data, 'isActivated', false);
    },
  ),
  getGeneralInfo: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'marketFranchise');
    },
    ({ data }) => {
      const franchiseType = _.get(data, 'franchiseType', 0);
      const taxOffice = _.get(data, 'taxOffice', '');
      const taxNumber = _.get(data, 'taxNumber', '');
      const referenceCode = _.get(data, 'referenceCode', '');

      return {
        franchiseType,
        taxOffice,
        taxNumber,
        referenceCode,
      };
    },
  ),
  getWarehouses: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'marketFranchise');
    },
    ({ data }) => {
      return _.get(data, 'warehouses', []);
    },
  ),
  getWarehouseHistory: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'marketFranchise');
    },
    ({ data }) => {
      return _.get(data, 'history', []);
    },
  ),
  getOwners: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'marketFranchise');
    },
    ({ data }) => {
      return _.get(data, 'owners', []);
    },
  ),
  getOwnerInfo: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'marketFranchise');
    },
    ({ data }) => {
      return _.get(data, 'authorizedPerson', {});
    },
  ),
  getName: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'marketFranchise');
    },
    ({ data }) => {
      return _.get(data, 'name', '');
    },
  ),
  getSupplier: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'marketFranchise');
    },
    ({ data }) => {
      return _.get(data, 'supplier', '');
    },
  ),
  getCompanyId: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'marketFranchise');
    },
    ({ data }) => {
      return _.get(data, 'companyId', '');
    },
  ),
  getCommissionRates: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'marketFranchise');
    },
    ({ data }) => {
      const tempSettings = _.get(data, 'commission.settings', {
        [GETIR_10_DOMAIN_TYPE]: [],
        [GETIR_MARKET_DOMAIN_TYPE]: [],
      });
      return Object.keys(tempSettings).reduce((allSettings, settingKey) => {
        const domainSettingsItem = tempSettings[settingKey].sort((prevValue, nextValue) => {
          const prevMin = _.get(prevValue, 'min');
          const nextMin = _.get(nextValue, 'min');
          return prevMin - nextMin;
        });
        return {
          ...allSettings,
          [settingKey]: domainSettingsItem,
        };
      }, {});
    },
  ),
  getIsPending: state => state[reducerKey]?.marketFranchise.isPending,
};

export const crisisCardSelector = {
  getIsPending: state => state[reducerKey]?.crisisCard.isPending,
  getIsSuccess: state => state[reducerKey]?.crisisCard.isSuccess,
  getData: state => state[reducerKey]?.crisisCard.data,
};

export const crisisLogsSelector = {
  getIsPending: state => state[reducerKey]?.crisisLogs.isPending,
  getData: state => state[reducerKey]?.crisisLogs.data,
  getCount: state => state[reducerKey]?.crisisLogs.count,
  getPagination: state => state[reducerKey]?.crisisLogs.pagination,
};

export const crisisCardListSelector = {
  getData: state => state[reducerKey]?.crisisCardList.data,
  getCount: state => state[reducerKey]?.crisisCardList.count,
  getIsPending: state => state[reducerKey]?.crisisCardList.isPending,
  getPagination: state => state[reducerKey]?.crisisCardList.pagination,
};

export const createFranchiseAreaSelector = {
  getIsPending: state => state[reducerKey]?.createFranchiseArea.isPending,
  getIsSuccess: state => state[reducerKey]?.createFranchiseArea.isSuccess,
};

export const deleteFranchiseAreaSelector = {
  getIsPending: state => state[reducerKey]?.deleteFranchiseArea.isPending,
  getIsSuccess: state => state[reducerKey]?.deleteFranchiseArea.isSuccess,
};

export const updateFranchiseAreaSelector = {
  getIsPending: state => state[reducerKey]?.updateFranchiseArea.isPending,
  getIsSuccess: state => state[reducerKey]?.updateFranchiseArea.isSuccess,
};
