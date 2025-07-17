import { useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';

import { getLangKey } from '@shared/i18n';
import { FOOD_FILTER_ORDERS_DEFAULT_SELECT_MS } from '@shared/shared/constants';
import { Creators } from '../redux/actions';
import { paymentMethodsSelector } from '../redux/selectors';
import TagOption from '../components/TagOption';

export default function usePaymentTypes() {
  const dispatch = useDispatch();

  const paymentMethods = useSelector(paymentMethodsSelector.getData);
  const paymentMethodsList = paymentMethods.map(tag => {
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
