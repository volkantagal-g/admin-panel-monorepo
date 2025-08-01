import { useSelector } from 'react-redux';

import SingleSelect from '../SingleSelect';
import { getArtisanChainShopsSelector } from '@app/pages/ClientTargeting/redux/selectors';

const ArtisanChainShopsSelect = ({
  activeKey,
  value,
  label,
  clientListKey,
  onSelected = null,
  disabled,
}) => {
  const chainShops = useSelector(getArtisanChainShopsSelector.getData);

  return (
    <SingleSelect
      activeKey={activeKey}
      value={value}
      label={label}
      clientListKey={clientListKey}
      selectable={chainShops}
      tagValue="name"
      tagKey="id"
      onSelected={onSelected}
      allowClear
      disabled={disabled}
    />
  );
};

export default ArtisanChainShopsSelect;
