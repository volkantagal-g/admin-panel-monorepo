import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select, Spin } from 'antd';
import { debounce } from 'lodash';

import { t } from '@shared/i18n';
import { DEFAULT_DEBOUNCE_MS, REDUX_KEY } from '@shared/shared/constants';
import { convertSelectOptions } from '@shared/utils/common';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { Creators } from './redux/actions';
import { getUsersSelector } from './redux/selectors';
import saga from './redux/saga';
import reducer from './redux/reducer';
import useStyles from './styles';

const reduxKey = REDUX_KEY.SELECT.USER;

const SelectUser = ({
  mode,
  value,
  defaultValue,
  onChange,
  disabled,
  allowClear = true,
  showArrow = true,
  placeholder,
  ...otherProps
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });

  const users = useSelector(getUsersSelector.getData);
  const isPending = useSelector(getUsersSelector.getIsPending);

  const [userSelectOptions, setUserSelectOptions] = useState([]);

  useEffect(() => {
    dispatch(Creators.initContainer());

    return () => {
      dispatch(Creators.destroyContainer());
    };
  }, [dispatch]);

  useEffect(() => {
    const options = convertSelectOptions(users);
    setUserSelectOptions(options);
  }, [users]);

  const debouncedHandleSearch = debounce(searchVal => {
    if (searchVal?.trim().length >= 3) {
      dispatch(Creators.getUsersRequest({ searchVal }));
    }
  }, DEFAULT_DEBOUNCE_MS);

  const handleDropdownVisibleChange = isVisible => {
    if (!isVisible) {
      dispatch(Creators.clearUsersData());
    }
  };

  const getPlaceholder = () => {
    if (disabled) return null;

    if (placeholder) return placeholder;

    return t('global:SEARCH');
  };

  return (
    <Select
      {...(mode ? { mode } : undefined)}
      {...(defaultValue ? { defaultValue } : undefined)}
      value={value}
      options={userSelectOptions}
      filterOption={false}
      onSearch={debouncedHandleSearch}
      onDropdownVisibleChange={handleDropdownVisibleChange}
      onChange={onChange}
      allowClear={allowClear}
      disabled={disabled}
      loading={isPending}
      placeholder={getPlaceholder()}
      notFoundContent={isPending ? <Spin size="small" /> : undefined}
      showArrow={showArrow && !disabled}
      showSearch
      className={classes.wrapper}
      {...otherProps}
    />
  );
};

export default SelectUser;
