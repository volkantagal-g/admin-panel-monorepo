import { useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';

import { getLangKey } from '@shared/i18n';
import { FOOD_FILTER_ORDERS_DEFAULT_SELECT_MS } from '@shared/shared/constants';
import { Creators } from '../redux/actions';
import TagOption from '../components/TagOption';

const TIME_TYPES = {
  instant: {
    en: 'Instant Order',
    tr: 'Anlık Sipariş',
  },
  scheduled: {
    en: 'Schedule Order',
    tr: 'İleri Tarihli Sipariş',
  },
};

export default function useTimeTypes() {
  const dispatch = useDispatch();
  const langKey = getLangKey();

  const timeTypesList = Object.keys(TIME_TYPES).map(tag => {
    const tagText = TIME_TYPES[tag][langKey];
    const customValue = tag.toString();
    return TagOption(customValue, tagText);
  });

  const debouncedTimeTypesSelect = useMemo(
    () => debounce(
      timeTypes => dispatch(Creators.setTimeTypes({ timeTypes })),
      FOOD_FILTER_ORDERS_DEFAULT_SELECT_MS,
    ),
    [dispatch],
  );

  const timeTypesSelect = useCallback((timeTypes = []) => {
    debouncedTimeTypesSelect(timeTypes);
  }, [debouncedTimeTypesSelect]);

  return { timeTypesList, timeTypesSelect };
}
