import { useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';

import { FOOD_FILTER_ORDERS_DEFAULT_SELECT_MS } from '@shared/shared/constants';
import { FOOD_ORDER_SELECT_STATUSES } from '@shared/shared/constantValues';
import { getLangKey } from '@shared/i18n';
import { Creators } from '@app/pages/Client/Detail/redux/actions';
import TagOption from '../../TagOption';

export default function useOrderStatuses() {
  const dispatch = useDispatch();
  const langKey = getLangKey();

  const orderStatusesList = Object.keys(FOOD_ORDER_SELECT_STATUSES).map(tag => {
    const tagText = FOOD_ORDER_SELECT_STATUSES[tag][langKey];
    const customValue = tag.toString();
    return TagOption(customValue, tagText);
  });

  const debouncedOrderStatusSelect = useMemo(
    () => debounce(
      status => dispatch(Creators.setOrderStatus({ status })),
      FOOD_FILTER_ORDERS_DEFAULT_SELECT_MS,
    ),
    [dispatch],
  );

  const orderStatusSelect = useCallback((status = null) => {
    debouncedOrderStatusSelect(status);
  }, [debouncedOrderStatusSelect]);

  return { orderStatusesList, orderStatusSelect };
}
