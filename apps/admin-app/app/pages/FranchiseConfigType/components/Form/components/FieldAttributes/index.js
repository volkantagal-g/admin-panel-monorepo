import { Col, Row, Space } from 'antd';

import { CheckCircleFilled, MinusCircleOutlined } from '@ant-design/icons';

import { useTranslation } from 'react-i18next';

import { fieldAttributes } from '@app/pages/FranchiseConfigType/constants';

const FieldAttributes = ({ attributes }) => {
  const { t } = useTranslation('franchiseConfigType');

  return (
    <Row>{fieldAttributes.map(attribute => {
      const { label, value } = attribute;
      const isAttributeSet = attributes[value];

      return (
        <Col span={12}>
          <Space align="start">
            {isAttributeSet ? <CheckCircleFilled style={{ color: '#01CC78' }} /> : <MinusCircleOutlined />}
            {t(label)}
          </Space>
        </Col>
      );
    })}
    </Row>
  );
};

export default FieldAttributes;
