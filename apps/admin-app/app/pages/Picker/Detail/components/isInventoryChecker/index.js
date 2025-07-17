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

function IsInventoryChecker({ submitRequest, isInventoryChecker }) {
  const { t } = useTranslation('pickerDetailPage');
  const [form] = useForm();
  const [isFormEditable, setIsFormEditable] = useState(false);
  const initialProps = { isInventoryChecker };

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      if (isEqual(values, initialProps)) {
        return false;
      }
      submitRequest({ isInventoryChecker: values.isInventoryChecker });
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
    form.setFieldsValue({ isInventoryChecker });
    setValues({ isInventoryChecker });
  }, [form, isInventoryChecker, setValues]);

  return (
    <Col span={24}>
      <Card title={t('IS_INVENTORY_CHECKER')}>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Row gutter={[16]} align="bottom">
            <Col span={24}>
              <Form.Item name="isInventoryChecker" label={t('IS_INVENTORY_CHECKER')} valuePropName="checked">

                <Switch
                  disabled={!isFormEditable}
                  checked={values.isInventoryChecker}
                  onChange={isChecked => {
                    setFieldValue('isInventoryChecker', isChecked);
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

IsInventoryChecker.propTypes = { submitRequest: PropTypes.func.isRequired };

export default IsInventoryChecker;
