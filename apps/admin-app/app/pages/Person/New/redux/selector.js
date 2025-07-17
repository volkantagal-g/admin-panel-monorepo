import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.PERSON.NEW;

export const personNewSelector = { getIsPending: state => state[reducerKey]?.form.isPending };
