import { Select } from 'antd';

import { convertConstantValuesToSelectOptions } from '@shared/utils/common';

import { autoSegmentTypes } from '../../../constantValues';

function SegmentTypeSelect(props) {
  const { value, onChange, isDisabled, ...otherProps } = props;

  const segmentTypeSelectOptions = convertConstantValuesToSelectOptions(autoSegmentTypes);

  return (
    <Select
      value={value}
      options={segmentTypeSelectOptions}
      onChange={onChange}
      disabled={isDisabled}
      {...otherProps}
    />
  );
}

export default SegmentTypeSelect;
