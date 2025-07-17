import { DatePicker, Space, Select, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import moment from 'moment';

import { Creators } from '../../../redux/actions';
import useStyles from './styles';
import InputNumber from '../InputNumber';
import { getDisabledDate, getDisabledDateTime } from '../../../utils';

const { Option } = Select;
const { Text } = Typography;

const DateOrXDaysBeforeToday = ({
  activeKey,
  type,
  label,
  date,
  otherDate,
  dateType,
  daysBeforeToday,
  showAllDates = false,
  disableBeforeXDate,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('clientTargetingPage');
  const classes = useStyles();

  const handleDateTimeChange = dateMoment => {
    const key = type === 'start' ? 'startDate' : 'endDate';
    dispatch(Creators.setDateTime({ activeKey, [key]: dateMoment.toISOString() }));
  };

  const handleDateTypeChange = value => {
    const key = type === 'start' ? 'startDateType' : 'endDateType';
    dispatch(Creators.setDateType({ activeKey, [key]: value }));
  };

  const dateTimeFormat = 'YYYY-MM-DD HH:mm';
  return (
    <Space direction="vertical" className={classes.fullWidth}>
      <Text>{label}</Text>
      <Select value={dateType} className={classes.fullWidth} onChange={handleDateTypeChange}>
        <Option value="static">
          <Text>{t('SELECT_DATE')}</Text>
        </Option>
        <Option value="dynamic">
          <Text>{t('X_DAYS_BEFORE_TODAY')}</Text>
        </Option>
      </Select>
      {dateType === 'static' ? (
        <DatePicker
          value={moment(date)}
          className={classes.fullWidth}
          showTime={{ format: dateTimeFormat }}
          format={dateTimeFormat}
          onChange={handleDateTimeChange}
          disabledDate={!showAllDates ? current => getDisabledDate(current, otherDate, type, disableBeforeXDate) : null}
          disabledTime={!showAllDates ? current => getDisabledDateTime(current, otherDate, type) : null}
          showNow={false}
          allowClear={false}
        />
      ) : (
        <InputNumber
          value={daysBeforeToday}
          activeKey={activeKey}
          clientListKey={type === 'start' ? 'startDayBeforeToday' : 'endDayBeforeToday'}
        />
      )}
    </Space>
  );
};

export default DateOrXDaysBeforeToday;
