import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Form } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { cloneDeep } from 'lodash';
import PropTypes from 'prop-types';

import { validate } from '@shared/yup';
import Card from '@shared/components/UI/AntCard';
import MultiLanguageInput from '@shared/components/UI/MultiLanguage/Input';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import CustomSelectCountry from '../CustomSelectCountry';
import { Creators } from '../../redux/actions';
import { defaultValues, validationSchema } from './formHelper';
import { getUpdateOptions } from './utils';
import { Footer, RolePermissions, AccessibleReports } from '../index';

const { useForm } = Form;

const UpdateFranchiseUserRoleGroupForm = ({ data, isPending, id }) => {
  const dispatch = useDispatch();
  const [form] = useForm();
  const { t } = useTranslation('marketFranchiseUserRoleGroupPage');
  const { Can } = usePermission();

  const [isFormEditable, setIsFormEditable] = useState(false);

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: values => {
      const updateOptions = getUpdateOptions(values, data);
      dispatch(Creators.updateFranchiseUserRoleGroupRequest({ data: updateOptions, id }));
    },
  });

  const { handleSubmit, setValues } = formik;

  useEffect(() => {
    const newValues = cloneDeep(data);
    form.setFieldsValue(newValues);
    setValues(newValues);
  }, [data, form, setValues]);

  const handleEditClick = () => {
    setIsFormEditable(true);
  };

  const handleCancelClick = () => {
    const newValues = cloneDeep(data);
    form.resetFields();
    formik.resetForm();
    form.setFieldsValue(newValues);
    setValues(newValues);
    setIsFormEditable(false);
  };

  return (
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
          <Form form={form}>
            <Card title={t('GENERAL_INFO')}>
              <Row gutter={[16, 16]}>
                <Col lg={24} xs={24}>
                  <MultiLanguageInput name="name" label={t('NAME')} fieldPath={['name']} formik={formik} disabled={isPending || !isFormEditable} />
                </Col>
                <Col lg={24} xs={24}>
                  <MultiLanguageInput
                    name="description"
                    label={t('DESCRIPTION')}
                    fieldPath={['description']}
                    formik={formik}
                    disabled={isPending || !isFormEditable}
                  />
                </Col>
                <CustomSelectCountry formik={formik} form={form} isDisabled={isPending || !isFormEditable} />
              </Row>
            </Card>
          </Form>
          <Can key="franchiseUserRoleGroupAccessibleReports" permKey={permKey.PAGE_MARKET_FRANCHISE_USER_REPORT_LIST}>
            <AccessibleReports formik={formik} isEditable={!isPending && isFormEditable} />
          </Can>
        </Col>
        <Can key="franchiseUserRoleGroupRolePermissions" permKey={permKey.PAGE_MARKET_FRANCHISE_USER_ROLE_LIST}>
          <Col lg={12} xs={24}>
            <Row gutter={[16, 16]}>
              <RolePermissions formik={formik} isEditable={!isPending && isFormEditable} />
            </Row>
          </Col>
        </Can>
      </Row>
    </Card>
  );
};

UpdateFranchiseUserRoleGroupForm.propTypes = {
  data: PropTypes.shape({}),
  isPending: PropTypes.bool,
  id: PropTypes.string,
};

UpdateFranchiseUserRoleGroupForm.defaultProps = {
  data: {},
  isPending: true,
  id: '',
};

export default UpdateFranchiseUserRoleGroupForm;
