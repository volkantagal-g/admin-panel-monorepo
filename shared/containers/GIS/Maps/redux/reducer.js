import { createReducer } from 'reduxsauce';

import { Types } from './actions';

import { MAP_TILES, CENTER_OF_TURKEY, MAP_DEFAULT_ZOOM } from '../utils/constants';

export const INITIAL_STATE = {
  mapStyle: MAP_TILES.OSM,
  viewState: {
    longitude: CENTER_OF_TURKEY[1],
    latitude: CENTER_OF_TURKEY[0],
    zoom: MAP_DEFAULT_ZOOM,
    pitch: 0,
    bearing: 0,
  },
};

export const setMapStyle = (state, { mapStyle }) => {
  return {
    ...state,
    mapStyle: {
      ...state.mapStyle,
      ...mapStyle,
    },
  };
};

export const destroy = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.SET_MAP_STYLE]: setMapStyle,
  [Types.DESTROY_MAPS]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
