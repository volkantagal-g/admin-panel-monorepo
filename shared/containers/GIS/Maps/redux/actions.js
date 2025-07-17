import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    setMapStyle: {
      mapStyle: {
        version: null,
        sources: {},
        layers: [],
      },
    },
    initMaps: null,
    destroyMaps: null,
  },
  { prefix: `${REDUX_KEY.GIS.MAPS}_` },
);
