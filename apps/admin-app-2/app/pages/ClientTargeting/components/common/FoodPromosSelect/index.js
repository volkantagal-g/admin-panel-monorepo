import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';

import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import { Creators } from '../../../redux/actions';
import MultipleSelect from '../MultipleSelect';
import SingleSelect from '../SingleSelect';

const FoodPromosSelect = ({
  activeKey,
  value,
  label,
  description,
  clientListKey,
  selectable,
  single=false,
  tagValue,
  tagKey="id",
  onSelected,
  onBlur,
}) => {

  const dispatch = useDispatch();

  const handleSearch = searchString => {
    if (searchString.length < 3) return;
    const queryString = {
      search: searchString,
      limit: 30,
      page: 1,
    };

    dispatch(Creators.getFoodPromosBySearchCodeRequest({ params: queryString }));
  };

  const debouncedHandleSearch = useCallback(debounce(handleSearch, DEFAULT_DEBOUNCE_MS), [activeKey]);

  if (single) {
    return <SingleSelect 
      activeKey={activeKey}
      value={value}
      label={label}
      clientListKey={clientListKey}
      selectable={selectable}
      onSearch={debouncedHandleSearch}
      tagValue={tagValue}
      tagKey={tagKey}
      onSelected={onSelected}
    />;
  }

  return (
    <MultipleSelect 
      activeKey={activeKey}
      value={value}
      label={label}
      description={description}
      clientListKey={clientListKey}
      selectable={selectable}
      onSearch={debouncedHandleSearch}
      onBlur={onBlur}
      tagValue={tagValue}
      tagKey={tagKey}
      showCSVImporter
    />
  );
};

export default FoodPromosSelect;
