import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Col, Modal, Switch } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import _ from 'lodash';

import Card from '@shared/components/UI/AntCard';
import { defaultValues, validationSchema } from './formHelper';
import { STORE_CONVERSION_MARKET_FRANCHISE_TYPE } from '@shared/shared/constants';
import { validate } from '@shared/yup';

const { useForm, Item } = Form;

function FranchiseStatus(props) {
  const {
    isActivated,
    submitRequest,
    supplier,
    franchiseType,
    errorNotification,
    taxOffice,
    taxNumber,
  } = props;
  const { t } = useTranslation(['marketFranchisePage']);
  const [form] = useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const initialProps = { isActivated };

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

  const { handleSubmit, values, touched, errors, setFieldValue, setValues, submitForm } = formik;

  const handleResetForm = () => {
    if (_.isEqual(values, initialProps)) {
      return false;
    }

    setValues(initialProps);
    form.setFieldsValue(initialProps);
    return true;
  };

  useEffect(() => {
    form.setFieldsValue({ isActivated });
    setValues({ isActivated });
  }, [form, setValues, isActivated]);

  const handleOkButton = () => {
    submitForm();
    setIsModalVisible(false);
  };

  const handleCancelButton = () => {
    handleResetForm();
    setIsModalVisible(false);
  };

  const canFranchiseActivate = () => {
    if (isActivated === false &&
      franchiseType === STORE_CONVERSION_MARKET_FRANCHISE_TYPE &&
      _.isEmpty(supplier)
    ) {
      errorNotification({ message: t("ERR_SC_SUPPLIER_EMPTY") });
      return false;
    }

    if (isActivated === false && _.isEmpty(taxOffice)) {
      errorNotification({ message: t("ERR_TAX_OFFICE_EMPTY") });
      return false;
    }

    if (isActivated === false && _.isEmpty(taxNumber)) {
      errorNotification({ message: t("ERR_TAX_NUMBER_EMPTY") });
      return false;
    }

    return true;
  };

  const handleSwitchChange = selectedValue => {
    if (!canFranchiseActivate()) {
      return;
    }

    if (selectedValue === values.isActivated) {
      return;
    }
    setIsModalVisible(true);
    setFieldValue('isActivated', selectedValue);
  };

  return (
    <>
      <Col span={4}>
        <Card>
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Item
              help={_.get(touched, 'isActivated') && _.get(errors, 'isActivated')}
              validateStatus={_.get(touched, 'isActivated') && _.get(errors, 'isActivated') ? 'error' : 'success'}
              label={t('global:STATUS')}
            >
              <Switch
                checkedChildren={t('ACTIVE')}
                unCheckedChildren={t('INACTIVE')}
                onChange={handleSwitchChange}
                checked={values.isActivated}
              />
              <Modal
                title={t('CONFIRM_MODAL_TITLE')}
                visible={isModalVisible}
                onOk={handleOkButton}
                onCancel={handleCancelButton}
              />
            </Item>
          </Form>
        </Card>
      </Col>
    </>
  );
}

FranchiseStatus.propTypes = {
  isActivated: PropTypes.bool,
  submitRequest: PropTypes.func,
  supplier: PropTypes.string,
  franchiseType: PropTypes.number,
  taxNumber: PropTypes.string,
  taxOffice: PropTypes.string,
  errorNotification: PropTypes.func,
};

export default FranchiseStatus;
