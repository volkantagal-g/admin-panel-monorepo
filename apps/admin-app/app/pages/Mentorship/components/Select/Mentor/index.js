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
import { getMentorsSelector } from './redux/selectors';
import { Select } from '@shared/components/GUI';
import { getSelectFilterOption } from '@shared/utils/common';

const reduxKey = REDUX_KEY.MENTORSHIP.SELECT.MENTOR;

export const mentorSelectOptionMapper = ({ _id, employeeId }) => ({ value: _id, label: employeeId?.fullName });

const SelectMentor = ({
  mode = 'multiple',
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

  const mentors = useSelector(getMentorsSelector.getData);
  const isPending = useSelector(getMentorsSelector.getIsPending);

  const {
    fields = DEFAULT_FIELDS,
    limit = DEFAULT_LIMIT,
    offset = DEFAULT_OFFSET,
  } = filters;

  useEffect(() => {
    dispatch(Creators.initContainer());
    if (isFetchOptionsOnLoad) {
      dispatch(Creators.getMentorsRequest({
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
  }, [dispatch, initialSearchTerm, isFetchOptionsOnLoad, fields, limit, offset]);

  const mentorSelectOptions = useMemo(() => (
    mentors?.map(mentorSelectOptionMapper)
  ), [mentors]);

  const getMentorsRequest = name => {
    dispatch(Creators.getMentorsRequest({
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
      getMentorsRequest(name);
      if (isFunction(onSearch)) onSearch(name);
    }
  };

  const { debouncedCallback: debouncedHandleSearch } = useDebouncedCallback({ callback: handleSearch, delay: DEFAULT_DEBOUNCE_MS });

  const handleDropdownVisibleChange = isVisible => {
    if (isVisible && !mentors?.length) {
      getMentorsRequest();
    }
  };

  return (
    <Select
      {...(mode ? { mode } : undefined)}
      {...(defaultValue ? { defaultValue } : undefined)}
      value={value}
      optionsData={mentorSelectOptions}
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

export default SelectMentor;
