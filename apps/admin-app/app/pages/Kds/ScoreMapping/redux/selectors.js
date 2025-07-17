import { REDUX_KEY } from '@shared/shared/constants';
import { getStateObject } from '@shared/utils/common';

const reducerKey = REDUX_KEY.KDS.SCORE_MAPPING;

export const kdsScoreMappingSelector = {
  getData: state => {
    const { data } = getStateObject(state, reducerKey, 'kdsScoreMapping');
    return data;
  },
  getIsPending: state => {
    const { isPending } = getStateObject(state, reducerKey, 'kdsScoreMapping');
    return isPending;
  },
};
