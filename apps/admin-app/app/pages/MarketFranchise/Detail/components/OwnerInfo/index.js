import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import _ from 'lodash';

import Card from '@shared/components/UI/AntCard';
import { defaultValues, validationSchema } from './formHelper';
import Footer from '../Footer';
import { InputWrapper } from '@shared/components/UI/Form';
import { validate } from '@shared/yup';
import useStyles from './styles';

const { useForm } = Form;

function OwnerInfo(props) {
  const {
    name,
    gsm,
    gsmAlt,
    nameAlt,
    email,
    submitRequest,
  } = props;
  const { t } = useTranslation(['marketFranchisePage', 'global']);
  const [form] = useForm();
  const [isFormEditable, setIsFormEditable] = useState(false);
  const classes = useStyles();
  const initialProps = { name, gsm, gsmAlt, email, nameAlt };

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      const { hasAlternativeContactInformation, ...filteredValues } = values;
      if (_.isEqual(filteredValues, initialProps)) {
        return false;
      }

      submitRequest({ authorizedPerson: filteredValues });
      setIsFormEditable(false);
      return true;
    },
    enableReinitialize: true,
  });

  const { handleSubmit, handleChange, values, errors, touched, setValues, setFieldValue } = formik;

  const handleResetForm = () => {
    if (!_.isEqual(values, initialProps)) {
      setValues(initialProps);
      form.setFieldsValue(initialProps);
      if (initialProps?.gsmAlt?.length > 0) {
        form.setFieldsValue({ hasAlternativeContactInformation: true });
        setFieldValue('hasAlternativeContactInformation', true);
      }
    }
  };

  const onCheckboxChange = value => {
    const isAlternativeContactInformationChecked = value.target.checked;
    form.setFieldsValue({ hasAlternativeContactInformation: value.target.checked });
    setFieldValue('hasAlternativeContactInformation', value.target.checked);

    if (!isAlternativeContactInformationChecked) {
      setFieldValue('nameAlt', undefined);
      form.setFieldsValue({ nameAlt: undefined });
      setFieldValue('gsmAlt', undefined);
      form.setFieldsValue({ gsmAlt: undefined });
    }
  };

  useEffect(() => {
    form.setFieldsValue({ name, gsm, gsmAlt, nameAlt, email });
    setValues({ name, gsm, gsmAlt, email, nameAlt });
    // recently, we have started with gsmAlt property then we have added nameAlt
    // that's why system checks gsmAlt initially
    if (gsmAlt?.length > 0) {
      form.setFieldsValue({ hasAlternativeContactInformation: true });
      setFieldValue('hasAlternativeContactInformation', true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, name, gsm, gsmAlt, email, nameAlt]);

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Card title={t('OWNER_INFO')}>
        <Row gutter={[16]} align="middle">
          <Col xs={12} sm={9}>
            <InputWrapper
              inputKey="name"
              label={t('NAME')}
              value={values.name}
              isTouched={_.get(touched, 'name')}
              hasError={_.get(errors, 'name')}
              handleChange={handleChange}
              disabled={!isFormEditable}
            />
          </Col>
          <Col xs={12} sm={9}>
            <InputWrapper
              inputKey="gsm"
              label={t('GSM')}
              value={values.gsm}
              isTouched={_.get(touched, 'gsm')}
              hasError={_.get(errors, 'gsm')}
              handleChange={handleChange}
              disabled={!isFormEditable}
            />
          </Col>
          <Col xs={24} sm={6}>
            <Checkbox
              name="hasAlternativeContactInformation"
              checked={values.hasAlternativeContactInformation}
              className={classes.checkbox}
              onChange={value => onCheckboxChange(value)}
              hasError={_.get(errors, 'hasAlternativeContactInformation')}
              isTouched={_.get(touched, 'hasAlternativeContactInformation')}
              disabled={!isFormEditable}
            >{t('HAS_ALTERNATIVE_CONTACT_INFORMATION')}
            </Checkbox>
          </Col>
        </Row>
        {values.hasAlternativeContactInformation && (
        <Row gutter={[16]} align="bottom">
          <Col xs={12} sm={9}>
            <InputWrapper
              inputKey="nameAlt"
              label={t('NAME_ALT')}
              value={values.nameAlt}
              isTouched={_.get(touched, 'nameAlt')}
              hasError={_.get(errors, 'nameAlt')}
              handleChange={handleChange}
              disabled={!isFormEditable}
            />
          </Col>
          <Col xs={12} sm={9}>
            <InputWrapper
              inputKey="gsmAlt"
              label={t('GSM_ALT')}
              value={values.gsmAlt}
              isTouched={_.get(touched, 'gsmAlt')}
              hasError={_.get(errors, 'gsmAlt')}
              handleChange={handleChange}
              disabled={!isFormEditable}
            />
          </Col>
        </Row>
        )}

        <Row gutter={[16]} align="bottom">
          <Col xs={12} sm={9}>
            <InputWrapper
              inputKey="email"
              label={t('EMAIL')}
              value={values.email}
              isTouched={_.get(touched, 'email')}
              hasError={_.get(errors, 'email')}
              handleChange={handleChange}
              disabled={!isFormEditable}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Footer
              formButtonVisibilty={isFormEditable}
              setFormButtonVisibilty={setIsFormEditable}
              handleReset={handleResetForm}
            />
          </Col>
        </Row>
      </Card>
    </Form>
  );
}

OwnerInfo.propTypes = {
  name: PropTypes.string,
  gsm: PropTypes.string,
  gsmAlt: PropTypes.string,
  nameAlt: PropTypes.string,
  email: PropTypes.string,
  submitRequest: PropTypes.func,
};

OwnerInfo.defaultProps = {
  name: '',
  gsm: '',
  gsmAlt: undefined,
  nameAlt: undefined,
  email: '',
  submitRequest: () => { },
};

export default OwnerInfo;
