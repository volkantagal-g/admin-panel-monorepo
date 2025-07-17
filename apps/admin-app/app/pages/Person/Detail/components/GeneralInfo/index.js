import { useEffect, useMemo, useState } from 'react';
import { Form, Row, Col, Select, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { get } from 'lodash';

import AntCard from '@shared/components/UI/AntCard';
import { validate } from '@shared/yup';
import { DatePickerWrapper, InputWrapper, SelectWrapper } from '@shared/components/UI/Form';
import { BLOOD_TYPES, DRIVING_LICENSE_TYPES } from '@shared/shared/constants';
import WhichPaymentMethod from '@shared/components/UI/WhichPaymentMethod';
import { convertCountryOptions, convertedYesOrNoOptions } from '../../utils';
import { validationSchema } from './formHelper';
import { convertToCapitalLetter } from '@shared/utils/common';
import Footer from '../Footer';
import { DEFAULT_COL_SPACING, DEFAULT_ROW_SPACING } from '../../constants';

const GeneralInfo = ({ data, countryList, isPending, handleUpdate, editPermKey, isSuccessPersonUpdate }) => {
  const { t } = useTranslation(['personPage', 'error']);

  const countryListOptions = convertCountryOptions({ countryList });
  const [isFormEditable, setIsFormEditable] = useState(false);

  const validationFn = useMemo(() => validate(() => validationSchema({ t })), [t]);

  const [form] = Form.useForm();
  const formik = useFormik({
    enableReinitialize: true,
    validate: validationFn,
    initialValues: data,
    onSubmit: formValues => {
      return handleUpdate({
        updateData: {
          ...formValues,
          name: convertToCapitalLetter(formValues.name),
        },
      });
    },
  });

  const { handleSubmit, values, errors, touched, setFieldValue, handleChange, setValues, resetForm } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form]);

  const handleFieldChange = fieldName => {
    return value => {
      setFieldValue(fieldName, value);
    };
  };

  const handlePaymentCountryCode = ({ paymentObj }) => {
    setFieldValue('paymentCountryCode', paymentObj);
  };

  return (
    <Form form={form} layout="vertical">
      <AntCard
        footer={(
          <Footer
            initialValues={data}
            values={values}
            setValues={setValues}
            resetForm={resetForm}
            isFormEditable={isFormEditable}
            setIsFormEditable={setIsFormEditable}
            permKey={editPermKey}
            isPending={isPending}
            isSuccessPersonUpdate={isSuccessPersonUpdate}
            handleSubmit={handleSubmit}
          />
        )}
        bordered={false}
        title={t('GENERAL.TITLE')}
      >
        <Row gutter={DEFAULT_ROW_SPACING}>
          <Col {...DEFAULT_COL_SPACING}>
            <InputWrapper
              inputKey="name"
              label={t('NAME')}
              value={values.name}
              isTouched={get(touched, 'name')}
              hasError={get(errors, 'name')}
              handleChange={handleChange}
              disabled={isPending || !isFormEditable}
              setDefaultValue={false}
            />
          </Col>
          <Col {...DEFAULT_COL_SPACING}>
            <InputWrapper
              inputKey="username"
              label={t('USERNAME')}
              value={values.username}
              isTouched={get(touched, 'username')}
              hasError={get(errors, 'username')}
              handleChange={handleChange}
              disabled={isPending || !isFormEditable}
              setDefaultValue={false}
            />
          </Col>
          <Col {...DEFAULT_COL_SPACING}>
            <InputWrapper
              inputKey="gsm"
              label={t('GSM')}
              value={values.gsm}
              isTouched={get(touched, 'gsm')}
              hasError={get(errors, 'gsm')}
              handleChange={handleChange}
              disabled
              setDefaultValue={false}
            />
          </Col>
          <Col {...DEFAULT_COL_SPACING}>
            <InputWrapper
              inputKey="email"
              label={t('EMAIL')}
              value={values.email}
              isTouched={get(touched, 'email')}
              hasError={get(errors, 'email')}
              handleChange={handleChange}
              disabled={isPending || !isFormEditable}
              setDefaultValue={false}
            />
          </Col>
          <Col {...DEFAULT_COL_SPACING}>
            <DatePickerWrapper
              selectKey="createdAt"
              label={t('CREATED_AT')}
              value={values.createdAt}
              disabled
              setDefaultValue={false}
            />
          </Col>
          <Col {...DEFAULT_COL_SPACING}>
            <DatePickerWrapper
              selectKey="safeRidingTrainingDate"
              label={t('GENERAL.SAFE_RIDING_TRAINING_DATE')}
              value={values.safeRidingTrainingDate}
              hasError={get(errors, 'safeRidingTrainingDate')}
              isTouched={get(touched, 'safeRidingTrainingDate')}
              onChangeCallback={handleFieldChange('safeRidingTrainingDate')}
              suffixIcon={!values.safeRidingTrainingDate && <Tag color="error">{t('NOT_DONE')}</Tag>}
              disabled={isPending || !isFormEditable}
              setDefaultValue={false}
            />
          </Col>
          <Col {...DEFAULT_COL_SPACING}>
            <DatePickerWrapper
              selectKey="financeDeliveryTrainingDate"
              label={t('GENERAL.FINANCE_DELIVERY_TRAINING_DATE')}
              value={values.financeDeliveryTrainingDate}
              hasError={get(errors, 'financeDeliveryTrainingDate')}
              isTouched={get(touched, 'financeDeliveryTrainingDate')}
              onChangeCallback={handleFieldChange('financeDeliveryTrainingDate')}
              suffixIcon={!values.financeDeliveryTrainingDate && <Tag color="error">{t('NOT_DONE')}</Tag>}
              disabled={isPending || !isFormEditable}
              setDefaultValue={false}
              allowClear
            />
          </Col>
          <Col {...DEFAULT_COL_SPACING}>
            <SelectWrapper
              selectKey="bloodType"
              label={t('GENERAL.BLOOD_TYPE')}
              value={values.bloodType}
              hasError={get(errors, 'bloodType')}
              isTouched={get(touched, 'bloodType')}
              optionsData={BLOOD_TYPES}
              disabled={isPending || !isFormEditable}
              onChangeCallback={handleFieldChange('bloodType')}
            />
          </Col>
          <Col {...DEFAULT_COL_SPACING}>
            <Form.Item
              help={get(touched, 'paymentCountryCode.code') && get(errors, 'paymentCountryCode.code')}
              validateStatus={get(touched, 'paymentCountryCode.code') && get(errors, 'paymentCountryCode.code') ? 'error' : 'success'}
              name="paymentCountryCode"
              label={t('GENERAL.PAYMENT_COUNTRY_CODE')}
            >
              <Select
                options={countryListOptions}
                value={values.paymentCountryCode}
                onChange={(_, value) => handlePaymentCountryCode({ paymentObj: value.data })}
                disabled={isPending || !isFormEditable}
                labelInValue
              />
            </Form.Item>
          </Col>
          <WhichPaymentMethod
            paymentCountryCode={values.paymentCountryCode?.code}
            layout={DEFAULT_COL_SPACING}
            values={values}
            t={t}
            touched={touched}
            errors={errors}
            handleChange={handleChange}
            disabled={isPending || !isFormEditable}
          />
          <Col {...DEFAULT_COL_SPACING}>
            <SelectWrapper
              selectKey="isOutsourced"
              label={t('GENERAL.IS_OUTSOURCED')}
              value={values.isOutsourced}
              optionLabelProp="label"
              optionValueProp="value"
              hasError={get(errors, 'isOutsourced')}
              isTouched={get(touched, 'isOutsourced')}
              optionsData={convertedYesOrNoOptions}
              disabled={isPending || !isFormEditable}
              onChangeCallback={handleFieldChange('isOutsourced')}
            />
          </Col>
          <Col {...DEFAULT_COL_SPACING}>
            <SelectWrapper
              selectKey="isGorillasEmployee"
              label={t('GENERAL.IS_GORILLAS_EMPLOYEE')}
              value={values.isGorillasEmployee}
              optionLabelProp="label"
              optionValueProp="value"
              hasError={get(errors, 'isGorillasEmployee')}
              isTouched={get(touched, 'isGorillasEmployee')}
              optionsData={convertedYesOrNoOptions}
              disabled={isPending || !isFormEditable}
              onChangeCallback={handleFieldChange('isGorillasEmployee')}
            />
          </Col>
          <Col {...DEFAULT_COL_SPACING}>
            <DatePickerWrapper
              selectKey="dateOfBirth"
              label={t('DATE_OF_BIRTH')}
              value={values.dateOfBirth}
              hasError={get(errors, 'dateOfBirth')}
              isTouched={get(touched, 'dateOfBirth')}
              onChangeCallback={handleFieldChange('dateOfBirth')}
              disabled={isPending || !isFormEditable}
              setDefaultValue={false}
              allowClear
            />
          </Col>
          <Col {...DEFAULT_COL_SPACING}>
            <DatePickerWrapper
              selectKey="drivingLicenseDate"
              label={t('DRIVING_LICENSE_DATE')}
              value={values.drivingLicenseDate}
              hasError={get(errors, 'drivingLicenseDate')}
              isTouched={get(touched, 'drivingLicenseDate')}
              onChangeCallback={handleFieldChange('drivingLicenseDate')}
              disabled={isPending || !isFormEditable}
              setDefaultValue={false}
              allowClear
            />
          </Col>
          <Col {...DEFAULT_COL_SPACING}>
            <SelectWrapper
              mode="multiple"
              selectKey="drivingLicenseTypes"
              label={t('DRIVING_LICENSE_TYPES')}
              placeholder={t('DRIVING_LICENSE_TYPES')}
              value={values.drivingLicenseTypes}
              hasError={get(errors, 'drivingLicenseTypes')}
              isTouched={get(touched, 'drivingLicenseTypes')}
              optionsData={DRIVING_LICENSE_TYPES}
              disabled={isPending || !isFormEditable}
              onChangeCallback={handleFieldChange('drivingLicenseTypes')}
            />
          </Col>
          <Col {...DEFAULT_COL_SPACING}>
            <DatePickerWrapper
              selectKey="employmentStartDate"
              label={t('EMPLOYMENT_START_DATE')}
              value={values.employmentStartDate}
              hasError={get(errors, 'employmentStartDate')}
              isTouched={get(touched, 'employmentStartDate')}
              onChangeCallback={handleFieldChange('employmentStartDate')}
              disabled={isPending || !isFormEditable}
              setDefaultValue={false}
              allowClear
            />
          </Col>
        </Row>
      </AntCard>
    </Form>
  );
};

export default GeneralInfo;
