import { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import _ from 'lodash';

import { defaultValues, validationSchema } from './formHelper';
import { InputWrapper } from '@shared/components/UI/Form';
import { validate } from '@shared/yup';

const { useForm } = Form;

function Cell(props) {
  const {
    selfCode,
    submitRequest,
  } = props;
  const { t } = useTranslation("warehousePage");
  const [form] = useForm();

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      submitRequest(values);
    },
    enableReinitialize: true,
  });

  const { handleSubmit, handleChange, values, errors, touched, setValues } = formik;

  useState(() => {
    form.setFieldsValue({ selfCode });
    setValues({ selfCode });
  }, [selfCode]);

  return (
    <>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Row gutter={[16]} align="bottom">
          <Col span={12}>
            <InputWrapper
              inputKey="selfCode"
              label={t("LOCATION_CODE_CELL")}
              value={values.selfCode}
              isTouched={_.get(touched, 'selfCode')}
              hasError={_.get(errors, 'selfCode')}
              handleChange={handleChange}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              type="primary"
              htmlType="submit"
            >
              {t("button:SAVE")}
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

Cell.propTypes = {
  selfCode: PropTypes.string,
  submitRequest: PropTypes.func,
};

export default Cell;
