import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Form, Card, Col, Select } from 'antd';

import { rules } from '@shared/utils/marketing/formUtils';
import { pushNotificationAggressionLevel } from '@app/pages/PushNotification/constantValues';

const AggressionLevelControllerForm = ({ controlFormName, isFormEditable }) => {
  const { t } = useTranslation('marketing');

  const formName = [...controlFormName, 'aggression'];

  return (
    <Card size="small" title={t('AGGRESSION_LEVEL_CONTROLLER')}>
      <Row gutter={24}>
        <Col xs={24} sm={12} lg={12}>
          <Form.Item
            hasFeedback
            name={[...formName, 'levels']}
            label={t('AGGRESSION_LEVEL')}
            rules={rules.onlyRequired}
          >
            <Select
              mode="multiple"
              allowClear
              options={Object.values(pushNotificationAggressionLevel).map(level => {
                return { value: level };
              })}
              disabled={!isFormEditable}
            />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
};

export default memo(AggressionLevelControllerForm);
