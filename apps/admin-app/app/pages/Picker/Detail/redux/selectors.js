import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.PICKER.DETAIL;

export const pickerDetailSelector = {
  getIsPending: state => state[reduxKey]?.pickerDetail?.isPending,
  getData: state => state[reduxKey]?.pickerDetail?.data || {},
  getPickerJob: state => state[reduxKey]?.pickerJob?.data,
  getIsReleaseWarehousePending: state => state[reduxKey]?.releaseWarehouse.isPending,
};
