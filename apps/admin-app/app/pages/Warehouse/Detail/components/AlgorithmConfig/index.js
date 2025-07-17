import { useState, useEffect } from 'react';
import { Form, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import _ from 'lodash';

import Card from '@shared/components/UI/AntCard';
import { defaultValues, validationSchema } from './formHelper';
import { InputWrapper } from '@shared/components/UI/Form';
import Footer from '../Footer';
import { validate } from '@shared/yup';

const { useForm } = Form;

// TODO: add Can wrapper
const AlgorithmConfig = ({ algorithmConfig, submitRequest }) => {
  const { t } = useTranslation();
  const [form] = useForm();
  const [isFormEditable, setIsFormEditable] = useState(false);

  const initialProps = { algorithmConfig };

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      if (_.isEqual(values, initialProps)) {
        return false;
      }
      submitRequest(values);
      setIsFormEditable(false);
      return true;
    },
    enableReinitialize: true,
  });

  const handleResetForm = () => {
    const formData = form.getFieldValue();
    if (_.isEqual(formData, initialProps)) {
      return false;
    }

    setValues({ ...initialProps });
    form.setFieldsValue({ ...initialProps });
    return true;
  };

  const { handleSubmit, values, errors, touched, handleChange, setValues } = formik;

  useEffect(() => {
    form.setFieldsValue({ algorithmConfig });
    setValues({ algorithmConfig });
  }, [form, setValues, algorithmConfig]);

  return (
    <>
      <Card title={t('warehousePage:ALGORITHM_INFO')}>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Row gutter={[16]} align="bottom">
            <Col span={12}>
              <InputWrapper
                inputKey="algorithmConfig"
                label={t('warehousePage:ALGORITHM_CONFIG')}
                value={values.algorithmConfig}
                isTouched={_.get(touched, 'algorithmConfig')}
                hasError={_.get(errors, 'algorithmConfig')}
                handleChange={handleChange}
                disabled={!isFormEditable}
                mode="textarea"
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Footer formButtonVisibilty={isFormEditable} setFormButtonVisibilty={setIsFormEditable} handleReset={handleResetForm} />
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
};

export default AlgorithmConfig;
