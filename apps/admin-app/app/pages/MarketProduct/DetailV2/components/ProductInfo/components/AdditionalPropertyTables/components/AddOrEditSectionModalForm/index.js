import { memo } from 'react';
import { Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';

import { getInitialValues, validationSchema } from './formHelper';
import { validate } from '@shared/yup';
import { Modal, MultiLanguageInput } from '@shared/components/GUI';
import { FORM_MODE } from '@shared/shared/constants';

const AddOrEditSectionModalForm = memo(({
  onOk,
  onCancel,
  params,
}) => {
  const { t } = useTranslation('marketProductPageV2');
  const [form] = Form.useForm();

  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues: (params.mode === FORM_MODE.EDIT
      ? { ...getInitialValues(), ...params.sectionData }
      : getInitialValues()
    ),

    onSubmit: values => onOk(values.title),
  });

  const { handleSubmit } = formik;

  const modalTitle = params.mode === FORM_MODE.EDIT ?
    t('ADDITIONAL_PROPERTY_INFO.EDIT_SUBTITLE') :
    t('ADDITIONAL_PROPERTY_INFO.ADD_SUBTITLE');

  return (
    <Modal
      title={modalTitle}
      visible
      onCancel={onCancel}
      onOk={handleSubmit}
    >
      <Form
        form={form}
        onFinish={handleSubmit}
      >
        <MultiLanguageInput
          colProps={{ span: 24, className: 'mb-3' }}
          label={t('global:TITLE1')}
          fieldPath={['title']}
          formik={formik}
        />
      </Form>
    </Modal>
  );
});

export default AddOrEditSectionModalForm;
