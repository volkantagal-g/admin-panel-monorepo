import { Select } from 'antd';

import { convertConstantValuesToSelectOptions } from '@shared/utils/common';

import { autoSegmentStatuses } from '../../../constantValues';

function SegmentStatusSelect(props) {
  const { value, onChange, isDisabled, ...otherProps } = props;

  const segmentStatusSelectOptions = convertConstantValuesToSelectOptions(autoSegmentStatuses);

  return (
    <Select
      value={value}
      options={segmentStatusSelectOptions}
      onChange={onChange}
      disabled={isDisabled}
      {...otherProps}
    />
  );
}

export default SegmentStatusSelect;
