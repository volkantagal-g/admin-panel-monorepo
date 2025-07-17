import React, { useState } from 'react';
import { DatePicker } from 'antd';
import type { Moment } from 'moment';

import useStyles from './styles';

interface ChainDatePickerProps {
  value?: Moment;
  onChange?: (date: Moment | null) => void;
  name: string;
  label: string;
  disabled?: boolean;
  format?: string;
}

const ChainDatePicker: React.FC<ChainDatePickerProps> = ({
  value,
  onChange,
  name,
  label,
  disabled = false,
  format = 'DD/MM/YYYY',
}) => {
  const classes = useStyles();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`${classes.pickerWrapper}`}>
      <DatePicker
        value={value}
        onChange={onChange}
        format={format}
        disabled={disabled}
        className={classes.datePicker}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{ width: '100%' }}
      />
      <span className={`${classes.floatingLabel} ${(isFocused || value) ? classes.floatingLabelActive : ''}`}>
        {label}
      </span>
    </div>
  );
};

export default ChainDatePicker;
