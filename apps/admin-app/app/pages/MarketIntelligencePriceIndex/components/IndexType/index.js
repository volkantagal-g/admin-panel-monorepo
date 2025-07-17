import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

import SelectTitle from '@app/pages/MarketIntelligencePriceIndex/components/SelectTitle';

import { INDEX_TYPE_LIST } from '@app/pages/MarketIntelligencePriceIndex/constants';

import useStyles from '@app/pages/MarketIntelligencePriceIndex/styles';

const { Option } = Select;

const IndexType = ({ setIndexType, indexType, isLoading }) => {
  const classes = useStyles();
  const { t } = useTranslation('marketIntelligencePriceIndex');

  const defaultIndex = Object.keys(INDEX_TYPE_LIST).find(key => INDEX_TYPE_LIST[key] === indexType);

  return (
    <>
      <SelectTitle src="calculator" description={t('INDEX_TYPE')} />
      <Select
        className={classes.selectWidth}
        placeholder={t('SELECT_INDEX_TYPE')}
        defaultValue={t(defaultIndex)}
        onChange={value => setIndexType(value)}
        disabled={isLoading}
      >
        {Object.entries(INDEX_TYPE_LIST).map(([name, value]) => (
          <Option key={value} value={value} label={name}>
            <div className={classes.demoOptionLabelItem}>
              {t(name)}
            </div>
          </Option>
        ))}
      </Select>
    </>
  );
};

export default IndexType;
