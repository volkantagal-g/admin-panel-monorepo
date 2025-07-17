import { useTranslation } from 'react-i18next';
import { Col, Form, Input, Row } from 'antd';

function ACMetaData({ formik, isFormEditable = true }: { formik: any, isFormEditable: boolean | undefined }) {
  const { t } = useTranslation(['batAlertConditionCommon', 'error']);

  const { setFieldValue } = formik;

  return (
    <>
      <Row gutter={[8, 8]}>
        <Col xs={24}><span>{t('ALERT_CONDITION_NAME')}</span></Col>
        <Col xs={24} md={12}>
          <Form.Item
            name={['name', 'tr']}
            rules={[{ required: true, message: t('error:REQUIRED') }]}
          >
            <Input
              prefix="TR"
              onChange={event => {
                const { value } = event.target;
                setFieldValue(['name', 'tr'], value);
              }}
              disabled={!isFormEditable}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name={['name', 'en']}
            rules={[{ required: true, message: t('error:REQUIRED') }]}
          >
            <Input
              prefix="EN"
              onChange={event => {
                const { value } = event.target;
                setFieldValue(['name', 'en'], value);
              }}
              disabled={!isFormEditable}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row className="mt-2" gutter={[8, 8]}>
        <Col xs={24}><span>{t('ALERT_CONDITION_DESCRIPTION')}</span></Col>
        <Col xs={24} md={12}>
          <Form.Item
            name={['description', 'tr']}
            rules={[{ required: true, message: t('error:REQUIRED') }]}
          >
            <Input
              prefix="TR"
              onChange={event => {
                const { value } = event.target;
                setFieldValue(['description', 'tr'], value);
              }}
              disabled={!isFormEditable}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name={['description', 'en']}
            rules={[{ required: true, message: t('error:REQUIRED') }]}
          >
            <Input
              prefix="EN"
              onChange={event => {
                const { value } = event.target;
                setFieldValue(['description', 'en'], value);
              }}
              disabled={!isFormEditable}
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}

export default ACMetaData;
