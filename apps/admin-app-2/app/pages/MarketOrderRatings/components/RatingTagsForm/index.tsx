import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Form } from 'antd';
import { useFormik } from 'formik';
import isEmpty from 'lodash/isEmpty';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Creators } from '../../redux/actions';
import { getInitialValues, validationSchema } from './formHelpers';
import { SelectedRating } from '../List';
import { TagPayload } from '@shared/api/marketOrderRatings';
import { Modal, TextArea, MultiLanguageInput } from '@shared/components/GUI';

type ModalProps = {
  isVisible: boolean;
  onCancel: () => void;
  selectedRatingTag: TagPayload;
  selectedRating: SelectedRating;
};
export default function MarketOrderRatingTagsFormModal({
  isVisible,
  onCancel,
  selectedRatingTag,
  selectedRating,
}: ModalProps) {
  const dispatch = useDispatch();
  const { t } = useTranslation('marketOrderRatingsPage');
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);

  const initialValues = useMemo(
    () => getInitialValues(selectedRatingTag),
    [selectedRatingTag],
  );
  const formik = useFormik({
    enableReinitialize: true,
    validationSchema,
    initialValues,
    onSubmit: async values => {
      const { title, reason } = values;
      const { rating, domainType, priority } = selectedRating;
      if (isEditing) {
        await dispatch(
          Creators.updateRatingTagRequest({
            body: {
              id: selectedRatingTag?._id,
              title,
              rating,
              domainType,
              priority: selectedRatingTag?.priority ?? rating,
              reason,
            },
          }),
        );
      }
      else {
        await dispatch(
          Creators.createRatingTagRequest({
            body: {
              title,
              rating,
              domainType,
              priority: priority ?? rating,
              reason,
            },
          }),
        );
      }
      onClose();
    },
  });

  const { values, errors, resetForm, setFieldValue, handleSubmit } = formik;

  function onClose() {
    resetForm();
    form.resetFields();
    onCancel();
  }

  useEffect(() => {
    if (!isEmpty(selectedRatingTag)) {
      setIsEditing(true);
    }
    else setIsEditing(false);
  }, [selectedRatingTag]);

  useEffect(() => {
    if (isVisible) {
      form.setFieldsValue(values);
    }
  }, [values, isVisible, form]);

  return (
    <Modal
      centered
      title={isEditing ? t('EDIT_TAG') : t('ADD_TAG')}
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
          fieldPath={['title']}
          formik={formik}
          onBlur={formik.handleBlur}
          hasForm
        />
        <TextArea
          value={values.reason}
          name="reason"
          hasForm
          errors={errors}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setFieldValue('reason', event.target.value);
          }}
          placeholder={t('REASON')}
          className="w-100 mt-4"
          autoComplete="off"
        />
      </Form>
    </Modal>
  );
}
