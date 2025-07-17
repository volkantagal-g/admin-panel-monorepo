import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.PAGE.NEW;

export const createPageSelector = { getIsPending: state => state[reducerKey]?.createPage?.isPending };
