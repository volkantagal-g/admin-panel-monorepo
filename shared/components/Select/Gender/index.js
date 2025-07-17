import { useState, useEffect } from 'react';

import { t } from '@shared/i18n';
import AntSelect from '@shared/components/UI/AntSelect';
import { genderTypes } from '@shared/shared/constantValues';
import { convertConstantValuesToSelectOptions, getSelectFilterOption } from '@shared/utils/common';

const SelectGender = ({
  isDisabled = false,
  isClearable = false,
  onChange,
  value,
  ...otherProps
}) => {
  const [selectedGender, setSelectedGender] = useState();

  const genderSelectOptions = convertConstantValuesToSelectOptions(genderTypes);

  const handleChange = val => {
    setSelectedGender(val);
    onChange(val);
  };

  useEffect(() => {
    setSelectedGender(value);
  }, [value]);

  return (
    <AntSelect
      value={selectedGender}
      options={genderSelectOptions}
      onChange={handleChange}
      disabled={isDisabled}
      allowClear={isClearable}
      placeholder={t('GENDER_STATUS.LABEL')}
      filterOption={getSelectFilterOption}
      showSearch
      {...otherProps}
    />
  );
};

export default SelectGender;
