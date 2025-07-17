import { useTranslation } from 'react-i18next';

import { firstTripCalculationTypes } from '@app/pages/ClientTargeting/constants';
import SingleSelect from '../SingleSelect';

const FirstTripCalculationTypeSelect = ({
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
      selectable={firstTripCalculationTypes(t)}
      tagValue="name"
      tagKey="_id"
      disabled={disabled}
    />
  );
};

export default FirstTripCalculationTypeSelect;
