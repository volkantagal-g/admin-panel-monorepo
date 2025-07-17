import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { isEqual as lisEqual, get as lget } from 'lodash';
import moment from 'moment';

import { defaultValues, validationSchema } from './formHelper';
import { InputWrapper, DatePickerWrapper } from '@shared/components/UI/Form';
import Card from '@shared/components/UI/AntCard';
import Footer from '../Footer';
import { GETIR_VOYAGER_DOMAIN_TYPE } from '@shared/shared/constants';
import { validate } from '@shared/yup';
import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';

const { useForm } = Form;

const getRentStartDateValueFromRentStartDate = rentStartDate => {
  return rentStartDate ? moment(rentStartDate) : null;
};

function BudgetInfo(props) {
  const {
    indexValue,
    rentAmount,
    stoppage,
    carPark,
    dues,
    rentStartDate,
    kmCoefficient,
    fuelCoefficient,
    submitRequest,
    domainTypes,
    hasSAPReferenceCode,
  } = props;
  const { t } = useTranslation();
  const [form] = useForm();
  const [isFormEditable, setIsFormEditable] = useState(false);
  const { canAccess } = usePermission();

  const CAN_SHOW_FOOTER = hasSAPReferenceCode && canAccess(permKey.PAGE_WAREHOUSE_DETAIL_COMPONENT_EDIT_BUDGET_INFO);

  const initialProps = { indexValue, rentAmount, stoppage, rentStartDate, dues, carPark };
  const rentStartDateValue = getRentStartDateValueFromRentStartDate(rentStartDate);

  // GetirWater Fields
  const showExtraFields = domainTypes.includes(GETIR_VOYAGER_DOMAIN_TYPE);

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(() => validationSchema(t)),
    onSubmit: values => {
      const rentStartDateCurrentValue = form.getFieldValue('rentStartDate');
      const rentStartDateString = rentStartDateCurrentValue ? rentStartDateCurrentValue.toISOString() : null;
      const updatedData = { ...values, rentStartDate: rentStartDateString };

      if (lisEqual(updatedData, initialProps)) {
        return false;
      }

      if (showExtraFields) {
        submitRequest(updatedData);
      }
      else {
        const { kmCoefficient: _, fuelCoefficient: __, ...newBudgetData } = updatedData;
        submitRequest(newBudgetData);
      }
      setIsFormEditable(false);
      return true;
    },
    enableReinitialize: true,
  });

  const { handleSubmit, setFieldValue, values, errors, touched, setValues } = formik;

  const handleResetForm = () => {
    const formData = form.getFieldValue();
    if (lisEqual(formData, initialProps)) {
      return false;
    }

    setValues({ ...initialProps, rentStartDate: rentStartDateValue });
    form.setFieldsValue({ ...initialProps, rentStartDate: rentStartDateValue });
    return true;
  };

  useEffect(() => {
    form.setFieldsValue({
      indexValue,
      rentAmount,
      stoppage,
      dues,
      carPark,
      kmCoefficient,
      rentStartDate: getRentStartDateValueFromRentStartDate(rentStartDate),
      fuelCoefficient,
    });
    setValues({
      indexValue,
      rentAmount,
      stoppage,
      dues,
      carPark,
      kmCoefficient,
      rentStartDate: getRentStartDateValueFromRentStartDate(rentStartDate),
      fuelCoefficient,
    });
  }, [form, setValues, indexValue, rentAmount, stoppage, dues, carPark, rentStartDate, kmCoefficient, fuelCoefficient]);

  return (
    <Card title={t('warehousePage:BUDGET_INFO')}>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Row gutter={[16]} align="bottom">
          <Col span={12}>
            <InputWrapper
              inputKey="rentAmount"
              label={t('warehousePage:WAREHOUSE_RENT')}
              value={values.rentAmount}
              isTouched={lget(touched, 'rentAmount')}
              hasError={lget(errors, 'rentAmount')}
              setFieldValue={setFieldValue}
              disabled={!isFormEditable}
              mode="number"
            />
          </Col>
          <Col span={12}>
            <InputWrapper
              inputKey="stoppage"
              label={t('warehousePage:STOPPAGE')}
              value={values.stoppage}
              isTouched={lget(touched, 'stoppage')}
              hasError={lget(errors, 'stoppage')}
              setFieldValue={setFieldValue}
              disabled={!isFormEditable}
              mode="number"
            />
          </Col>
          <Col span={12}>
            <InputWrapper
              inputKey="dues"
              label={t('warehousePage:DUES')}
              value={lget(values, 'dues')}
              isTouched={lget(touched, 'dues')}
              hasError={lget(errors, 'dues')}
              setFieldValue={setFieldValue}
              disabled={!isFormEditable}
              mode="number"
            />
          </Col>
          <Col span={12}>
            <InputWrapper
              inputKey="carPark"
              label={t('warehousePage:CAR_PARK')}
              value={lget(values, 'carPark')}
              isTouched={lget(touched, 'carPark')}
              hasError={lget(errors, 'carPark')}
              setFieldValue={setFieldValue}
              disabled={!isFormEditable}
              mode="number"
            />
          </Col>
          <Col span={12}>
            <InputWrapper
              inputKey="indexValue"
              label={t('warehousePage:INDEX')}
              value={values.indexValue}
              isTouched={lget(touched, 'indexValue')}
              hasError={lget(errors, 'indexValue')}
              setFieldValue={setFieldValue}
              disabled={!isFormEditable}
              mode="number"
            />
          </Col>
          {showExtraFields && (
            <>
              <Col span={12}>
                <InputWrapper
                  inputKey="fuelCoefficient"
                  label={t('warehousePage:FUEL_COEFFICIENT')}
                  value={values.fuelCoefficient}
                  isTouched={lget(touched, 'fuelCoefficient')}
                  hasError={lget(errors, 'fuelCoefficient')}
                  setFieldValue={setFieldValue}
                  disabled={!isFormEditable}
                  mode="number"
                />
              </Col>
              <Col span={12}>
                <InputWrapper
                  inputKey="kmCoefficient"
                  label={t('warehousePage:KM_COEFFICIENT')}
                  value={values.kmCoefficient}
                  isTouched={lget(touched, 'kmCoefficient')}
                  hasError={lget(errors, 'kmCoefficient')}
                  setFieldValue={setFieldValue}
                  disabled={!isFormEditable}
                  mode="number"
                />
              </Col>
            </>
          )}
          <Col span={12}>
            <DatePickerWrapper
              selectKey="rentStartDate"
              label={t('warehousePage:RENT_START_DATE')}
              value={rentStartDate ? moment(rentStartDate) : null}
              hasError={lget(errors, 'rentStartDate')}
              isTouched={lget(touched, 'rentStartDate')}
              disabled={!isFormEditable}
              onChangeCallback={value => {
                form.setFieldsValue({ rentStartDate: value });
                setFieldValue('rentStartDate', value);
              }}
            />
          </Col>
        </Row>
        {CAN_SHOW_FOOTER && (
          <Row>
            <Col span={24}>
              <Footer formButtonVisibilty={isFormEditable} setFormButtonVisibilty={setIsFormEditable} handleReset={handleResetForm} />
            </Col>
          </Row>
        )}
      </Form>
    </Card>
  );
}

BudgetInfo.propTypes = {
  indexValue: PropTypes.number,
  rentAmount: PropTypes.number,
  stoppage: PropTypes.number,
  dues: PropTypes.number,
  carPark: PropTypes.number,
  fuelCoefficient: PropTypes.number, // for GetirWater
  kmCoefficient: PropTypes.number, // for GetirWater
  submitRequest: PropTypes.func,
  domainTypes: PropTypes.arrayOf(PropTypes.number),
};

// TODO: correct these default props
BudgetInfo.defaultProps = {
  indexValue: undefined,
  rentAmount: undefined,
  stoppage: undefined,
  dues: undefined,
  carPark: undefined,
  fuelCoefficient: undefined,
  kmCoefficient: undefined,
  submitRequest: undefined,
  domainTypes: [],
};

export default BudgetInfo;
