import { Col, Form, Row, Switch } from 'antd';
import { useTranslation } from 'react-i18next';

import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

import { mixpanelDataFeedObj } from '@shared/containers/Select/CommunicationMixpanelDataFeed/constantValues';

const MixpanelDataFeedFlag = ({ disabled }) => {
  const { t } = useTranslation();
  const { formItemName, label } = mixpanelDataFeedObj;

  return (
    <Row gutter={24}>
      <Col md={12} xs={24}>
        <Form.Item
          name={formItemName}
          label={t(label)}
          valuePropName="checked"
        >
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            disabled={disabled}
          />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default MixpanelDataFeedFlag;
