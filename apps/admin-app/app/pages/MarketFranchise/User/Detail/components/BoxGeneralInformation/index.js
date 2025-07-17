import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Row, Col, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { get, cloneDeep } from 'lodash';

import AntCard from '@shared/components/UI/AntCard';
import { InputWrapper, SelectWrapper } from '@shared/components/UI/Form';
import { validate } from '@shared/yup';
import { Creators } from '../../redux/actions';
import { updateFranchiseUserSelector } from '../../redux/selectors';
import { BOXES_DEFAULT_PROPS, BOXES_PROP_TYPES } from '../../constants';
import { convertedUserPermissionGroupOptions } from '../../utils';
import { validationSchema } from './formHelper';
import Footer from '../BoxFooter';

const { Item } = Form;

const BoxGeneralInfo = ({ data, isPending, editPermKey }) => {
  const { t } = useTranslation(['marketFranchiseUserPage', 'error']);
  const dispatch = useDispatch();

  const [isFormEditable, setIsFormEditable] = useState(false);

  const validationFn = useMemo(() => validate(() => validationSchema({ t })), [t]);

  const isPendingUpdateFranchiseUser = useSelector(updateFranchiseUserSelector.getIsPending);
  const isSuccessUpdateFranchiseUser = useSelector(updateFranchiseUserSelector.getIsSuccess);

  const [form] = Form.useForm();

  const formik = useFormik({
    enableReinitialize: true,
    validate: validationFn,
    initialValues: data,
    onSubmit: formValues => {
      const { _id, roles, roleGroups, franchise, ...updateData } = formValues;
      dispatch(Creators.updateFranchiseUserRequest({ userId: formValues._id, updateData }));
    },
  });

  const { handleSubmit, values, errors, touched, setFieldValue, handleChange, setValues, resetForm } = formik;

  const handleFieldChange = fieldName => {
    return value => {
      setFieldValue(fieldName, value);
    };
  };

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form]);

  useEffect(() => {
    if (isSuccessUpdateFranchiseUser) setIsFormEditable(false);
  }, [isSuccessUpdateFranchiseUser]);

  const handleCancelClick = () => {
    const newValues = cloneDeep(data);
    form.resetFields();
    resetForm();
    form.setFieldsValue(newValues);
    setValues(newValues);
    setIsFormEditable(false);
  };

  return (
    <Form form={form} layout="vertical">
      <AntCard
        footer={(
          <Footer
            handleCancelClick={handleCancelClick}
            isFormEditable={isFormEditable}
            setIsFormEditable={setIsFormEditable}
            permKey={editPermKey}
            isPending={isPendingUpdateFranchiseUser}
            handleSubmit={handleSubmit}
          />
        )}
        bordered={false}
        title={t('GENERAL_INFO')}
      >
        <Row gutter={[4, 4]}>
          <Col lg={12} xs={24}>
            <InputWrapper
              inputKey="name"
              label={t('GLOBAL:NAME')}
              value={values.name}
              isTouched={get(touched, 'name')}
              hasError={get(errors, 'name')}
              handleChange={handleChange}
              disabled={isPending || !isFormEditable}
              setDefaultValue={false}
            />
          </Col>
          <Col lg={12} xs={24}>
            <InputWrapper
              inputKey="username"
              label={t('GLOBAL:USERNAME')}
              value={values.username}
              isTouched={get(touched, 'username')}
              hasError={get(errors, 'username')}
              handleChange={handleChange}
              disabled
              setDefaultValue={false}
            />
          </Col>
          <Col lg={12} xs={24}>
            <InputWrapper
              inputKey="gsm"
              label={t('GLOBAL:GSM')}
              value={values.gsm}
              isTouched={get(touched, 'gsm')}
              hasError={get(errors, 'gsm')}
              handleChange={handleChange}
              disabled={isPending || !isFormEditable}
              setDefaultValue={false}
            />
          </Col>
          <Col lg={12} xs={24}>
            <InputWrapper
              inputKey="email"
              label={t('GLOBAL:EMAIL')}
              value={values.email}
              isTouched={get(touched, 'email')}
              hasError={get(errors, 'email')}
              handleChange={handleChange}
              disabled={isPending || !isFormEditable}
              setDefaultValue={false}
            />
          </Col>
          <Col lg={12} xs={24}>
            <Item
              help={get(touched, 'isOwner') && get(errors, 'isOwner')}
              validateStatus={errors.isOwner && touched.isOwner ? 'error' : 'success'}
            >
              <Checkbox
                name="isOwner"
                checked={values.isOwner}
                onChange={handleChange}
                disabled={isPending || !isFormEditable || values.isGetirEmployee}
              >
                {t('IS_OWNER')}
              </Checkbox>
            </Item>
          </Col>
          <Col lg={12} xs={24}>
            <Item
              help={get(touched, 'isGetirEmployee') && get(errors, 'isGetirEmployee')}
              validateStatus={errors.isGetirEmployee && touched.isGetirEmployee ? 'error' : 'success'}
            >
              <Checkbox
                name="isGetirEmployee"
                checked={values.isGetirEmployee}
                onChange={handleChange}
                disabled={isPending || !isFormEditable || values.isOwner}
              >
                {t('IS_GETIR_EMPLOYEE')}
              </Checkbox>
            </Item>
          </Col>
          <Col lg={12} xs={24}>
            <SelectWrapper
              selectKey="groupType"
              label={t('USER_PERMISSION_GROUP')}
              value={values.groupType}
              optionLabelProp="label"
              optionValueProp="value"
              hasError={get(errors, 'groupType')}
              isTouched={get(touched, 'groupType')}
              optionsData={convertedUserPermissionGroupOptions}
              disabled={isPending || !isFormEditable}
              onChangeCallback={handleFieldChange('groupType')}
            />
          </Col>
        </Row>
      </AntCard>
    </Form>
  );
};

BoxGeneralInfo.defaultProps = BOXES_DEFAULT_PROPS;

BoxGeneralInfo.propTypes = BOXES_PROP_TYPES;

export default BoxGeneralInfo;
