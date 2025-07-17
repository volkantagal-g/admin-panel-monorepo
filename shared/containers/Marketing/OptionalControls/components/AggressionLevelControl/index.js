import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Form, Card, Col, Select } from 'antd';

import { getAggressionLevelOptions } from '@shared/containers/Marketing/OptionalControls/utils';
import { optionalControlOption } from '@shared/containers/Marketing/OptionalControls/constantValues';
import { OPTIONAL_CONTROL } from '@shared/containers/Marketing/OptionalControls/constants';

const AggressionLevelControl = ({ parentFieldName, disabled }) => {
  const { t } = useTranslation('marketing');

  const controlFieldName = 'aggression';
  const formName = parentFieldName ? [...[parentFieldName], controlFieldName] : [controlFieldName];

  const aggressionLevel = optionalControlOption[OPTIONAL_CONTROL.AGGRESSION_LEVEL]?.aggressionLevel || {};

  return (
    <Card size="small" title={t('AGGRESSION_LEVEL_CONTROLLER')}>
      <Row gutter={24}>
        <Col xs={24} sm={12} lg={12}>
          <Form.Item
            hasFeedback
            name={[...formName, 'levels']}
            label={t('AGGRESSION_LEVEL')}
            rules={[{ required: true, message: t('error:REQUIRED') }]}
          >
            <Select
              placeholder={`${t('AGGRESSION_LEVEL')}`}
              mode="multiple"
              allowClear
              disabled={disabled}
              options={getAggressionLevelOptions(aggressionLevel)}
            />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
};

export default memo(AggressionLevelControl);
