import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';

import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import { Creators } from '../../../redux/actions';
import MultipleSelect from '../MultipleSelect';
import SingleSelect from '../SingleSelect';

const MarketPromosSelect = ({
  activeKey,
  value,
  label,
  description,
  clientListKey,
  selectable,
  single = false,
  tagValue,
  tagKey = 'id',
  onSelected,
  onBlur,
}) => {
  const dispatch = useDispatch();

  const handleSearch = searchString => {
    if (searchString.length < 3) return;
    const queryString = {
      promoCode: searchString,
      limit: 30,
      page: 0,
    };

    dispatch(Creators.getMarketPromosBySearchCodeRequest({ params: queryString }));
  };

  if (single) {
    return (
      <SingleSelect
        activeKey={activeKey}
        value={value}
        label={label}
        clientListKey={clientListKey}
        selectable={selectable}
        onSearch={debounce(handleSearch, DEFAULT_DEBOUNCE_MS)}
        tagValue={tagValue}
        tagKey={tagKey}
        onSelected={onSelected}
      />
    );
  }

  return (
    <MultipleSelect
      activeKey={activeKey}
      value={value}
      label={label}
      description={description}
      clientListKey={clientListKey}
      selectable={selectable}
      onSearch={debounce(handleSearch, DEFAULT_DEBOUNCE_MS)}
      onBlur={onBlur}
      tagValue={tagValue}
      tagKey={tagKey}
      showCSVImporter
    />
  );
};

export default MarketPromosSelect;
