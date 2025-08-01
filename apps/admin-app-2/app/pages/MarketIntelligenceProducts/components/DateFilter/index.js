import { DatePicker } from 'antd';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

import SelectTitle from '../SelectTitle';
import useStyles from '@app/pages/MarketIntelligenceProducts/styles';

const DateSelect = ({ setDate, date, loading }) => {
  const classes = useStyles();
  const { t } = useTranslation('marketIntelligenceProducts');

  return (
    <>
      <SelectTitle src="date" description={t('DATE')} />
      <DatePicker
        className={classes.selectComponent}
        onChange={value => setDate(value.format('YYYY-MM-DD'))}
        defaultValue={moment(date, 'YYYY-MM-DD')}
        disabledDate={current => current >= moment().endOf('day')}
        allowClear={false}
        showToday={false}
        inputReadOnly
        disabled={loading}
      />
    </>
  );
};

export default DateSelect;
