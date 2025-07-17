import { isFunction } from 'lodash';
import { useEffect } from 'react';
import { Form, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';

import { validate } from '@shared/yup';
import { TextArea, Modal, Select } from '@shared/components/GUI';
import { Creators } from './redux/actions';
import { finishMentorshipSelector, isModalOpenSelector } from './redux/selectors';
import { defaultValues, validationSchema } from './formHelper';
import { convertConstantValueTranslationsToSelectOptions } from '@shared/utils/common';
import { MENTORSHIP_FINISH_REASONS } from '@app/pages/Mentorship/constants';

const FinishMentorshipModal = ({ mentorshipRequestId, onClose }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation(['mentorshipPage', 'global']);
  const isPending = useSelector(finishMentorshipSelector.getIsPending);
  const isModalOpen = useSelector(isModalOpenSelector);
  const [form] = Form.useForm();

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      dispatch(Creators.finishMentorshipRequest({ body: { ...values, courseId: mentorshipRequestId } }));
    },
  });

  const { handleSubmit, values, errors, setFieldValue, resetForm } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  const handleCancel = () => {
    if (isFunction(onClose)) onClose();
    dispatch(Creators.closeModal());
    resetForm();
  };

  return (
    <Modal
      forceRender
      visible={isModalOpen}
      onCancel={handleCancel}
      onOk={handleSubmit}
      okText={t('FINISH')}
      cancelText={t('DISCARD')}
      okButtonProps={{ disabled: isPending, color: 'danger' }}
      title={t('FINISH_THE_MENTORSHIP')}
      width={720}
      closable
      destroyOnClose
    >
      <Form form={form} id="finish-mentorship-form" layout="vertical">
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Select
              name="finishedReason"
              label={t('ENDING_REASON')}
              optionsData={convertConstantValueTranslationsToSelectOptions({
                constants: MENTORSHIP_FINISH_REASONS,
                translationBaseKey: 'mentorshipPage:MENTORSHIP_FINISH_REASONS',
              })}
              value={values.finishedReason}
              onChange={value => {
                setFieldValue('finishedReason', value);
              }}
              disabled={isPending}
              errors={errors}
              allowClear
              showSearch
              autoComplete="off"
            />
          </Col>
          <Col span={24}>
            <TextArea
              hasForm
              value={values.finishedDetails}
              onChange={event => {
                setFieldValue('finishedDetails', event.target.value);
              }}
              label={t('DETAILS')}
              disabled={isPending}
              name="finishedDetails"
              errors={errors}
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default FinishMentorshipModal;
