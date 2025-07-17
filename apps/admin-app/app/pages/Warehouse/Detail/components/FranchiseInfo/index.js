import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import _ from 'lodash';

import { defaultValues, validationSchema } from './formHelper';
import { usePermission } from '@shared/hooks';
import { SelectWrapper } from '@shared/components/UI/Form';
import Card from '@shared/components/UI/AntCard';
import Footer from '../Footer';
import { WAREHOUSE_ACTIVE_STATE, WAREHOUSE_STATES } from '@shared/shared/constants';
import { validate } from '@shared/yup';
import permKey from '@shared/shared/permKey.json';

const { useForm } = Form;

function FranchiseInfo(props) {
  const {
    franchise,
    franchises,
    submitRequest,
    removeRequest,
    warehouseState,
    errorNotification,
    hasSAPReferenceCode,
  } = props;
  const { t } = useTranslation(['warehousePage', 'global']);
  const { canAccess } = usePermission();
  const [form] = useForm();
  const [isFormEditable, setIsFormEditable] = useState(false);
  const hasAccessToEditFranchiseInfo = canAccess(permKey.PAGE_WAREHOUSE_DETAIL_COMPONENT_EDIT_FRANCHISE_INFO);

  const canEdit = !hasSAPReferenceCode && hasAccessToEditFranchiseInfo;

  const initialProps = { franchise };

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      if (_.isEqual(values, initialProps)) {
        return false;
      }

      submitRequest(values.franchise);

      setIsFormEditable(false);
      return true;
    },
    enableReinitialize: true,
  });

  const { handleSubmit, values, errors, touched, setFieldValue, setValues, setFieldTouched } = formik;

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

  const handleRemoveButtonClick = () => {
    if (!canFranchiseRemove()) {
      return;
    }
    removeRequest(values.franchise);
    setIsFormEditable(false);
    setFieldTouched('franchise', false);
  };

  useEffect(() => {
    form.setFieldsValue({ franchise });
    setValues({ franchise });
  }, [form, setValues, franchise]);

  // @TODO franchise can only be change after remove and warehouse while inactive

  const removeButtonVisibility = !!franchise;

  return (
    <Card title={t('FRANCHISE_INFO')}>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Row gutter={[16]} align="bottom">
          <Col span={12}>
            <SelectWrapper
              selectKey="franchise"
              label={t('FRANCHISE')}
              value={values.franchise}
              hasError={_.get(errors, 'franchise')}
              isTouched={_.get(touched, 'franchise')}
              optionsData={franchises}
              optionLabelProp="name"
              optionValueProp="_id"
              onChangeCallback={handleSelectChange('franchise')}
              disabled={!isFormEditable || removeButtonVisibility}
            />
          </Col>
        </Row>
        {canEdit && (
        <Row>
          <Col span={24}>
            <Footer
              formButtonVisibilty={isFormEditable}
              setFormButtonVisibilty={handleSetIsFormEditable}
              handleReset={handleResetForm}
              customButton={
                removeButtonVisibility ? (
                  <Button type="ghost" onClick={handleRemoveButtonClick}>
                    {t('button:END_FRANCHISE')}
                  </Button>
                ) : null
              }
              onlyCustomButtonVisible={removeButtonVisibility}
            />
          </Col>
        </Row>
        )}
      </Form>
    </Card>
  );
}

FranchiseInfo.propTypes = {
  franchise: PropTypes.string,
  franchises: PropTypes.arrayOf(PropTypes.shape({})),
  submitRequest: PropTypes.func,
  removeRequest: PropTypes.func,
  warehouseState: PropTypes.oneOf(WAREHOUSE_STATES).isRequired,
  errorNotification: PropTypes.func,
};

FranchiseInfo.defaultProps = {
  franchise: '',
  franchises: [],
  submitRequest: () => {},
  removeRequest: () => {},
  errorNotification: () => {},
};

export default FranchiseInfo;
