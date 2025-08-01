import { Form, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import _ from 'lodash';
import { useDispatch } from 'react-redux';

import Card from '@shared/components/UI/AntCard';
import { defaultValues, validationSchema } from './formHelper';
import Footer from '../Footer';
import {
  GETIR_MARKET_FRANCHISE_TYPE,
  MARKET_FRANCHISE_TYPES,
} from '@shared/shared/constants';
import { InputWrapper, SelectWrapper } from '@shared/components/UI/Form';
import { Creators } from '../../redux/actions';
import { validate } from '@shared/yup';

const { useForm } = Form;

const mapMarketFranchiseTypes = MARKET_FRANCHISE_TYPES.filter(franchiseType => {
  return franchiseType !== GETIR_MARKET_FRANCHISE_TYPE;
});

function FormWrapper() {
  const dispatch = useDispatch();
  const { t } = useTranslation(['marketFranchisePage', 'global']);
  const [form] = useForm();

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      dispatch(Creators.createMarketFranchiseRequest({ requestBody: values }));
    },
    enableReinitialize: true,
  });

  const { handleSubmit, handleChange, initialValues, values, errors, touched, setFieldValue } = formik;

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

  return (
    <Card title={t('FRANCHISE')} bordered={false} footer={<Footer />}>
      <Form
        id="new-franchise"
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        initialValues={initialValues}
      >
        <Row gutter={[16]} align="bottom">
          <Col span={12}>
            <SelectWrapper
              selectKey="franchiseType"
              label={t('FRANCHISE_TYPE')}
              value={values.franchiseType}
              hasError={_.get(errors, 'franchiseType')}
              isTouched={_.get(touched, 'franchiseType')}
              optionsData={mapMarketFranchiseTypes}
              onChangeCallback={handleSelectChange('franchiseType')}
              labelTranslationCallback={customLabelTranslation('MARKET_FRANCHISE_TYPES')}
            />
          </Col>
          <Col span={12}>
            <InputWrapper
              setDefaultValue={false}
              inputKey="name"
              label={t('global:NAME')}
              value={values.name}
              isTouched={_.get(touched, 'name')}
              hasError={_.get(errors, 'name')}
              handleChange={handleChange}
            />
          </Col>
        </Row>
        <Row gutter={[16]} align="bottom">
          <Col span={12}>
            <InputWrapper
              setDefaultValue={false}
              inputKey="taxOffice"
              label={t('TAX_OFFICE')}
              value={values.taxOffice}
              isTouched={_.get(touched, 'taxOffice')}
              hasError={_.get(errors, 'taxOffice')}
              handleChange={handleChange}
            />
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

export default FormWrapper;
