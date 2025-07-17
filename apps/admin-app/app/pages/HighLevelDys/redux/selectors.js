import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.HIGH_LEVEL_DYS;

export const getHighLevelDysListSelector = {
  getData: state => state?.[reducerKey]?.highLevelDysList?.data,
  getTotal: state => state?.[reducerKey]?.highLevelDysList?.total,
  getIsPending: state => state?.[reducerKey]?.highLevelDysList?.isPending,
};

export const getHighLevelLineChartListSelector = {
  getData: state => state?.[reducerKey]?.lineChartList?.data,
  getIsPending: state => state?.[reducerKey]?.lineChartList?.isPending,
};

export const getHighLevelBarChartListSelector = {
  getData: state => state?.[reducerKey]?.barChartList?.data,
  getIsPending: state => state?.[reducerKey]?.barChartList?.isPending,
};
