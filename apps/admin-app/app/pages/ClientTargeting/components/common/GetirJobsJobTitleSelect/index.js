import { useDispatch } from 'react-redux';

import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import { Creators } from '../../../redux/actions';
import MultipleSelect from '../MultipleSelect';
import SingleSelect from '../SingleSelect';

const GetirJobsJobTitleSelectSelect = ({
  activeKey,
  value,
  label,
  clientListKey,
  selectable,
  single = false,
  tagValue = 'name',
  tagKey = 'id',
  onSelected,
  allowClear,
  isLoading,
  showCSVImporter = true,
}) => {
  const dispatch = useDispatch();

  const handleSearch = searchString => {
    if (searchString.length < 3) {
      return;
    }
    dispatch(Creators.getGetirJobsJobTitlesByFiltersRequest({
      searchString,
      activeKey,
    }));
  };

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
        isLoading={isLoading}
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
      isLoading={isLoading}
      showCSVImporter={showCSVImporter}
    />
  );
};

export default GetirJobsJobTitleSelectSelect;
