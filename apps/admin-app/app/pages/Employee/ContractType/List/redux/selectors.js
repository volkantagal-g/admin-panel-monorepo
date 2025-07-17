import reducerKey from './key';

export const getSelector = {
  getData: state => state?.[reducerKey]?.contract?.data,
  getTotal: state => state?.[reducerKey]?.contract?.total,
  getIsPending: state => state?.[reducerKey]?.contract?.isPending,
};
