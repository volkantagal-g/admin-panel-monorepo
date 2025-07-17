import { Card, Checkbox, Col, Row, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';

import { InputWrapper, SelectWrapper } from '@shared/components/UI/Form';
import SelectCountryDialingCode from '@shared/components/Select/CountryDialingCode';
import WhichPaymentMethod from '@shared/components/UI/WhichPaymentMethod';
import { getLangKey } from '@shared/i18n';
import { getCountryById } from '../../utils';
import {
  ANT_SPACING_12,
  DEFAULT_ROW_SPACING,
} from '../../constants';
import { defaultPaymentValues } from '../../formHelper';
import useStyles from './styles';

function GeneralInformation({
  values = {},
  countries = [],
  handleChange = () => null,
  setFieldValue = () => null,
  setValues = () => null,
  errors = {},
  touched = {},
  isPending = false,
}) {
  const classes = useStyles();
  const { t } = useTranslation('personPage');

  const handleCountryChange = selectedValue => {
    const country = getCountryById(selectedValue, countries);
    setValues({
      ...values,
      country: selectedValue,
      countryGsmCode: country.dialingCode,
      countryCode: country.code.alpha2,
    });
  };

  const handlePaymentCountryCodeChange = countryId => {
    const country = getCountryById(countryId, countries);
    setValues({
      ...values,
      ...defaultPaymentValues,
      paymentCountryCode: {
        code: country.dialingCode,
        name: country.name,
      },
    });
  };

  const renderDialingCodeAddon = () => (
    <SelectCountryDialingCode
      isDisabled
      isFirstOptionSelected={false}
      value={values.countryGsmCode}
    />
  );

  return (
    <Card title={t('GENERAL.TITLE')}>
      <Row gutter={DEFAULT_ROW_SPACING} align="top">
        <Col span={ANT_SPACING_12}>
          <InputWrapper
            inputKey="name"
            label={t('NAME')}
            value={values.name}
            hasError={get(errors, 'name')}
            isTouched={get(touched, 'name')}
            handleChange={handleChange}
            disabled={isPending}
            setDefaultValue={false}
          />
        </Col>
        <Col span={ANT_SPACING_12}>
          <InputWrapper
            inputKey="username"
            label={t('USERNAME')}
            value={values.username}
            hasError={get(errors, 'username')}
            isTouched={get(touched, 'username')}
            handleChange={handleChange}
            disabled={isPending}
            setDefaultValue={false}
          />
        </Col>
      </Row>
      <Row gutter={DEFAULT_ROW_SPACING} align="top">
        <Col span={ANT_SPACING_12}>
          <SelectWrapper
            selectKey="country"
            label={t('COUNTRY')}
            value={values.country}
            hasError={get(errors, 'country')}
            isTouched={get(touched, 'country')}
            optionsData={countries}
            labelTranslationCallback={name => name[getLangKey()]}
            optionLabelProp="name"
            optionValueProp="_id"
            onChangeCallback={handleCountryChange}
            disabled={isPending}
          />
        </Col>
        <Col span={ANT_SPACING_12}>
          <InputWrapper
            inputKey="uniqueIdentifier"
            label={t('IDENTIFICATION_NUMBER')}
            value={values.uniqueIdentifier}
            hasError={get(errors, 'uniqueIdentifier')}
            isTouched={get(touched, 'uniqueIdentifier')}
            handleChange={handleChange}
            disabled={isPending}
            setDefaultValue={false}
          />
        </Col>
      </Row>
      <Row gutter={DEFAULT_ROW_SPACING} align="top">
        <Col span={ANT_SPACING_12}>
          <InputWrapper
            inputKey="personalGsm"
            label={t('PERSONAL_GSM')}
            value={values.personalGsm}
            hasError={get(errors, 'personalGsm')}
            isTouched={get(touched, 'personalGsm')}
            handleChange={handleChange}
            additionalProps={{ addonBefore: renderDialingCodeAddon() }}
            disabled={isPending}
            setDefaultValue={false}
          />
        </Col>
        <Col span={ANT_SPACING_12}>
          <InputWrapper
            inputKey="email"
            label={t('EMAIL')}
            value={values.email}
            hasError={get(errors, 'email')}
            isTouched={get(touched, 'email')}
            handleChange={handleChange}
            disabled={isPending}
            setDefaultValue={false}
          />
        </Col>
      </Row>
      <Row gutter={DEFAULT_ROW_SPACING} align="top">
        <Col span={ANT_SPACING_12}>
          <Space direction="horizontal" className={classes.marginBottom}>
            <Checkbox
              disabled={isPending}
              checked={values.shouldAddEmployeeDiscount}
              onChange={() => setFieldValue('shouldAddEmployeeDiscount', !values.shouldAddEmployeeDiscount)}
            >
              {t('GENERAL.EMPLOYEE_DISCOUNT')}
            </Checkbox>
          </Space>
        </Col>
        <Col span={ANT_SPACING_12}>
          <Space direction="horizontal" className={classes.marginBottom}>
            <Checkbox
              disabled={isPending}
              checked={values.isOutsourced}
              onChange={() => setFieldValue('isOutsourced', !values.isOutsourced)}
            >
              {t('GENERAL.IS_OUTSOURCED')}
            </Checkbox>
          </Space>
        </Col>
      </Row>
      <Row gutter={DEFAULT_ROW_SPACING} align="top">
        <Col span={ANT_SPACING_12}>
          <SelectWrapper
            selectKey="paymentCountryCode.code"
            label={t('GENERAL.PAYMENT_COUNTRY_CODE')}
            value={values.paymentCountryCode.code}
            hasError={get(errors, 'paymentCountryCode.code')}
            isTouched={get(touched, 'paymentCountryCode.code')}
            optionsData={countries}
            labelTranslationCallback={name => name[getLangKey()]}
            optionLabelProp="name"
            optionValueProp="_id"
            onChangeCallback={handlePaymentCountryCodeChange}
            disabled={isPending}
          />
        </Col>
        <WhichPaymentMethod
          paymentCountryCode={values.paymentCountryCode.code}
          layout={{ span: ANT_SPACING_12 }}
          values={values}
          t={t}
          touched={touched}
          errors={errors}
          handleChange={handleChange}
          disabled={isPending || !values.paymentCountryCode.code}
        />
      </Row>
    </Card>
  );
}

export default GeneralInformation;
