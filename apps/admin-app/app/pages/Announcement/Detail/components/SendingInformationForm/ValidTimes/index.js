import { Form, Row, Col, DatePicker, Button } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

const ValidTimes = ({ isFormEditable }) => {
  const { t } = useTranslation('marketing');

  return (
    <Form.List
      name="validRanges"
    >

      {(fields, { add, remove }, { errors }) => (
        <>
          <Row gutter={24} className="mb-3">
            <Col lg={6} className="align-self-center">
              <p className="m-0">{t('VALID_TIMES')}</p>
            </Col>
            <Col lg={6} className="text-right">
              <Button type="text" onClick={() => add()} disabled={!isFormEditable}>
                <PlusOutlined />
              </Button>
            </Col>
          </Row>
          <Form.ErrorList errors={errors} />
          <Row gutter="24">
            {fields.map(field => (
              <Col lg={8} key={field.key} className="mt-1">
                <Row gutter="12">
                  <Col lg={10}>
                    <Form.Item name={[field.name, 'start']} required rules={[{ required: true, message: t('error:REQUIRED') }]}>
                      <DatePicker
                        disabled={!isFormEditable}
                        showTime
                        className="w-100"
                        ranges={{ [t('TO_END_OF_DAY')]: [moment(), moment()] }}
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={10}>
                    <Form.Item name={[field.name, 'end']} required rules={[{ required: true, message: t('error:REQUIRED') }]}>
                      <DatePicker
                        disabled={!isFormEditable}
                        showTime
                        className="w-100"
                        ranges={{ [t('TO_END_OF_DAY')]: [moment(), moment()] }}
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={4}>
                    <Button onClick={() => remove(field.name)} disabled={!isFormEditable}>
                      <MinusOutlined />
                    </Button>
                  </Col>
                </Row>
              </Col>
            ))}
          </Row>
        </>
      )}
    </Form.List>

  );
};

export default ValidTimes;
