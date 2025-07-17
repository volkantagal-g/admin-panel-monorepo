import { useTranslation } from 'react-i18next';

import { lastOrderCalculationTypes } from '@app/pages/ClientTargeting/constants';
import SingleSelect from '../SingleSelect';

const LastOrderCalculationTypeSelect = ({
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
      selectable={lastOrderCalculationTypes(t)}
      tagValue="name"
      tagKey="_id"
      allowClear
      disabled={disabled}
    />
  );
};

export default LastOrderCalculationTypeSelect;
