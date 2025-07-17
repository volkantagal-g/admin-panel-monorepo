import { REDUX_KEY } from '@shared/shared/constants';
import { getStateObject } from '@shared/utils/common';

const reducerKey = REDUX_KEY.KDS.QUESTION.DETAIL;

export const kdsQuestionDetailSelector = {
  getData: state => {
    const { data } = getStateObject(state, reducerKey, 'questionDetail');
    return data;
  },
  getIsPending: state => {
    const { isPending } = getStateObject(state, reducerKey, 'questionDetail');
    return isPending;
  },
};
