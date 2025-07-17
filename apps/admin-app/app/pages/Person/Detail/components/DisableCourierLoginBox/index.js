import { useCallback, useEffect, useState } from 'react';
import { Form, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { get } from 'lodash';

import AntCard from '@shared/components/UI/AntCard';
import { validate } from '@shared/yup';
import { InputWrapper, SelectWrapper } from '@shared/components/UI/Form';
import { validationSchema, DEFAULT_COURIER_LOGIN } from './formHelper';
import { convertedCourierDisableLoginReasonOptions, convertedYesOrNoOptions, disableLoginOfCouriersRequestParams } from '../../utils';
import { DEFAULT_COL_SPACING, DEFAULT_ROW_SPACING } from '../../constants';
import Footer from '../Footer';

const DisableCourierLoginBox = ({ data, isPending, isSuccessPersonUpdate, handleUpdate, editPermKey }) => {
  const { t } = useTranslation('personPage');

  const [isFormEditable, setIsFormEditable] = useState(false);

  const [form] = Form.useForm();
  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues: DEFAULT_COURIER_LOGIN,
    onSubmit: formValues => {
      const updateData = disableLoginOfCouriersRequestParams({ formValues });

      return handleUpdate(updateData);
    },
  });

  const { handleSubmit, handleChange, values, errors, touched, setFieldValue, setValues, resetForm } = formik;

  const handleFieldChange = useCallback(
    (fieldName, value) => {
      setFieldValue(fieldName, value);
    },
    [setFieldValue],
  );

  const handleResetForm = useCallback(
    () => {
      resetForm();
      setFieldValue('isLoginDisabled', data.isCouriersLoginDisabled);
    },
    [setFieldValue, resetForm, data],
  );

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form]);

  useEffect(() => {
    handleFieldChange('isLoginDisabled', data.isCouriersLoginDisabled);
  }, [data, handleFieldChange]);

  return (
    <Form form={form} layout="vertical">
      <AntCard
        footer={(
          <Footer
            initialValues={DEFAULT_COURIER_LOGIN}
            values={values}
            setValues={setValues}
            resetForm={handleResetForm}
            isFormEditable={isFormEditable}
            setIsFormEditable={setIsFormEditable}
            permKey={editPermKey}
            isPending={isPending}
            isSuccessPersonUpdate={isSuccessPersonUpdate}
            handleSubmit={handleSubmit}
          />
        )}
        bordered={false}
        title={t('COURIER_LOGIN.TITLE')}
      >

        <Row gutter={DEFAULT_ROW_SPACING}>
          <Col {...DEFAULT_COL_SPACING}>
            <SelectWrapper
              selectKey="isLoginDisabled"
              label={t('COURIER_LOGIN.IS_LOGIN_DISABLED')}
              value={values.isLoginDisabled}
              optionLabelProp="label"
              optionValueProp="value"
              hasError={get(errors, 'isLoginDisabled')}
              isTouched={get(touched, 'isLoginDisabled')}
              optionsData={convertedYesOrNoOptions}
              disabled={isPending || !isFormEditable}
              onChangeCallback={value => handleFieldChange('isLoginDisabled', value)}
            />
          </Col>
          {
            isFormEditable && (
              <>
                {values.isLoginDisabled && (
                <Col {...DEFAULT_COL_SPACING}>
                  <SelectWrapper
                    selectKey="reason"
                    label={t('COURIER_LOGIN.REASON')}
                    value={values.reason}
                    optionLabelProp="label"
                    optionValueProp="value"
                    hasError={get(errors, 'reason')}
                    isTouched={get(touched, 'reason')}
                    optionsData={convertedCourierDisableLoginReasonOptions}
                    disabled={isPending || !isFormEditable}
                    onChangeCallback={value => handleFieldChange('reason', value)}
                  />
                </Col>
                )}
                <Col {...DEFAULT_COL_SPACING}>
                  <InputWrapper
                    inputKey="explanation"
                    label={t('COURIER_LOGIN.EXPLANATION')}
                    value={values.explanation}
                    isTouched={get(touched, 'explanation')}
                    hasError={get(errors, 'explanation')}
                    handleChange={handleChange}
                    mode="textarea"
                    disabled={isPending || !isFormEditable}
                  />
                </Col>
              </>
            )
          }
        </Row>
      </AntCard>
    </Form>
  );
};

export default DisableCourierLoginBox;
