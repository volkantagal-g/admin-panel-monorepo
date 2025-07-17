import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col } from 'antd';
import { useFormik } from 'formik';
import { Trans, useTranslation } from 'react-i18next';
import { isFunction } from 'lodash';

import { validate } from '@shared/yup';
import { TextArea, Modal } from '@shared/components/GUI';
import { Creators } from './redux/actions';
import { requestMentorshipSelector, isModalOpenSelector } from './redux/selectors';
import { defaultValues, validationSchema } from './formHelper';

const RequestMentorshipModal = ({ request, onClose }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation(['mentorshipPage', 'global']);
  const isPending = useSelector(requestMentorshipSelector.getIsPending);
  const isModalOpen = useSelector(isModalOpenSelector);
  const [form] = Form.useForm();

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      dispatch(Creators.requestMentorshipRequest({ body: { ...values, request } }));
    },
  });

  const { handleSubmit, values, errors, setFieldValue, resetForm } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values, isPending]);

  const handleCancel = () => {
    resetForm();
    if (isFunction(onClose)) onClose();
  };

  return (
    <Modal
      forceRender
      visible={isModalOpen}
      onCancel={handleCancel}
      onOk={handleSubmit}
      okText={t('SEND')}
      okButtonProps={{ disabled: isPending }}
      title={t('MENTORSHIP_REQUEST')}
      width={720}
      closable
      destroyOnClose
      maskClosable={false}
    >
      <Form form={form} id="request-mentorship-request" layout="vertical">
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <TextArea
              value={values.requestReason}
              onChange={event => {
                setFieldValue('requestReason', event.target.value);
              }}
              formLabel={(
                <Trans t={t}>{t('MENTORSHIP_REQUEST_REASON', { fullName: request?.mentor?.employeeId?.fullName })}</Trans>
              )}
              disabled={isPending}
              name="requestReason"
              hasForm
              errors={errors}
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default RequestMentorshipModal;
