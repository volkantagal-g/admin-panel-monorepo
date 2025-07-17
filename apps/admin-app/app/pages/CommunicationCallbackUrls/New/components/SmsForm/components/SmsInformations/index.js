import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Col, Form, Input, Row, Select } from 'antd';

import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

import { rules } from '@app/pages/CommunicationCallbackUrls/New/formHelpers';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import { CALLBACK_TYPES } from '@app/pages/CommunicationCallbackUrls/constants';

const SmsInformations = ({ disabled }) => {
  const { t } = useTranslation('communicationCallbackUrlsPage');

  const [rows, setRows] = useState([]);
  const addRow = () => {
    const newRow = Date.now();
    setRows([...rows, newRow]);
  };

  const removeRow = index => {
    const updatedRows = rows.filter((r, i) => i !== index);
    setRows(updatedRows);
  };

  return (
    <>
      <Row gutter={24}>
        <Col md={12} xs={24}>
          <Form.Item
            hasFeedback
            name="callbackType"
            label={t('CALLBACK_TYPE')}
            rules={rules.onlyRequired}
          >
            <Select disabled={disabled} options={convertConstantValuesToSelectOptions(CALLBACK_TYPES, false)} allowClear />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col md={12} xs={24}>
          <Form.Item label={t('CALLBACK_URL')} rules={rules.onlyRequired} hasFeedback name="url">
            <Input disabled={disabled} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col md={12} xs={24}>
          <Form.Item label={t('SERVICE_NAME')} rules={rules.onlyRequired} hasFeedback name="serviceName">
            <Input disabled={disabled} />
          </Form.Item>
        </Col>
      </Row>

      {rows.map((row, index) => (
        <Row key={row} gutter={24}>
          <Col md={10} xs={24}>
            <Form.Item
              label={t('HEADER_MAP')}
              hasFeedback
              name={`headerMapKey_${row}`}
              rules={rules.onlyRequired}
            >
              <Input disabled={disabled} placeholder={t('KEY')} />
            </Form.Item>
          </Col>
          <Col md={10} xs={24}>
            <Form.Item
              hasFeedback
              name={`headerMapValue_${row}`}
              className="d-inline"
              rules={rules.onlyRequired}
            >
              <Input disabled={disabled} placeholder={t('VALUE')} />
            </Form.Item>
          </Col>
          <Col md={4} xs={24}>
            <Button type="danger" disabled={disabled} onClick={() => removeRow(index)} icon={<MinusOutlined />}>
              {t('REMOVE_HEADER_MAP')}
            </Button>
          </Col>
        </Row>
      ))}
      <Row gutter={24}>
        <Col md={12} xs={24}>
          <Button type="primary" disabled={disabled} onClick={addRow} icon={<PlusOutlined />}>
            {t('ADD_MORE_HEADER_MAP')}
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default memo(SmsInformations);
