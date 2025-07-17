import { useEffect } from 'react';
import { get } from 'lodash';
import { Form, InputNumber } from 'antd';
import { useFormik } from 'formik';

import { validationSchema } from './formHelper';
import { getYupErrorPath, validate } from '@shared/yup';

const EditableCellForm = props =>  {
  const {
    formInstance,
    fieldKey,
    initialValue,
    onInputChange,
  } = props;

  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema, { fieldKey }),
    initialValues: { [fieldKey]: initialValue },
  });

  const { handleSubmit, setFieldValue, values, errors } = formik;

  useEffect(() => {
    formInstance.setFieldsValue(values);
  }, [values]);

  const errorPath = getYupErrorPath([fieldKey]);

  useEffect(() => {
    onInputChange(fieldKey, values?.[fieldKey], errors);
  }, [values?.[fieldKey], errors]);

  return (
    <Form form={formInstance} id={fieldKey} onFinish={handleSubmit} layout="vertical">
      <Form.Item
        help={get(errors, errorPath)}
        validateStatus={get(errors, errorPath) ? 'error' : 'success'}
        name={fieldKey}
        className="mb-0"
      >
        <InputNumber
          min={1}
          value={values?.[fieldKey]}
          onChange={value => setFieldValue(fieldKey, value)}
        />
      </Form.Item>
    </Form>
  );
};

export default EditableCellForm;
