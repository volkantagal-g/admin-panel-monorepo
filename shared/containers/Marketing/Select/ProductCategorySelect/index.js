import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { get } from 'lodash';
import { compose } from 'redux';

import { getSelectFilterOption } from '@shared/utils/common';
import { Creators } from '@shared/containers/Marketing/Select/ProductCategorySelect/redux/actions';

import { getLangKey } from '@shared/i18n';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import saga from '@shared/containers/Marketing/Select/ProductCategorySelect/redux/saga';
import injectReducer from '@shared/utils/injectReducer';
import reducer from '@shared/containers/Marketing/Select/ProductCategorySelect/redux/reducer';
import { marketProductCategorySelector } from '@shared/containers/Marketing/Select/ProductCategorySelect/redux/selectors';
import { CATEGORY_STATUS } from '@shared/containers/Marketing/Select/ProductCategorySelect/constants';

export const getMarketProductCategoryOptions = (marketProductCategories = []) => {
  return marketProductCategories.map(category => {
    return {
      value: get(category, '_id', ''),
      label: `${get(category, ['name', getLangKey()], '')} | ${get(category, '_id', '')}`,
    };
  });
};

const ProductCategorySelect = ({ fieldName, disabled, onChange, rules, mode = null, onlySubCategories = false }) => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();

  const isPending = useSelector(marketProductCategorySelector.getIsPending);
  const marketProductCategories = useSelector(marketProductCategorySelector.getData);

  useEffect(() => {
    dispatch(Creators.initContainer());
    dispatch(Creators.getMarketProductCategoriesRequest({ status: CATEGORY_STATUS.ACTIVE, isSubCategory: onlySubCategories }));
    return () => {
      dispatch(Creators.destroyContainer());
    };
  }, [dispatch, onlySubCategories]);

  return (
    <Form.Item
      name={fieldName}
      label={t('CATEGORIES')}
      className="d-inline"
      rules={rules}
    >
      <Select
        suffixIcon={isPending && <LoadingOutlined spin />}
        placeholder={`${t('CATEGORIES')}`}
        mode={mode}
        disabled={isPending || disabled}
        onChange={onChange}
        options={getMarketProductCategoryOptions(marketProductCategories)}
        autoComplete="off"
        allowClear
        showSearch
        filterOption={getSelectFilterOption}
      />
    </Form.Item>
  );
};

const reduxKey = REDUX_KEY.MARKETING.SELECT.PRODUCT_CATEGORY;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(ProductCategorySelect);
