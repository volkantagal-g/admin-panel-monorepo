import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.KDS.QUESTION_GROUP.DETAIL;

export const kdsQuestionGroupDetailSelector = {
  getData: state => {
    const { data } = getStateObject(state, reducerKey, 'kdsQuestionGroupDetail');
    return data;
  },
  getIsPending: state => {
    const { isPending } = getStateObject(state, reducerKey, 'kdsQuestionGroupDetail');
    return isPending;
  },
};