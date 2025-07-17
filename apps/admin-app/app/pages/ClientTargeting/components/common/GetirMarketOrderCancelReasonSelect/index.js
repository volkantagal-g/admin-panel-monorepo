import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getGetirMarketOrderCancelReasonsSelector } from '../../../redux/selectors';
import { Creators } from '../../../redux/actions';
import MultipleSelect from '../MultipleSelect';
import SingleSelect from '../SingleSelect';

const GetirMarketOrderCancelReasonSelect = ({
  activeKey,
  value,
  label,
  description,
  clientListKey,
  onSelected,
  onBlur,
  domainType,
  single = false,
  tagValue = 'title',
  tagKey = '_id',
}) => {
  const dispatch = useDispatch();

  const selectableData = useSelector(getGetirMarketOrderCancelReasonsSelector.getData);
  const isPending = useSelector(getGetirMarketOrderCancelReasonsSelector.getIsPending);

  useEffect(() => {
    dispatch(Creators.getGetirMarketOrderCancelReasonsRequest({ domainType }));
  }, [dispatch, domainType]);

  if (single) {
    return (
      <SingleSelect
        activeKey={activeKey}
        value={value}
        label={label}
        clientListKey={clientListKey}
        selectable={selectableData}
        tagValue={tagValue}
        tagKey={tagKey}
        onSelected={onSelected}
        disabled={isPending}
        showSearch
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
      selectable={selectableData}
      onBlur={onBlur}
      tagValue={tagValue}
      tagKey={tagKey}
      disabled={isPending}
      showSearch
    />
  );
};

export default GetirMarketOrderCancelReasonSelect;
