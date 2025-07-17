import { REDUX_KEY } from '@shared/shared/constants';
import { ReducerAPIState } from '@shared/types/reducerAPIState';

const reducerKey = REDUX_KEY.GETIR_MARKET_ORDER_RATINGS.RATING_TAGS;

type State = {
  [key: string]: ReducerAPIState
}

export const getRatingTagsSelector = {
  getData: (state: State) => state[reducerKey]?.getRatingTags?.data,
  getIsPending: (state: State) => state[reducerKey]?.getRatingTags?.isPending,
};
