import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { Select, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash';

import { DEFAULT_DEBOUNCE_MS, REDUX_KEY } from '@shared/shared/constants';
import { useInitAndDestroyPage } from '@shared/hooks';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { isObjectIdValid } from '@shared/utils/common';

import { getRestaurantsSelector } from './redux/selectors';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';

const SelectRestaurant = ({
  mode,
  onChange,
  value,
  includeDeletedRestaurants,
  allowIdSearch = false,
  ...otherProps
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useInitAndDestroyPage({ dispatch, Creators });
  const restaurants = useSelector(getRestaurantsSelector.getData);
  const isPending = useSelector(getRestaurantsSelector.getIsPending);
  const [isSearchValueLongEnough, setIsSearchValueLongEnough] = useState(false);

  const loadOptions = searchString => {
    if (searchString && searchString.length >= 3) {
      if (allowIdSearch && isObjectIdValid(searchString)) {
        dispatch(Creators.getRestaurantByIdRequest({ restaurantId: searchString }));
        setIsSearchValueLongEnough(true);
      }
      else {
        dispatch(Creators.getRestaurantsByNameRequest({ searchString, includeDeletedRestaurants }));
        setIsSearchValueLongEnough(true);
      }
    }
    else {
      setIsSearchValueLongEnough(false);
    }
  };

  const restaurantOptions = useMemo(
    () => restaurants?.map(item => ({
      value: item?.id,
      label: item?.name,
    })),
    [restaurants],
  );

  const getNotFoundContent = () => {
    if (isPending) return <Spin size="small" />;
    if (!isSearchValueLongEnough) return t('global:SEARCH_RESTAURANT_MIN_CHARACTER');
    return undefined;
  };

  const handleChange = val => {
    if (!val) return onChange(null, null);
    if (otherProps.labelInValue) {
      return onChange(val);
    }

    const { label, value: id } = restaurantOptions.find(restaurant => restaurant.value === val);
    return onChange(id, label);
  };

  return (
    <Select
      notFoundContent={getNotFoundContent()}
      placeholder={t('global:RESTAURANT')}
      value={value}
      onChange={handleChange}
      options={restaurantOptions}
      mode={mode}
      onSearch={debounce(loadOptions, DEFAULT_DEBOUNCE_MS)}
      filterOption={false}
      showSearch
      allowClear
      {...otherProps}
    />
  );
};

const reduxKey = REDUX_KEY.SELECT.RESTAURANT;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(SelectRestaurant);
