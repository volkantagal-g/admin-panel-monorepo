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

function DeliveryFeeSegmentInfo({
  deliveryFeeSegmentId,
  segments,
  submitRequest,
}) {
  const theme = useTheme();
  const { t } = useTranslation('warehousePage');
  const { Can } = usePermission();
  const [form] = useForm();

  const [isFormEditable, setIsFormEditable] = useState(false);

  const initialProps = { deliveryFeeSegmentId };

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      if (_.isEqual(values, initialProps)) {
        return false;
      }
      submitRequest({ segmentId: values.deliveryFeeSegmentId });
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
    setValues({ deliveryFeeSegmentId });
    form.setFieldsValue({ deliveryFeeSegmentId });
  }, [form, setValues, deliveryFeeSegmentId]);

  return (
    <Card title={t('DELIVERY_FEE_SEGMENT_INFO')}>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Row gutter={[theme.spacing(3)]} align="bottom">
          <Col span={12}>
            <SelectWrapper
              selectKey="deliveryFeeSegmentId"
              label={t('DELIVERY_FEE_SEGMENT')}
              value={values.deliveryFeeSegmentId}
              hasError={_.get(errors, 'deliveryFeeSegmentId')}
              isTouched={_.get(touched, 'deliveryFeeSegmentId')}
              optionsData={segments}
              optionLabelProp="name"
              optionValueProp="_id"
              onChangeCallback={handleSelectChange('deliveryFeeSegmentId')}
              disabled={!isFormEditable}
            />
          </Col>
        </Row>
        <Can permKey={permKey.PAGE_WAREHOUSE_DETAIL_EDIT_DELIVERY_FEE_SEGMENT}>
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

DeliveryFeeSegmentInfo.propTypes = {
  deliveryFeeSegmentId: PropTypes.string,
  segments: PropTypes.array,
  // TODO: use arrayOf and provide more information instead. Props.shape([]) is not the correct usage to get rid of eslint rules.
  submitRequest: PropTypes.func,
};

// TODO: correct these default props
DeliveryFeeSegmentInfo.defaultProps = {
  deliveryFeeSegmentId: undefined,
  segments: undefined,
  submitRequest: undefined,
};

export default DeliveryFeeSegmentInfo;
