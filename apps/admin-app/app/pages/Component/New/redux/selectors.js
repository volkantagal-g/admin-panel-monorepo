import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.COMPONENT.NEW;

export const createComponentSelector = { getIsPending: state => state[reducerKey]?.createComponent?.isPending };
