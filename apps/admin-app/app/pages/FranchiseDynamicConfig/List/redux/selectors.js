import { REDUX_KEY } from '@shared/shared/constants';
import { formatSelectConfigDropdownData } from '../utils';

const reducerKey = REDUX_KEY.FRANCHISE_DYNAMIC_CONFIG.LIST;

export const getFranchiseDynamicConfigListSelector = {
  getData: state => state?.[reducerKey]?.franchiseDynamicConfigList?.data,
  getTotal: state => state?.[reducerKey]?.franchiseDynamicConfigList?.total,
  getIsPending: state => state?.[reducerKey]?.franchiseDynamicConfigList?.isPending,
};

export const getFranchiseDynamicConfigTypeListSelector = {
  getData: state => state?.[reducerKey]?.franchiseDynamicConfigTypeList?.data,
  getFormattedData: state => formatSelectConfigDropdownData(state?.[reducerKey]?.franchiseDynamicConfigTypeList?.data),
  getIsPending: state => state?.[reducerKey]?.franchiseDynamicConfigTypeList?.isPending,
};
