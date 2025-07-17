import { useEffect } from 'react';
import _get from 'lodash/get';
import { Form, Input } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { getInitialValues, validationSchema } from './formHelper';
import { validate } from '@shared/yup';
import { getSupplierByIdSelector } from '../../../redux/selectors';
import { Creators } from '../../../redux/actions';

function EditableCellForm(props) {
  const { formInstance, _id, supplierAccount, setEditableRow } = props;
  const { _id: supplierId } =
    useSelector(getSupplierByIdSelector.getData);
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues: getInitialValues(supplierAccount),
    onSubmit: values => {
      dispatch(
        Creators.updateDCBonusForLogoAccountRequest({
          id: supplierId,
          updateData: { ...supplierAccount, ...values },
        }),
      );
      setEditableRow(false);
    },
  });

  const { handleSubmit, handleChange, values, errors } = formik;

  useEffect(() => {
    formInstance.setFieldsValue(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return (
    <Form
      form={formInstance}
      id={_id}
      onFinish={handleSubmit}
      layout="vertical"
    >
      <Form.Item
        help={_get(errors, 'dcBonus')}
        validateStatus={_get(errors, 'dcBonus') ? 'error' : 'success'}
        name="dcBonus"
        className="mb-0"
      >
        <Input
          type="number"
          value={values.dcBonus}
          onChange={handleChange}
          autoComplete="off"
        />
      </Form.Item>
    </Form>
  );
}

export default EditableCellForm;
