import { Button, Col, Row, Typography } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { get } from 'lodash';

import { InputWrapper } from '@shared/components/UI/Form';
import Card from '@shared/components/UI/AntCard';
import MultiLanguageInput from '@shared/components/UI/MultiLanguage/Input';
import { t } from '@shared/i18n';
import useStyles from './styles';

const { Text } = Typography;

const emptyPermission = { key: '', description: { tr: '', en: '' } };

const RolePermissions = ({ formik, isEditable }) => {
  const classes = useStyles();

  const handleOnRemove = permission => {
    const newPermissions = formik?.values?.permissions.filter(perm => perm.key !== permission.key);
    if (newPermissions.length === 0) {
      const defaultPermission = [emptyPermission];
      formik.setFieldValue('permissions', defaultPermission);
    }
    else {
      formik.setFieldValue('permissions', newPermissions);
    }
  };

  const handleAddClick = () => {
    const newPermissions = [...formik?.values?.permissions || [], emptyPermission];
    formik.setFieldValue('permissions', newPermissions);
  };

  return (
    <Card title={t('marketFranchiseUserRolePage:PERMISSIONS')}>
      {formik?.values?.permissions?.map((permission, index) => {
        return (
          <Row gutter={[16, 16]} key={permission?.id} align="middle">
            <div className={classes.buttonContainer}>
              <Button
                type="primary"
                onClick={() => handleOnRemove(permission)}
                icon={<DeleteOutlined />}
                disabled={!isEditable}
              />
              <Button
                type="primary"
                onClick={handleAddClick}
                icon={<PlusOutlined />}
                disabled={!isEditable}
              />
            </div>
            <Col lg={24} xs={24}>
              <Text>{t('NAME')}</Text>
              <InputWrapper
                inputKey={['permissions', index, 'key']}
                value={permission.key}
                isTouched={get(formik.touched, `permissions[${index}].key`)}
                hasError={get(formik.errors, `permissions[${index}].key`)}
                setFieldValue={formik.setFieldValue}
                handleChange={formik.handleChange}
                disabled={!isEditable}
              />
            </Col>
            <Col lg={24} xs={24}>
              <MultiLanguageInput
                label={t('DESCRIPTION')}
                fieldPath={['permissions', index, 'description']}
                formik={formik}
                disabled={!isEditable}
              />
            </Col>
          </Row>
        );
      })}
    </Card>
  );
};

export default RolePermissions;
