import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    getNotifSoundTypesRequest: { },
    getNotifSoundTypesSuccess: { data: [] },
    getNotifSoundTypesFailure: { error: null },

    initContainer: null,
    destroyContainer: null,
  },
  { prefix: `${REDUX_KEY.MARKETING.SELECT.NOTIF_SOUND_TYPE}_` },
);
