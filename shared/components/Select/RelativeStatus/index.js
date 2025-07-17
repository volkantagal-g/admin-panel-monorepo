import { useState, useEffect } from 'react';

import { t } from '@shared/i18n';
import AntSelect from '@shared/components/UI/AntSelect';
import { relationTypes } from '@shared/shared/constantValues';
import { convertConstantValuesToSelectOptions, getSelectFilterOption } from '@shared/utils/common';

const SelectRelativeStatus = ({
  isDisabled = false,
  isClearable = false,
  onChange,
  value,
  ...otherProps
}) => {
  const [selectedRelativeStatus, setSelectedRelativeStatus] = useState();

  const relativeStatusSelectOptions = convertConstantValuesToSelectOptions(relationTypes);

  const handleChange = val => {
    setSelectedRelativeStatus(val);
    onChange(val);
  };

  useEffect(() => {
    setSelectedRelativeStatus(value);
  }, [value]);

  return (
    <AntSelect
      value={selectedRelativeStatus}
      options={relativeStatusSelectOptions}
      onChange={handleChange}
      disabled={isDisabled}
      allowClear={isClearable}
      placeholder={t('RELATIVE_STATUS.LABEL')}
      filterOption={getSelectFilterOption}
      showSearch
      {...otherProps}
    />
  );
};

export default SelectRelativeStatus;
