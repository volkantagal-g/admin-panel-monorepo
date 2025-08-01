import { Select } from 'antd';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import SelectTitle from '../SelectTitle';

import { INDEX_TYPE_LIST } from '../../constants';
import { stateSelector } from '../../redux/selectors';

import useStyles from '../../styles';

const { Option } = Select;

const IndexType = ({ setIndexType, indexType }) => {
  const classes = useStyles();
  const { t } = useTranslation('marketIntelligencePriceRecommendation');

  const isLoadingCompetitorFilter = useSelector(stateSelector.isLoadingCompetitorFilter);
  const defaultIndex = Object.values(INDEX_TYPE_LIST)?.find(value => value?.key === indexType)?.key;

  return (
    <>
      <SelectTitle src="calculator" description={t('INDEX_TYPE')} />
      <Select
        className={classes.selectWidth}
        placeholder={t('SELECT_INDEX_TYPE')}
        defaultValue={defaultIndex}
        onChange={value => {
          setIndexType(value);
        }}
        disabled={isLoadingCompetitorFilter}
      >
        {Object.values(INDEX_TYPE_LIST).map(value => (
          <Option key={value?.key} value={value?.key} label={value?.name}>
            <div className={classes.demoOptionLabelItem}>{value?.name}</div>
          </Option>
        ))}
      </Select>
    </>
  );
};

export default IndexType;
