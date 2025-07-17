import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.CONFIG.NEW;

export const createConfigSelector = {
  getIsPending: state => {
    const { isPending } = getStateObject(state, reducerKey, 'crateConfig');
    return !!isPending;
  },
};
