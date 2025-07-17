import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';

import { FOOD_FILTER_ORDERS_DEFAULT_SELECT_MS } from '@shared/shared/constants';
import { getLangKey } from '@shared/i18n';
import { getCitiesSelector } from '@shared/redux/selectors/common';
import { Creators } from '../redux/actions';
import TagOption from '../components/TagOption';

export default function useCities() {
  const dispatch = useDispatch();
  const cities = useSelector(getCitiesSelector.getData);
  const cityList = cities.map(tag => {
    return TagOption(tag._id, tag.name[getLangKey()]);
  });

  // handle city change
  const debouncedCitySelect = useMemo(
    () => debounce(
      cityId => dispatch(Creators.setCityId({ cityId })),
      FOOD_FILTER_ORDERS_DEFAULT_SELECT_MS,
    ),
    [dispatch],
  );

  const citySelect = useCallback((cityId = null) => {
    debouncedCitySelect(cityId);
  }, [debouncedCitySelect]);

  return { cityList, citySelect };
}
