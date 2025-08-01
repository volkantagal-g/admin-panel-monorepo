import { Select } from 'antd';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import SelectTitle from '../SelectTitle';

import { stateSelector } from '../../redux/selectors';
import { DOMAIN_TYPE_LIST } from '../../constants';

import useStyles from '../../styles';

const { Option } = Select;

const DomainTypeFilter = ({
  setDomainType,
  domainType,
}) => {
  const classes = useStyles();
  const { t } = useTranslation('marketIntelligencePriceRecommendation');

  const isLoadingCompetitorFilter = useSelector(
    stateSelector.isLoadingCompetitorFilter,
  );
  return (
    <>
      <SelectTitle src="domain" description={t('DOMAIN_TYPE')} />
      <Select
        className={classes.selectWidth}
        placeholder={t('SELECT_DOMAIN_TYPE')}
        defaultValue={[domainType]}
        onChange={value => {
          setDomainType(value);
        }}
        disabled={isLoadingCompetitorFilter}
      >
        {Object.entries(DOMAIN_TYPE_LIST).map(([name, value]) => (
          <Option key={name} value={value} label={value}>
            <div className={classes.demoOptionLabelItem}>{name}</div>
          </Option>
        ))}
      </Select>
    </>
  );
};

export default DomainTypeFilter;
