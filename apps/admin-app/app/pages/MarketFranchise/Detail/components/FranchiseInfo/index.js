import { useEffect, useState } from 'react';
import { Form, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { get, isEqual } from 'lodash';

import Card from '@shared/components/UI/AntCard';
import { InputWrapper } from '@shared/components/UI/Form';
import { validate } from '@shared/yup';
import { defaultValues, validationSchema } from './formHelper';
import Footer from '../Footer';

const { useForm } = Form;

function FranchiseInfo(props) {
  const {
    taxOffice,
    taxNumber,
    submitRequest,
    name,
    isIntegrateSAP,
  } = props;
  const { t } = useTranslation('marketFranchisePage');
  const [form] = useForm();
  const [isFormEditable, setIsFormEditable] = useState(false);

  const initialProps = { taxOffice, taxNumber, name };

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      if (isEqual(values, initialProps)) {
        return false;
      }

      submitRequest(values);
      setIsFormEditable(false);
      return true;
    },
    enableReinitialize: true,
  });

  const { handleSubmit, handleChange, values, errors, touched, setValues } = formik;

  const handleSetIsFormEditable = visibility => setIsFormEditable(visibility);

  const handleResetForm = () => {
    if (isEqual(values, initialProps)) {
      return false;
    }

    setValues(initialProps);
    form.setFieldsValue(initialProps);
    return true;
  };

  useEffect(() => {
    form.setFieldsValue({ taxNumber, taxOffice, name });
    setValues({ taxNumber, taxOffice, name });
  }, [form, taxNumber, taxOffice, name, setValues]);

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Card title={t('FRANCHISE_INFORMATION')}>
        <Row gutter={[16]} align="bottom">
          <Col span={12}>
            <InputWrapper
              inputKey="taxOffice"
              label={t('TAX_OFFICE')}
              value={values.taxOffice}
              isTouched={get(touched, 'taxOffice')}
              hasError={get(errors, 'taxOffice')}
              handleChange={handleChange}
              disabled={!isFormEditable}
            />
          </Col>
          <Col span={12}>
            <InputWrapper
              inputKey="taxNumber"
              label={t('TAX_NUMBER')}
              value={values.taxNumber}
              isTouched={get(touched, 'taxNumber')}
              hasError={get(errors, 'taxNumber')}
              handleChange={handleChange}
              disabled={!isFormEditable}
            />
          </Col>
        </Row>
        <Row gutter={[16]} align="bottom">
          <Col span={12}>
            <InputWrapper
              inputKey="name"
              label={t('MARKET_FRANCHISE_NAME')}
              isTouched={get(touched, 'name')}
              hasError={get(errors, 'name')}
              handleChange={handleChange}
              disabled={!isFormEditable}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Footer
              editButtonVisibility={!isIntegrateSAP}
              formButtonVisibilty={isFormEditable && !isIntegrateSAP}
              setFormButtonVisibilty={handleSetIsFormEditable}
              handleReset={handleResetForm}
            />
          </Col>
        </Row>
      </Card>
    </Form>
  );
}

export default FranchiseInfo;
