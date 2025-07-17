import { useCallback, useEffect, useState } from 'react';
import { Row, Col, Typography, Collapse, DatePicker, Button, Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { useDispatch } from 'react-redux';

import moment from 'moment';

import { getLocalDateFormat } from '@shared/utils/localization';
import { SelectWrapper } from '@shared/components/UI/Form';
import useStyles from './styles';
import { convertConstantValueTranslationsToSelectOptions } from '@shared/utils/common';
import {
  DysPerformanceCodes,
  DysServiceTypeCode,
  ONE_MONTH_DATE_RANGE,
  ONE_WEEK_DATE_RANGE,
  PREDEFINED_DATE_OPTIONS,
  THREE_MONTH_DATE_RANGE,
  TWO_MONTHS_DATE_RANGE,
} from '../../constant';
import CustomSelectCity from '../CustomCitySelect';

import { Creators as CommonCreators } from '@shared/redux/actions/common';
import AntRadioGroup from '@shared/components/UI/AntRadioGroup';

const { Panel } = Collapse;
const { Text } = Typography;

const Filter = ({ filters, handleSubmit, isPending }) => {
  const { t } = useTranslation('highLevelDys');
  const dispatch = useDispatch();

  const [dysPeriod, setDysPeriod] = useState(filters.dysPeriod);
  const [serviceType, setServiceType] = useState(filters.serviceType);
  const [performanceSystem, setPerformanceSystem] = useState(filters.performanceSystem);
  const [dynamicPerformanceSystemOptions, setDynamicPerformanceSystemOptions] = useState(DysPerformanceCodes);
  const [cities, setCities] = useState(filters.cities);
  const [date, setDate] = useState(filters.date);
  const [selectedDateButton, setSelectedDateButton] = useState(THREE_MONTH_DATE_RANGE);

  const classes = useStyles();

  const handleSubmitClick = () => {
    handleSubmit({
      dysPeriod,
      serviceType,
      performanceSystem,
      cities,
      date,
    });
  };

  const handleRangePicker = event => {
    const { value } = event.target;

    setSelectedDateButton(value);
  };

  const handleDatePicker = value => {
    setDate(value);
  };

  const showSelectedDate = () => {
    return (
      <span className={classes.date}>{t('SELECETED_DATE')}: {dysPeriod[0].format(getLocalDateFormat())} - {dysPeriod[1].format(getLocalDateFormat())}</span>
    );
  };

  const getIsDisabledDate = current => {
    return current && current.valueOf() > Date.now();
  };

  /**
 * Date range validation rules should follow this instructions:
 * week = start and end date including a total of 7 days
 * month = subtract 1 month plus 1
 * 90days = start and end date including a total of 90 days
 */

  useEffect(() => {
    switch (selectedDateButton) {
      case ONE_WEEK_DATE_RANGE:
        setDysPeriod([moment(date).subtract({ days: 6 }), date]);
        break;
      case ONE_MONTH_DATE_RANGE: {
        const oneMonthBefore = moment(date).subtract({ months: 1 }).add(1, 'days');
        setDysPeriod([oneMonthBefore, date]);
        break;
      }
      case TWO_MONTHS_DATE_RANGE:
        setDysPeriod([moment(date).subtract({ days: 59 }), date]);
        break;
      case THREE_MONTH_DATE_RANGE:
        setDysPeriod([moment(date).subtract({ days: 89 }), date]);
        break;
      default:
        break;
    }
  }, [date, selectedDateButton]);

  const dispatchCitiesRequest = useCallback(() => {
    dispatch(CommonCreators.getCitiesRequest());
  }, [dispatch]);

  useEffect(() => {
    dispatchCitiesRequest();
  }, [dispatchCitiesRequest]);

  const arrangeAvailableDomains = selectedServiceType => {
    const filteredPerformanceValues = Object.values(DysPerformanceCodes).filter(performance => !performance.blockedDomains.includes(selectedServiceType));

    let performanceSystemEnum;
    filteredPerformanceValues.forEach(item => {
      performanceSystemEnum = {
        ...performanceSystemEnum,
        [item.value]: item,
      };
    });
    setDynamicPerformanceSystemOptions(performanceSystemEnum);
    if (filteredPerformanceValues.length === 1) {
      setPerformanceSystem(filteredPerformanceValues[0].value);
    }
  };

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('global:FILTER')} key="1">
            <Row gutter={[8, 8]}>
              <Col xs={24} sm={24} md={24} xl={8}>
                <Text>{t('DATE_RANGE')}</Text>
                <AntRadioGroup
                  options={PREDEFINED_DATE_OPTIONS(t)}
                  onChange={handleRangePicker}
                  value={selectedDateButton}
                  fullWidth
                  optionType="button"
                  disabled={isPending}
                />
              </Col>
              <Col xs={24} sm={24} md={24} xl={8}>
                <Text>{t('DATE')}</Text>
                <DatePicker
                  disabledDate={getIsDisabledDate}
                  disabled={isPending}
                  className={classes.datePicker}
                  format={getLocalDateFormat()}
                  value={date}
                  onChange={handleDatePicker}
                  allowClear={false}
                />
              </Col>
              <Col xs={24} sm={24} md={24} xl={8}>
                <Text>{t('CITY')}</Text>
                <CustomSelectCity
                  value={cities}
                  onChange={value => setCities(value)}
                  mode="multiple"
                  showArrow={false}
                  isDisabled={isPending}
                />
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col xs={24} sm={24} md={8}>
                <Text>{t('SERVICE_TYPES')}</Text>
                <SelectWrapper
                  placeholder={t('FILTER')}
                  selectKey="status"
                  allowClear={false}
                  defaultValue={serviceType}
                  optionsData={convertConstantValueTranslationsToSelectOptions(
                    {
                      constants: DysServiceTypeCode,
                      translationBaseKey: 'highLevelDys:SELECT_SERVICE_TYPE',
                    },
                  )}
                  shouldMapOptionsData
                  value={serviceType}
                  onChangeCallback={value => {
                    arrangeAvailableDomains(DysServiceTypeCode[value].payloadValue);
                    setServiceType(value);
                  }}
                  disabled={isPending}
                />
              </Col>
              <Col xs={24} sm={24} md={8}>
                <Text>{t('PERFORMANCE_SYSTEMS')}</Text>
                <Select
                  placeholder={t('FILTER')}
                  allowClear={false}
                  defaultValue={performanceSystem}
                  options={convertConstantValueTranslationsToSelectOptions(
                    {
                      constants: dynamicPerformanceSystemOptions,
                      translationBaseKey: 'highLevelDys:SELECT_PERFORMANCE',
                    },
                  )}
                  className={classes.performanceSelect}
                  value={performanceSystem}
                  onChange={value => setPerformanceSystem(value)}
                  disabled={isPending}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                {showSelectedDate()}
              </Col>
              <Col>
                <Button
                  type="primary"
                  onClick={handleSubmitClick}
                  disabled={isPending}
                >
                  {t('BRING')}
                </Button>
              </Col>
            </Row>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default Filter;
