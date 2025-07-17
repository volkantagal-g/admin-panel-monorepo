import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';

import SelectTitle from '@app/pages/MarketIntelligencePriceIndex/components/SelectTitle';
import { Creators } from '@app/pages/MarketIntelligencePriceIndex/redux/actions';
import { stateSelector } from '@app/pages/MarketIntelligencePriceIndex/redux/selectors';
import { INDEX_BY_LIST } from '@app/pages/MarketIntelligencePriceIndex/constants';
import useStyles from '@app/pages/MarketIntelligencePriceIndex/styles';

const { Option } = Select;

const PriceIndexByFilter = ({ onChange, isLoading }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation('marketIntelligencePriceIndex');

  const indexBy = useSelector(stateSelector.indexBy);

  return (
    <>
      <SelectTitle src="layer" description={t('INDEX_LEVEL')} />
      <Select
        className={classes.selectWidth}
        placeholder={t('SELECT_INDEX_LEVEL')}
        defaultValue={[indexBy]}
        onChange={value => {
          dispatch(Creators.setIndexBy({ data: value }));
          onChange(value);
        }}
        disabled={isLoading}
      >
        {Object.values(INDEX_BY_LIST).map(([key, value]) => (
          <Option key={key} value={key} label={key}>
            <div className={classes.demoOptionLabelItem}>
              <img
                alt={t('INDEX_LEVEL')}
                src={value}
                className={classes.titleImage}
              />
              &nbsp;{t(key)}
            </div>
          </Option>
        ))}
      </Select>
    </>
  );
};

export default PriceIndexByFilter;
