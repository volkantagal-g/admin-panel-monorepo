import { useEffect, useCallback, useState } from 'react';
import { Form, Modal, Button, Typography, Row, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { get } from 'lodash';

import { useSelector } from 'react-redux';

import { validate } from '@shared/yup';
import { InputWrapper } from '@shared/components/UI/Form';
import { DEFAULT_PASSWORD_VALUES, validationSchema } from './formHelper';
import permKey from '@shared/shared/permKey.json';
import RedirectText from '@shared/components/UI/RedirectText';
import { personDetailSelector } from '@app/pages/Person/Detail/redux/selector';

const { Text } = Typography;

const PasswordModal = ({
  isPending,
  isSuccessPersonUpdate,
  handleChangePassword,
}) => {
  const { t } = useTranslation('personPage');

  const personDetail = useSelector(personDetailSelector.getData);
  const [isVisible, setIsVisible] = useState(false);

  const [form] = Form.useForm();
  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues: DEFAULT_PASSWORD_VALUES,
    onSubmit: formValues => {
      return handleChangePassword(formValues);
    },
  });

  const {
    handleSubmit,
    values,
    errors,
    touched,
    handleChange,
    setValues,
    resetForm,
  } = formik;

  const openModal = () => setIsVisible(true);
  const closeModal = useCallback(
    () => {
      setIsVisible(false);
      resetForm();
    },
    [resetForm],
  );

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form]);

  useEffect(() => {
    form.setFieldsValue(DEFAULT_PASSWORD_VALUES);
    setValues(DEFAULT_PASSWORD_VALUES);
  }, [isVisible, setValues, form]);

  useEffect(() => {
    if (isSuccessPersonUpdate) {
      closeModal();
    }
  }, [isSuccessPersonUpdate, closeModal]);

  if (isPending) {
    return <Spin size="small" />;
  }

  return (
    <>
      <Row justify="center">
        <Button disabled={isPending || personDetail?.pickers?.length === 0} onClick={openModal}>
          {t('PROFILE.PASSWORD_CHANGE_FOR_PICKERS_TITLE')}
        </Button>
        <Text className="font-weight-light text-center">
          {t('PROFILE.PASSWORD_WARNING_TEXT')}
        </Text>
        {personDetail?.couriers?.[0] && (
        <RedirectText
          text={t('PROFILE.REDIRECT_TO_COURIER_DETAIL_PAGE', { courierName: personDetail?.name })}
          to={(`/courier/detail/${personDetail?.couriers?.[0]?.courier}`)}
          permKey={permKey.PAGE_COURIER_DETAIL}
          target="_blank"
        />
        )}
      </Row>
      <Modal
        title={t('PROFILE.PASSWORD_TITLE')}
        confirmLoading={isPending}
        visible={isVisible}
        onOk={handleSubmit}
        onCancel={closeModal}
      >
        <Form
          form={form}
          layout="vertical"
          autoComplete="off"
          okText={t('BUTTON.SAVE')}
          cancelText={t('BUTTON.CANCEL')}
        >
          <InputWrapper
            inputKey="password"
            label={t('PROFILE.PASSWORD_LABEL')}
            value={values.password}
            additionalProps={{ type: 'password' }}
            hasError={get(errors, 'password')}
            isTouched={get(touched, 'password')}
            handleChange={handleChange}
            disabled={isPending || !isVisible}
            setDefaultValue={false}
          />
        </Form>
      </Modal>
    </>
  );
};

export default PasswordModal;
