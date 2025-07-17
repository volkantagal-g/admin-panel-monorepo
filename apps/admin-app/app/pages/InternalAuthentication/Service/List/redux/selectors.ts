import { REDUX_KEY } from '@shared/shared/constants';
import { State } from './reducer';

const reduxKey = REDUX_KEY.INTERNAL_AUTHENTICATION.SERVICE.LIST;

export const serviceSelector = {
  getIsPending: (state: {[reduxKey: string]: State}) => state?.[reduxKey]?.services?.isPending,
  getData: (state: {[reduxKey: string]: State}) => state?.[reduxKey]?.services?.data,
};
