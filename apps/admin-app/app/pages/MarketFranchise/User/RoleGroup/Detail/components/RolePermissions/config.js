import { DeleteOutlined, InfoCircleTwoTone, EditOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Badge, Button, Space, Tooltip, Select, Popconfirm } from 'antd';
import { get } from 'lodash';

import { getLangKey } from '@shared/i18n';
import { SelectWrapper } from '@shared/components/UI/Form';
import { getPermissionOptions } from './utils';

const { Option } = Select;

export const tableColumns = ({ t, handleOnRemove, toggleEditable, isEditable, editablePermission, classes, roleList, editFormik }) => {
  return [
    {
      title: t('GROUP'),
      key: 'roleDetail',
      render: ({ roleDetail }) => {
        if (!roleDetail) {
          return null;
        }
        return (
          <Tooltip placement="left" title={roleDetail.descriptions[getLangKey()]}>
            <InfoCircleTwoTone className="mr-2" />
            {roleDetail.key.toUpperCase()}
          </Tooltip>
        );
      },
    },
    {
      title: t('PERMISSIONS'),
      key: 'permissions',
      render: ({ role, permissions, editMode }) => {
        const BadgeText = ({ permission }) => (
          <Tooltip placement="left" title={permission.description[getLangKey()]}>
            {permission.key}
          </Tooltip>
        );
        const permissionOptions = getPermissionOptions(roleList, role);

        return (
          <div className={classes.tableSelectContainer}>
            {editMode ? (
              <SelectWrapper
                selectKey={role}
                value={editFormik.values?.permissions}
                onChangeCallback={perms => editFormik.setFieldValue('permissions', perms)}
                hasError={get(editFormik.errors, 'permissions')}
                isTouched={get(editFormik.touched, 'permissions')}
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
            ) : (
              <Space direction="vertical">
                {permissions.map(
                  permission => permission && <Badge key={permission.key} color="green" text={<BadgeText permission={permission} />} />,
                )}
              </Space>
            )}
          </div>
        );
      },
    },
    {
      title: '',
      key: 'role',
      width: '20%',
      render: permissionItem => {
        const { editMode, role } = permissionItem;
        return (
          <Space direction="horizontal">
            {editMode && editablePermission.role === role ? (
              <>
                <Button type="default" onClick={() => toggleEditable(null)} icon={<CloseOutlined />} disabled={!isEditable} />
                <Button type="primary" onClick={() => editFormik.handleSubmit()} icon={<CheckOutlined />} disabled={!isEditable} />
              </>
            ) : (
              <>
                <Button
                  type="default"
                  onClick={() => toggleEditable(permissionItem)}
                  icon={<EditOutlined />}
                  disabled={!isEditable || editablePermission}
                />
                <Popconfirm
                  disabled={!isEditable || editablePermission}
                  placement="topRight"
                  title={t('COMMON_CONFIRM_TEXT')}
                  onConfirm={() => handleOnRemove(role)}
                >
                  <Button disabled={!isEditable || editablePermission} type="danger" icon={<DeleteOutlined />} />
                </Popconfirm>
              </>
            )}
          </Space>
        );
      },
    },
  ];
};
