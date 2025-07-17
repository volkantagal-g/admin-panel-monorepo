import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import _ from 'lodash';

import { defaultValues, validationSchema } from './formHelper';
import { SelectWrapper } from '@shared/components/UI/Form';
import Card from '@shared/components/UI/AntCard';
import Footer from '../Footer';
import { COUNTRY_IDS, GETIR_GORILLAS_DOMAIN_TYPE, WAREHOUSE_ACTIVE_STATE } from '@shared/shared/constants';
import { validate } from '@shared/yup';
import { GETIR_WAREHOUSE_DOMAIN_TYPE_CODES } from '@app/pages/Warehouse/constants';

const { useForm } = Form;

function DomainTypes(props) {
  const {
    domainTypes,
    submitRequest,
    warehouseState,
    errorNotification,
    franchise,
    addressInfo,
  } = props;
  const { t } = useTranslation(['global', 'warehousePage']);
  const [form] = useForm();
  const [isFormEditable, setIsFormEditable] = useState(false);

  const initialProps = { domainTypes };

  const canDomainTypeChange = () => {
    if (warehouseState === WAREHOUSE_ACTIVE_STATE) {
      errorNotification({ message: t('warehousePage:ERR_SHOULD_BE_INACTIVE') });
      return false;
    }
    // TODO: Uncomment when SAP Integration is completed.
    if (!_.isEmpty(franchise)) {
      // errorNotification({ message: t('warehousePage:ERR_FRANCHISE_SHOULD_BE_EMPTY') });
      // return false;
    }
    return true;
  };

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      if (!canDomainTypeChange()) {
        return false;
      }

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

  const handleSetIsFormEditable = visibility => {
    if (!canDomainTypeChange()) {
      return false;
    }
    setIsFormEditable(visibility);
    return true;
  };

  const handleResetForm = () => {
    if (_.isEqual(values, initialProps)) {
      return false;
    }

    setValues(initialProps);
    form.setFieldsValue(initialProps);
    return true;
  };

  const handleSelectChange = fieldName => {
    return selectedItems => {
      setFieldValue(fieldName, selectedItems);
    };
  };

  useEffect(() => {
    form.setFieldsValue({ domainTypes });
    setValues({ domainTypes });
  }, [form, setValues, domainTypes]);

  const customLabelTranslation = path => {
    return label => {
      return t(`${path}:${label}`);
    };
  };

  const filteredDomainTypes = GETIR_WAREHOUSE_DOMAIN_TYPE_CODES.filter(type => {
    if (addressInfo.country === COUNTRY_IDS.TR && type === GETIR_GORILLAS_DOMAIN_TYPE) {
      return false;
    }
    return true;
  });

  return (
    <Card title={t('DOMAIN_TYPE')}>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Row gutter={[16]} align="bottom">
          <Col span={12}>
            <SelectWrapper
              selectKey="domainTypes"
              label={t('DOMAIN_TYPE')}
              value={values.domainTypes}
              hasError={_.get(errors, 'domainTypes')}
              isTouched={_.get(touched, 'domainTypes')}
              optionsData={filteredDomainTypes}
              labelTranslationCallback={customLabelTranslation('global:GETIR_MARKET_DOMAIN_TYPES')}
              onChangeCallback={handleSelectChange('domainTypes')}
              mode="multiple"
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
      </Form>
    </Card>
  );
}

DomainTypes.propTypes = {
  domainTypes: PropTypes.arrayOf(PropTypes.number),
  submitRequest: PropTypes.func,
  warehouseState: PropTypes.number,
  errorNotification: PropTypes.func,
  franchise: PropTypes.string,
};

DomainTypes.defaultProps = {
  domainTypes: [],
  submitRequest: () => { },
  warehouseState: undefined,
  errorNotification: () => { },
  franchise: undefined,
};

export default DomainTypes;
