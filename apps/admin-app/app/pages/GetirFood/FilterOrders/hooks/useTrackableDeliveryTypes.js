import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { useCallback } from 'react';

import TagOption from '../components/TagOption';
import { COURIER_TRACKABILITY_TYPES } from '@shared/shared/constants';
import { Creators } from '../redux/actions';

export default function useTrackableDeliveryTypes() {
  const dispatch = useDispatch();
  const { t } = useTranslation('foodOrderFilterPage');

  const courierIsRDUList = COURIER_TRACKABILITY_TYPES.map(
    tag => {
      const tagText = t(`${tag}_COURIER`);
      const customValue = tag.toString();
      return TagOption(customValue, tagText);
    },
  );

  const courierTrackabilityTypeSelect = useCallback(isRDU => {
    dispatch(Creators.setIsRDU({ isRDU }));
  }, [dispatch]);

  return { courierIsRDUList, courierTrackabilityTypeSelect };
}
