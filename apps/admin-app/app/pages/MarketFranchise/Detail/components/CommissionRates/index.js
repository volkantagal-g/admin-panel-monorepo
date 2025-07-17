import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import _ from 'lodash';

import Card from '@shared/components/UI/AntCard';
import {
  DEFAULT_MARKET_FRANCHISE_COMMISSION_RATE,
  GETIR_10_DOMAIN_TYPE,
  GETIR_MARKET_DOMAIN_TYPE,
  MARKET_FRANCHISE_COMMISSION_RATE_UPPER_BOUND,
} from '@shared/shared/constants';

import { defaultValues, validationSchema } from './formHelper';
import Footer from '../Footer';
import CommissionRatesCard from '../CommissionRatesCard';
import { validate } from '@shared/yup';

const UPPER_BOUND = parseInt(MARKET_FRANCHISE_COMMISSION_RATE_UPPER_BOUND, 10);
const { useForm } = Form;

function CommissionRates(props) {
  const {
    settings,
    submitRequest,
    errorNotification,
    isActivated,
  } = props;
  const { t } = useTranslation();
  const [form] = useForm();
  const [isFormEditable, setIsFormEditable] = useState(false);

  const initialProps = { ...settings };

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      return handleOnSubmit(values);
    },
    enableReinitialize: true,
  });

  const canStoreConversionUpdate = () => {
    if (isActivated) {
      errorNotification({ message: t("marketFranchisePage:ERR_SHOULD_BE_INACTIVE") });
      return false;
    }
    return true;
  };

  const handleSetIsFormEditable = visibility => {
    if (!canStoreConversionUpdate()) {
      return false;
    }
    return setIsFormEditable(visibility);
  };

  const handleOnSubmit = values => {
    // validate input
    const isValid = validateCommissionRates(values);
    if (!isValid) {
      return;
    }

    // remove empty lists from input object as required by backend
    const filteredValues = Object.entries(values)
      .reduce((sum, [domainKey, commissionRates]) => {
        if (!commissionRates.length) {
          return sum;
        }

        return { ...sum, [domainKey]: commissionRates };
      }, {});

    // proceed with submit request, lock back the form
    submitRequest({ ...filteredValues });
    setIsFormEditable(false);
  };

  // Before attempting to validate the input,
  // We ensure the user is allowed to update the information, and then sort the input pre-validation
  const handlePreSubmit = () => {
    if (!canStoreConversionUpdate()) {
      return;
    }

    if (!_.isEmpty(errors)) {
      if (_.isEmpty(touched)) {
        setTouched(errors);
      }
      return;
    }

    const domainKeys = Object.keys(values);
    for (let i = 0; i < domainKeys.length; i += 1) {
      const domainKey = domainKeys[i];
      values[domainKey].sort((a, b) => {
        return a.min - b.min;
      });
    }

    setValues({ ...values }, false);
    form.setFieldsValue({ ...values });

    handleSubmit();
  };

  const validateCommissionRates = values => {
    // Iterate over domain keys to validate each of the commission rates lists
    const domainKeys = Object.keys(values);
    for (const domainKey of domainKeys) { // eslint-disable-line
      const commissionRates = values[domainKey];

      if (!commissionRates.length) {
        continue; // eslint-disable-line
      }

      const upperBoundIsValid = validateUpperBound(commissionRates, domainKey);
      const nextMinCurrentMaxOrderIsValid = validateNextMinCurrentMaxOrder(commissionRates, domainKey);
      const minMaxOrderIsValid = validateMinMaxOrder(commissionRates, domainKey);

      if (!upperBoundIsValid || !nextMinCurrentMaxOrderIsValid || !minMaxOrderIsValid) {
        return false;
      }
    }
    // no errors found
    return true;
  };

  const validateUpperBound = (commissionRates, domainKey) => {
    const lastElementIndex = commissionRates.length - 1;

    // Ensure the last element has pre-determined upper bound
    if (commissionRates[lastElementIndex].max !== UPPER_BOUND) {
      const errorMessage = t(
        'marketFranchisePage:ERR_NO_UPPER_BOUND',
        { limit: UPPER_BOUND }
      );
      errorNotification({ message: errorMessage, toastOptions: { autoClose: 4000 } });
      setFieldError(`${domainKey}.${lastElementIndex}.max`, true);
      return false;
    }

    // Handle case when there are multiple upper bounds (only the last element can have the upper bound)
    // Set each field error that may exist, then give out the error
    let thereIsBadInput = false;
    for (let i = 0; i < commissionRates.length; i += 1) {
      const item = commissionRates[i];
      if (item.max === UPPER_BOUND && i !== lastElementIndex) {
        thereIsBadInput = true;
        setFieldError(`${domainKey}.${i}.max`, true);
      }
    }

    if (thereIsBadInput) {
      const errorMessage = t(
        'marketFranchisePage:ERR_MULTIPLE_UPPER_BOUNDS',
        { limit: UPPER_BOUND }
      );
      errorNotification({ message: errorMessage });
      return false;
    }

    // Valid upper bound
    return true;
  };

  const validateMinMaxOrder = (commissionRates, domainKey) => {
    for (let i = 0; i < commissionRates.length; i += 1) {
      const { max, min } = commissionRates[i];

      // Handle special case where 'max' may be less than 'min'
      if (max === UPPER_BOUND) {
        continue; // eslint-disable-line
      }

      if (min >= max) {
        errorNotification({ message: t('marketFranchisePage:ERR_SAME_MIN_MAX_ORDER_COUNT') });
        setFieldError(`${domainKey}.${i}.max`, true);
        setFieldError(`${domainKey}.${i}.min`, true);
        return false;
      }
    }

    return true;
  };

  const validateNextMinCurrentMaxOrder = (commissionRates, domainKey) => {
    for (let i = 0; i < commissionRates.length - 1; i += 1) {
      const { max: currentMax } = commissionRates[i];
      const { min: nextMin } = commissionRates[i + 1];

      // Special case (might not occur in this implementation as commissionRates come in sorted)
      if (currentMax === UPPER_BOUND) {
        continue; // eslint-disable-line
      }

      if (currentMax !== nextMin - 1) {
        errorNotification({ message: t('marketFranchisePage:ERR_CONSECUTIVE_MIN_MAX') });
        setFieldError(`${domainKey}.${i}.max`, true);
        setFieldError(`${domainKey}.${i + 1}.min`, true);
        return false;
      }
    }

    return true;
  };

  const handleResetForm = () => {
    if (_.isEqual(values, initialProps)) {
      return false;
    }

    // send in default values to show every column even if no previous data exist
    form.setFieldsValue({ ...defaultValues, ...initialProps });
    setValues({ ...defaultValues, ...initialProps });
    return true;
  };

  const { handleSubmit, values, errors, touched, setValues, setFieldValue, setFieldError, setTouched } = formik;

  useEffect(() => {
    const targetKeys = _.keys(settings);
    if (!targetKeys.length) {
      return;
    }

    // send in default values to show every column, even if no previous data exists
    form.setFieldsValue({ ...defaultValues, ...settings });
    setValues({ ...defaultValues, ...settings });
  }, [form, setValues, settings]);

  const handleAddCommissionRateCardItem = domainKey => {
    return () => {
      const currentDomainSettings = values[domainKey];
      setValues({
        ...values,
        [domainKey]: [
          ...currentDomainSettings,
          DEFAULT_MARKET_FRANCHISE_COMMISSION_RATE,
        ],
      });
      form.setFieldsValue({
        ...values,
        [domainKey]: [
          ...currentDomainSettings,
          DEFAULT_MARKET_FRANCHISE_COMMISSION_RATE,
        ],
      });

    };
  };

  const handleRemoveCommissionRateCardItem = domainKey => {
    return index => {
      const currentDomainSettings = [...values[domainKey]];
      currentDomainSettings.splice(index, 1);
      form.setFieldsValue({
        ...values,
        [domainKey]: currentDomainSettings,
      });
      setValues({
        ...values,
        [domainKey]: currentDomainSettings,
      });
    };
  };

  return (
    <>
      <Card title={t('marketFranchisePage:COMMISSION_RATES')}>
        <Form form={form} onFinish={handlePreSubmit} layout="vertical">
          <Row gutter={[16]} align="top">
            {[GETIR_10_DOMAIN_TYPE, GETIR_MARKET_DOMAIN_TYPE].map(domainType => {
              if (!values[domainType]) {
                return null;
              }

              return (
                <CommissionRatesCard
                  key={`config-card-${domainType}`}
                  domainType={domainType}
                  domainCommissionRates={values[domainType]}
                  touched={touched[domainType]}
                  errors={errors[domainType]}
                  isFormEditable={isFormEditable}
                  setFieldValue={setFieldValue}
                  handleAdd={handleAddCommissionRateCardItem(domainType)}
                  handleRemove={handleRemoveCommissionRateCardItem(domainType)}
                />
              );
            })}
          </Row>
          <Row>
            <Col span={24}>
              <Footer
                formButtonVisibilty={isFormEditable}
                setFormButtonVisibilty={handleSetIsFormEditable}
                handleReset={handleResetForm}
              />
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
}

CommissionRates.propTypes = {
  settings: PropTypes.object,
  submitRequest: PropTypes.func,
  errorNotification: PropTypes.func,
  isActivated: PropTypes.bool,
};

export default CommissionRates;
