import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

import SelectTitle from '@app/pages/MarketIntelligencePriceIndex/components/SelectTitle';

import { DOMAIN_TYPE_LIST } from '@app/pages/MarketIntelligencePriceIndex/constants';

import useStyles from '@app/pages/MarketIntelligencePriceIndex/styles';

const { Option } = Select;

const DomainTypeFilter = ({ setDomainType, domainType, isLoading }) => {
  const classes = useStyles();
  const { t } = useTranslation('marketIntelligencePriceIndex');

  return (
    <>
      <SelectTitle src="domain" description={t('DOMAIN_TYPE')} />
      <Select
        className={classes.selectWidth}
        placeholder={t('SELECT_DOMAIN_TYPE')}
        defaultValue={[domainType]}
        onChange={value => setDomainType(value)}
        disabled={isLoading}
      >
        {Object.entries(DOMAIN_TYPE_LIST).map(([name, value]) => (
          <Option key={name} value={value} label={value}>
            <div className={classes.demoOptionLabelItem}>
              {t(value)}
            </div>
          </Option>
        ))}
      </Select>
    </>
  );
};

export default DomainTypeFilter;
