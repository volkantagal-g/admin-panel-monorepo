import { useEffect, useMemo } from 'react';
import { Form } from 'antd';
import { useFormik } from 'formik';
import isEmpty from 'lodash/isEmpty';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Creators } from '../../redux/actions';
import { getInitialValues, placeHolderValidationSchema } from './formHelpers';
import { Option } from '.';
import { Modal, MultiLanguageInput } from '@shared/components/GUI';

type ModalProps = {
  isVisible: boolean;
  onCancel: () => void;
  selectedRatingPlaceholder: Option;
  domainType: number;
  priority: number;
};

export default function RatingPlaceholderModalForm({
  isVisible,
  onCancel,
  selectedRatingPlaceholder,
  domainType,
  priority,
}: ModalProps) {
  const dispatch = useDispatch();
  const { t } = useTranslation('marketOrderRatingsPage');
  const [form] = Form.useForm();

  const initialValues = useMemo(
    () => getInitialValues(selectedRatingPlaceholder),
    [selectedRatingPlaceholder],
  );

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: placeHolderValidationSchema,
    initialValues,
    onSubmit: async values => {
      const { placeholder, rating, id } = values;
      if (id) {
        delete placeholder?._id;
        await dispatch(
          Creators.updateRatingPlaceholderRequest({
            body: {
              id,
              title: placeholder,
              rating,
              domainType,
            },
          }),
        );
      }
      else {
        await dispatch(
          Creators.createRatingPlaceholderRequest({
            body: {
              title: placeholder,
              rating: priority,
              domainType,
            },
          }),
        );
      }
      onClose();
    },
  });

  const { values, errors, resetForm, handleSubmit } = formik;
  function onClose() {
    resetForm();
    form.resetFields();
    onCancel();
  }
  useEffect(() => {
    if (isVisible) {
      form.setFieldsValue(values);
    }
  }, [values, isVisible, form]);

  return (
    <Modal
      centered
      title={t('EDIT_RATING_PLACEHOLDER')}
      visible={isVisible}
      onOk={() => {
        if (!isEmpty(errors)) return;
        handleSubmit();
      }}
      onCancel={onClose}
    >
      <Form form={form} id="tag-form" onFinish={handleSubmit} layout="vertical">
        <MultiLanguageInput
          label={t('TITLE')}
          fieldPath={['placeholder']}
          formik={formik}
          hasForm
        />
      </Form>
    </Modal>
  );
}
