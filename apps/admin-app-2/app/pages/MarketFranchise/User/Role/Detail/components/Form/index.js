import { useEffect, useState } from 'react';
import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, Typography } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import { validate } from '@shared/yup';
import Card from '@shared/components/UI/AntCard';
import { InputWrapper } from '@shared/components/UI/Form';
import MultiLanguageInput from '@shared/components/UI/MultiLanguage/Input';
import { franchiseUserRoleDetailSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import { defaultValues, validationSchema } from './formHelper';
import { Footer, RolePermissions } from '../index';

const { useForm } = Form;
const { Text } = Typography;

const UpdateFranchiseUserRoleForm = ({ id }) => {
  const { t } = useTranslation('marketFranchiseUserRolePage');

  const dispatch = useDispatch();
  const [form] = useForm();
  const [isFormEditable, setIsFormEditable] = useState(false);
  const data = useSelector(franchiseUserRoleDetailSelector.getData);
  const isPending = useSelector(franchiseUserRoleDetailSelector.getIsPending);

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: values => {
      dispatch(Creators.updateFranchiseUserRoleRequest({ data: values, id }));
    },
  });

  const { handleSubmit, values, touched, errors, setFieldValue, setValues, handleChange } = formik;

  const handleEditClick = () => {
    setIsFormEditable(true);
  };

  const handleCancelClick = () => {
    const { key, descriptions, permissions } = data;
    const editedPermissions = permissions?.map(permission => {
      return {
        ...permission,
        id: uuidv4(),
      };
    });
    form.resetFields();
    form.setFieldsValue({ key, descriptions, permissions: editedPermissions });
    setValues({ key, descriptions, permissions: editedPermissions });
    setIsFormEditable(false);
  };

  useEffect(() => {
    const { key, descriptions, permissions } = data;
    const editedPermissions = permissions?.map(permission => {
      return {
        ...permission,
        id: uuidv4(),
      };
    });
    form.setFieldsValue({ key, descriptions, permissions: editedPermissions });
    setValues({ key, descriptions, permissions: editedPermissions });
  }, [data, form, setValues]);

  return (
    <Form form={form}>
      <Card
        footer={(
          <Footer
            handleSubmit={handleSubmit}
            handleCancelClick={handleCancelClick}
            handleEditClick={handleEditClick}
            isFormEditable={isFormEditable}
          />
        )}
      >
        <Row gutter={[16, 16]}>
          <Col lg={12} xs={24}>
            <Card title={t('GENERAL_INFO')}>
              <Row gutter={[16, 16]}>
                <Col lg={24} xs={24}>
                  <Text>{t('NAME')}</Text>
                  <InputWrapper
                    inputKey="key"
                    value={values?.key}
                    setFieldValue={setFieldValue}
                    isTouched={get(touched, 'key')}
                    hasError={get(errors, 'key')}
                    handleChange={handleChange}
                    disabled={isPending || !isFormEditable}
                  />
                </Col>
                <Col lg={24} xs={24}>
                  <MultiLanguageInput
                    label={t('DESCRIPTION')}
                    fieldPath={['descriptions']}
                    formik={formik}
                    disabled={isPending || !isFormEditable}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col lg={12} xs={24}>
            <Row gutter={[16, 16]}>
              <RolePermissions
                formik={formik}
                isEditable={isPending || isFormEditable}
              />
            </Row>
          </Col>
        </Row>
      </Card>
    </Form>
  );
};

export default UpdateFranchiseUserRoleForm;
