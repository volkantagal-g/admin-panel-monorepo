import { useState, useEffect } from 'react';

import { t } from '@shared/i18n';
import AntSelect from '@shared/components/UI/AntSelect';
import { BLOOD_TYPES } from '@shared/shared/constants';
import { convertConstantValuesToSelectOptions, getSelectFilterOption } from '@shared/utils/common';

const SelectBloodType = ({
  isDisabled = false,
  isClearable = false,
  onChange,
  value,
  ...otherProps
}) => {
  const [selectedBloodType, setSelectedBloodType] = useState();

  const bloodTypeSelectOptions = convertConstantValuesToSelectOptions(BLOOD_TYPES).map(option => ({
    value: option.value + 1,
    label: option.label,
  }));

  const handleChange = val => {
    setSelectedBloodType(val);
    onChange(val);
  };

  useEffect(() => {
    setSelectedBloodType(value);
  }, [value]);

  return (
    <AntSelect
      value={selectedBloodType}
      options={bloodTypeSelectOptions}
      onChange={handleChange}
      disabled={isDisabled}
      allowClear={isClearable}
      placeholder={t('BLOOD_TYPE_STATUS.LABEL')}
      filterOption={getSelectFilterOption}
      showSearch
      {...otherProps}
    />
  );
};

export default SelectBloodType;
