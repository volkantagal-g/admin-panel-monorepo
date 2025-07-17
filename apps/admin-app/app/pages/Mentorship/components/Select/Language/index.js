import { sortBy } from 'lodash';

import { Select } from '@shared/components/GUI';
import { LANGUAGE_KEYS } from '@app/pages/Employee/constants';
import { convertConstantValueTranslationsToSelectOptions, getSelectFilterOption } from '@shared/utils/common';

const SelectLanguage = ({
  mode = 'multiple',
  value,
  defaultValue,
  onChange,
  disabled,
  allowClear = true,
  showArrow = true,
  countries,
  ...otherProps
}) => {
  const options = sortBy(convertConstantValueTranslationsToSelectOptions({
    constants: LANGUAGE_KEYS,
    translationBaseKey: 'mentorshipPage:LANGUAGE_KEY_TYPES',
  }), 'label');

  return (
    <Select
      {...(mode ? { mode } : undefined)}
      {...(defaultValue ? { defaultValue } : undefined)}
      value={value}
      optionsData={options}
      onChange={onChange}
      allowClear={allowClear}
      disabled={disabled}
      showArrow={showArrow}
      autoComplete="off"
      showSearch
      filterOption={getSelectFilterOption}
      {...otherProps}
    />
  );
};

export default SelectLanguage;
