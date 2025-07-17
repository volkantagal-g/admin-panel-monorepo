import moment from 'moment';
import { get, isFunction } from 'lodash';
import { useEffect } from 'react';
import { Form, Row, Col } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import { validate } from '@shared/yup';
import { Checkbox, DatePicker, Modal, TextArea } from '@shared/components/GUI';
import { defaultValues, validationSchema } from './formHelper';

const AddOrUpdateTodoModal = ({ isOpen, todo, onSubmit, onClose, isPending, isUpdate }) => {
  const { t } = useTranslation(['mentorshipPage', 'global']);
  const [form] = Form.useForm();

  const formik = useFormik({
    initialValues: todo || defaultValues,
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
      else if (inputType === 'checkbox') {
        const value = param.target.checked;
        setFieldValue(fieldName, value);
        setFieldValue('completedDate', value ? moment() : undefined);
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
      title={isUpdate ? t('UPDATE_TASK') : t('ADD_NEW_TASK')}
      width={720}
      closable
      destroyOnClose
    >
      <Form form={form} id="add-or-update-mentorship-todo-form" layout="vertical">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <TextArea
              name="todo"
              label={t('TITLE')}
              value={get(values, 'todo')}
              onChange={getHandleChange('todo')}
              onBlur={getHandleBlur('todo')}
              disabled={isPending}
              errors={errors}
              hasForm
            />
          </Col>
          <Col lg={{ span: 12 }} xs={{ span: 24 }}>
            <DatePicker
              name="deadline"
              label={t('DEADLINE')}
              value={get(values, 'deadline')}
              onChange={getHandleChange('deadline', 'date')}
              onBlur={getHandleBlur('deadline')}
              disabled={isPending}
              errors={errors}
            />
          </Col>
          <Col lg={{ span: 12 }} xs={{ span: 24 }}>
            <Checkbox
              fontSize={16}
              name="isCompleted"
              checked={get(values, 'isCompleted', false)}
              onChange={getHandleChange('isCompleted', 'checkbox')}
              onBlur={getHandleBlur('isCompleted')}
              disabled={isPending}
              errors={errors}
            >{t('IS_COMPLETED')}
            </Checkbox>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddOrUpdateTodoModal;
