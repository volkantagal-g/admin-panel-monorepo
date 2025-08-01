import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import _ from 'lodash';

import Card from '@shared/components/UI/AntCard';
import { defaultValues, validationSchema } from './formHelper';
import Footer from '../Footer';
import { SelectWrapper } from '@shared/components/UI/Form';
import { validate } from '@shared/yup';

const { useForm } = Form;

function StoreConversionInfo(props) {
  const {
    supplier,
    suppliers,
    companyId,
    companies,
    submitRequest,
    isActivated,
    errorNotification,
  } = props;
  const { t } = useTranslation(['marketFranchisePage', 'global']);
  const [form] = useForm();
  const [isFormEditable, setIsFormEditable] = useState(false);

  const initialProps = { supplier, companyId };

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

  const { handleSubmit, values, errors, touched, setFieldValue, setValues } = formik;

  const canStoreConversionUpdate = () => {
    if (isActivated) {
      errorNotification({ message: t('ERR_SHOULD_BE_INACTIVE') });
      return false;
    }
    return true;
  };

  const handleSetIsFormEditable = visibility => {
    if (!canStoreConversionUpdate()) {
      return false;
    }
    return setIsFormEditable(visibility);
  };

  const handleSelectChange = fieldName => {
    return selectedItems => {
      setFieldValue(fieldName, selectedItems);
    };
  };

  const handleResetForm = () => {
    if (_.isEqual(values, initialProps)) {
      return false;
    }

    setValues(initialProps);
    form.setFieldsValue(initialProps);
    return true;
  };

  useEffect(() => {
    form.setFieldsValue({ supplier, companyId });
    setValues({ supplier, companyId });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, supplier, companyId]);

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Card title={t('STORE_CONVERSION_INFO')}>
        <Row gutter={[16]} align="bottom">
          <Col span={12}>
            <SelectWrapper
              selectKey="supplier"
              label={t('SUPPLIER')}
              value={values.supplier}
              hasError={_.get(errors, 'supplier')}
              isTouched={_.get(touched, 'supplier')}
              optionsData={suppliers}
              optionLabelProp="name"
              optionValueProp="_id"
              onChangeCallback={handleSelectChange('supplier')}
              disabled={!isFormEditable}
            />
          </Col>
          <Col span={12}>
            <SelectWrapper
              selectKey="companyId"
              label={t('COMPANIES')}
              value={values.companyId}
              hasError={_.get(errors, 'companyId')}
              isTouched={_.get(touched, 'companyId')}
              optionsData={companies}
              optionLabelProp="name"
              optionValueProp="_id"
              onChangeCallback={handleSelectChange('companyId')}
              disabled={!isFormEditable}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Footer
              formButtonVisibilty={isFormEditable}
              setFormButtonVisibilty={handleSetIsFormEditable}
              handleReset={handleResetForm}
            />
          </Col>
        </Row>
      </Card>
    </Form>
  );
}

StoreConversionInfo.propTypes = {
  suppliers: PropTypes.array,
  // TODO: use arrayOf and provide more information instead. Props.shape([]) is not the correct usage to get rid of eslint rules.
  supplier: PropTypes.string,
  companies: PropTypes.array,
  // TODO: use arrayOf and provide more information instead. Props.shape([]) is not the correct usage to get rid of eslint rules.
  companyId: PropTypes.string,
  submitRequest: PropTypes.func,
  errorNotification: PropTypes.func,
  isActivated: PropTypes.bool,
};

// TODO: correct these default props
StoreConversionInfo.defaultProps = {
  suppliers: undefined,
  supplier: undefined,
  companies: undefined,
  companyId: undefined,
  submitRequest: undefined,
  errorNotification: undefined,
  isActivated: undefined,
};

export default StoreConversionInfo;
