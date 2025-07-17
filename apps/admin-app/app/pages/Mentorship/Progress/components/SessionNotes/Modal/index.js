import { useEffect } from 'react';
import { get, isFunction } from 'lodash';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Form, Row, Col } from 'antd';
import { useFormik } from 'formik';

import { validate } from '@shared/yup';
import { Modal, TextArea } from '@shared/components/GUI';
import { Creators } from '../redux/actions';
import { defaultValues, validationSchema } from './formHelper';

const AddOrUpdateSessionNoteModal = ({ isOpen, sessionNote, onSubmit, onClose, isPending, isUpdate }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation(['mentorshipPage', 'global']);
  const [form] = Form.useForm();

  const formik = useFormik({
    initialValues: sessionNote || defaultValues,
    validate: validate(validationSchema),
    enableReinitialize: true,
    onSubmit,
  });

  const { handleSubmit, values, errors, setFieldTouched, setFieldValue, resetForm } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  // in order to link antd form and formik form
  const getHandleChange = (fieldName, inputType = 'text') => {
    return param => {
      if (inputType === 'date') {
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
    if (isFunction(onClose)) onClose();
    dispatch(Creators.closeModal());
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
      title={isUpdate ? t('UPDATE_NOTE') : t('ADD_NEW_NOTE')}
      width={720}
      closable
      destroyOnClose
    >
      <Form form={form} id="add-or-update-mentorship-session-note-form" layout="vertical">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <TextArea
              name="note"
              label={t('NOTE')}
              value={get(values, 'note')}
              onChange={getHandleChange('note')}
              onBlur={getHandleBlur('note')}
              disabled={isPending}
              errors={errors}
              hasForm
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddOrUpdateSessionNoteModal;
