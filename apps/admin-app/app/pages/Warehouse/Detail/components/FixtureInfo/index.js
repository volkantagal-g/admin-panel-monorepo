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

function FixtureInfo(props) {
  const {
    ovenCount,
    submitRequest,
  } = props;
  const { t } = useTranslation();
  const [form] = useForm();
  const [isFormEditable, setIsFormEditable] = useState(false);

  const initialProps = { ovenCount };

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      if (_.isEqual(values, initialProps)) {
        return false;
      }

      submitRequest({ fixture: values });

      setIsFormEditable(false);
      return true;
    },
    enableReinitialize: true,
  });

  const { handleSubmit, setFieldValue, values, errors, touched, setValues } = formik;

  const handleResetForm = () => {
    if (_.isEqual(values, initialProps)) {
      return false;
    }

    setValues(initialProps);
    form.setFieldsValue(initialProps);
    return true;
  };

  useEffect(() => {
    form.setFieldsValue({ ovenCount });
    setValues({ ovenCount });
  }, [form, setValues, ovenCount]);

  return (
    <Card>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Row gutter={[16]} align="bottom">
          <Col span={12}>
            <InputWrapper
              inputKey="ovenCount"
              label={t('warehousePage:OVEN_COUNT')}
              value={values.ovenCount}
              isTouched={_.get(touched, 'ovenCount')}
              hasError={_.get(errors, 'ovenCount')}
              setFieldValue={setFieldValue}
              disabled={!isFormEditable}
              mode="number"
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
  );
}

FixtureInfo.propTypes = {
  ovenCount: PropTypes.oneOfType(PropTypes.number, PropTypes.string),
  submitRequest: PropTypes.func,
};

// TODO: correct these default props
FixtureInfo.defaultProps = {
  ovenCount: undefined,
  submitRequest: undefined,
};

export default FixtureInfo;
