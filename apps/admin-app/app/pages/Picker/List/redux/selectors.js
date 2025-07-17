import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.PICKER.LIST;

export const pickerListSelector = {
  getIsPending: state => state[reduxKey]?.pickerList?.isPending,
  getData: state => state[reduxKey]?.pickerList?.data,
};
