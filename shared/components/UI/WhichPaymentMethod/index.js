import { Col } from 'antd';
import { get } from 'lodash';

import { InputWrapper } from '@shared/components/UI/Form';
import { PAYMENT_METHOD_BY_COUNTRY } from '@shared/shared/constants';

const WhichPaymentMethod = ({
  paymentCountryCode,
  layout,
  values,
  t,
  touched,
  errors,
  handleChange,
  disabled,
}) => {
  const { USING_ACCOUNT_NUMBER, USING_ROUTING_NUMBER, USING_SORT_CODE, NOT_USING_IBAN } = PAYMENT_METHOD_BY_COUNTRY;
  return (
    <>
      {USING_ACCOUNT_NUMBER.includes(paymentCountryCode) && (
        <Col {...layout}>
          <InputWrapper
            inputKey="accountNumber"
            label={t('GENERAL.ACCOUNT_NUMBER')}
            value={values.accountNumber}
            isTouched={get(touched, 'accountNumber')}
            hasError={get(errors, 'accountNumber')}
            handleChange={handleChange}
            disabled={disabled}
            setDefaultValue={false}
          />
        </Col>
      )}
      {USING_ROUTING_NUMBER.includes(paymentCountryCode) && (
        <Col {...layout}>
          <InputWrapper
            inputKey="routingNumber"
            label={t('GENERAL.ROUTING_NUMBER')}
            value={values.routingNumber}
            isTouched={get(touched, 'routingNumber')}
            hasError={get(errors, 'routingNumber')}
            handleChange={handleChange}
            disabled={disabled}
            setDefaultValue={false}
          />
        </Col>
      )}
      {USING_SORT_CODE.includes(paymentCountryCode) && (
        <Col {...layout}>
          <InputWrapper
            inputKey="sortCode"
            label={t('GENERAL.SORT_CODE')}
            value={values.sortCode}
            isTouched={get(touched, 'sortCode')}
            hasError={get(errors, 'sortCode')}
            handleChange={handleChange}
            disabled={disabled}
            setDefaultValue={false}
          />
        </Col>
      )}
      {!NOT_USING_IBAN.includes(paymentCountryCode) && (
        <Col {...layout}>
          <InputWrapper
            inputKey="iban"
            label={t('IBAN')}
            value={values.iban}
            isTouched={get(touched, 'iban')}
            hasError={get(errors, 'iban')}
            handleChange={handleChange}
            disabled={disabled}
            setDefaultValue={false}
          />
        </Col>
      )}
    </>
  );
};

export default WhichPaymentMethod;
