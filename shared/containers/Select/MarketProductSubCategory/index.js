import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { LoadingOutlined } from '@ant-design/icons';

import { REDUX_KEY } from '@shared/shared/constants';
import { useInitAndDestroyPage } from '@shared/hooks';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';

import { getMarketProductSubCategoriesSelector } from './redux/selectors';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { getLangKey } from '@shared/i18n';

const SelectMarketProductSubCategory = ({
  mode,
  onChange,
  value,
  ...otherProps
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useInitAndDestroyPage({ dispatch, Creators });
  const marketProductSubCategories = useSelector(getMarketProductSubCategoriesSelector.getData);
  const isPending = useSelector(getMarketProductSubCategoriesSelector.getIsPending);

  useEffect(() => {
    const body = { queryText: '', isSubCategory: true };
    dispatch(Creators.getMarketProductSubCategoriesRequest({ body }));
  }, [dispatch]);

  const marketProductSubCategoriesOptions = useMemo(
    () => marketProductSubCategories?.map(item => {
      return {
        value: item?._id,
        label: item?.name?.[getLangKey()],
      };
    }),
    [marketProductSubCategories],
  );

  return (
    <Select
      disabled={isPending}
      placeholder={t('global:SUB_CATEGORY')}
      value={value}
      onChange={onChange}
      options={marketProductSubCategoriesOptions}
      suffixIcon={isPending && <LoadingOutlined spin />}
      mode={mode}
      filterOption={false}
      showSearch
      allowClear
      {...otherProps}
    />
  );
};

const reduxKey = REDUX_KEY.SELECT.MARKET_PRODUCT_SUB_CATEGORY;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(SelectMarketProductSubCategory);
