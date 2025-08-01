import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

import SelectTitle from '@app/pages/MarketAutoGrowthOperations/components/SelectTitle';
import useStyles from '@app/pages/MarketAutoGrowthOperations/styles';

const { Option } = Select;

const YearFilter = ({ year, setYear, currentYear, disabled, targetTableDataLoading }) => {
  const classes = useStyles();
  const { t } = useTranslation('marketAutoGrowthOperations');

  const yearList = [(currentYear - 1), parseFloat(currentYear, 1), parseFloat(currentYear, 1) + 1];
  return (
    <>
      <SelectTitle src="year" description={t('YEAR')} />
      <Select
        allowClear={false}
        showSearch
        className={classes.filterItem}
        onChange={value => setYear(value)}
        placeholder={t('SELECT_YEAR')}
        value={year}
        loading={targetTableDataLoading}
        disabled={disabled}
      >
        {yearList.map(value => (
          <Option key={value} value={value} label={value} className={classes.promoOption}>
            {value}
          </Option>
        ))}
      </Select>
    </>
  );
};

export default YearFilter;
