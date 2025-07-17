import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';

import { FOOD_FILTER_ORDERS_DEFAULT_SELECT_MS } from '@shared/shared/constants';
import { Creators } from '../redux/actions';
import { filtersSelector } from '../redux/selectors';

export default function useConfirmationCode() {
  const dispatch = useDispatch();
  const confirmationCode = useSelector(filtersSelector.getConfirmationCode);

  const handleCorfirmationCode = useMemo(
    () => debounce(newConfirmationCode => {
      if (newConfirmationCode === confirmationCode) {
        return;
      }
      dispatch(Creators.setConfirmationCode({ confirmationCode: newConfirmationCode }));
    }, FOOD_FILTER_ORDERS_DEFAULT_SELECT_MS),
    [dispatch, confirmationCode],
  );

  const setConfirmationCode = useCallback((newConfirmationCode = '') => {
    handleCorfirmationCode(newConfirmationCode);
  }, [handleCorfirmationCode]);

  return { confirmationCode, setConfirmationCode };
}
