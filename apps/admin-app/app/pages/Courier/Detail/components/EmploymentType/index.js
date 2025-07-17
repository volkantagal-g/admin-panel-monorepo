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
import { setEmploymentTypeSelector } from '../../redux/selectors';
import Footer from '../CardFooter';
import { validationSchema } from './formHelper';
import { COURIER_EMPLOYMENT_TYPES } from '@shared/shared/constantValues';
import { getLangKey } from '@shared/i18n';

const EmploymentType = ({ data, isPending: isPendingGetCourierData, permKey }) => {
  const { t } = useTranslation('courierPage');
  const dispatch = useDispatch();
  const { person } = data;

  const [isFormEditable, setIsFormEditable] = useState(false);

  const isPending = useSelector(setEmploymentTypeSelector.getIsPending);
  const isSuccess = useSelector(setEmploymentTypeSelector.getIsSuccess);

  const [form] = Form.useForm();
  const formik = useFormik({
    initialValues: data,
    enableReinitialize: true,
    validate: validate(validationSchema),
    onSubmit: formValues => {
      const { _id, employmentType } = formValues;
      dispatch(Creators.setEmploymentTypeRequest({ courierId: _id, employmentType }));
    },
  });

  const { values, setFieldValue, setValues, resetForm, handleSubmit, errors, touched } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form]);

  useEffect(() => {
    if (isSuccess) setIsFormEditable(false);
  }, [isSuccess]);

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
          <Footer
            isPending={isPendingGetCourierData || isPending}
            isFormEditable={isFormEditable}
            permKey={permKey}
            handleSubmit={handleSubmit}
            handleEditClick={handleFooterEditClick}
            handleCancelClick={handleFooterCancelClick}
          />
        )}
        title={t('EMPLOYMENT_TYPE')}
      >
        <Row gutter={[4, 4]}>
          <Col lg={24} xs={24}>
            <SelectWrapper
              selectKey="employmentType"
              placeholder={t('EMPLOYMENT_TYPE')}
              value={values.employmentType}
              hasError={get(errors, 'employmentType')}
              isTouched={get(touched, 'employmentType')}
              onChangeCallback={handleFieldChange('employmentType')}
              disabled={isPendingGetCourierData || isPending || !isFormEditable}
              optionLabelProp={getLangKey()}
              optionValueProp="type"
              optionsData={COURIER_EMPLOYMENT_TYPES[person?.employmentType]}
            />
          </Col>
        </Row>
      </AntCard>
    </Form>
  );
};

EmploymentType.defaultProps = {
  data: {},
  isPending: false,
  permKey: '',
};

EmploymentType.propTypes = {
  data: PropTypes.shape({}),
  isPending: PropTypes.bool,
  permKey: PropTypes.string,
};

export default EmploymentType;
