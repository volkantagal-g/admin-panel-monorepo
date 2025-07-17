import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { Select, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash';

import { REDUX_KEY } from '@shared/shared/constants';
import { useInitAndDestroyPage } from '@shared/hooks';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';

import { getChainRestaurantsSelector } from './redux/selectors';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';

const SelectRestaurant = ({
  mode,
  onChange,
  value,
  ...otherProps
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useInitAndDestroyPage({ dispatch, Creators });
  const chainrestaurants = useSelector(getChainRestaurantsSelector.getData);
  const isPending = useSelector(getChainRestaurantsSelector.getIsPending);

  const loadOptions = searchString => {
    if (searchString && searchString.length >= 3) {
      dispatch(Creators.getChainRestaurantsByNameRequest({ searchString }));
    }
  };

  const restaurantOptions = useMemo(
    () => chainrestaurants?.map(item => ({
      value: item?.id,
      label: item?.name,
    })),
    [chainrestaurants],
  );

  return (
    <Select
      notFoundContent={isPending ? <Spin size="small" /> : undefined}
      placeholder={t('global:CHAIN_RESTAURANT')}
      value={value}
      onChange={onChange}
      options={restaurantOptions}
      mode={mode}
      onSearch={debounce(loadOptions, 200)}
      filterOption={false}
      showSearch
      allowClear
      {...otherProps}
    />
  );
};

const reduxKey = REDUX_KEY.SELECT.CHAIN_RESTAURANT;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(SelectRestaurant);
