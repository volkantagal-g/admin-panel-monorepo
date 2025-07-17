import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { cloneDeep, get } from 'lodash';

import AntCard from '@shared/components/UI/AntCard';
import { SelectWrapper } from '@shared/components/UI/Form';
import { validate } from '@shared/yup';
import { Creators } from '../../redux/actions';
import { setAvailableVehicleTypesSelector } from '../../redux/selectors';
import Footer from '../CardFooter';
import { validationSchema } from './formHelper';
import { vehicleConstraintTypeOptions } from '../../utils';
import { VEHICLE_TYPE } from '@shared/shared/constants';

const AvailableVehicles = ({ data, isPending: isPendingGetCourierData, permKey }) => {
  const { t } = useTranslation('courierPage');
  const dispatch = useDispatch();

  const [isFormEditable, setIsFormEditable] = useState(false);
  const [newData, setNewData] = useState({});

  const isPending = useSelector(setAvailableVehicleTypesSelector.getIsPending);
  const isSuccess = useSelector(setAvailableVehicleTypesSelector.getIsSuccess);

  const [form] = Form.useForm();
  const formik = useFormik({
    initialValues: newData,
    enableReinitialize: true,
    validate: validate(validationSchema),
    onSubmit: formValues => {
      const { _id, availableVehicleTypes } = formValues;
      dispatch(Creators.setAvailableVehicleTypesRequest({ courierId: _id, availableVehicleTypes }));
    },
  });

  const { values, setFieldValue, setValues, resetForm, handleSubmit, errors, touched } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form]);

  useEffect(() => {
    if (isSuccess) setIsFormEditable(false);
  }, [isSuccess]);

  useEffect(() => {
    const newAvailableVehicleTypeList = data.availableVehicleTypes?.length ? data.availableVehicleTypes : Object.values(VEHICLE_TYPE);
    setNewData({ ...data, availableVehicleTypes: newAvailableVehicleTypeList });
  }, [data]);

  const handleFieldChange = fieldName => {
    return value => {
      setFieldValue(fieldName, value);
      form.setFields([{ name: fieldName, value }]);
    };
  };

  const handleFooterEditClick = () => {
    setIsFormEditable(true);
  };

  const handleFooterCancelClick = () => {
    const newValues = cloneDeep(newData);
    form.resetFields();
    resetForm();
    form.setFieldsValue(newValues);
    setValues(newValues);
    setIsFormEditable(false);
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <AntCard
        bordered={false}
        footer={(
          <Footer
            isPending={isPendingGetCourierData || isPending}
            isFormEditable={isFormEditable}
            permKey={permKey}
            handleSubmit={handleSubmit}
            handleEditClick={handleFooterEditClick}
            handleCancelClick={handleFooterCancelClick}
          />
        )}
        title={t('AVAILABLE_VEHICLE_TYPES')}
      >
        <Row gutter={[4, 4]}>
          <Col lg={24} xs={24}>
            <SelectWrapper
              selectKey="availableVehicleTypes"
              placeholder={t('AVAILABLE_VEHICLE_TYPES')}
              value={values.availableVehicleTypes}
              hasError={get(errors, 'availableVehicleTypes')}
              isTouched={get(touched, 'availableVehicleTypes')}
              onChangeCallback={handleFieldChange('availableVehicleTypes')}
              disabled={isPendingGetCourierData || isPending || !isFormEditable}
              mode="multiple"
              optionLabelProp="label"
              optionValueProp="value"
              optionsData={vehicleConstraintTypeOptions}
            />
          </Col>
        </Row>
      </AntCard>
    </Form>
  );
};

AvailableVehicles.defaultProps = {
  data: {},
  isPending: false,
  permKey: '',
};

AvailableVehicles.propTypes = {
  data: PropTypes.shape({}),
  isPending: PropTypes.bool,
  permKey: PropTypes.string,
};

export default AvailableVehicles;
