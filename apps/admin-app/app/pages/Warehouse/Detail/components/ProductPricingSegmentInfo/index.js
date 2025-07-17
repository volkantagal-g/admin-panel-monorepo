import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import _ from 'lodash';
import { useTheme } from 'react-jss';

import { validate } from '@shared/yup';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import Card from '@shared/components/UI/AntCard';
import { SelectWrapper } from '@shared/components/UI/Form';
import { defaultValues, validationSchema } from './formHelper';
import Footer from '../Footer';

const { useForm } = Form;

function ProductPricingSegmentInfo({
  productPricingSegmentId,
  segments,
  submitRequest,
}) {
  const theme = useTheme();
  const { t } = useTranslation('warehousePage');
  const { Can } = usePermission();
  const [form] = useForm();

  const [isFormEditable, setIsFormEditable] = useState(false);

  const initialProps = { productPricingSegmentId };

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      if (_.isEqual(values, initialProps)) {
        return false;
      }
      submitRequest({ segmentId: values.productPricingSegmentId });
      setIsFormEditable(false);
      return true;
    },
    enableReinitialize: true,
  });

  const { handleSubmit, values, errors, touched, setValues, setFieldValue } = formik;

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

  const handleSetIsFormEditable = visibility => {
    setIsFormEditable(visibility);
  };

  useEffect(() => {
    setValues({ productPricingSegmentId });
    form.setFieldsValue({ productPricingSegmentId });
  }, [form, setValues, productPricingSegmentId]);

  return (
    <Card title={t('PRODUCT_PRICING_SEGMENT_INFO')}>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Row gutter={[theme.spacing(3)]} align="bottom">
          <Col span={12}>
            <SelectWrapper
              selectKey="productPricingSegmentId"
              label={t('PRODUCT_PRICING_SEGMENT')}
              value={values.productPricingSegmentId}
              hasError={_.get(errors, 'productPricingSegmentId')}
              isTouched={_.get(touched, 'productPricingSegmentId')}
              optionsData={segments}
              optionLabelProp="name"
              optionValueProp="_id"
              onChangeCallback={handleSelectChange('productPricingSegmentId')}
              disabled={!isFormEditable}
            />
          </Col>
        </Row>
        <Can permKey={permKey.PAGE_WAREHOUSE_DETAIL_EDIT_PRODUCT_PRICING_SEGMENT}>
          <Row>
            <Col span={24}>
              <Footer
                formButtonVisibilty={isFormEditable}
                setFormButtonVisibilty={handleSetIsFormEditable}
                handleReset={handleResetForm}
              />
            </Col>
          </Row>
        </Can>
      </Form>
    </Card>
  );
}

ProductPricingSegmentInfo.propTypes = {
  productPricingSegmentId: PropTypes.string,
  segments: PropTypes.array,
  // TODO: use arrayOf and provide more information instead. Props.shape([]) is not the correct usage to get rid of eslint rules.
  submitRequest: PropTypes.func,
};

// TODO: correct these default props
ProductPricingSegmentInfo.defaultProps = {
  productPricingSegmentId: undefined,
  segments: undefined,
  submitRequest: undefined,
};

export default ProductPricingSegmentInfo;
