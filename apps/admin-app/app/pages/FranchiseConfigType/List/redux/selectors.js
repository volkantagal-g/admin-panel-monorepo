import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.FRANCHISE_CONFIG_TYPE.LIST;

export const getConfigTypeListSelector = {
  getData: state => state?.[reducerKey]?.configTypeList?.data,
  getTotal: state => state?.[reducerKey]?.configTypeList?.total,
  getIsPending: state => state?.[reducerKey]?.configTypeList?.isPending,
};
