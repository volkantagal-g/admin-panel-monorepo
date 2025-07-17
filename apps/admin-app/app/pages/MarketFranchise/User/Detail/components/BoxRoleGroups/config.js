import { Tooltip, Button, Popconfirm } from 'antd';
import { InfoCircleTwoTone, DeleteOutlined } from '@ant-design/icons';
import { get } from 'lodash';

import { DetailButton } from '@shared/components/UI/List';
import { getLangKey } from '@shared/i18n';

export const tableColumns = (t, isFormEditable, deleteRoleGroupFromEditableRoleGroups) => {
  return [
    {
      title: t('GROUP'),
      key: 'name',
      render: roleGroup => roleGroup?.name && (
        <Tooltip placement="left" title={roleGroup.name[getLangKey()]}>
          <InfoCircleTwoTone className="mr-2" />
          {roleGroup.name[getLangKey()].toUpperCase()}
        </Tooltip>
      ),
    },
    {
      width: 60,
      render: roleGroup => (isFormEditable ? (
        <Popconfirm
          placement="topRight"
          title={t('COMMON_CONFIRM_TEXT')}
          onConfirm={() => deleteRoleGroupFromEditableRoleGroups(roleGroup._id)}
          okButtonProps={{ type: 'danger' }}
        >
          <Button type="danger" icon={<DeleteOutlined />} />
        </Popconfirm>
      ) :
        DetailButton({
          _id: get(roleGroup, '_id'),
          urlPath: '/marketFranchise/user/roleGroup/detail/',
        })
      ),
    },
  ];
};
