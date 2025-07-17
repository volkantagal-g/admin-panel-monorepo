import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.SIDEBAR;

export const favoritePagesSelector = {
  getData: state => state?.[reducerKey]?.favoritePages?.data,
  isPending: state => state?.[reducerKey]?.favoritePages?.isPending,
};
