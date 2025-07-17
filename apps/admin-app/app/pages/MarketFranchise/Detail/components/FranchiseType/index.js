import { useEffect, useState } from 'react';
import { Form, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { get, isEqual } from 'lodash';

import Card from '@shared/components/UI/AntCard';
import {
  GETIR_MARKET_FRANCHISE_TYPE,
  MARKET_FRANCHISE_TYPES,
} from '@shared/shared/constants';
import { SelectWrapper } from '@shared/components/UI/Form';
import { validate } from '@shared/yup';
import { defaultValues, validationSchema } from './formHelper';
import Footer from '../Footer';

const { useForm } = Form;

const mapMarketFranchiseTypes = MARKET_FRANCHISE_TYPES.filter(franchiseType => {
  return franchiseType !== GETIR_MARKET_FRANCHISE_TYPE;
});

function FranchiseType(props) {
  const {
    franchiseType,
    submitRequest,
    isActivated,
    errorNotification,
  } = props;
  const { t } = useTranslation('marketFranchisePage');
  const [form] = useForm();
  const [isFormEditable, setIsFormEditable] = useState(false);

  const initialProps = { franchiseType };

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      if (isEqual(values, initialProps)) {
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

  const customLabelTranslation = path => {
    return label => {
      return t(`marketFranchisePage:${path}:${label}`);
    };
  };

  const handleResetForm = () => {
    if (isEqual(values, initialProps)) {
      return false;
    }

    setValues(initialProps);
    form.setFieldsValue(initialProps);
    return true;
  };

  useEffect(() => {
    form.setFieldsValue({ franchiseType });
    setValues({ franchiseType });
  }, [form, franchiseType, setValues]);

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Card title={t('FRANCHISE_TYPE')}>
        <Row gutter={[16]} align="bottom">
          <Col span={12}>
            <SelectWrapper
              selectKey="franchiseType"
              label={t('FRANCHISE_TYPE')}
              value={values.franchiseType}
              hasError={get(errors, 'franchiseType')}
              isTouched={get(touched, 'franchiseType')}
              optionsData={mapMarketFranchiseTypes}
              onChangeCallback={handleSelectChange('franchiseType')}
              labelTranslationCallback={customLabelTranslation('MARKET_FRANCHISE_TYPES')}
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

export default FranchiseType;
