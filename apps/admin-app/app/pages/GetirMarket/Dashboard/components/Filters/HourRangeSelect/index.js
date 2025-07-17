import { useDispatch, useSelector } from 'react-redux';
import { Slider } from 'antd';

import AnalyticsService from '@shared/services/analytics';

import useStyles from '../styles';
import { Creators } from '../../../redux/actions';
import { filtersSelector } from '../../../redux/selectors';
import { MARKET_DASHBOARD_EVENTS } from '../../../mixPanelEvents';

const HourRangeSelect = () => {
  const selectedHourRange = useSelector(filtersSelector.getSelectedHourRange);

  const dispatch = useDispatch();
  const classes = useStyles();

  const marks = {
    0: `${selectedHourRange[0] || '00'}:00`,
    24: `${selectedHourRange[1]}:00`,
  };

  function handleAfterChange(selectedHourRangeData) {
    dispatch(Creators.setSelectedHourRange({ selectedHourRange: selectedHourRangeData }));
    AnalyticsService.track(MARKET_DASHBOARD_EVENTS.FILTERED.EVENT_NAME, { hourStart: selectedHourRangeData[0], hourEnd: selectedHourRangeData[1] });
  }

  const formatter = value => {
    return `${value || '00'}:00`;
  };

  return (
    <div className={classes.hourRangeSlider}>
      <Slider
        range
        step={1}
        defaultValue={[0, 24]}
        min={0}
        max={24}
        marks={marks}
        onAfterChange={selectedHourRangeData => handleAfterChange(selectedHourRangeData)}
        tipFormatter={formatter}
      />
    </div>
  );
};

export default HourRangeSelect;
