import { Space, Row, Col, Typography, InputNumber } from 'antd';
import { useTranslation } from 'react-i18next';

import { useDispatch } from 'react-redux';

import useStyles from './styles';

import { Creators } from '../../../redux/actions';
import { handleKeyDownForPriceInput, handleKeyDownForIntegerInput } from '@shared/utils/common';

const { Text } = Typography;

const MinMaxDecimalInput = ({
  activeKey,
  minCount,
  maxCount,
  minCountKey,
  maxCountKey,
  label,
  minLabel,
  maxLabel,
  description,
  precision,
  min,
  onKeyDownAllowedNegative = false,
}) => {
  const classes = useStyles();
  const { t } = useTranslation('clientTargetingPage');
  const dispatch = useDispatch();
  const handleFormatter = value => {
    if (value?.includes(',')) {
      return value?.replace(/,/g, '.');
    }
    return value;
  };

  const handleChange = ({ value, key }) => {
    dispatch(Creators.setInput({ activeKey, value, clientListKey: key }));
  };

  return (
    <Space className={classes.container} direction="vertical">
      <Text>{label}</Text>
      <Row justify="space-between">
        <Col span={11}>
          <Text>{minLabel || t('MIN')}</Text>
          <InputNumber
            value={minCount}
            onKeyDown={onKeyDownAllowedNegative ? handleKeyDownForIntegerInput : handleKeyDownForPriceInput}
            key={minCountKey}
            className={classes.numberInput}
            onChange={value => handleChange({ value, key: minCountKey })}
            precision={precision}
            formatter={handleFormatter}
            parser={handleFormatter}
            min={min}
          />
        </Col>
        <Col span={11}>
          <Text>{maxLabel || t('MAX')}</Text>
          <InputNumber
            value={maxCount}
            onKeyDown={onKeyDownAllowedNegative ? handleKeyDownForIntegerInput : handleKeyDownForPriceInput}
            key={maxCountKey}
            className={classes.numberInput}
            onChange={value => handleChange({ value, key: maxCountKey })}
            precision={precision}
            formatter={handleFormatter}
            parser={handleFormatter}
            min={min}
          />
        </Col>
      </Row>
      {description && <small>{description}</small>}
    </Space>
  );
};

export default MinMaxDecimalInput;
