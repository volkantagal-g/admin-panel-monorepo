import { useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash';

import { FOOD_DELIVERY_TYPES, FOOD_FILTER_ORDERS_DEFAULT_SELECT_MS } from '@shared/shared/constants';
import { Creators } from '@app/pages/Client/Detail/redux/actions';
import TagOption from '../../TagOption';

export default function useDeliveryTypes() {
  const dispatch = useDispatch();
  const { t } = useTranslation('global');

  const deliveryTypesList = FOOD_DELIVERY_TYPES.map(tag => {
    const tagText = t(`global:FOOD_DELIVERY_TYPES.${tag}`);
    const customValue = tag.toString();
    return TagOption(customValue, tagText);
  });

  const debouncedDeliveryTypeSelect = useMemo(
    () => debounce(
      deliveryTypes => dispatch(Creators.setDeliveryTypes({ deliveryTypes })),
      FOOD_FILTER_ORDERS_DEFAULT_SELECT_MS,
    ),
    [dispatch],
  );

  const deliveryTypeSelect = useCallback((deliveryTypes = []) => {
    debouncedDeliveryTypeSelect(deliveryTypes.map(Number));
  }, [debouncedDeliveryTypeSelect]);

  return { deliveryTypesList, deliveryTypeSelect };
}
