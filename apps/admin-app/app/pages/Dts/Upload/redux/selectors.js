import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.DTS.UPLOAD;

export const uploadDTSLogsSelector = { getIsPending: state => state?.[reducerKey]?.dtsLogsUpdate?.isPending };
