import { useRef, memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Modal, Button, Input, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { MailOutlined } from '@ant-design/icons';

import { downloadListModalSelector } from '@app/pages/PushNotification/List/redux/selectors';
import { Creators } from '@app/pages/PushNotification/List/redux/actions';
import { getInitialValues, validationSchema } from '@app/pages/PushNotification/List/components/DownloadListModal/formHelper';
import { validate } from '@shared/yup';

const DownloadListModal = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const emailInputRef = useRef(null);

  const { t } = useTranslation('marketing');
  const downloadListModal = useSelector(downloadListModalSelector.getModal);

  const closeModal = () => dispatch(Creators.closeDownloadListModal());

  const { handleSubmit, values, errors, touched, handleChange } = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues: getInitialValues({ notificationId: downloadListModal.id }),
    onSubmit: formValues => dispatch(Creators.downloadSuccessNotificationListRequest({ data: { ...formValues } })),
  });

  useEffect(() => {
    form.setFieldsValue(values);
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, [form, values]);

  const footer = [
    <Button key="back" onClick={closeModal}>
      {t('button:CANCEL')}
    </Button>,
    <Button
      key="submit"
      type="primary"
      form="download-notif-list-modal-form"
      htmlType="submit"
    >
      {t('button:SEND')}
    </Button>,
  ];

  return (
    <Modal
      title={t('DOWNLOAD_NOTIF_LIST')}
      visible={downloadListModal.visible}
      onCancel={closeModal}
      footer={footer}
      className="pt-0"
      width={500}
    >
      <Col span={24}>
        <Form
          form={form}
          id="download-notif-list-modal-form"
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Row>
            <Col span={24}>
              <b className="d-block pb-2">{t('NOTIFICATION_ID')}</b>
            </Col>
            <Col span={24}>
              <Form.Item
                help={touched.notificationId && errors.notificationId}
                validateStatus={touched.notificationId && errors.notificationId ? 'error' : 'success'}
                name="notificationId"
              >
                <Input disabled type="string" onChange={handleChange} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <b className="d-block pb-2">{t('global:EMAIL')}</b>
            </Col>
            <Col span={24}>
              <Form.Item
                help={touched.email && errors.email}
                validateStatus={touched.email && errors.email ? 'error' : 'success'}
                name="email"
              >
                <Input
                  ref={emailInputRef}
                  onChange={handleChange}
                  size="large"
                  prefix={<MailOutlined />}
                  placeholder={t('EMAIL')}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
    </Modal>
  );
};

export default memo(DownloadListModal);
