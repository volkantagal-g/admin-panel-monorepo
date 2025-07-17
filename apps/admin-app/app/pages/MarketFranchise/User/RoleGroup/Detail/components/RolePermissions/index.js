import { Button, Col, Form, Row, Select, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import { validate } from '@shared/yup';
import { SelectWrapper } from '@shared/components/UI/Form';
import Card from '@shared/components/UI/AntCard';
import { getLangKey } from '@shared/i18n';
import useStyles from './styles';
import AntTable from '@shared/components/UI/AntTable';
import { tableColumns } from './config';
import { franchiseUserRoleListSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import { getPermissionOptions, getTableData, getFilteredRoleList } from './utils';
import { defaultValues, validationSchema } from './formHelper';

const { Text } = Typography;
const { useForm } = Form;
const { Option } = Select;

const RolePermissions = ({ formik, isEditable }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [form] = useForm();
  const [editForm] = useForm();
  const { t } = useTranslation('marketFranchiseUserRoleGroupPage');

  const [permissionOptions, setPermissionOptions] = useState([]);
  const [editablePermission, setEditablePermission] = useState();

  const data = useSelector(franchiseUserRoleListSelector.getData);
  const isPending = useSelector(franchiseUserRoleListSelector.getIsPending);

  const tableData = useMemo(
    () => getTableData(formik.values.roles, data, editablePermission),
    [data, formik.values.roles, editablePermission],
  );
  const filteredRoles = useMemo(() => getFilteredRoleList(formik.values.roles, data), [data, formik.values.roles]);

  const addFormik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: values => {
      const newRoles = [...formik.values.roles, values];
      formik.setFieldValue('roles', newRoles);
      form.resetFields();
      addFormik.resetForm();
      setPermissionOptions([]);
    },
  });
  const { handleSubmit, setFieldValue, values } = addFormik;

  const editFormik = useFormik({
    initialValues: editablePermission,
    validate: validate(validationSchema),
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: newValues => {
      const role = formik.values.roles.find(eachRole => eachRole.role === newValues.role);
      role.permissions = newValues.permissions;
      const newRoles = [...formik.values.roles];
      formik.setFieldValue('roles', newRoles);
      setEditablePermission(null);
    },
  });

  const handleOnRemove = removedRoleId => {
    const newRoles = formik.values.roles.filter(role => role.role !== removedRoleId);
    formik.setFieldValue('roles', newRoles);
  };

  const toggleEditable = permission => {
    if (permission) {
      setEditablePermission({ ...permission, permissions: permission.permissions.map(perm => perm.key) });
      const permissionOptions = getPermissionOptions(data, permission.role);
      const selectedPermissions = permissionOptions.filter(opt => permission.permissions.findIndex(perm => perm.key === opt.key) > -1);
      editForm.setFields([{ name: permission.role, value: selectedPermissions.map(perm => perm.key) }]);
    }
    else {
      setEditablePermission(null);
    }
  };

  const handleFieldChange = fieldName => {
    return value => {
      if (fieldName === 'role') {
        const role = data.find(role => role._id === value);
        setPermissionOptions(role.permissions);
        setFieldValue('permissions', []);
        form.setFields([{ name: 'permissions', value: [] }]);
      }
      setFieldValue(fieldName, value);
    };
  };

  useEffect(() => {
    dispatch(Creators.getFranchiseUserRoleListRequest());
  }, [dispatch]);

  useEffect(() => {
    setEditablePermission(null);
    form.resetFields();
    addFormik.resetForm();
    setPermissionOptions([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values, form]);

  return (
    <Card title={t('PERMISSIONS')}>
      <Form form={editForm}>
        <AntTable
          data={tableData}
          columns={tableColumns({
            t,
            handleOnRemove,
            toggleEditable,
            isEditable,
            editablePermission,
            roleList: data,
            classes,
            editFormik,
          })}
          loading={isPending}
          rowKey="role"
          pagination={false}
        />
      </Form>
      <Form form={form}>
        {isEditable && (
          <Row gutter={[16, 16]} align="middle">
            <Col lg={11} xs={24}>
              <Text>{t('ROLE')}</Text>
              <SelectWrapper
                selectKey="role"
                value={values.role}
                hasError={get(addFormik.errors, 'role')}
                isTouched={get(addFormik.touched, 'role')}
                onChangeCallback={handleFieldChange('role')}
                disabled={isPending}
                renderCustomItems={() => {
                  return filteredRoles.map(item => (
                    <Option key={item._id} value={item._id} label={item.key}>
                      <div>{item.key.toUpperCase()}</div>
                      <small>{item.descriptions?.[getLangKey()]}</small>
                    </Option>
                  ));
                }}
              />
            </Col>
            <Col lg={11} xs={20}>
              <Text>{t('PERMISSIONS')}</Text>
              <SelectWrapper
                selectKey="permissions"
                value={values.permissions}
                hasError={get(addFormik.errors, 'permissions')}
                isTouched={get(addFormik.touched, 'permissions')}
                onChangeCallback={handleFieldChange('permissions')}
                disabled={isPending}
                mode="multiple"
                renderCustomItems={() => {
                  return permissionOptions
                    .filter(item => item.key)
                    .map(item => (
                      <Option key={item.key} value={item.key} label={item.key}>
                        <div>{item.key.toUpperCase()}</div>
                        <small>{item.description[getLangKey()]}</small>
                      </Option>
                    ));
                }}
              />
            </Col>
            <Col lg={2} xs={4}>
              <div className={classes.buttonContainer}>
                <Button type="primary" onClick={handleSubmit} icon={<PlusOutlined />} disabled={!isEditable} />
              </div>
            </Col>
          </Row>
        )}
      </Form>
    </Card>
  );
};

RolePermissions.propTypes = {
  formik: PropTypes.shape({}),
  isEditable: PropTypes.bool,
};

RolePermissions.defaultProps = {
  formik: {},
  isEditable: false,
};

export default RolePermissions;
