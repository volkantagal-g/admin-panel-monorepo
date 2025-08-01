import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Row, Col, Button, Select, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { get, cloneDeep, isEmpty } from 'lodash';
import { PlusOutlined } from '@ant-design/icons';

import AntCard from '@shared/components/UI/AntCard';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { SelectWrapper } from '@shared/components/UI/Form';
import { getLangKey } from '@shared/i18n';
import { validate } from '@shared/yup';
import { validationSchema } from './formHelper';
import { Creators } from '../../redux/actions';
import { roleGroupsSelector, updateFranchiseUserRoleGroupsSelector } from '../../redux/selectors';
import { BOXES_DEFAULT_PROPS, BOXES_PROP_TYPES } from '../../constants';
import Footer from '../BoxFooter';
import { tableColumns } from './config';
import useStyles from './styles';

const { Option } = Select;
const { Text } = Typography;

const BoxRoleGroups = ({ data, isPending, editPermKey }) => {
  const { t } = useTranslation(['marketFranchiseUserPage', 'error']);
  const classes = useStyles();
  const dispatch = useDispatch();

  const [isFormEditable, setIsFormEditable] = useState(false);
  const [userRoleGroupsIds, setUserRoleGroupsIds] = useState([]);

  const allRoleGroups = useSelector(roleGroupsSelector.getData);
  const isPendingUpdateUserRoleGroups = useSelector(updateFranchiseUserRoleGroupsSelector.getIsPending);
  const isSuccessUpdateUserRoleGroups = useSelector(updateFranchiseUserRoleGroupsSelector.getIsSuccess);

  const validationFn = useMemo(() => validate(() => validationSchema({ t })), [t]);

  const [form] = Form.useForm();

  const formik = useFormik({
    enableReinitialize: true,
    validate: validationFn,
    initialValues: data,
    onSubmit: formValues => {
      dispatch(Creators.updateFranchiseUserRoleGroupsRequest({ roleGroups: userRoleGroupsIds, userId: formValues._id }));
    },
  });

  const { handleSubmit, values, setValues, setFieldValue, resetForm } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
    if (values.roleGroups) {
      setUserRoleGroupsIds([...values.roleGroups.map(userRoleGroup => userRoleGroup._id)]);
    }
  }, [values, form, allRoleGroups]);

  useEffect(() => {
    if (isSuccessUpdateUserRoleGroups) setIsFormEditable(false);
  }, [isSuccessUpdateUserRoleGroups]);

  const handleFieldChange = fieldName => {
    return value => {
      setFieldValue(fieldName, value);
    };
  };

  const addRoleGroup = () => {
    const getRoleGroupInformations = allRoleGroups.filter(roleGroup => roleGroup._id === values.selectedRoleGroup);
    formik.resetForm();
    form.resetFields();
    formik.setFieldValue('roleGroups', [...values.roleGroups, ...getRoleGroupInformations]);
  };

  const deleteRoleGroup = useCallback(id => {
    const newRoleGroups = values.roleGroups.filter(roleGroup => roleGroup._id !== id);
    setFieldValue('roleGroups', newRoleGroups);
  }, [values, setFieldValue]);

  const columns = useMemo(() => tableColumns(t, isFormEditable, deleteRoleGroup), [
    t,
    isFormEditable,
    deleteRoleGroup,
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
            isPending={isPendingUpdateUserRoleGroups}
            handleSubmit={handleSubmit}
          />
        )}
        bordered={false}
        title={t('ROLE_GROUPS')}
      >
        <AntTableV2
          data={values.roleGroups}
          columns={columns}
          loading={isPending}
        />
        {isFormEditable && (
          <Row gutter={[16, 16]} align="middle">
            <Col lg={22} xs={22}>
              <Text>{t('ROLE_GROUPS')}</Text>
              <SelectWrapper
                selectKey="selectedRoleGroup"
                value={values.selectedRoleGroup}
                hasError={get(formik.errors, 'selectedRoleGroup')}
                isTouched={get(formik.touched, 'selectedRoleGroup')}
                onChangeCallback={handleFieldChange('selectedRoleGroup')}
                disabled={isPending}
                renderCustomItems={() => allRoleGroups
                  .filter(roleGroup => !userRoleGroupsIds.includes(roleGroup._id))
                  .map(item => (
                    <Option key={item._id} value={item._id} label={item.name[getLangKey()]}>
                      <div>{item.name[getLangKey()]}</div>
                    </Option>
                  ))}
              />
            </Col>
            <Col lg={2} xs={2}>
              <div className={classes.buttonContainer}>
                <Button
                  type="primary"
                  onClick={() => addRoleGroup()}
                  icon={<PlusOutlined />}
                  disabled={!isFormEditable || isEmpty(values.selectedRoleGroup)}
                />
              </div>
            </Col>
          </Row>
        )}
      </AntCard>
    </Form>
  );
};

BoxRoleGroups.defaultProps = BOXES_DEFAULT_PROPS;

BoxRoleGroups.propTypes = BOXES_PROP_TYPES;

export default BoxRoleGroups;
