import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Alert, Button, Col, Form, Input, Modal, Row } from 'antd';

import { Creators } from '@app/pages/Client/Detail/redux/actions';
import { accessSelector } from '@app/pages/Client/Detail/redux/selectors';

const SMSOtpModal = ({ clientId, isVisible }) => {
  const { t } = useTranslation('clientDetail');
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const isOtpSent = useSelector(accessSelector.isOtpSent);
  const isOtpValid = useSelector(accessSelector.isOtpValid);

  const handleSendCodeClick = () => {
    if (clientId) {
      dispatch(Creators.sendOtpRequest({ clientId }));
    }
  };
  
  const handleSubmit = values => {
    const { code } = values;
    dispatch(Creators.checkOtpRequest({ clientId, code }));
  };

  return (
    <Modal
      title={t('OTP.MODAL.TITLE')}
      footer={null}
      visible={isVisible}
      closable={false}
    >
      {!isOtpSent ? (
        <>
          <Row gutter={[16, 16]} justify="center">
            <Col xs={24}>
              <Alert message={t('OTP.MODAL.SEND_CODE_MESSAGE')} type="warning" />
            </Col>
            <Col>
              <Button
                type="primary"
                onClick={handleSendCodeClick}
              >
                {t('OTP.MODAL.SEND_CODE')}
              </Button>
            </Col>
          </Row>
        </>
      ) : (
        <>
          <Form
            form={form}
            onFinish={handleSubmit}
          >
            <Row gutter={16}>
              <Col xs={24}>
                <Form.Item
                  name="code"
                  rules={[{ required: true }]}
                  messageVariables={{ label: t('OTP.MODAL.CODE') }}
                >
                  <Input placeholder={t('OTP.MODAL.ENTER_CODE')} />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                  >
                    {t('OTP.MODAL.CHECK_CODE')}
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
          {(!isOtpValid && (typeof isOtpValid !== 'undefined')) && (
            <Alert message={t('OTP.MODAL.CODE_NOT_VALID')} type="error" />
          )}
        </>
      )}
    </Modal>
  );
};

export default SMSOtpModal;
