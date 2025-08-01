import { useTranslation } from 'react-i18next';

import { firstOrderCalculationTypes } from '@app/pages/ClientTargeting/constants';
import SingleSelect from '../SingleSelect';

const FirstOrderCalculationTypeSelect = ({
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
      selectable={firstOrderCalculationTypes(t)}
      tagValue="name"
      tagKey="_id"
      disabled={disabled}
    />
  );
};

export default FirstOrderCalculationTypeSelect;
