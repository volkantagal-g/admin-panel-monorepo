import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';

import { Select } from '@shared/components/GUI';
import { usePrevious } from '@shared/hooks';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import { getLangKey } from '@shared/i18n';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import { getLimitAndOffset, isObjectIdValid } from '@shared/utils/common';
import { Creators } from '../../../../../../../redux/actions';
import { marketProductSelector } from '../../../../../../../redux/selectors';
import { getSelectedLanguage } from '@shared/redux/selectors/languageSelection';

export const getMarketProductOptions = (marketProducts = [], selectedProduct, excludedProducts = []) => {
  if (!marketProducts?.length) return [];

  const excludedSet = new Set(excludedProducts);

  const marketProductsMap = marketProducts
    ?.filter(item => !excludedSet.has(item?._id))
    ?.map(item => ({
      value: item?._id,
      label: `${item?.fullName?.[getLangKey()] ?? '-'} | ${item?._id}`,
    }));

  return [...new Map([
    ...(selectedProduct ? [[selectedProduct, { value: selectedProduct, label: selectedProduct }]] : []),
    ...marketProductsMap.map(opt => [opt.value, opt]),
  ]).values()];
};

const pagination = { currentPage: 1, rowsPerPage: 100 };

export const ProductSelect = ({ selectedProducts, setSelectedProducts, excludedProducts = [], record, ...props }) => {
  const dispatch = useDispatch();

  const { t } = useTranslation('recipesPage');

  const selectedLanguage = useSelector(getSelectedLanguage);
  const marketProducts = useSelector(marketProductSelector.getData);
  const isPending = useSelector(marketProductSelector.getIsPending);
  const [queryText, setQueryText] = useState('');
  const selectedProduct = record?.fullName?.[selectedLanguage] || '';
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

  const handleChange = productId => {
    if (!selectedProduct) {
      if (selectedProducts.includes(productId)) return;

      setSelectedProducts(selectedProductsPrev => [...selectedProductsPrev, productId]);

      return;
    }

    if (selectedProduct === productId) return;
    if (selectedProducts.includes(productId)) return;

    const index = selectedProducts.indexOf(record?._id);

    if (index === -1) {
      setSelectedProducts(selectedProductsPrev => [...selectedProductsPrev, productId]);

      return;
    }

    setSelectedProducts(selectedProductsPrev => {
      const copy = [...selectedProductsPrev];
      copy[index] = productId;

      return copy;
    });
  };

  const onDropdownChange = visible => {
    if (!visible) {
      dispatch(Creators.clearMarketProducts());
    }
  };

  return (
    <Select
      value={selectedProduct}
      onChange={handleChange}
      optionsData={getMarketProductOptions(marketProducts, selectedProduct, excludedProducts)}
      onSearch={searchValue => setQueryText(searchValue)}
      filterOption={false}
      showSearch
      loading={isPending}
      label={selectedProduct ? t('DETAILS.PRODUCTS.PRODUCT') : t('DETAILS.PRODUCTS.ADD_PRODUCT')}
      style={{ maxWidth: '300px' }}
      onDropdownVisibleChange={onDropdownChange}
      getPopupContainer={() => document.body}
      {...props}
    />
  );
};
