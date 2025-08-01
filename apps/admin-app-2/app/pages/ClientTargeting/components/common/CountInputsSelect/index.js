import { useTranslation } from 'react-i18next';
import { Select, Space, Typography } from 'antd';
import { useDispatch } from 'react-redux';

import { ORDER_COUNT_TYPE, PRODUCT_PURCHASE_COUNT_TYPE, PURCHASE_COUNT_PER_ORDER_TYPE } from '@app/pages/ClientTargeting/constants';
import MinMaxInput from '../MinMaxInput';
import { Creators } from '../../../redux/actions';
import useStyles from './styles';

const { Option } = Select;
const { Text } = Typography;

const CountInputsSelect = ({
  activeKey,
  selectedCountType,
  selectedCountMinValue,
  selectedCountMaxValue,
  label,
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const inputTranslationKey = selectedCountType;

  const { t } = useTranslation('clientTargetingPage');

  const handleCountTypeChange = selectedType => {
    dispatch(Creators.setSelectedCountType({ activeKey, selectedCountType: selectedType }));
  };

  return (
    <>
      <Space direction="vertical" className={classes.container}>
        <Text>{label}</Text>
        <Select value={selectedCountType} onChange={handleCountTypeChange} className={classes.fullWidth}>
          <Option value={PRODUCT_PURCHASE_COUNT_TYPE}>
            <Text>{t('PRODUCT_PURCHASE_COUNT')}</Text>
          </Option>
          <Option value={ORDER_COUNT_TYPE}>
            <Text>{t('ORDER_COUNT')}</Text>
          </Option>
          <Option value={PURCHASE_COUNT_PER_ORDER_TYPE}>
            <Text>{t('PURCHASE_COUNT_PER_ORDER')}</Text>
          </Option>
        </Select>
      </Space>
      <MinMaxInput
        activeKey={activeKey}
        minCount={selectedCountMinValue}
        maxCount={selectedCountMaxValue}
        minCountKey="selectedCountMinValue"
        maxCountKey="selectedCountMaxValue"
        label={t(inputTranslationKey)}
      />
    </>
  );
};

export default CountInputsSelect;
