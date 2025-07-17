import { useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash';

import { FOOD_FILTER_ORDERS_DEFAULT_SELECT_MS, PLATFORM_TYPES } from '@shared/shared/constants';
import { Creators } from '../redux/actions';
import TagOption from '../components/TagOption';

export default function usePlatformTypes() {
  const dispatch = useDispatch();
  const { t } = useTranslation('global');

  const platformTypesList = PLATFORM_TYPES.map(tag => {
    const tagText = t(`global:CHANNEL_PLATFORM.${tag}`);
    const customValue = tag.toString();
    return TagOption(customValue, tagText);
  });

  const debouncedPlatformTypesSelect = useMemo(
    () => debounce(
      platformTypes => dispatch(Creators.setPlatformTypes({ platformTypes })),
      FOOD_FILTER_ORDERS_DEFAULT_SELECT_MS,
    ),
    [dispatch],
  );

  const platformTypesSelect = useCallback((platformType = []) => {
    debouncedPlatformTypesSelect(platformType);
  }, [debouncedPlatformTypesSelect]);

  return { platformTypesList, platformTypesSelect };
}
