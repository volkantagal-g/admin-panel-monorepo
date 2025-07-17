import { Typography, Space } from 'antd';
import { useTranslation } from 'react-i18next';

import DateOrXDaysBeforeToday from './DateOrXDaysBeforeToday';
import useStyles from './styles';

const { Text } = Typography;

const SelectDateOrXDaysBeforeToday = ({
  activeKey,
  startDate,
  startDateType,
  startDayBeforeToday,
  endDate,
  endDateType,
  endDayBeforeToday,
  label,
  showAllDates,
  disableBeforeXDate,
}) => {
  const { t } = useTranslation('clientTargetingPage');
  const classes = useStyles();

  return (
    <Space direction="vertical" className={classes.container}>
      <Text>{label}</Text>
      <DateOrXDaysBeforeToday
        activeKey={activeKey}
        type="start"
        label={t('MIN')}
        date={startDate}
        otherDate={endDate}
        dateType={startDateType}
        daysBeforeToday={startDayBeforeToday}
        showAllDates={showAllDates}
        disableBeforeXDate={disableBeforeXDate}
      />
      <DateOrXDaysBeforeToday
        activeKey={activeKey}
        type="end"
        label={t('MAX')}
        date={endDate}
        otherDate={startDate}
        dateType={endDateType}
        daysBeforeToday={endDayBeforeToday}
        showAllDates={showAllDates}
      />
    </Space>
  );
};

export default SelectDateOrXDaysBeforeToday;
