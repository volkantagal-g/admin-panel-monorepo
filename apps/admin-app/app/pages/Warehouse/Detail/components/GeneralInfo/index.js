/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Tooltip, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import _ from 'lodash';

import { QuestionCircleTwoTone } from '@ant-design/icons';

import { defaultValues, validationSchema } from './formHelper';
import { InputWrapper, SelectWrapper } from '@shared/components/UI/Form';
import Card from '@shared/components/UI/AntCard';
import Footer from '../Footer';
import { validate } from '@shared/yup';
import useStyles from './styles';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { useSAPReference } from '../SAPReferenceContext';

const { useForm } = Form;

function GeneralInfo(props) {
  const { name, shortName, fieldManagers, warehouseGLN, submitRequest, employees, dincerIntegrationId, SAPReferenceCode } = props;
  const { t } = useTranslation();
  const { canAccess } = usePermission();

  const [form] = useForm();
  const [isFormEditable, setIsFormEditable] = useState(false);
  const classes = useStyles();
  const initialProps = { name, shortName, fieldManagers, warehouseGLN, dincerIntegrationId, SAPReferenceCode };
  // const hasAccessToEditSAPWarehouseID = canAccess(permKey.PAGE_WAREHOUSE_DETAIL_COMPONENT_EDIT_SAP_REFERENCE_CODE);

  const { hasSAPReferenceCode } = useSAPReference();

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      if (_.isEqual(values, initialProps)) {
        return false;
      }

      submitRequest({
        name: values.name,
        shortName: values.shortName,
        fieldManagers: values.fieldManagers,
        warehouseGLN: values.warehouseGLN.toString(),
        SAPReferenceCode: values.SAPReferenceCode.toString(),
      });
      setIsFormEditable(false);
      return true;
    },
    enableReinitialize: true,
  });

  const { handleSubmit, handleChange, values, errors, touched, setFieldValue, setValues } = formik;

  const handleSelectChange = fieldName => {
    return selectedItems => {
      setFieldValue(fieldName, selectedItems);
    };
  };

  const handleResetForm = () => {
    if (_.isEqual(values, initialProps)) {
      return false;
    }

    setValues(initialProps);
    form.setFieldsValue(initialProps);
    return true;
  };

  useEffect(() => {
    if (!isFormEditable) {
      setValues(initialProps);
      form.setFieldsValue(initialProps);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFormEditable]);

  useEffect(() => {
    form.setFieldsValue({ name, shortName, fieldManagers, warehouseGLN, dincerIntegrationId, SAPReferenceCode });
    setValues({ name, shortName, fieldManagers, warehouseGLN, dincerIntegrationId, SAPReferenceCode });
  }, [form, name, shortName, fieldManagers, warehouseGLN, dincerIntegrationId, SAPReferenceCode, setValues]);

  return (
    <Col span={18} className={classes.generaInfo}>
      <Card title={t('GENERAL_INFO')} className="h-100 mb-0">
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Row gutter={[16]} align="bottom">
            <Col span={12}>
              <InputWrapper
                inputKey="name"
                label={(hasSAPReferenceCode && isFormEditable) ? (
                  <Space align="center">
                    {t('NAME')}
                    <Tooltip title={t('warehousePage:CANT_EDIT_WITH_SAP_REFERENCE_CODE')} placement="right">
                      <QuestionCircleTwoTone twoToneColor="#5D3EBC" />
                    </Tooltip>
                  </Space>
                ) : t('NAME')}
                value={values.name}
                isTouched={_.get(touched, 'name')}
                hasError={_.get(errors, 'name')}
                handleChange={handleChange}
                disabled={!isFormEditable || hasSAPReferenceCode}
                additionalProps={{ 'data-testid': 'warehouse-name-input' }}
              />
            </Col>
            <Col span={12}>
              <InputWrapper
                inputKey="shortName"
                label={t('SHORTNAME')}
                value={values.shortName}
                isTouched={_.get(touched, 'shortName')}
                hasError={_.get(errors, 'shortName')}
                handleChange={handleChange}
                disabled={!isFormEditable || hasSAPReferenceCode}
                additionalProps={{ 'data-testid': 'warehouse-short-name-input' }}
              />
            </Col>
          </Row>
          <Row gutter={[16]} align="bottom">
            <Col span={12}>
              <SelectWrapper
                selectKey="fieldManagers"
                label={t('FIELD_MANAGER')}
                value={values.fieldManagers}
                hasError={_.get(errors, 'fieldManagers')}
                isTouched={_.get(touched, 'fieldManagers')}
                optionsData={employees}
                optionLabelProp="fullName"
                optionValueProp="_id"
                onChangeCallback={handleSelectChange('fieldManagers')}
                mode="multiple"
                disabled={!isFormEditable}
              />
            </Col>
            <Col span={12}>
              <InputWrapper
                inputKey="warehouseGLN"
                label={t('warehousePage:WAREHOUSE_GLN')}
                value={values.warehouseGLN}
                isTouched={_.get(touched, 'warehouseGLN')}
                hasError={_.get(errors, 'warehouseGLN')}
                handleChange={handleChange}
                disabled={!isFormEditable}
              />
            </Col>
            <Col span={12}>
              <InputWrapper
                inputKey="SAPReferenceCode"
                label={t('warehousePage:SAP_REFERENCE_CODE')}
                value={values.SAPReferenceCode}
                isTouched={_.get(touched, 'SAPReferenceCode')}
                hasError={_.get(errors, 'SAPReferenceCode')}
                handleChange={handleChange}
                disabled
              />
            </Col>
            {values.dincerIntegrationId && (
              <Col span={12}>
                <InputWrapper
                  inputKey="dincerIntegrationId"
                  label={t('warehousePage:DINCER_INTEGRATION_ID')}
                  value={values.dincerIntegrationId}
                  isTouched={_.get(touched, 'dincerIntegrationId')}
                  hasError={_.get(errors, 'dincerIntegrationId')}
                  handleChange={handleChange}
                  disabled
                />
              </Col>
            )}
          </Row>
          {canAccess(permKey.PAGE_WAREHOUSE_DETAIL_EDIT_GENERAL_INFO) && (
            <Row align="bottom" data-testid="warehouse-edit-button-wrapper">
              <Col span={24}>
                <Footer
                  formButtonVisibilty={isFormEditable}
                  setFormButtonVisibilty={setIsFormEditable}
                  handleReset={handleResetForm}
                />
              </Col>
            </Row>
          )}
        </Form>
      </Card>
    </Col>
  );
}

GeneralInfo.propTypes = {
  name: PropTypes.string,
  shortName: PropTypes.string,
  fieldManagers: PropTypes.array,
  // TODO: use arrayOf and provide more information instead. Props.shape([]) is not the correct usage to get rid of eslint rules.
  warehouseGLN: PropTypes.number,
  submitRequest: PropTypes.func,
  employees: PropTypes.array,
  // TODO: use arrayOf and provide more information instead. Props.shape([]) is not the correct usage to get rid of eslint rules.
};

export default GeneralInfo;
