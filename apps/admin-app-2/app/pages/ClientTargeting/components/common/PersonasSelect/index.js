import { useTranslation } from 'react-i18next';

import { PERSONA_DETAIL_OPTIONS } from '@app/pages/ClientTargeting/constants';
import MultipleSelect from '../MultipleSelect';

const PersonasSelect = ({
  activeKey,
  description,
  value,
  label,
  disabled = false,
}) => {
  const { t } = useTranslation('clientTargetingPage');
  return (
    <MultipleSelect
      activeKey={activeKey}
      label={label || t("PERSONA")}
      description={description}
      clientListKey="personas"
      value={value}
      mode="tags"
      selectable={PERSONA_DETAIL_OPTIONS}
      disabled={disabled}
      tagKey="id"
      tagValue="name"
    />
  );
};

export default PersonasSelect;
