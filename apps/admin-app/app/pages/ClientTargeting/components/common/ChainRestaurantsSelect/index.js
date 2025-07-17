import { debounce } from 'lodash';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';

import { Creators } from '../../../redux/actions';
import SingleSelect from '../SingleSelect';

const ChainRestaurantsSelect = ({ activeKey, value, label, clientListKey, selectable, onSelected = null }) => {
  const dispatch = useDispatch();

  const handleSearch = searchString => {
    if (searchString.length < 3) return;
    dispatch(Creators.searchChainRestaurantsRequest({ searchString, activeKey }));
  };
  const debouncedHandleSearch = useCallback(debounce(handleSearch, DEFAULT_DEBOUNCE_MS), [activeKey]);

  const handleSelected = selectedItem => {
    const chainRestaurantId = selectedItem;
    dispatch(Creators.getChainRestaurantBranchesRequest({ chainRestaurantId, activeKey }));
  };

  return (
    <SingleSelect
      activeKey={activeKey}
      value={value}
      label={label}
      clientListKey={clientListKey}
      selectable={selectable}
      onSearch={debouncedHandleSearch}
      tagValue="name"
      tagKey="id"
      onSelected={onSelected || handleSelected}
    />
  );
};

export default ChainRestaurantsSelect;
