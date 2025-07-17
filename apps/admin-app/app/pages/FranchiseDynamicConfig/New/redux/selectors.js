import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.FRANCHISE_DYNAMIC_CONFIG.NEW;

export const createFranchiseDynamicConfigSelector = { getIsPending: state => state?.[reducerKey]?.createFranchiseDynamicConfig?.isPending };

export const getFranchiseDynamicConfigTypeListSelector = { getData: state => state?.[reducerKey]?.franchiseDynamicConfigTypeList?.data };
