import { useEffect } from 'react';
import { Form, Row, Col } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';

import { validate } from '@shared/yup';
import { Modal, NumberInput, TextArea } from '@shared/components/GUI';
import SelectTopic from '@app/pages/Mentorship/components/Select/Topic';
import SelectLanguage from '@app/pages/Mentorship/components/Select/Language';
import { defaultValues, validationSchema } from './formHelper';

const NewMentorshipCourseModal = ({ isOpen, isPending, initialValues = defaultValues, onSubmit, isUpdate, onClose }) => {
  const { t } = useTranslation(['mentorshipPage', 'global']);
  const [form] = Form.useForm();

  const formik = useFormik({
    initialValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      onSubmit({ ...values, isUpdate });
    },
  });

  const { handleSubmit, values, errors, setFieldValue, setFieldTouched, resetForm } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  // in order to link antd form and formik form
  const getHandleChange = (fieldName, inputType = 'text') => {
    return param => {
      if (inputType === 'select' || inputType === 'number') {
        setFieldValue(fieldName, param);
      }
      else {
        setFieldValue(fieldName, param.target.value);
      }
    };
  };

  // in order to link antd form and formik form
  const getHandleBlur = fieldName => {
    return () => setFieldTouched(fieldName);
  };

  const handleCancel = () => {
    onClose();
    resetForm();
  };

  return (
    <Modal
      forceRender
      visible={isOpen}
      onCancel={handleCancel}
      onOk={handleSubmit}
      okButtonProps={{ disabled: isPending }}
      okText={isUpdate ? t('SAVE') : t('ADD')}
      title={isUpdate ? t('UPDATE_MENTORSHIP') : t('ADD_NEW_MENTORSHIP')}
      width={720}
      closable
      destroyOnClose
      maskClosable={false}
    >
      <Form form={form} initialValues={initialValues} id="add-or-update-mentorship-course" layout="vertical">
        <Row gutter={[8, 8]} className="mb-3">
          <Col lg={{ span: 8 }} xs={{ span: 24 }}>
            <SelectTopic
              value={get(values, 'topic')}
              onChange={getHandleChange('topic', 'select')}
              onBlur={getHandleBlur('topic')}
              disabled={isPending || isUpdate}
              name="topic"
              label={t('TOPIC')}
              errors={errors}
            />
          </Col>
          <Col lg={{ span: 8 }} xs={{ span: 24 }}>
            <NumberInput
              value={get(values, 'yearsOfExperience')}
              onChange={getHandleChange('yearsOfExperience', 'number')}
              onBlur={getHandleBlur('yearsOfExperience')}
              disabled={isPending}
              name="yearsOfExperience"
              label={t('YEARS_OF_EXPERIENCE')}
              errors={errors}
            />
          </Col>
          <Col lg={{ span: 8 }} xs={{ span: 24 }}>
            <SelectLanguage
              value={get(values, 'languages')}
              onChange={getHandleChange('languages', 'select')}
              onBlur={getHandleBlur('languages')}
              disabled={isPending}
              name="languages"
              label={t('LANGUAGES')}
              errors={errors}
            />
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <TextArea
              value={get(values, 'detailsOfExperience')}
              onChange={getHandleChange('detailsOfExperience')}
              onBlur={getHandleBlur('detailsOfExperience')}
              disabled={isPending}
              name="detailsOfExperience"
              label={t('DETAILS_OF_EXPERIENCE')}
              errors={errors}
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default NewMentorshipCourseModal;

NewMentorshipCourseModal.propTypes = { ...Modal.propTypes };

NewMentorshipCourseModal.defaultProps = { ...Modal.defaultProps };
