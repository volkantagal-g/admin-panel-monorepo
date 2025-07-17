import { useState, useEffect } from 'react';

import { t } from '@shared/i18n';
import AntSelect from '@shared/components/UI/AntSelect';
import { personCandidateWorkerTypes } from '@shared/shared/constantValues';
import { convertConstantValuesToSelectOptions, getSelectFilterOption } from '@shared/utils/common';

const SelectWorkerType = ({
  isDisabled = false,
  allowClear = false,
  onChange,
  value,
  ...otherProps
}) => {
  const [selectedWorkerType, setSelectedWorkerType] = useState();

  const personCandidateWorkerTypeSelectOptions = convertConstantValuesToSelectOptions(personCandidateWorkerTypes);

  const handleChange = val => {
    setSelectedWorkerType(val);
    onChange(val);
  };

  useEffect(() => {
    setSelectedWorkerType(value);
  }, [value]);

  return (
    <AntSelect
      value={selectedWorkerType}
      options={personCandidateWorkerTypeSelectOptions}
      onChange={handleChange}
      disabled={isDisabled}
      allowClear={allowClear}
      placeholder={t('WORKER_TYPE_STATUS.LABEL')}
      filterOption={getSelectFilterOption}
      showSearch
      {...otherProps}
    />
  );
};

export default SelectWorkerType;
