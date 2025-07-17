import { Slider } from 'antd';

import useStyles from './styles';
import { getHoursAndMinuteFromMinutesOfDay } from '@shared/components/UI/HourRangeSelect/utils';

const HourRangeSelect = ({
  value,
  step,
  min,
  max,
  defaultValue,
  marks,
  tipFormatter,
  onAfterChange,
  className,
}) => {
  const classes = useStyles();

  const getDefaultMarks = () => {
    const minData = getHoursAndMinuteFromMinutesOfDay(value?.[0] ?? defaultValue?.[0]);
    const maxData = getHoursAndMinuteFromMinutesOfDay(value?.[1] ?? defaultValue?.[1]);
    return {
      [min]: `${minData.hoursString || '00'}:${minData.minutesString}`,
      [max]: `${maxData.hoursString}:${maxData.minutesString}`,
    };
  };

  function handleAfterChange({ selectedHourRange }) {
    onAfterChange(selectedHourRange);
  }

  const formatter = _value => {
    const convertedValue = getHoursAndMinuteFromMinutesOfDay(_value);
    return `${convertedValue.hoursString || '00'}:${convertedValue.minutesString}`;
  };

  return (
    <div className={`${classes.hourRangeSlider} ${className || ''}`}>
      <Slider
        range
        defaultValue={defaultValue || value}
        step={step}
        min={min}
        max={max}
        marks={marks || getDefaultMarks()}
        onAfterChange={selectedHourRange => handleAfterChange({ selectedHourRange })}
        tipFormatter={tipFormatter || formatter}
      />
    </div>
  );
};

export default HourRangeSelect;
