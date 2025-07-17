import { useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';

import { FOOD_FILTER_ORDERS_DEFAULT_SELECT_MS } from '@shared/shared/constants';
import { getLangKey } from '@shared/i18n';
import { Creators } from '../redux/actions';
import TagOption from '../components/TagOption';

const ORDER_STATUSES = {
  SUCCESS_ORDERS: {
    en: 'Success Orders',
    tr: 'Başarılı Siparişler',
  },
  CANCELED_ORDERS: {
    en: 'Canceled Orders',
    tr: 'İptal Siparişler',
  },
  ACTIVE_ORDERS: {
    en: 'Active Orders',
    tr: 'Aktif Siparişler',
  },
};

export default function useOrderStatuses() {
  const dispatch = useDispatch();
  const langKey = getLangKey();

  const orderStatusesList = Object.keys(ORDER_STATUSES).map(tag => {
    const tagText = ORDER_STATUSES[tag][langKey];
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
