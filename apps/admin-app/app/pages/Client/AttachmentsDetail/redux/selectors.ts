import { REDUX_KEY } from '@shared/shared/constants';
import { State } from './reducer';

const reduxKey = REDUX_KEY.CLIENT.ATTACHMENTS_DETAIL;

export const attachmentURLSelector = {
  getIsPending: (state: {[reduxKey: string]: State}) => state[reduxKey]?.attachmentURL?.isPending,
  getData: (state: {[reduxKey: string]: State}) => state[reduxKey]?.attachmentURL?.data,
};
