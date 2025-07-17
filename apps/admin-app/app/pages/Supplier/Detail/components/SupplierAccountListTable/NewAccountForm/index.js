import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from 'antd';
import { useFormik } from 'formik';
import _get from 'lodash/get';

import { defaultValues, validationSchema } from './formHelper';
import { validate } from '@shared/yup';
import { t } from '@shared/i18n';
import { getSupplierByIdSelector } from '../../../redux/selectors';
import { Creators } from '../../../redux/actions';

const NewAccountForm = ({ formInstance, handleModalVisibility }) => {
  const { _id: supplierId } = useSelector(getSupplierByIdSelector.getData) || [];
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: defaultValues,
    enableReinitialize: true,
    validate: validate(validationSchema),
    onSubmit: values => {
      dispatch(Creators.createSupplierAccountRequest({
        body: {
          id: supplierId,
          params: values,
        },
      }));
      handleModalVisibility(false);
    },
  });

  const { handleSubmit, handleChange, values, errors } = formik;

  useEffect(() => {
    formInstance.setFieldsValue(values);
  }, [values, formInstance]);

  return (
    <Form
      form={formInstance}
      layout="vertical"
      onFinish={handleSubmit}
    >
      <Form.Item
        label={t('supplierPage:ACCOUNT_NAME')}
        help={_get(errors, 'name')}
        validateStatus={_get(errors, 'name') ? 'error' : 'success'}
        name="name"
      >
        <Input
          value={values.name}
          onChange={handleChange}
          autoComplete="off"
        />
      </Form.Item>
      <Form.Item
        label={t('supplierPage:LOGO_ACCOUNT_CODE')}
        help={_get(errors, 'code')}
        validateStatus={_get(errors, 'code') ? 'error' : 'success'}
        name="code"
      >
        <Input
          value={values.code}
          onChange={handleChange}
          autoComplete="off"
        />
      </Form.Item>
      <Form.Item
        label={(t('supplierPage:DISTRIBUTION_CENTER_BONUS'))}
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
};

export default NewAccountForm;
