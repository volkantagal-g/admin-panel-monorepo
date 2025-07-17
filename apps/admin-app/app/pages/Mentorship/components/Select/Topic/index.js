import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';

import { isFunction } from 'lodash';

import { DEFAULT_FIELDS, DEFAULT_LIMIT, DEFAULT_OFFSET } from './constants';
import { DEFAULT_DEBOUNCE_MS, REDUX_KEY } from '@shared/shared/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import { getTopicsSelector } from './redux/selectors';
import { Select } from '@shared/components/GUI';
import { getSelectFilterOption } from '@shared/utils/common';

const reduxKey = REDUX_KEY.MENTORSHIP.SELECT.TOPIC;

export const topicsSelectOptionMapper = ({ _id, name }) => ({ value: _id, label: name });

const SelectTopic = ({
  mode,
  value,
  defaultValue,
  onChange,
  disabled,
  allowClear = true,
  showArrow = true,
  filters = {},
  isFetchOptionsOnLoad = false,
  initialSearchTerm,
  onSearch,
  ...otherProps
}) => {
  const dispatch = useDispatch();

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });

  const topics = useSelector(getTopicsSelector.getData);
  const isPending = useSelector(getTopicsSelector.getIsPending);

  const {
    fields = DEFAULT_FIELDS,
    limit = DEFAULT_LIMIT,
    offset = DEFAULT_OFFSET,
  } = filters;

  useEffect(() => {
    dispatch(Creators.initContainer());
    if (isFetchOptionsOnLoad) {
      dispatch(Creators.getTopicsRequest({
        filters: {
          ...(initialSearchTerm ? { name: initialSearchTerm } : undefined),
          fields,
          limit,
          offset,
        },
      }));
    }

    return () => {
      dispatch(Creators.destroyContainer());
    };
  }, [dispatch, fields, initialSearchTerm, isFetchOptionsOnLoad, limit, offset]);

  const topicsSelectOptions = useMemo(() => (
    topics?.map(topicsSelectOptionMapper)
  ), [topics]);

  const getTopicsRequest = name => {
    dispatch(Creators.getTopicsRequest({
      filters: {
        ...(name ? { name } : undefined),
        fields,
        limit,
        offset,
      },
    }));
  };

  const handleSearch = name => {
    if (name?.trim().length >= 2) {
      getTopicsRequest(name);
      if (isFunction(onSearch)) onSearch(name);
    }
  };

  const { debouncedCallback: debouncedHandleSearch } = useDebouncedCallback({ callback: handleSearch, delay: DEFAULT_DEBOUNCE_MS });

  const handleDropdownVisibleChange = isVisible => {
    if (isVisible && !topics?.length) {
      getTopicsRequest();
    }
  };

  return (
    <Select
      {...(mode ? { mode } : undefined)}
      {...(defaultValue ? { defaultValue } : undefined)}
      value={value}
      optionsData={topicsSelectOptions}
      filterOption={getSelectFilterOption}
      onSearch={debouncedHandleSearch}
      onDropdownVisibleChange={handleDropdownVisibleChange}
      onChange={onChange}
      allowClear={allowClear}
      disabled={disabled}
      loading={isPending}
      notFoundContent={isPending ? <Spin size="small" /> : undefined}
      showArrow={showArrow}
      autoComplete="off"
      showSearch
      {...otherProps}
    />
  );
};

export default SelectTopic;
