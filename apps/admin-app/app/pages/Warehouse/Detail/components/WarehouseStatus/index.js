/* eslint-disable react/require-default-props */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import _ from 'lodash';

import Card from '@shared/components/UI/AntCard';
import { defaultValues, validationSchema } from './formHelper';
import { SelectWrapper } from '@shared/components/UI/Form';
import { WAREHOUSE_FREE_STATUS, WAREHOUSE_STATUS } from '@shared/shared/constants';
import { validate } from '@shared/yup';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

const { useForm } = Form;

function WarehouseStatus(props) {
  const {
    status,
    submitRequest,
    isWarehouseValid,
  } = props;
  const { t } = useTranslation();
  const { canAccess } = usePermission();

  const [form] = useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const initialProps = { status };

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      if (_.isEqual(values, initialProps)) {
        return false;
      }

      submitRequest(values);

      setIsModalVisible(false);
      return true;
    },
    enableReinitialize: true,
  });

  const { handleSubmit, values, errors, touched, setFieldValue, setValues, submitForm } = formik;

  const handleResetForm = () => {
    if (_.isEqual(values, initialProps)) {
      return false;
    }

    setValues(initialProps);
    form.setFieldsValue(initialProps);
    return true;
  };

  const isSelectedValueActive = selectedValue => {
    return selectedValue === WAREHOUSE_FREE_STATUS;
  };

  const handleSelectChange = fieldName => {
    return selectedItems => {
      if (isSelectedValueActive(selectedItems) && !isWarehouseValid()) {
        form.setFieldsValue({ ...initialProps });
        setValues({ ...initialProps });
        return;
      }

      if (selectedItems === values.status) {
        return;
      }
      setIsModalVisible(true);
      setFieldValue(fieldName, selectedItems);
    };
  };

  useEffect(() => {
    form.setFieldsValue({ status });
    setValues({ status });
  }, [form, setValues, status]);

  const customLabelTranslation = path => {
    return label => {
      return t(`${path}:${label}`);
    };
  };

  const handleOkButton = () => {
    submitForm();
    setIsModalVisible(false);
  };

  const handleCancelButton = () => {
    handleResetForm();
    setIsModalVisible(false);
  };

  return (
    <Card>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <SelectWrapper
          selectKey="status"
          label={t('STATUS')}
          disabled={!canAccess(permKey.PAGE_WAREHOUSE_DETAIL_EDIT_STATUS)}
          value={values.status}
          hasError={_.get(errors, 'status')}
          isTouched={_.get(touched, 'status')}
          optionsData={WAREHOUSE_STATUS}
          labelTranslationCallback={customLabelTranslation('global:WAREHOUSE_STATUS_TYPES')}
          onChangeCallback={handleSelectChange('status')}
        />
        <Modal
          title={t('warehousePage:CONFIRM_MODAL_TITLE')}
          visible={isModalVisible}
          onOk={handleOkButton}
          onCancel={handleCancelButton}
        />
      </Form>
    </Card>
  );
}

WarehouseStatus.propTypes = {
  status: PropTypes.number,
  submitRequest: PropTypes.func,
  isWarehouseValid: PropTypes.func,
};

export default WarehouseStatus;
