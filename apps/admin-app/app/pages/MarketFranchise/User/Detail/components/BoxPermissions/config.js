import { DeleteOutlined, InfoCircleTwoTone } from '@ant-design/icons';
import { Badge, Button, Space, Tooltip, Popconfirm } from 'antd';

import { getLangKey } from '@shared/i18n';
import { getPermissionDescription } from '../../utils';

export const tableColumns = (t, isFormEditable, classes, handleOnRemove) => {
  return [
    {
      title: t('GROUP'),
      key: 'role',
      render: ({ role }) => (
        <div>
          <Tooltip placement="left" title={role.descriptions[getLangKey()]}>
            <InfoCircleTwoTone className="mr-2" />
            {role.key.toUpperCase()}
          </Tooltip>
        </div>
      ),
    },
    {
      title: t('PERMISSIONS'),
      key: 'permissions',
      render: ({ role, permissions }) => {
        const BadgeText = ({ permission }) => (
          <Tooltip placement="left" title={getPermissionDescription(role, permission)}>
            {permission}
          </Tooltip>
        );
        return (
          <div className={classes.tableSelectContainer}>
            <Space direction="vertical">
              {permissions.map(
                permission => permission && <Badge key={permission} color="green" text={<BadgeText permission={permission} />} />,
              )}
            </Space>
          </div>
        );
      },
    },
    {
      width: 60,
      render: obj => isFormEditable && (
        <Popconfirm
          placement="topRight"
          title={t('COMMON_CONFIRM_TEXT')}
          onConfirm={() => handleOnRemove(obj.role._id)}
          okButtonProps={{ type: 'danger' }}
        >
          <Button type="danger" icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];
};
