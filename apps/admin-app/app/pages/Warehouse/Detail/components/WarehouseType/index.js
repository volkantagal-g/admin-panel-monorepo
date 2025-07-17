import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import _ from 'lodash';

import { defaultValues, validationSchema } from './formHelper';
import { SelectWrapper } from '@shared/components/UI/Form';
import Card from '@shared/components/UI/AntCard';
import Footer from '../Footer';
import {
  REGULAR_MARKET_FRANCHISE_TYPE,
  STORE_CONVERSION_MARKET_FRANCHISE_TYPE,
  STORE_CONVERSION_WAREHOUSE_TYPE,
  WAREHOUSE_ACTIVE_STATE,
  WAREHOUSE_TYPES,
  NONAGREEMENT_WAREHOUSE_TYPE,
} from '@shared/shared/constants';
import { validate } from '@shared/yup';

const { useForm } = Form;

function WarehouseType(props) {
  const { warehouseType, submitRequest, errorNotification, franchise, franchises, warehouseState, isAllowedForNegativeStock, hasSAPReferenceCode } = props;
  const { t } = useTranslation(['warehousePage', 'global']);
  const [form] = useForm();
  const [isFormEditable, setIsFormEditable] = useState(false);

  const initialProps = { warehouseType, isAllowedForNegativeStock };
  const canEdit = !hasSAPReferenceCode;

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

  const handleResetForm = () => {
    if (_.isEqual(values, initialProps)) {
      return false;
    }

    setValues(initialProps);
    form.setFieldsValue(initialProps);
    return true;
  };

  // @TODO warehouseType change check if SC and franchise status

  useEffect(() => {
    form.setFieldsValue({ warehouseType, isAllowedForNegativeStock });
    setValues({ warehouseType, isAllowedForNegativeStock });
  }, [form, setValues, warehouseType, isAllowedForNegativeStock]);

  const customLabelTranslation = path => {
    return label => {
      return t(`${path}:${label}`);
    };
  };

  const checkIsFranchiseTypeStoreConversion = () => {
    const targetFranchise = franchises.find(item => {
      return item._id === franchise;
    });

    return _.get(targetFranchise, 'franchiseType') === STORE_CONVERSION_MARKET_FRANCHISE_TYPE;
  };

  const checkIsFranchiseTypeRegular = () => {
    const targetFranchise = franchises.find(item => {
      return item._id === franchise;
    });

    return _.get(targetFranchise, 'franchiseType') === REGULAR_MARKET_FRANCHISE_TYPE;
  };

  const canWarehouseTypeChange = selectedType => {
    if (selectedType !== STORE_CONVERSION_WAREHOUSE_TYPE && franchise && checkIsFranchiseTypeStoreConversion()) {
      errorNotification({ message: t('ERR_FRANCHISE_CANT_BE_STORE_CONVERSION') });
      return false;
    }
    if (selectedType === STORE_CONVERSION_WAREHOUSE_TYPE && franchise && checkIsFranchiseTypeRegular()) {
      errorNotification({ message: t('ERR_FRANCHISE_SHOULD_STORE_CONVERSION') });
      return false;
    }
    return true;
  };

  const handleSelectChange = fieldName => {
    return selectedItems => {
      let selectedFieldValue = selectedItems;
      if (!canWarehouseTypeChange(selectedItems)) {
        selectedFieldValue = warehouseType;
      }
      const isAllowedForNegativeStockChecked =
        selectedFieldValue === NONAGREEMENT_WAREHOUSE_TYPE && !isAllowedForNegativeStock ? false : isAllowedForNegativeStock;
      form.setFieldsValue({ warehouseType: selectedFieldValue, isAllowedForNegativeStock: isAllowedForNegativeStockChecked });
      setFieldValue(fieldName, selectedFieldValue);
      setFieldValue('isAllowedForNegativeStock', isAllowedForNegativeStockChecked);
    };
  };

  const canFranchiseRemove = () => {
    if (warehouseState === WAREHOUSE_ACTIVE_STATE) {
      errorNotification({ message: t('ERR_SHOULD_BE_INACTIVE') });
      return false;
    }
    return true;
  };

  const handleSetIsFormEditable = visibility => {
    if (!canFranchiseRemove()) {
      return false;
    }
    setIsFormEditable(visibility);
    return true;
  };

  return (
    <Card title={t('WAREHOUSE_TYPE')}>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Row gutter={[16]} align="bottom">
          <Col span={12}>
            <SelectWrapper
              selectKey="warehouseType"
              label={t('WAREHOUSE_TYPE')}
              value={values.warehouseType}
              hasError={_.get(errors, 'warehouseType')}
              isTouched={_.get(touched, 'warehouseType')}
              optionsData={WAREHOUSE_TYPES}
              labelTranslationCallback={customLabelTranslation('global:WAREHOUSE_TYPES')}
              onChangeCallback={handleSelectChange('warehouseType')}
              disabled={!isFormEditable}
            />
          </Col>
        </Row>

        {values.warehouseType === NONAGREEMENT_WAREHOUSE_TYPE && (
          <Row gutter={[16]} align="bottom">
            <Col span={12}>
              <Form.Item name="isAllowedForNegativeStock" label={t('ALLOW_FOR_NEGATIVE_STOCK')}>
                <Checkbox
                  checked={values.isAllowedForNegativeStock}
                  disabled={!isFormEditable}
                  onChange={event => {
                    const newIsAllowedForNegativeStock = _.get(event, 'target.checked', false);
                    setFieldValue('isAllowedForNegativeStock', newIsAllowedForNegativeStock);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        )}

        {canEdit ? (
          <Row>
            <Col span={24}>
              <Footer formButtonVisibilty={isFormEditable} setFormButtonVisibilty={handleSetIsFormEditable} handleReset={handleResetForm} />
            </Col>
          </Row>
        ) : undefined}
      </Form>
    </Card>
  );
}

WarehouseType.propTypes = {
  warehouseType: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  submitRequest: PropTypes.func,
  franchise: PropTypes.string,
  franchises: PropTypes.array,
  // TODO: use arrayOf and provide more information instead. Props.shape([]) is not the correct usage to get rid of eslint rules.
  errorNotification: PropTypes.func,
  warehouseState: PropTypes.number,
};

// TODO: add default props for these optional defined props
WarehouseType.defaultProps = {
  warehouseType: undefined,
  submitRequest: undefined,
  franchise: undefined,
  franchises: undefined,
  errorNotification: undefined,
  warehouseState: undefined,
};

export default WarehouseType;
