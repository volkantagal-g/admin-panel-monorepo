import { LoadingOutlined } from '@ant-design/icons';
import { Form, Select as AntSelect, SelectProps, Spin } from 'antd';
import { Rule } from 'antd/lib/form';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';

import { Select } from '@shared/components/GUI';
import { usePrevious } from '@shared/hooks';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import { getLangKey } from '@shared/i18n';
import { DEFAULT_DEBOUNCE_MS, REDUX_KEY } from '@shared/shared/constants';
import { getLimitAndOffset, getSelectFilterOption, isObjectIdValid } from '@shared/utils/common';
import injectReducer from '@shared/utils/injectReducer';
import injectSaga from '@shared/utils/injectSaga';
import { Creators } from './redux/actions';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { marketProductSelector } from './redux/selectors';
import { MarketProduct } from '@app/pages/Promo/types';

type PromoProductSelectProps = {
  value: string[];
  onChange: (value: string[], marketProductsMap: Record<string, MarketProduct>) => void;
  rules?: Rule[];
  selectedProducts: MongoIDType[]
  // eslint-disable-next-line react/require-default-props
  isNewStyle?: boolean;
  disabled?: boolean
  mode: SelectProps['mode']
}

export const getMarketProductOptions = (marketProducts: MarketProduct[] = []) => {
  return marketProducts?.map(item => ({
    value: item?._id,
    label: `${item?.fullName?.[getLangKey()] ?? '-'} | ${item?._id}`,
  }));
};

const pagination = { currentPage: 1, rowsPerPage: 100 };

const PromoProductSelect = ({ value, onChange = () => {}, rules = [], selectedProducts, isNewStyle = false, ...props } : PromoProductSelectProps) => {
  const { t } = useTranslation('promoPage');
  const dispatch = useDispatch();

  const isPending = useSelector(marketProductSelector.getIsPending);
  const marketProductOptions = useSelector(marketProductSelector.getData);
  const marketProductsMap = useSelector(marketProductSelector.getMarketProductsMap);
  const [queryText, setQueryText] = useState('');
  const prevQueryText = usePrevious(queryText);

  const handleSearchCallback = useCallback(searchValue => {
    const options = { fullName: true };
    const idsOrQueryTextParam = isObjectIdValid(searchValue) ? { ids: [searchValue] } : { queryText: searchValue };

    dispatch(Creators.getMarketProductsRequest({
      filters: {
        fields: 'name fullName picURL type isBundle',
        filterOptions: options,
        ...idsOrQueryTextParam,
        ...getLimitAndOffset(pagination),
      },
    }));
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

  useEffect(() => {
    dispatch(Creators.initContainer());
    if (selectedProducts?.length) {
      dispatch(
        Creators.getMarketProductsRequest({
          filters: {
            fields: 'name fullName picURL type isBundle',
            populate: [],
            ids: [...selectedProducts],
          },
        }),
      );
    }
    return () => {
      dispatch(Creators.destroyContainer());
    };
  }, [dispatch, selectedProducts]);

  const handleChange = (productIds: string[]) => {
    onChange(productIds, marketProductsMap);
  };

  const getNotFoundContent = () => {
    if (isPending) return <div className="text-center my-3"><Spin size="small" /></div>;
    if (!isPending && !queryText) return <div className="text-center my-3">{t('SELECT_PRODUCT.NOT_FOUND_PLEASE_TYPE_FOR_SEARCH', { letterCount: 1 })}</div>;
    if (!isPending && queryText?.length && !marketProductsMap.length) return <div className="text-center my-3">{t('SELECT_PRODUCT.NOT_FOUND')}</div>;
    return undefined;
  };

  return (
    isNewStyle ? (
      <Select
        onChange={handleChange}
        optionsData={getMarketProductOptions(marketProductOptions)}
        onSearch={(searchValue: any) => setQueryText(searchValue)}
        filterOption={false}
        showSearch
        loading={isPending}
        {...props}
      />
    ) : (
      <Form.Item
        label={t('SELECT_PRODUCT.PRODUCTS')}
        className="d-inline"
        rules={rules}
      >

        <AntSelect
          id="benefit-type_product-select"
          suffixIcon={isPending && <LoadingOutlined spin />}
          placeholder={`${t('SELECT_PRODUCT.PRODUCTS')}`}
          onSearch={searchValue => setQueryText(searchValue)}
          loading={isPending}
          notFoundContent={getNotFoundContent()}
          onChange={handleChange}
          options={getMarketProductOptions(marketProductOptions)}
          allowClear
          showSearch
          filterOption={getSelectFilterOption}
          value={value}
          {...props}
        />
      </Form.Item>
    )
  );
};

const reduxKey = REDUX_KEY.PROMO.PRODUCT_SELECT;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(PromoProductSelect) as typeof PromoProductSelect;
