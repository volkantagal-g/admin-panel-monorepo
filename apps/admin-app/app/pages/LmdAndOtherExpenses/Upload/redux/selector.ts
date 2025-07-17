import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.LMD_AND_OTHER_EXPENSES.UPLOAD;

export const fileUploadSelector = {
  getIsPending: (state: any) => state[reducerKey]?.fileUpload?.isPending,
  getErrors: (state: any) => state[reducerKey]?.fileUpload?.errors,
};
