import { Tag, Button } from 'antd';
import { get, find } from 'lodash';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { ColumnType, SortOrder } from 'antd/lib/table/interface';

import { LangKeyType, t } from '@shared/i18n';
import { ROUTE } from '@app/routes';
import { ROLE_REQUEST_STATUSES } from '@app/pages/Role/List/constants';
import { isMobile } from '@shared/utils/common';

export const tableColumns = (
  language: LangKeyType,
  {
    hasAccessToRoleDetailPage,
    userId,
    userRoleIds,
    openRoleRequestModal,
    roleRequests,
  }: {
    hasAccessToRoleDetailPage: boolean,
    userId: MongoIDType,
    userRoleIds: MongoIDType[],
    openRoleRequestModal: (roleId: MongoIDType) => () => void,
    roleRequests: RoleRequestType[],
  },
) => {
  const userRolesSet = new Set(userRoleIds || []);
  const requestedRoles = new Set(roleRequests?.filter(r => r.status === ROLE_REQUEST_STATUSES.PENDING).map(r => (r.role as RoleType)._id) || []);
  const columns: ColumnType<RoleType>[] = [
    {
      title: t('global:ACTIVENESS'),
      dataIndex: 'isActive',
      key: 'isActive',
      align: 'center',
      width: 80,
      render: (isActive: boolean) => {
        const color = isActive ? 'success' : 'error';
        const text = isActive ? t('global:ACTIVE') : t('global:INACTIVE');
        return (
          <Tag color={color}>
            {text}
          </Tag>
        );
      },
    },
    {
      title: t('rolePage:YOUR_PERMISSION_LEVEL'),
      dataIndex: 'roleOwners',
      key: 'roleOwners',
      sorter: (a: RoleType, b: RoleType) => {
        const aIsOwner = find(a.roleOwners, roleOwner => roleOwner === userId);
        const bIsOwner = find(b.roleOwners, roleOwner => roleOwner === userId);
        if (aIsOwner && !bIsOwner) {
          return -1;
        }
        if (!aIsOwner && bIsOwner) {
          return 1;
        }

        const aIsMember = userRolesSet.has(a._id);
        const bIsMember = userRolesSet.has(b._id);
        if (aIsMember && !bIsMember) {
          return -1;
        }
        if (!aIsMember && bIsMember) {
          return 1;
        }

        return 0;
      },
      align: 'center',
      width: 140,
      render: (roleOwners: MongoIDType[], { _id: roleId }: { _id: MongoIDType }) => {
        if (requestedRoles.has(roleId)) {
          return <Button disabled size="small">{t('rolePage:PENDING')}</Button>;
        }

        if (!userRolesSet.has(roleId)) {
          return <Button type="primary" size="small" onClick={openRoleRequestModal(roleId)}>{t('rolePage:JOIN')}</Button>;
        }

        const isTheUserOwnerOfTheRole = find(roleOwners, roleOwner => roleOwner === userId);
        const text = isTheUserOwnerOfTheRole ? t('rolePage:ROLE_OWNER') : t('global:STANDARD');
        return (
          <Tag>
            {text}
          </Tag>
        );
      },
    },
    {
      title: t('global:NAME'),
      dataIndex: 'name',
      key: 'name',
      sorter: (a: RoleType, b: RoleType) => a.name?.trim().localeCompare(b.name?.trim()),
      defaultSortOrder: 'ascend',
      width: 250,
      render: (name: string) => {
        return name;
      },
    },
    {
      title: t('global:DESCRIPTION'),
      dataIndex: 'description',
      key: 'description',
      width: isMobile() ? 350 : undefined,
      render: (description: string) => {
        return <div>{get(description, language, '')}</div>;
      },
    },
    {
      title: t('CREATED_AT'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
      sorter: true,
      render: (createdAt: string) => {
        if (!createdAt) {
          return 'N/A';
        }
        return moment(createdAt).format('YYYY-MM-DD HH:mm');
      },
    },
  ];

  if (hasAccessToRoleDetailPage) {
    columns.push({
      title: t('global:ACTION'),
      align: 'center',
      width: 120,
      render: (record: RoleType) => {
        const id = get(record, '_id', '');
        const path = ROUTE.ROLE_DETAIL.path.replace(':id', id);

        return (
          <Link to={path}>
            <Button type="default" size="small">
              {t('global:DETAIL')}
            </Button>
          </Link>
        );
      },
    });
  }

  return columns;
};
