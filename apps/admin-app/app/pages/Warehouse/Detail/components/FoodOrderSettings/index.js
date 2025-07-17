import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import _ from 'lodash';

import { defaultValues, validationSchema } from './formHelper';
import { InputWrapper } from '@shared/components/UI/Form';
import Card from '@shared/components/UI/AntCard';
import Footer from '../Footer';
import { validate } from '@shared/yup';

const { useForm } = Form;

function FoodOrderSettings(props) {
  const {
    distanceLimit,
    durationLimit,
    submitRequest,
  } = props;
  const { t } = useTranslation();
  const [form] = useForm();
  const [isFormEditable, setIsFormEditable] = useState(false);

  const initialProps = { distanceLimit, durationLimit };

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      if (_.isEqual(values, initialProps)) {
        return false;
      }

      submitRequest({ foodOrder: values });

      setIsFormEditable(false);
      return true;
    },
    enableReinitialize: true,
  });

  const handleResetForm = () => {
    if (_.isEqual(values, initialProps)) {
      return false;
    }

    setValues(initialProps);
    form.setFieldsValue(initialProps);
    return false;
  };

  const { handleSubmit, setFieldValue, values, errors, touched, setValues } = formik;

  useEffect(() => {
    form.setFieldsValue({ distanceLimit, durationLimit });
    setValues({ distanceLimit, durationLimit });
  }, [form, setValues, distanceLimit, durationLimit]);

  return (
    <>
      <Card title={t('warehousePage:FOOD_LOCALS_ORDER_SETTINGS')}>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Row gutter={[16]} align="bottom">
            <Col span={12}>
              <InputWrapper
                inputKey="distanceLimit"
                label={t('warehousePage:DISTANCE_LIMIT')}
                value={values.distanceLimit}
                isTouched={_.get(touched, 'distanceLimit')}
                hasError={_.get(errors, 'distanceLimit')}
                setFieldValue={setFieldValue}
                mode="number"
                disabled={!isFormEditable}
              />
            </Col>
            <Col span={12}>
              <InputWrapper
                inputKey="durationLimit"
                label={t('warehousePage:DURATION_LIMIT')}
                value={values.durationLimit}
                isTouched={_.get(touched, 'durationLimit')}
                hasError={_.get(errors, 'durationLimit')}
                setFieldValue={setFieldValue}
                mode="number"
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
        </Form>
      </Card>
    </>
  );
}

FoodOrderSettings.propTypes = {
  distanceLimit: PropTypes.number,
  durationLimit: PropTypes.number,
  submitRequest: PropTypes.func,
};

export default FoodOrderSettings;
