import { useEffect } from 'react';
import { Form, Row, Col } from 'antd';
import { useFormik } from 'formik';
import { Trans, useTranslation } from 'react-i18next';

import { isFunction } from 'lodash';

import { validate } from '@shared/yup';
import { TextArea, Modal } from '@shared/components/GUI';
import { defaultValues, validationSchema } from './formHelper';

const DeclineMentorshipModal = ({ fullName, isOpen, onClose, onSubmit, isPending }) => {
  const { t } = useTranslation(['mentorshipPage', 'global']);
  const [form] = Form.useForm();

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    enableReinitialize: true,
    onSubmit,
  });

  const { handleSubmit, values, errors, setFieldValue, resetForm } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  const handleCancel = () => {
    if (isFunction(onClose)) onClose();
    resetForm();
  };

  return (
    <Modal
      forceRender
      visible={isOpen}
      onCancel={handleCancel}
      onOk={handleSubmit}
      okText={t('DECLINE')}
      okButtonProps={{ disabled: isPending, color: 'danger' }}
      title={t('DECLINE_MENTORSHIP_REQUEST')}
      width={720}
      closable
      destroyOnClose
      maskClosable={false}
    >
      <Form form={form} id="decline-mentorship-request-form" layout="vertical">
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <TextArea
              value={values.declineReason}
              onChange={event => {
                setFieldValue('declineReason', event.target.value);
              }}
              formLabel={(
                <Trans t={t}>{t('DECLINE_MENTORSHIP_REQUEST_REASON', { fullName })}</Trans>
              )}
              disabled={isPending}
              name="declineReason"
              hasForm
              errors={errors}
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default DeclineMentorshipModal;
