import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.GIS.MAPS;

export const gisMapsSelector = {
  getMapStyle: state => state?.[reducerKey]?.mapStyle,
  getViewState: state => state?.[reducerKey]?.viewState,
};
