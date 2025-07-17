import { useDispatch, useSelector } from 'react-redux';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

import SelectTitle from '../SelectTitle';

import { INTEGRATION_LIST } from '../../constants';
import { stateSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';

import useStyles from '../../styles';

const { Option } = Select;

const IntegrationType = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation('marketIntelligencePriceRecommendation');

  const integrationType = useSelector(stateSelector.integrationType);

  return (
    <>
      <SelectTitle src="integration" description={t('INTEGRATION_TYPE')} />
      <Select
        className={classes.selectWidth}
        style={{ minWidth: '100px' }}
        placeholder={t('SELECT_INTEGRATION_TYPE')}
        defaultValue={
          integrationType
            ? integrationType[0].toUpperCase() + integrationType.slice(1)
            : null
        }
        onChange={value => {
          dispatch(
            Creators.setIntegrationType({
              integrationType:
                value && value !== '' ? value?.toLowerCase() : value,
            }),
          );
          dispatch(Creators.getRecommendationDataRequest());
        }}
      >
        {Object.values(INTEGRATION_LIST).map(value => (
          <Option key={value[0]} value={value[0]} label={value[0]}>
            <div className={classes.demoOptionLabelItem}>{value[0]}</div>
          </Option>
        ))}
      </Select>
    </>
  );
};

export default IntegrationType;
