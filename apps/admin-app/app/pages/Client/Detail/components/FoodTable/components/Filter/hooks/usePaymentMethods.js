import { useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';

import { getLangKey } from '@shared/i18n';
import { FOOD_FILTER_ORDERS_DEFAULT_SELECT_MS } from '@shared/shared/constants';
import { Creators } from '@app/pages/Client/Detail/redux/actions';
import { paymentMethodsSelector } from '@app/pages/Client/Detail/redux/selectors';
import TagOption from '../../TagOption';

export default function usePaymentMethods() {
  const dispatch = useDispatch();

  const paymentMethods = useSelector(paymentMethodsSelector.getData);
  const paymentMethodsList = paymentMethods?.map(tag => {
    return TagOption(tag.id, tag.name[getLangKey()], tag.type);
  });

  const debouncedPaymentMethodSelect = useMemo(
    () => debounce(
      newPaymentMethods => dispatch(Creators.setPaymentMethods({ paymentMethods: newPaymentMethods })),
      FOOD_FILTER_ORDERS_DEFAULT_SELECT_MS,
    ),
    [dispatch],
  );

  const paymentMethodSelect = useCallback((newPaymentMethods = []) => {
    debouncedPaymentMethodSelect(newPaymentMethods);
  }, [debouncedPaymentMethodSelect]);

  return { paymentMethodsList, paymentMethodSelect };
}
