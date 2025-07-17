import { useTranslation } from 'react-i18next';
import { Row, Col, Form, InputNumber, Space, Card } from 'antd';

import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import { optionalControlOption } from '@shared/containers/Marketing/OptionalControls/constantValues';
import { OPTIONAL_CONTROL } from '@shared/containers/Marketing/OptionalControls/constants';

const TotalOrderCountControl = ({ parentFieldName, disabled }) => {
  const { t } = useTranslation('marketing');

  const controlFieldName = 'totalOrderCountControl';
  const fieldName = parentFieldName ? [...[parentFieldName], controlFieldName] : [controlFieldName];

  const totalOrderCountOption = optionalControlOption[OPTIONAL_CONTROL.TOTAL_ORDER_COUNT]?.totalOrderCountControllerOption || [];

  return (
    <Card size="small" title={t('TOTAL_ORDER_COUNT_CONTROLLER')}>
      <Row gutter={12}>
        {convertConstantValuesToSelectOptions(totalOrderCountOption).map(item => {
          return (
            <Col xs={24} sm={4} lg={4} key={item.value}>
              <Space direction="vertical">
                <Form.Item
                  name={[...fieldName, item.value, 'min']}
                  label={item.label}
                  className="w-100 d-inline"
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        const maxValue = getFieldValue(fieldName)?.[item.value]?.max;
                        if (maxValue && (value || value === 0)) {
                          if (value > maxValue) {
                            return Promise.reject(new Error(t('MIN_VALUE_ERROR')));
                          }
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <InputNumber controls className="w-100" min={0} max={5000} placeholder="Min" disabled={disabled} />
                </Form.Item>

                <Form.Item
                  name={[...fieldName, item.value, 'max']}
                  className="w-100 d-inline"
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        const minValue = getFieldValue(fieldName)?.[item.value]?.min;
                        if (minValue && (value || value === 0)) {
                          if (value < minValue) {
                            return Promise.reject(new Error(t('MAX_VALUE_ERROR')));
                          }
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <InputNumber controls className="w-100" min={0} max={5000} placeholder="Max" disabled={disabled} />
                </Form.Item>
              </Space>
            </Col>
          );
        })}
      </Row>
      <Row>
        <Col xs={24} sm={24} lg={24}>
          <Form.Item name={fieldName} rules={[{ required: true, message: t('error:ONE_FIELD_REQUIRED') }]} disabled={disabled} />
        </Col>
      </Row>
    </Card>
  );
};

export default TotalOrderCountControl;
