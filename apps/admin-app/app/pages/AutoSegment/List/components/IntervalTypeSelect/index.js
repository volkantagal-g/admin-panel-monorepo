import { Select } from 'antd';

import { convertConstantValuesToSelectOptions } from '@shared/utils/common';

import { autoSegmentIntervalTypes } from '../../../constantValues';

function IntervalTypeSelect(props) {
  const { value, onChange, isDisabled, ...otherProps } = props;

  const intervaltTypeSelectOptions = convertConstantValuesToSelectOptions(autoSegmentIntervalTypes);

  return (
    <Select
      value={value}
      options={intervaltTypeSelectOptions}
      onChange={onChange}
      disabled={isDisabled}
      {...otherProps}
    />
  );
}

export default IntervalTypeSelect;
