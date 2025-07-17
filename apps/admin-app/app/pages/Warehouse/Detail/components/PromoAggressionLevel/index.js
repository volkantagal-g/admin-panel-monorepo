import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import _ from 'lodash';

import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import { defaultValues, validationSchema } from './formHelper';
import { SelectWrapper } from '@shared/components/UI/Form';
import Card from '@shared/components/UI/AntCard';
import Footer from '../Footer';
import { validate } from '@shared/yup';
import { promoAggressionLevels } from '@shared/shared/constantValues';

const { useForm } = Form;

function PromoAggressionLevel(props) {
  const { promoAggressionLevel, submitRequest } = props;
  const { t } = useTranslation();
  const [form] = useForm();
  const [isFormEditable, setIsFormEditable] = useState(false);

  const initialProps = { promoAggressionLevel };

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      if (_.isEqual(values, initialProps)) {
        setIsFormEditable(false);
        return false;
      }
      setIsFormEditable(false);
      submitRequest(values);
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
    form.setFieldsValue({ promoAggressionLevel });
    setFieldValue('promoAggressionLevel', promoAggressionLevel);
  }, [form, setFieldValue, promoAggressionLevel]);

  return (
    <Card title={t('warehousePage:PROMO_AGGRESSION_LEVEL')}>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Row gutter={[16]} align="bottom">
          <Col span={12}>
            <SelectWrapper
              selectKey="promoAggressionLevel"
              label={t('warehousePage:PROMO_AGGRESSION_LEVEL')}
              value={values.promoAggressionLevel}
              isTouched={_.get(touched, 'promoAggressionLevel')}
              hasError={_.get(errors, 'promoAggressionLevel')}
              disabled={!isFormEditable}
              optionsData={convertConstantValuesToSelectOptions(promoAggressionLevels)}
              optionLabelProp="label"
              optionValueProp="value"
              onChangeCallback={value => setFieldValue('promoAggressionLevel', value)}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Footer formButtonVisibilty={isFormEditable} setFormButtonVisibilty={setIsFormEditable} handleReset={handleResetForm} />
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

PromoAggressionLevel.propTypes = {
  promoAggressionLevel: PropTypes.number,
  submitRequest: PropTypes.func,
};

export default PromoAggressionLevel;
