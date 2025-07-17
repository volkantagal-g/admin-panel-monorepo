import { useMemo, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { CURRENCY_TYPE, CURRENCY_KEYS, PAGE_URL_QUERY_PARAMS } from '../constants';
import { getCurrencyFromLocalStorage, setCurrencyToLocalStorage } from '../localStorage';

export function useCurrencyOptions({ currencyConfig = CURRENCY_TYPE, currencySetterAction, currencyLocalStorageKey }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const urlCurrency = searchParams.get(PAGE_URL_QUERY_PARAMS.currency);

  useEffect(() => {
    // if url has currency info use that, if not use localStorage, if nothing use default value set in reducer
    if (urlCurrency) {
      dispatch(currencySetterAction({ currency: urlCurrency }));
      setCurrencyToLocalStorage(currencyLocalStorageKey, urlCurrency);
    }
    else {
      let currency = getCurrencyFromLocalStorage(currencyLocalStorageKey);
      if (!CURRENCY_KEYS.includes(currency)) {
        currency = CURRENCY_TYPE.USD;
        setCurrencyToLocalStorage(currencyLocalStorageKey, currency);
      }
      dispatch(currencySetterAction({ currency }));
    }
  }, [urlCurrency, dispatch, currencySetterAction, currencyLocalStorageKey]);

  const currencyOptions = useMemo(() => {
    const currencyValues = Object.values(currencyConfig);
    return currencyValues.map(value => {
      return {
        label: value,
        value,
      };
    });
  }, [currencyConfig]);

  const setCurrency = useCallback(
    value => {
      // source of truth is url state for currency,
      // that is why we don't update redux from here, we update url, and url change triggers redux in one place
      searchParams.set(PAGE_URL_QUERY_PARAMS.currency, value);
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams],
  );

  return { currencyOptions, setCurrency };
}
