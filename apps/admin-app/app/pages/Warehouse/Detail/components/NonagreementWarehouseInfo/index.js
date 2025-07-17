import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { get as lget, isEqual as lisEqual } from 'lodash';

import { defaultValues, validationSchema } from './formHelper';
import { SelectWrapper } from '@shared/components/UI/Form';
import Card from '@shared/components/UI/AntCard';
import Footer from '../Footer';
import { validate } from '@shared/yup';

const { useForm } = Form;

function NonagreementWarehouseInfo(props) {
  const {
    nonagreementWarehouse,
    nonagreementWarehouses,
    submitRequest,
  } = props;

  const { t } = useTranslation();
  const [form] = useForm();
  const [isFormEditable, setIsFormEditable] = useState(false);

  const initialProps = { nonagreementWarehouse };
  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      if (lisEqual(values, initialProps)) {
        return;
      }

      submitRequest(values);
      setIsFormEditable(false);
    },
    enableReinitialize: true,
  });

  const { handleSubmit, values, errors, touched, setFieldValue, setValues } = formik;

  const handleResetForm = () => {
    if (lisEqual(values, initialProps)) {
      return;
    }

    setValues(initialProps);
    form.setFieldsValue(initialProps);
  };

  const handleSelectChange = fieldName => {
    return selectedItems => {
      setFieldValue(fieldName, selectedItems);
    };
  };

  useEffect(() => {
    form.setFieldsValue({ nonagreementWarehouse });
    setValues({ nonagreementWarehouse }); // @TODO: Check if this line is needed
  }, [form, setValues, nonagreementWarehouse]);

  return (
    <Card title={t('warehousePage:NONAGREEMENT_WAREHOUSE_INFO')}>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Row gutter={[16]} align="bottom">
          <Col span={12}>
            <SelectWrapper
              selectKey="nonagreementWarehouse"
              label={t('warehousePage:NONAGREEMENT_WAREHOUSE')}
              value={values.nonagreementWarehouse}
              hasError={lget(errors, 'nonagreementWarehouse')}
              isTouched={lget(touched, 'nonagreementWarehouse')}
              optionsData={nonagreementWarehouses}
              optionLabelProp="name"
              optionValueProp="_id"
              onChangeCallback={handleSelectChange('nonagreementWarehouse')}
              disabled={!isFormEditable}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Footer
              disabled
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

NonagreementWarehouseInfo.propTypes = {
  nonagreementWarehouse: PropTypes.string,
  nonagreementWarehouses: PropTypes.array,
  // TODO: use arrayOf and provide more information instead. Props.shape([]) is not the correct usage to get rid of eslint rules.
  submitRequest: PropTypes.func,
};

// TODO: correct these default props
NonagreementWarehouseInfo.defaultProps = {
  nonagreementWarehouse: undefined,
  nonagreementWarehouses: undefined,
  submitRequest: undefined,
};

export default NonagreementWarehouseInfo;
