import { createSelector } from 'reselect';
import { get } from 'lodash';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.WAREHOUSE_PROPOSAL.DETAIL;

export const warehouseProposalsSelector = {
  getProposalData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouseProposal');
    },
    ({ data }) => {
      return get(data, 'proposal', {});
    },
  ),
  getApplicantData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouseProposal');
    },
    ({ data }) => {
      return get(data, 'applicant', {});
    },
  ),
  getPropertyData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouseProposal');
    },
    ({ data }) => {
      return get(data, 'property', {});
    },
  ),
  getPhotoData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouseProposal');
    },
    ({ data }) => {
      return get(data, 'photos', []);
    },
  ),
  getVideoData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouseProposal');
    },
    ({ data }) => {
      return get(data, 'videos', []);
    },
  ),
  getNote: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouseProposal');
    },
    ({ data }) => {
      return get(data, 'note', '');
    },
  ),
  getProposalCommonData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouseProposal');
    },
    ({ data }) => {
      return {
        status: data.status,
        id: data._id,
      };
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouseProposal');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
  getIsUpdatePending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'updateWarehouseProposal');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
  getLocationData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouseProposal');
    },
    ({ data }) => {
      return get(data, 'location', null);
    },
  ),
};

export const updateWarehouseProposalsSelector = {
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'updateWarehouseProposalStatus');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};
