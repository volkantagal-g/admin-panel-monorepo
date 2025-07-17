import { useTranslation } from 'react-i18next';

import { lastTripCalculationTypes } from '@app/pages/ClientTargeting/constants';
import SingleSelect from '../SingleSelect';

const LastTripCalculationTypeSelect = ({
  activeKey,
  placeholder,
  value,
  label,
  disabled = false,
}) => {
  const { t } = useTranslation('clientTargetingPage');
  return (
    <SingleSelect
      activeKey={activeKey}
      label={label}
      placeholder={placeholder}
      clientListKey="calculationType"
      value={value}
      selectable={lastTripCalculationTypes(t)}
      tagValue="name"
      tagKey="_id"
      allowClear
      disabled={disabled}
    />
  );
};

export default LastTripCalculationTypeSelect;
