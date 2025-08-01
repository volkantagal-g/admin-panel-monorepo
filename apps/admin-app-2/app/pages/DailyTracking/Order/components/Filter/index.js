import { useState } from 'react';
import { Select, Typography, Col, TimePicker, Space, Collapse, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment-timezone';

import { getLangKey } from '@shared/i18n';
import { getCitiesSelector, getSelectedCountryTimezone, getSelectedCities, availableDomainTypesForCountrySelector } from '@shared/redux/selectors/common';
import { GETIR_MARKET_DOMAIN_TYPES, HOURS_IN_A_DAY, MINUTES_IN_A_HOUR } from '@shared/shared/constants';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { Creators as CommonCreators } from '@shared/redux/actions/common';

import useStyles from './styles';
import { getInitialEndTime, getInitialStartTime } from '../../util';
import { filtersSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';

const { Option } = Select;
const { Text } = Typography;
const { Panel } = Collapse;

const TagOption = (value, text) => {
  return (
    <Option value={value} key={value}>
      <Text>{text}</Text>
    </Option>
  );
};

// const POSSIBLE_MINUTES = [0, 15, 30, 45];
const POSSIBLE_MINUTES = [0];

const Filter = ({ requestData }) => {
  const { t } = useTranslation(['global']);
  const classes = useStyles();
  const dispatch = useDispatch();
  const cities = useSelector(getCitiesSelector.getOperationalCities);
  const timezone = useSelector(getSelectedCountryTimezone.getData);
  const selectedCountry = getSelectedCountry();
  const selectedCities = useSelector(getSelectedCities.getData);
  const selectedDomainType = useSelector(filtersSelector.getSelectedDomainType);
  const availableDomainTypes = useSelector(state => availableDomainTypesForCountrySelector.getDomainTypes(state, GETIR_MARKET_DOMAIN_TYPES));

  const [startTime, setStartTime] = useState(() => getInitialStartTime(timezone));
  const [endTime, setEndTime] = useState(() => getInitialEndTime(timezone));

  const handleCityChange = citiesData => {
    dispatch(CommonCreators.setSelectedCities({ data: citiesData }));
    requestData(startTime, endTime, selectedDomainType, selectedCountry, citiesData);
  };

  const handleDomainTypeChange = domainType => {
    dispatch(Creators.setSelectedDomainType({ selectedDomainType: domainType }));
    requestData(startTime, endTime, domainType, selectedCountry, selectedCities);
  };

  const handleStartTimeChange = selectedStartTime => {
    if (selectedStartTime) {
      setStartTime(selectedStartTime);
      requestData(selectedStartTime, endTime, selectedDomainType, selectedCountry, selectedCities);
    }
  };

  const handleEndTimeChange = selectedEndTime => {
    if (selectedEndTime) {
      setEndTime(selectedEndTime);
      requestData(startTime, selectedEndTime, selectedDomainType, selectedCountry, selectedCities);
    }
  };

  const domainTypeList = availableDomainTypes.map(tag => {
    const tagText = t(`GETIR_MARKET_DOMAIN_TYPES.${tag}`);
    return TagOption(tag, tagText);
  });

  const cityList = cities.map(tag => {
    return TagOption(tag._id, tag.name[getLangKey()]);
  });

  const getDisabledStartTimeHours = () => {
    // cannot be after end time hour
    const disabledHours = [];
    for (let i = endTime.hour() + 1; i < HOURS_IN_A_DAY; i += 1) {
      disabledHours.push(i);
    }
    // if end time 10.00, we can't select 10 as start hour
    if (endTime.minute() === POSSIBLE_MINUTES[0]) {
      disabledHours.push(endTime.hour());
    }
    return disabledHours;
  };

  const getDisabledEndTimeHours = () => {
    const disabledHours = [];
    const currentHour = moment.tz(timezone).hour();
    // cannot be before start hour and after current hour
    for (let i = 0; i < HOURS_IN_A_DAY; i += 1) {
      if (i < startTime.hour() || i > currentHour) {
        disabledHours.push(i);
      }
    }
    // if start time 10.45, we can't select 10 as end hour
    if (startTime.minute() === POSSIBLE_MINUTES[POSSIBLE_MINUTES.length - 1]) {
      disabledHours.push(startTime.hour());
    }
    return disabledHours;
  };

  const getDisabledStartTimeMinutes = selectedHour => {
    if (selectedHour !== endTime.hour()) return [];
    return POSSIBLE_MINUTES.filter(minute => minute >= endTime.minute());
  };

  const getDisabledEndTimeMinutes = selectedHour => {
    const currentTime = moment.tz(timezone);
    const disabledMins = new Set();
    // if same hour, we want (end min > start min)
    if (selectedHour === startTime.hour()) {
      POSSIBLE_MINUTES.forEach(min => {
        if (min <= startTime.minute()) disabledMins.add(min);
      });
    }
    // we want (end min <= current min), if same hour
    if (selectedHour === currentTime.hour()) {
      POSSIBLE_MINUTES.forEach(min => {
        if (min > currentTime.minute()) disabledMins.add(min);
      });
    }
    return Array.from(disabledMins);
  };

  const timePickerFormat = 'HH:mm';

  return (
    <Collapse defaultActiveKey={['dailyTrackingOrder']}>
      <Panel header={t('FILTER')} key="dailyTrackingOrder">
        <Row gutter={8}>
          <Col md={8} lg={6} className={classes.col}>
            <Select
              placeholder={t('CITY')}
              mode="multiple"
              onChange={handleCityChange}
              className={classes.select}
              value={selectedCities}
            >
              {cityList}
            </Select>
          </Col>

          <Col md={8} lg={4} className={classes.col}>
            <Select
              placeholder={t('FILTER')}
              onChange={handleDomainTypeChange}
              className={classes.select}
              value={selectedDomainType}
            >
              {domainTypeList}
            </Select>
          </Col>
          <Col md={8} lg={6}>
            <Space className={classes.dateWrapper}>
              <TimePicker
                value={startTime}
                format={timePickerFormat}
                disabledHours={getDisabledStartTimeHours}
                disabledMinutes={getDisabledStartTimeMinutes}
                onChange={handleStartTimeChange}
                allowClear={false}
                minuteStep={MINUTES_IN_A_HOUR}
                showNow={false}
                showTime={{ hideDisabledOptions: true }}
              />
              -
              <TimePicker
                value={endTime}
                format={timePickerFormat}
                disabledHours={getDisabledEndTimeHours}
                disabledMinutes={getDisabledEndTimeMinutes}
                onChange={handleEndTimeChange}
                allowClear={false}
                minuteStep={MINUTES_IN_A_HOUR}
                showTime={{ hideDisabledOptions: true }}
              />
            </Space>
          </Col>
        </Row>
      </Panel>
    </Collapse>
  );
};

export default Filter;
