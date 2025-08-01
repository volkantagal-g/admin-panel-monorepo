import { useTranslation } from 'react-i18next';

import MultipleSelect from '../MultipleSelect';

const PersonaClientFlagsSelect = ({
  activeKey,
  description,
  value,
  label,
  disabled = false,
  selectable = [],
}) => {
  const { t } = useTranslation('clientTargetingPage');
  return (
    <MultipleSelect
      activeKey={activeKey}
      label={label || t("FLAGS")}
      description={description}
      clientListKey="flags"
      value={value}
      mode="tags"
      selectable={selectable}
      disabled={disabled}
      tagKey="flag_code"
      tagValue="flag_code"
    />
  );
};

export default PersonaClientFlagsSelect;
