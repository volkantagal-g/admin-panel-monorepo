import { Col, Form, Modal, Row } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { useForm } from 'antd/lib/form/Form';

import moment from 'moment';

import { useSelector } from 'react-redux';

import { useEffect, useState } from 'react';

import { flushSync } from 'react-dom';

import { defaultPreparationValues, validationPreparationSchema } from './formHelper';
import { DatePickerWrapper, SelectWrapper } from '@shared/components/UI/Form';
import { validate } from '@shared/yup';
import { warehouseSelector } from '../../redux/selectors';
import { getLangKey } from '@shared/i18n';
import ValidationModal from './ValidationModal';

export default function ShipmentPreparationModal({ isModalVisible, closeModal, submitRequest, data }) {
  const { t } = useTranslation();
  const [isValidationModalVisible, setIsValidationModalVisible] = useState(false);
  const [form] = useForm();
  const formik = useFormik({
    initialValues: defaultPreparationValues,
    validate: validate(validationPreparationSchema),
    onSubmit: values => {
      if (_.isEqual(values, defaultPreparationValues)) {
        return;
      }
      setIsValidationModalVisible(true);
    },
    enableReinitialize: true,
  });
  const preparationCodes = useSelector(warehouseSelector.getShipmentPreparations);
  const disabledDate = current => {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  };

  const { handleSubmit, values, errors, touched, setFieldValue, setValues, resetForm } = formik;

  useEffect(() => {
    resetForm();
    if (data) {
      const latestData = {
        from: data.from,
        code: data.code,
      };
      setValues(latestData);
    }
    else {
      setValues(defaultPreparationValues);
    }
  }, [data, resetForm, setValues]);

  useEffect(() => {
    form.setFieldsValue({
      code: values.code,
      from: moment(values.from),
    });
  }, [form, values]);

  const handleDateChange = value => {
    setFieldValue('from', value.toISOString());
  };
  const handleSelectChange = fieldName => {
    return selectedItems => {
      setFieldValue(fieldName, selectedItems);
    };
  };

  const sendRequest = async () => {
    await flushSync(() => {
      setIsValidationModalVisible(false);
    });
    submitRequest(values);
    closeModal();
  };

  return (
    <Modal
      title={t('warehousePage:SHIPPING_PREPARATION')}
      centered
      visible={isModalVisible}
      okText={t('global:UPLOAD')}
      onOk={handleSubmit}
      onCancel={closeModal}
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Row gutter={[16]} align="bottom">
          <Col span={12}>
            <SelectWrapper
              selectKey="code"
              label={t('warehousePage:PREPARATION')}
              value={values.code}
              hasError={_.get(errors, 'code')}
              isTouched={_.get(touched, 'code')}
              optionsData={preparationCodes}
              optionLabelProp={`description.${getLangKey()}`}
              optionValueProp="code"
              onChangeCallback={handleSelectChange('code')}
            />
          </Col>
          <Col span={12}>
            <DatePickerWrapper
              disabledDate={disabledDate}
              selectKey="from"
              label={t('global:DATE_FROM')}
              value={values.from ? moment(values.from) : null}
              hasError={_.get(errors, 'from')}
              isTouched={_.get(touched, 'from')}
              onChangeCallback={handleDateChange}
            />
          </Col>
        </Row>
      </Form>
      <ValidationModal
        isModalVisible={isValidationModalVisible}
        closeModal={() => setIsValidationModalVisible(false)}
        onValidate={sendRequest}
      />
    </Modal>
  );
}
