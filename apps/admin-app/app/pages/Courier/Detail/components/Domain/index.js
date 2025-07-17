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
import { setDomainTypeSelector } from '../../redux/selectors';
import Footer from '../CardFooter';
import { validationSchema } from './formHelper';
import { convertedDomainTypeOptions } from '../../utils';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

const Domain = ({ data, isPending: isPendingGetCourierData }) => {
  const { t } = useTranslation('courierPage');
  const dispatch = useDispatch();
  const { canAccess } = usePermission();

  const [isFormEditable, setIsFormEditable] = useState(false);

  const isPendingSetDomainType = useSelector(setDomainTypeSelector.getIsPending);
  const isSuccessSetDomainType = useSelector(setDomainTypeSelector.getIsSuccess);

  const [form] = Form.useForm();
  const formik = useFormik({
    initialValues: data,
    enableReinitialize: true,
    validate: validate(validationSchema),
    onSubmit: formValues => {
      const { _id, domainTypes } = formValues;
      dispatch(Creators.setDomainTypeRequest({ courierId: _id, domainTypes }));
    },
  });

  const { values, setFieldValue, setValues, resetForm, handleSubmit, errors, touched } = formik;

  const hasFinanceEmployeeRole = canAccess(permKey.PAGE_COURIER_DETAIL_COMPONENT_GETIR_FINANCE_EMPLOYEE);

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form]);

  useEffect(() => {
    if (isSuccessSetDomainType) setIsFormEditable(false);
  }, [isSuccessSetDomainType]);

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
    const newValues = cloneDeep(data);
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
          !hasFinanceEmployeeRole && (
            <Footer
              isPending={isPendingGetCourierData || isPendingSetDomainType}
              isFormEditable={isFormEditable}
              permKey={permKey.PAGE_COURIER_DETAIL_DOMAIN}
              handleSubmit={handleSubmit}
              handleEditClick={handleFooterEditClick}
              handleCancelClick={handleFooterCancelClick}
            />
          )
        )}
        title={t('DOMAIN')}
      >
        <Row gutter={[4, 4]}>
          <Col lg={24} xs={24}>
            <SelectWrapper
              selectKey="domainTypes"
              placeholder={t('DOMAIN')}
              value={values.domainTypes}
              hasError={get(errors, 'domainTypes')}
              isTouched={get(touched, 'domainTypes')}
              onChangeCallback={handleFieldChange('domainTypes')}
              disabled={isPendingGetCourierData || isPendingSetDomainType || !isFormEditable}
              mode="multiple"
              optionLabelProp="label"
              optionValueProp="value"
              optionsData={convertedDomainTypeOptions}
            />
          </Col>
        </Row>
      </AntCard>
    </Form>
  );
};

Domain.defaultProps = {
  data: {},
  isPending: false,
};

Domain.propTypes = {
  data: PropTypes.shape({}),
  isPending: PropTypes.bool,
};

export default Domain;
