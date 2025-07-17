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

import { getLocalsMerchantByNameSelector } from './redux/selectors';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { createMap, isObjectIdValid } from '@shared/utils/common';

const SelectLocalsMerchant = ({
  mode,
  onChange,
  value,
  placeholder,
  allowIdSearch = false,
  ...otherProps
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useInitAndDestroyPage({ dispatch, Creators });
  const localsMerchant = useSelector(getLocalsMerchantByNameSelector.getData);
  const isPending = useSelector(getLocalsMerchantByNameSelector.getIsPending);
  const [isSearchValueLongEnough, setIsSearchValueLongEnough] = useState(false);
  const localsMerchantMap = useMemo(() => createMap(localsMerchant, { field: 'id' }), [localsMerchant]);

  const loadOptions = searchString => {
    if (searchString && searchString.length >= 3) {
      if (allowIdSearch && isObjectIdValid(searchString)) {
        dispatch(Creators.getShopByIdRequest({ shopId: searchString }));
        setIsSearchValueLongEnough(true);
      }
      else {
        dispatch(Creators.getLocalsMerchantByNameRequest({ searchString }));
        setIsSearchValueLongEnough(true);
      }
    }
    else {
      setIsSearchValueLongEnough(false);
    }
  };

  const localsMerchantOptions = useMemo(
    () => localsMerchant?.map(item => {
      return {
        value: item?.id,
        label: item?.name,
      };
    }),
    [localsMerchant],
  );

  const getNotFoundContent = () => {
    if (isPending) return <Spin size="small" />;
    if (!isSearchValueLongEnough) return t('global:SEARCH_RESTAURANT_MIN_CHARACTER');
    return undefined;
  };

  const handleChange = val => {
    if (Array.isArray(val)) {
      onChange(val, localsMerchantMap);
    }
    else {
      onChange(val, localsMerchantMap[val]?.name);
    }
  };

  const placeholderText = placeholder ?? t('global:MERCHANT');

  return (
    <Select
      notFoundContent={getNotFoundContent()}
      placeholder={placeholderText}
      value={value}
      onChange={handleChange}
      options={localsMerchantOptions}
      mode={mode}
      onSearch={debounce(loadOptions, DEFAULT_DEBOUNCE_MS)}
      filterOption={false}
      showSearch
      allowClear
      {...otherProps}
    />
  );
};

const reduxKey = REDUX_KEY.SELECT.LOCALS_MERCHANT;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(SelectLocalsMerchant);
