import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { debounce } from 'lodash';
import { compose } from 'redux';

import { getSelectFilterOption } from '@shared/utils/common';
import { Creators } from '@shared/containers/Marketing/Select/FoodDeepLinkSelect/redux/actions';
import { DEFAULT_DEBOUNCE_MS, REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import saga from '@shared/containers/Marketing/Select/FoodDeepLinkSelect/redux/saga';
import injectReducer from '@shared/utils/injectReducer';
import reducer from '@shared/containers/Marketing/Select/FoodDeepLinkSelect/redux/reducer';
import { foodDeepLinkSelector } from '@shared/containers/Marketing/Select/FoodDeepLinkSelect/redux/selectors';

const getFoodDeepLinkOptions = values => {
  return values?.map(item => ({
    value: item?._id,
    label: item?.title,
  }));
};

const FoodDeepLinkSelect = ({ fieldName, disabled, onChange, rules, mode, inline, form }) => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();

  const isPending = useSelector(foodDeepLinkSelector.getIsPending);
  const foodDeepLinks = useSelector(foodDeepLinkSelector.getData);

  const searchFoodDeepLinks = keyword => {
    if (keyword.length >= 3) {
      dispatch(Creators.getFoodDeepLinksRequest({ keyword }));
    }
  };
  useEffect(() => {
    dispatch(Creators.initContainer());
    if (form?.getFieldValue(fieldName)) {
      dispatch(Creators.getFoodDeepLinkDetailRequest({ id: form?.getFieldValue(fieldName) }));
    }
    return () => {
      dispatch(Creators.destroyContainer());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <Form.Item
      name={fieldName}
      label={t('FOOD_DEEP_LINK')}
      className={!inline && 'd-inline'}
      rules={rules}
    >
      <Select
        suffixIcon={isPending && <LoadingOutlined spin />}
        mode={mode}
        notFoundContent={(
          <div className="text-center my-3">
            {isPending ? <LoadingOutlined spin className="mr-4" /> : t('NOT_FOUND_PLEASE_TYPE_FOR_SEARCH', { letterCount: 3 })}
          </div>
        )}
        placeholder={`${t('FOOD_DEEP_LINK')}`}
        disabled={disabled}
        onChange={onChange}
        options={getFoodDeepLinkOptions(foodDeepLinks)}
        autoComplete="off"
        allowClear
        showSearch
        onSearch={debounce(searchFoodDeepLinks, DEFAULT_DEBOUNCE_MS)}
        filterOption={getSelectFilterOption}
      />
    </Form.Item>
  );
};

const reduxKey = REDUX_KEY.MARKETING.SELECT.FOOD_DEEP_LINK;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(FoodDeepLinkSelect);
