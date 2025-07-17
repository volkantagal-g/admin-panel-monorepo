import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import { Creators } from '../../../redux/actions';
import MultipleSelect from '../MultipleSelect';
import SingleSelect from '../SingleSelect';

const RestaurantsSelect = ({
  activeKey,
  value,
  label,
  clientListKey,
  selectable,
  single = false,
  tagValue,
  tagKey = 'id',
  onSelected,
  allowClear = false,
}) => {
  const dispatch = useDispatch();

  const handleSearch = useCallback(searchString => {
    if (searchString.length < 3) return;
    dispatch(Creators.getRestaurantsByNameRequest({ searchString, activeKey }));
  }, [dispatch, activeKey]);

  const { debouncedCallback: debouncedHandleSearch } = useDebouncedCallback({ callback: handleSearch, delay: DEFAULT_DEBOUNCE_MS });

  if (single) {
    return (
      <SingleSelect
        activeKey={activeKey}
        value={value}
        label={label}
        clientListKey={clientListKey}
        selectable={selectable}
        onSearch={debouncedHandleSearch}
        tagValue={tagValue}
        tagKey={tagKey}
        onSelected={onSelected}
        allowClear={allowClear}
      />
    );
  }

  return (
    <MultipleSelect
      activeKey={activeKey}
      value={value}
      label={label}
      clientListKey={clientListKey}
      selectable={selectable}
      onSearch={debouncedHandleSearch}
      tagValue={tagValue}
      tagKey={tagKey}
      showCSVImporter
    />
  );
};

export default RestaurantsSelect;
