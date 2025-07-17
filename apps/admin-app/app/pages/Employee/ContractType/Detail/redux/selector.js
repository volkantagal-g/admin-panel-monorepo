import { get } from 'lodash';

import { PERSON_CONTRACT_GROUP_ID as contractGroupId } from '@shared/shared/constants';
import { createContractGroupKey } from '../components/helpers';
import reducerKey from './key';

export const getSelector = {
  getForm: state => state?.[reducerKey]?.contractForm?.data,
  getFormIsPending: state => state?.[reducerKey]?.contractForm?.isPending,
  getData: state => state?.[reducerKey]?.contract?.data,
  getDataIsPending: state => state?.[reducerKey]?.contract?.isPending,
  getDataSavedSuccessfully: state => state?.[reducerKey]?.contract?.isSuccess,
};

function pluckGroup(groupId = '') {
  return state => {
    const { data } = state?.[reducerKey]?.contractForm || {};
    return data ? { ...data, formItems: data.formItems?.filter(f => f.id === groupId) } : undefined;
  };
}

function getGroupState(groupId = '') {
  const commonPath = [reducerKey, createContractGroupKey(groupId)];
  return {
    getData: pluckGroup(groupId),
    getDataIsSaved: state => get(state, [...commonPath, 'isSuccess'], false),
    getDataIsPending: state => get(state, [...commonPath, 'isPending'], false),
  };
}

export const getSelectorEditLeave = getGroupState(contractGroupId.leave);
export const getSelectorEditBreak = getGroupState(contractGroupId.break);
export const getSelectorEditGenInfo = getGroupState(contractGroupId.genInfo);
export const getSelectorEditSchdConfig = getGroupState(contractGroupId.schdConfig);
export const getSelectorEditCompensation = getGroupState(contractGroupId.compConfig);
