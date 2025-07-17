import { PAGE_REDUX_KEY } from '../constants';

const reduxKey = PAGE_REDUX_KEY;

export const panelDocByIdSelector = {
  getIsPending: state => state[reduxKey].panelDocById.isPending,
  getData: state => state[reduxKey].panelDocById.data,
};
