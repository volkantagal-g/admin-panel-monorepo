import { useState, useEffect } from 'react';

import { t } from '@shared/i18n';
import AntSelect from '@shared/components/UI/AntSelect';
import { workTypes } from '@shared/shared/constantValues';
import { convertConstantValuesToSelectOptions, getSelectFilterOption } from '@shared/utils/common';

const SelectWorkType = ({
  isDisabled = false,
  isClearable = false,
  onChange,
  value,
  ...otherProps
}) => {
  const [selectedWorkType, setSelectedWorkType] = useState();

  const workTypeSelectOptions = convertConstantValuesToSelectOptions(workTypes);

  const handleChange = val => {
    setSelectedWorkType(val);
    onChange(val);
  };

  useEffect(() => {
    setSelectedWorkType(value);
  }, [value]);

  return (
    <AntSelect
      value={selectedWorkType}
      options={workTypeSelectOptions}
      onChange={handleChange}
      disabled={isDisabled}
      allowClear={isClearable}
      placeholder={t('WORK_TYPE_STATUS.LABEL')}
      filterOption={getSelectFilterOption}
      showSearch
      {...otherProps}
    />
  );
};

export default SelectWorkType;
