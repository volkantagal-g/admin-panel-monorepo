import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';

import { isEmpty } from 'lodash';

import { Select } from '@shared/components/GUI';
import { usePrevious } from '@shared/hooks';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import { getLangKey } from '@shared/i18n';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import { getLimitAndOffset, isObjectIdValid } from '@shared/utils/common';
import { Creators } from '../../../../../../../../redux/actions';
import { marketProductSelector } from '../../../../../../../../redux/selectors';

export const getMarketProductOptions = (marketProducts = [], selectedProducts = [], excludedProducts = []) => {
  if (!marketProducts?.length && !selectedProducts?.length) return [];

  const excludedSet = new Set(excludedProducts);

  const marketProductsArray = (!marketProducts?.length || isEmpty(marketProducts)) ? [] : marketProducts;

  const marketProductsMap = marketProductsArray
    ?.filter(item => !excludedSet.has(item?._id))
    ?.map(item => ({
      value: item?._id,
      label: `${item?.fullName?.[getLangKey()] ?? '-'} | ${item?._id}`,
    }));

  const selectedOptions = (selectedProducts || [])
    .filter(id => !marketProductsMap.some(opt => opt.value === id))
    .map(id => ({ value: id, label: id }));

  return [
    ...selectedOptions,
    ...marketProductsMap,
  ];
};

const pagination = { currentPage: 1, rowsPerPage: 100 };

export const SubstituteProductSelect = ({ selectedProducts, setSelectedProducts, excludedProducts = [], ...props }) => {
  const dispatch = useDispatch();

  const { t } = useTranslation('recipesPage');

  const marketProducts = useSelector(marketProductSelector.getData);
  const isPending = useSelector(marketProductSelector.getIsPending);
  const [queryText, setQueryText] = useState('');
  const prevQueryText = usePrevious(queryText);

  const handleSearchCallback = useCallback(searchValue => {
    const options = { fullName: true };
    const idsOrQueryTextParam = isObjectIdValid(searchValue) ? { ids: [searchValue] } : { queryText: searchValue };

    dispatch(Creators.getMarketProductsRequest({
      filters: {
        fields: ['name', 'fullName', 'picURL'],
        filterOptions: options,
        statusList: ['ACTIVE'],
        isVisible: true,
        ...(excludedProducts?.length ? { excludeIds: excludedProducts } : undefined),
        ...idsOrQueryTextParam,
        ...getLimitAndOffset(pagination),
      },
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const { debouncedCallback: debouncedHandleSearch } = useDebouncedCallback({ callback: handleSearchCallback, delay: DEFAULT_DEBOUNCE_MS });

  useEffect(
    () => {
      const hasQueryTextChanged = prevQueryText !== queryText;
      if (hasQueryTextChanged && queryText?.length) {
        debouncedHandleSearch(queryText);
      }
    },
    [debouncedHandleSearch, prevQueryText, queryText],
  );

  const handleChange = productIds => {
    setSelectedProducts(productIds);
  };

  return (
    <Select
      value={selectedProducts}
      onChange={handleChange}
      optionsData={getMarketProductOptions(marketProducts, selectedProducts, excludedProducts)}
      onSearch={searchValue => setQueryText(searchValue)}
      filterOption={false}
      showSearch
      loading={isPending}
      label={t('DETAILS.PRODUCTS.ADD_PRODUCT')}
      style={{ marginBottom: '8px' }}
      mode="multiple"
      {...props}
    />
  );
};
