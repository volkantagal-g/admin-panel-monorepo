import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.MARKETING.SELECT.NOTIF_SOUND_TYPE;

export const getNotifSoundTypeSelector = {
  getData: state => state?.[reduxKey]?.notifSoundType?.data,
  getIsPending: state => state?.[reduxKey]?.notifSoundType?.isPending,
};
