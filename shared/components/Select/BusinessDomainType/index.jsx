import { useState, useEffect } from 'react';

import { t } from '@shared/i18n';
import AntSelect from '@shared/components/UI/AntSelect';
import { domainTypes } from '@shared/shared/constantValues';
import { convertConstantValuesToSelectOptions, getSelectFilterOption } from '@shared/utils/common';

export default function SelectBusinessDomainType({
  isDisabled = false,
  isClearable = false,
  onChange,
  value,
  ...otherProps
}) {
  const [state, setState] = useState();

  const options = convertConstantValuesToSelectOptions(domainTypes);

  const handleChange = val => {
    setState(val);
    onChange(val);
  };

  useEffect(() => {
    setState(value);
  }, [value]);

  const testId = otherProps.name || otherProps.id;

  return (
    <AntSelect
      value={state}
      options={options}
      onChange={handleChange}
      disabled={isDisabled}
      allowClear={isClearable}
      data-testid={testId ? `fc-${testId}` : undefined}
      placeholder={t('personContractType:FIELD.DOMAIN_TYPES')}
      filterOption={getSelectFilterOption}
      showSearch
      {...otherProps}
    />
  );
}
