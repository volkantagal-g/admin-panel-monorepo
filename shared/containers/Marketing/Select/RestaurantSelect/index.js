import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { debounce } from 'lodash';
import { compose } from 'redux';

import { getSelectFilterOption } from '@shared/utils/common';
import { Creators } from '@shared/containers/Marketing/Select/RestaurantSelect/redux/actions';
import { DEFAULT_DEBOUNCE_MS, REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import saga from '@shared/containers/Marketing/Select/RestaurantSelect/redux/saga';
import injectReducer from '@shared/utils/injectReducer';
import reducer from '@shared/containers/Marketing/Select/RestaurantSelect/redux/reducer';
import { restaurantSelector } from '@shared/containers/Marketing/Select/RestaurantSelect/redux/selectors';

const getRestaurantOptions = values => {
  return values?.map(item => ({
    value: item?.id,
    label: item?.name,
  }));
};

const RestaurantSelect = ({ fieldName, disabled, onChange, rules, mode, inline }) => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();

  const isPending = useSelector(restaurantSelector.getIsPending);
  const restaurants = useSelector(restaurantSelector.getData);

  const searchRestaurants = searchString => {
    if (searchString.length >= 3) {
      dispatch(Creators.getRestaurantsRequest({ searchString }));
    }
  };
  useEffect(() => {
    dispatch(Creators.initContainer());
    return () => {
      dispatch(Creators.destroyContainer());
    };
  }, [dispatch]);

  return (
    <Form.Item
      name={fieldName}
      label={t('RESTAURANTS')}
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
        placeholder={`${t('RESTAURANTS')}`}
        disabled={disabled}
        onChange={onChange}
        options={getRestaurantOptions(restaurants)}
        autoComplete="off"
        allowClear
        showSearch
        onSearch={debounce(searchRestaurants, DEFAULT_DEBOUNCE_MS)}
        filterOption={getSelectFilterOption}
      />
    </Form.Item>
  );
};

const reduxKey = REDUX_KEY.MARKETING.SELECT.RESTAURANT;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(RestaurantSelect);
