import { useEffect, useMemo, useState } from 'react';
import { Form, Row, Col, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { get } from 'lodash';
import { GiftOutlined } from '@ant-design/icons';

import AntCard from '@shared/components/UI/AntCard';
import { validate } from '@shared/yup';
import { InputWrapper, SelectWrapper } from '@shared/components/UI/Form';
import { convertedYesOrNoOptions, getCountryById, updatePersonalInfoRequestParams } from '../../utils';
import { validationSchema } from './formHelper';
import SelectCountryDialingCode from '@shared/components/Select/CountryDialingCode';
import { getLangKey } from '@shared/i18n';
import Footer from '../Footer';
import { DEFAULT_COL_SPACING, DEFAULT_ROW_SPACING } from '../../constants';

const PersonalInfo = ({
  data,
  countryList,
  isPending,
  isSuccessPersonUpdate,
  handleUpdate,
  handleAddEmployeeDiscount,
  hasEmployeeDiscount,
  editPermKey,
}) => {
  const { t } = useTranslation(['personPage', 'error', 'button']);

  const [isFormEditable, setIsFormEditable] = useState(false);

  const validationFn = useMemo(() => validate(() => validationSchema({ t })), [t]);

  const [form] = Form.useForm();
  const formik = useFormik({
    enableReinitialize: true,
    validate: validationFn,
    initialValues: data,
    onSubmit: formValues => {
      const updateData = updatePersonalInfoRequestParams({ formValues });

      return handleUpdate({ updateData });
    },
  });

  const { handleSubmit, values, errors, touched, setFieldValue, handleChange, setValues, resetForm } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  const handleFieldChange = fieldName => {
    return value => {
      setFieldValue(fieldName, value);
      if (fieldName === 'country') {
        const country = getCountryById(value, countryList);
        if (country != null) {
          setFieldValue('countryGsmCode', String(country.dialingCode));
          setFieldValue('countryCode', country.code.alpha2);
        }
      }
    };
  };

  const renderDialingCodeAddon = () => (
    <SelectCountryDialingCode
      isDisabled
      isFirstOptionSelected={false}
      value={values.countryGsmCode}
    />
  );

  const renderAddEmployeeDiscount = () => (
    <Popconfirm
      onConfirm={handleAddEmployeeDiscount}
      okText={t('YES')}
      cancelText={t('CANCEL')}
      title={hasEmployeeDiscount ? t('PERSONAL.CONFIRM_ALREADY_HAS_DISCOUNT') : t('PERSONAL.CONFIRM_ADD_EMPLOYEE_DISCOUNT')}
    >
      <GiftOutlined />
    </Popconfirm>
  );

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
        title={t('PERSONAL.TITLE')}
      >
        <Row gutter={DEFAULT_ROW_SPACING}>
          <Col {...DEFAULT_COL_SPACING}>
            <InputWrapper
              inputKey="uniqueIdentifier"
              label={t('IDENTIFICATION_NUMBER')}
              value={values.uniqueIdentifier}
              isTouched={get(touched, 'uniqueIdentifier')}
              hasError={get(errors, 'uniqueIdentifier')}
              handleChange={handleChange}
              disabled={isPending || !isFormEditable}
              setDefaultValue={false}
            />
          </Col>
          <Col {...DEFAULT_COL_SPACING}>
            <SelectWrapper
              selectKey="country"
              label={t('COUNTRY')}
              value={values.country}
              hasError={get(errors, 'country')}
              isTouched={get(touched, 'country')}
              optionsData={countryList}
              allowClear
              labelTranslationCallback={name => name[getLangKey()]}
              optionLabelProp="name"
              optionValueProp="_id"
              onChangeCallback={handleFieldChange('country')}
              disabled={isPending || !isFormEditable}
            />
          </Col>
          <Col {...DEFAULT_COL_SPACING}>
            <InputWrapper
              inputKey="personalGsm"
              label={t('PERSONAL_GSM')}
              value={values.personalGsm}
              hasError={get(errors, 'personalGsm')}
              isTouched={get(touched, 'personalGsm')}
              handleChange={handleChange}
              additionalProps={{
                addonBefore: renderDialingCodeAddon(),
                suffix: renderAddEmployeeDiscount(),
              }}
              disabled={isPending || !isFormEditable}
              setDefaultValue={false}
            />
          </Col>
          <Col {...DEFAULT_COL_SPACING}>
            <SelectWrapper
              selectKey="shouldAddEmployeeDiscount"
              label={t('PERSONAL.DISCOUNT')}
              value={values.shouldAddEmployeeDiscount}
              optionLabelProp="label"
              optionValueProp="value"
              hasError={get(errors, 'shouldAddEmployeeDiscount')}
              isTouched={get(touched, 'shouldAddEmployeeDiscount')}
              optionsData={convertedYesOrNoOptions}
              disabled={isPending || !isFormEditable}
              onChangeCallback={handleFieldChange('shouldAddEmployeeDiscount')}
            />
          </Col>
        </Row>
      </AntCard>
    </Form>
  );
};

export default PersonalInfo;
