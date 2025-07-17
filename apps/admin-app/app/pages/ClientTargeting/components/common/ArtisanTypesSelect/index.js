import { useSelector } from 'react-redux';

import { getArtisanTypesSelector } from '@app/pages/ClientTargeting/redux/selectors';
import SingleSelect from '../SingleSelect';

const ArtisanTypesSelect = ({
  activeKey,
  placeholder,
  value,
  label,
  disabled = false,
}) => {
  const artisanTypes = useSelector(getArtisanTypesSelector.getData);

  return (
    <SingleSelect
      activeKey={activeKey}
      label={label}
      placeholder={placeholder}
      clientListKey="artisanType"
      value={value}
      selectable={artisanTypes}
      tagValue="name"
      tagKey="uid"
      disabled={disabled}
      allowClear
    />
  );
};

export default ArtisanTypesSelect;
