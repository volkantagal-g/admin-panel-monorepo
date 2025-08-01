import { Select } from 'antd';

import { t } from '@shared/i18n';
import { getSelectFilterOption } from '@shared/utils/common';
import { generateFieldPathSelectOptions } from '@app/pages/Employee/utils';
import { FIELD_PATHS } from '../../../constants';

const SelectFieldPath = ({
  value,
  mode,
  onChange,
  disabled,
  allowClear,
  placeholder,
  labelInValue,
  className,
}: any) => {
  const fieldPathSelectOptions = generateFieldPathSelectOptions(FIELD_PATHS, {
    translationBaseKey: 'employeeLogsPage:FIELD_PATHS',
    isConvertToInt: false,
  });

  return (
    <Select
      value={value}
      mode={mode}
      options={fieldPathSelectOptions}
      onChange={selectedValue => {
        const [changeModel, fieldPath] = selectedValue?.split?.('-') || [];
        onChange({ changeModel, fieldPath });
      }}
      disabled={disabled}
      allowClear={allowClear}
      placeholder={placeholder || t('employeeLogsPage:FILTERS.FIELD_PATH')}
      labelInValue={labelInValue}
      className={className ? `${className} w-100` : 'w-100'}
      filterOption={getSelectFilterOption}
      showSearch
    />
  );
};

export default SelectFieldPath;
