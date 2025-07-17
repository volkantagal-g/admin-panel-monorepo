import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Slider } from 'antd';

import { Creators } from '../../redux/actions';
import { getSelectedHourRange } from "../../redux/selectors";
import useStyles from './styles';
import { useValidateState } from "@shared/containers/Filter/hooks/useValidateState";

const HourRangeSelect = ({ filterKey, step, min, max, onChange }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const stateSelector = getSelectedHourRange;
  const [startHour, endHour] = useSelector(stateSelector(filterKey));

  useValidateState({
    filterKey,
    componentName: 'HourRangeSelect',
  });

  const marks = {
    0: `${startHour || '00'}:00`,
    24: `${endHour}:00`,
  };

  const onHourRangeChange = selectedHourRange => {
    dispatch(Creators.setSelectedHourRange({ selectedHourRange, filterKey }));

    if (onChange) onChange(selectedHourRange);
  };

  const formatter = value => {
    return `${value || '00'}:00`;
  };

  return (
    <div className={classes.hourRangeSelect}>
      <Slider
        range
        step={step}
        defaultValue={[min, max]}
        min={min}
        max={max}
        marks={marks}
        onAfterChange={onHourRangeChange}
        tipFormatter={formatter}
      />
    </div>
  );
};

HourRangeSelect.defaultProps = {
  step: 1,
  min: 0,
  max: 24,
};

HourRangeSelect.propTypes = {
  onChange: PropTypes.func,
  step: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
};

export default HourRangeSelect;
