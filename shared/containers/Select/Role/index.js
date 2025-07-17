import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select, Spin } from 'antd';
import { debounce, isEmpty } from 'lodash';

import { t } from '@shared/i18n';
import { DEFAULT_DEBOUNCE_MS, REDUX_KEY } from '@shared/shared/constants';
import { convertSelectOptions } from '@shared/utils/common';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { Creators } from './redux/actions';
import { getRolesSelector } from './redux/selectors';
import saga from './redux/saga';
import reducer from './redux/reducer';
import useStyles from './styles';

const reduxKey = REDUX_KEY.SELECT.ROLE;

const SelectRole = ({
  mode,
  value,
  defaultValue,
  onChange,
  disabled,
  allowClear = true,
  showArrow = true,
  excludedRoles = [],
  placeholder,
  ...otherProps
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });

  const roles = useSelector(getRolesSelector.getData);
  const isPending = useSelector(getRolesSelector.getIsPending);

  useEffect(() => {
    dispatch(Creators.initContainer());

    return () => {
      dispatch(Creators.destroyContainer());
    };
  }, [dispatch]);

  const roleSelectOptions = useMemo(() => {
    let filteredRoles = roles;
    if (!isEmpty(excludedRoles)) {
      filteredRoles = roles.filter(role => !excludedRoles.includes(role._id));
    }
    const options = convertSelectOptions(filteredRoles);
    return options;
  }, [roles, excludedRoles]);

  const debouncedHandleSearch = debounce(searchVal => {
    if (searchVal?.trim().length >= 3) {
      dispatch(Creators.getRolesRequest({ searchVal }));
    }
  }, DEFAULT_DEBOUNCE_MS);

  const handleDropdownVisibleChange = isVisible => {
    if (!isVisible) {
      dispatch(Creators.clearRolesData());
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
      options={roleSelectOptions}
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

export default SelectRole;
