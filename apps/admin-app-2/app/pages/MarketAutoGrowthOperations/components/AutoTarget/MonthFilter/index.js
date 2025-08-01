import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

import SelectTitle from '@app/pages/MarketAutoGrowthOperations/components/SelectTitle';
import useStyles from '@app/pages/MarketAutoGrowthOperations/styles';

const { Option } = Select;

const MonthFilter = ({ month, setMonth, monthList, disabled, loading }) => {
  const classes = useStyles();
  const { t } = useTranslation('marketAutoGrowthOperations');

  return (
    <>
      <SelectTitle src="month" description={t('MONTH')} />
      <Select
        allowClear={false}
        showSearch
        className={classes.filterItem}
        onChange={value => setMonth(value + 1)}
        placeholder={t('SELECT_MONTH')}
        value={monthList[month - 1]}
        loading={loading}
        disabled={disabled}
      >
        {monthList && monthList.map((value, index) => (
          <Option key={value} value={index} label={value} className={classes.promoOption}>
            {value}
          </Option>
        ))}
      </Select>
    </>
  );
};

export default MonthFilter;
