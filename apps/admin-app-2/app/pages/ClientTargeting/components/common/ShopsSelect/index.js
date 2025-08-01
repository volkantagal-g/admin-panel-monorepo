import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import { Creators } from '../../../redux/actions';
import MultipleSelect from '../MultipleSelect';
import SingleSelect from '../SingleSelect';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import { getClientListData } from '@app/pages/ClientTargeting/redux/selectors';

const ShopsSelect = ({
  activeKey,
  value,
  label,
  clientListKey,
  selectable,
  single = false,
  tagValue,
  tagKey = 'id',
  onSelected,
  isLoading,
  selectedArtisanType,
  selectedChainId,
  disabled,
}) => {
  const dispatch = useDispatch();
  const clientListData = useSelector(getClientListData(activeKey));

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  const handleSearch = useCallback(name => {
    if (name.length < 3) return;
    dispatch(Creators.searchArtisanShopsRequest({
      name,
      activeKey,
      artisanType: selectedArtisanType,
      chainId: selectedChainId,
    }));
  }, [dispatch, activeKey, selectedArtisanType, selectedChainId]);

  const { debouncedCallback: debouncedHandleSearch } = useDebouncedCallback({ callback: handleSearch, delay: DEFAULT_DEBOUNCE_MS });

  // Clear shop list when user clear shop search
  const handleShopsClear = () => {
    data.getShops.data = [];
  };

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
        isLoading={isLoading}
        disabled={disabled}
        allowClear
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
      showCSVImporter
      showSelectAllButton
      disabled={disabled}
      allowClear
      onClear={handleShopsClear}
    />
  );
};

export default ShopsSelect;
