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

import { getArtisanStoresByNameSelector } from './redux/selectors';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';

const SelectArtisanStore = ({
  mode,
  onChange,
  value,
  ...otherProps
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useInitAndDestroyPage({ dispatch, Creators });
  const artisanStores = useSelector(getArtisanStoresByNameSelector.getData);
  const isPending = useSelector(getArtisanStoresByNameSelector.getIsPending);
  const [isSearchValueLongEnough, setIsSearchValueLongEnough] = useState(false);

  const loadOptions = searchString => {
    if (searchString && searchString.length >= 3) {
      dispatch(Creators.getArtisanStoresByNameRequest({ searchString }));
      setIsSearchValueLongEnough(true);
    }
    else {
      setIsSearchValueLongEnough(false);
    }
  };

  const artisanStoresOptions = useMemo(
    () => artisanStores?.map(item => {
      return {
        value: item?.id,
        label: item?.name,
      };
    }),
    [artisanStores],
  );

  const getNotFoundContent = () => {
    if (isPending) return <Spin size="small" />;
    if (!isSearchValueLongEnough) return t('global:SEARCH_RESTAURANT_MIN_CHARACTER');
    return undefined;
  };

  const handleChange = val => {
    if (!val) return onChange(null, null);
    const { label, value: id } = artisanStoresOptions.find(artisanStore => artisanStore.value === val);
    return onChange(id, label);
  };

  return (
    <Select
      notFoundContent={getNotFoundContent()}
      placeholder={t('global:STORE')}
      value={value}
      onChange={handleChange}
      options={artisanStoresOptions}
      mode={mode}
      onSearch={debounce(loadOptions, DEFAULT_DEBOUNCE_MS)}
      filterOption={false}
      showSearch
      allowClear
      {...otherProps}
    />
  );
};

const reduxKey = REDUX_KEY.SELECT.ARTISAN_STORE;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(SelectArtisanStore);
