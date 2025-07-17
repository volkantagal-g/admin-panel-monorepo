import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.KDS.QUESTION.SELECT_SCORE_MAPPING;

export const scoreMappingSelector = {
  getData: state => {
    const { data } = getStateObject(state, reducerKey, 'scoreMapping');
    return data;
  },
  getIsPending: state => {
    const { isPending } = getStateObject(state, reducerKey, 'scoreMapping');
    return isPending;
  },
};
