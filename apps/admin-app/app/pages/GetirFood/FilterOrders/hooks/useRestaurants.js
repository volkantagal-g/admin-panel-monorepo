import { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { debounce, isString } from 'lodash';

import { FOOD_FILTER_ORDERS_DEFAULT_SELECT_MS } from '@shared/shared/constants';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Creators } from '../redux/actions';
import { filtersSelector, restaurantsSelector } from '../redux/selectors';
import TagOption from '../components/TagOption';

export default function useRestaurants() {
  const dispatch = useDispatch();
  const { t } = useTranslation('foodOrderActivePage');
  const selectedCity = useSelector(filtersSelector.getCity);
  const foodRestaurants = useSelector(restaurantsSelector.getByName);
  const foodRestaurantsPending = useSelector(restaurantsSelector.isPending);

  const restaurants = foodRestaurants.map(tag => {
    return TagOption(tag.id, tag.name);
  });

  // handle restaurant search
  const handleRestaurantsSearch = useMemo(
    () => debounce(keyword => {
      if (!isString(keyword) || keyword.length < 2) {
        return dispatch(ToastCreators.error({ message: t('ERROR.SEARCH_MIN_2_CHARS') }));
      }
      return dispatch(Creators.getRestaurantsByNameRequest({ name: keyword, cityIds: selectedCity }));
    }, 600),
    [dispatch, selectedCity, t],
  );

  const restaurantsSearch = useCallback(keyword => {
    handleRestaurantsSearch(keyword);
  }, [handleRestaurantsSearch]);

  // handle restaurants change
  const debouncedRestaurantsSelect = useMemo(
    () => debounce(
      restaurantId => dispatch(Creators.setRestaurantId({ restaurantId })),
      FOOD_FILTER_ORDERS_DEFAULT_SELECT_MS,
    ),
    [dispatch],
  );

  const restaurantsSelect = useCallback((restaurantId = null) => {
    debouncedRestaurantsSelect(restaurantId);
  }, [debouncedRestaurantsSelect]);

  return {
    restaurants,
    foodRestaurants,
    foodRestaurantsPending,
    restaurantsSearch,
    restaurantsSelect,
  };
}
