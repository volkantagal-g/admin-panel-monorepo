import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Switch } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { isEqual } from 'lodash';

import { defaultValues, validationSchema } from './formHelper';
import Card from '@shared/components/UI/AntCard';
import Footer from '../Footer';
import { validate } from '@shared/yup';

const { useForm } = Form;

function IsOperationApprover({ submitRequest, isOperationApprover }) {
  const { t } = useTranslation('pickerDetailPage');
  const [form] = useForm();
  const [isFormEditable, setIsFormEditable] = useState(false);
  const initialProps = { isOperationApprover };

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      if (isEqual(values, initialProps)) {
        return false;
      }
      submitRequest({ isOperationApprover: values.isOperationApprover });
      setIsFormEditable(false);
      return true;
    },
    enableReinitialize: true,
  });

  const {
    handleSubmit,
    values,
    setFieldValue,
    setValues,
  } = formik;
  const handleResetForm = () => {
    if (isEqual(values, initialProps)) {
      return false;
    }

    setValues(initialProps);
    form.setFieldsValue(initialProps);
    return true;
  };

  useEffect(() => {
    form.setFieldsValue({ isOperationApprover });
    setValues({ isOperationApprover });
  }, [form, isOperationApprover, setValues]);

  return (
    <Col span={24}>
      <Card title={t('IS_OPERATION_APPROVER')}>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Row gutter={[16]} align="bottom">
            <Col span={24}>
              <Form.Item name="isOperationApprover" label={t('IS_OPERATION_APPROVER')} valuePropName="checked">

                <Switch
                  disabled={!isFormEditable}
                  checked={values.isOperationApprover}
                  onChange={isChecked => {
                    setFieldValue('isOperationApprover', isChecked);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row align="bottom">
            <Col span={24}>
              <Footer
                formButtonVisibilty={isFormEditable}
                setFormButtonVisibilty={setIsFormEditable}
                handleReset={handleResetForm}
              />
            </Col>
          </Row>
        </Form>
      </Card>
    </Col>
  );
}

IsOperationApprover.propTypes = { submitRequest: PropTypes.func.isRequired };

export default IsOperationApprover;
