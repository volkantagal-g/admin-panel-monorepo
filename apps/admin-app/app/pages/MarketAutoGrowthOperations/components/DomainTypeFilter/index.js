import { Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { DOMAIN_TYPES } from '@app/pages/MarketAutoGrowthOperations/constants';
import { Creators } from '@app/pages/MarketAutoGrowthOperations/redux/actions';
import { autoGrowthSelector } from '@app/pages/MarketAutoGrowthOperations/redux/selectors';
import SelectTitle from '@app/pages/MarketAutoGrowthOperations/components/SelectTitle';
import useStyles from '@app/pages/MarketAutoGrowthOperations/styles';

const { Option } = Select;

const DomainTypeFilter = ({ domainTypeList, disabled, loading }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation('marketAutoGrowthOperations');

  const selectedDomain = useSelector(autoGrowthSelector.selectedDomain);

  return (
    <>
      <SelectTitle src="domain" description={t('DOMAIN_TYPE')} />
      <Select
        allowClear={false}
        showSearch
        className={classes.filterItem}
        onChange={value => {
          if (value) {
            dispatch(Creators.setSelectedDomain({ selectedDomain: value }));
          }
        }}
        placeholder={t('SELECT_DOMAIN_TYPE')}
        value={selectedDomain}
        disabled={domainTypeList?.length === 1 || disabled}
        loading={loading}
      >
        {domainTypeList && domainTypeList?.map(value => (
          <Option key={value} value={value} label={value}>{t(DOMAIN_TYPES[value])}</Option>
        ))}
      </Select>
    </>
  );
};
export default DomainTypeFilter;
