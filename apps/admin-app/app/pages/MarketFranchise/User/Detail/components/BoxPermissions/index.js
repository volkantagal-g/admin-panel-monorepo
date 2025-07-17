import { useEffect, useMemo, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Row, Col, Typography, Select, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { get, cloneDeep, isEmpty } from 'lodash';

import AntCard from '@shared/components/UI/AntCard';
import { SelectWrapper } from '@shared/components/UI/Form';
import { getLangKey } from '@shared/i18n';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { validate } from '@shared/yup';
import { validationSchema } from './formHelper';
import { Creators } from '../../redux/actions';
import { rolesSelector, updateFranchiseUserRoleSelector } from '../../redux/selectors';
import { BOXES_DEFAULT_PROPS, BOXES_PROP_TYPES } from '../../constants';
import useStyles from './styles';
import Footer from '../BoxFooter';
import { tableColumns } from './config';
import { prepareRolesForUpdateAPICall } from '../../utils';

const { Text } = Typography;
const { Option } = Select;

const BoxPermissions = ({ data, isPending, editPermKey }) => {
  const { t } = useTranslation(['marketFranchiseUserPage', 'error']);
  const classes = useStyles();
  const dispatch = useDispatch();

  const [isFormEditable, setIsFormEditable] = useState(false);
  const [userRolesIds, setUserRolesIds] = useState([]);

  const roles = useSelector(rolesSelector.getData);
  const isPendingUpdateFranchiseUserRole = useSelector(updateFranchiseUserRoleSelector.getIsPending);
  const isSuccessUpdateFranchiseUserRole = useSelector(updateFranchiseUserRoleSelector.getIsSuccess);

  const validationFn = useMemo(() => validate(() => validationSchema({ t })), [t]);

  const [form] = Form.useForm();

  const formik = useFormik({
    enableReinitialize: true,
    validate: validationFn,
    initialValues: data,
    onSubmit: formValues => {
      dispatch(Creators.updateFranchiseUserRoleRequest({ roles: prepareRolesForUpdateAPICall(formValues.roles), userId: formValues._id }));
    },
  });

  const { handleSubmit, values, setValues, setFieldValue, resetForm } = formik;

  useEffect(() => {
    setUserRolesIds(data.roles?.map(roleItem => roleItem.role._id));
  }, [data]);

  useEffect(() => {
    if (isSuccessUpdateFranchiseUserRole) setIsFormEditable(false);
  }, [isSuccessUpdateFranchiseUserRole]);

  const handleFieldChange = (fieldName, permissionId) => {
    if (fieldName === 'selectedRole') {
      const role = roles.find(roleItem => roleItem._id === permissionId);
      setFieldValue('selectedRole', role);
      setFieldValue('selectedPermissions', []);
      form.setFields([{ name: 'selectedPermissions', value: [] }]);
    }
    else {
      setFieldValue(fieldName, permissionId);
    }
  };

  const addRole = () => {
    const newRoles = [...values.roles, { permissions: values.selectedPermissions, role: values.selectedRole }];
    setUserRolesIds([...userRolesIds, values.selectedRole._id]);
    formik.resetForm();
    form.resetFields();
    formik.setFieldValue('roles', newRoles);
  };

  const deleteRole = useCallback(roleId => {
    const newUserRolesIds = [];
    const newRoles = values.roles.filter(roleItem => {
      if (roleItem.role._id !== roleId) {
        newUserRolesIds.push(roleItem.role._id);
        return true;
      }

      return false;
    });

    setUserRolesIds(newUserRolesIds);
    setFieldValue('roles', newRoles);
  }, [values, setFieldValue]);

  const columns = useMemo(() => tableColumns(t, isFormEditable, classes, deleteRole), [
    t,
    isFormEditable,
    classes,
    deleteRole,
  ]);

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
            isPending={isPendingUpdateFranchiseUserRole}
            handleSubmit={handleSubmit}
          />
        )}
        bordered={false}
        title={t('PERMISSIONS')}
      >
        <AntTableV2
          data={values.roles}
          columns={columns}
          loading={isPending}
        />
        {isFormEditable && (
          <Row gutter={[16, 16]} align="middle">
            <Col lg={11} xs={24}>
              <Text>{t('ROLE')}</Text>
              <SelectWrapper
                selectKey="selectedRole"
                value={values.roles}
                hasError={get(formik.errors, 'selectedRole')}
                isTouched={get(formik.touched, 'selectedRole')}
                onChangeCallback={permissionId => handleFieldChange('selectedRole', permissionId)}
                disabled={isPending}
                renderCustomItems={() => roles
                  .filter(role => !userRolesIds.includes(role._id))
                  .map(item => (
                    <Option key={item._id} value={item._id} label={item.key}>
                      <div>{item.key?.toUpperCase()}</div>
                      <small>{item.descriptions?.[getLangKey()]}</small>
                    </Option>
                  ))}
              />
            </Col>
            <Col lg={11} xs={22}>
              <Text>{t('PERMISSIONS')}</Text>
              <SelectWrapper
                selectKey="selectedPermissions"
                value={values.selectedPermissions}
                hasError={get(formik.errors, 'selectedPermissions')}
                isTouched={get(formik.touched, 'selectedPermissions')}
                onChangeCallback={permissionId => handleFieldChange('selectedPermissions', permissionId)}
                disabled={isPending}
                mode="multiple"
                renderCustomItems={() => values?.selectedRole?.permissions?.map(item => (
                  <Option key={item.key} value={item.key} label={item.key}>
                    <div>{item.key?.toUpperCase()}</div>
                    <small>{item.description?.[getLangKey()]}</small>
                  </Option>
                ))}
              />
            </Col>
            <Col lg={2} xs={2}>
              <div className={classes.buttonContainer}>
                <Button
                  type="primary"
                  onClick={addRole}
                  icon={<PlusOutlined />}
                  disabled={!isFormEditable || isEmpty(values.selectedRole) || isEmpty(values.selectedPermissions)}
                />
              </div>
            </Col>
          </Row>
        )}
      </AntCard>
    </Form>
  );
};

BoxPermissions.defaultProps = BOXES_DEFAULT_PROPS;

BoxPermissions.propTypes = BOXES_PROP_TYPES;

export default BoxPermissions;
