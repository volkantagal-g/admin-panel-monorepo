import { Space, Row, Col, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import InputNumber from '../InputNumber';
import useStyles from './styles';

const { Text } = Typography;

const MinMaxInput = ({
  activeKey,
  minCount,
  maxCount,
  minCountKey,
  maxCountKey,
  label,
  minLabel,
  maxLabel,
  description,
  descriptionV2,
  canBeRemoveMax = false,
}) => {
  const classes = useStyles();
  const { t } = useTranslation('clientTargetingPage');

  return (
    <Space className={classes.container} direction="vertical">
      <Text>{label}</Text>
      <Row justify="space-between">
        <Col span={11}>
          <Text>{minLabel || t('MIN')}</Text>
          <InputNumber
            value={minCount}
            activeKey={activeKey}
            clientListKey={minCountKey}
          />
        </Col>
        <Col span={11}>
          <Text>{maxLabel || t('MAX')}</Text>
          <InputNumber
            value={maxCount}
            activeKey={activeKey}
            clientListKey={maxCountKey}
            removable={canBeRemoveMax}
          />
        </Col>
      </Row>
      {description && <small>{description}</small>}
      {descriptionV2 && <Text type="secondary">{descriptionV2}</Text>}
    </Space>
  );
};

export default MinMaxInput;
