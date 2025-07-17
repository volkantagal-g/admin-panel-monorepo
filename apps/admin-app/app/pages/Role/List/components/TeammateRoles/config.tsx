import { Tag, Button } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { get, find } from 'lodash';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { SortOrder } from 'antd/lib/table/interface';

import { t } from '@shared/i18n';
import { ROUTE } from '@app/routes';
import { isMobile } from '@shared/utils/common';
import { ROLE_REQUEST_STATUSES, ROLE_REQUEST_STATES } from '@app/pages/Role/List/constants';

type RoleDescription = {
  en: string;
  tr: string;
}
export type QueryUser = {
  _id: string;
  name: string;
}
export type Role = {
  _id: string;
  name: string;
  description: RoleDescription;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  roleOwners: string[];
  queryUsers: QueryUser[];
}

export type TableOptions = {
  hasAccessToRoleDetailPage: boolean;
  userId: string;
  userRoleIds: string[];
  openRoleRequestModal: (roleId: string) => void;
  openTeammatesModal: (role: Role) => void;
  roleRequests: RoleRequestType[];
}

export const tableColumns = (language: string, options: TableOptions) => {
  const { hasAccessToRoleDetailPage, userId, userRoleIds, openRoleRequestModal, openTeammatesModal, roleRequests } = options;

  const userRolesSet = new Set(userRoleIds || []);
  const requestedRoles = new Set(roleRequests?.filter(r => r.status === ROLE_REQUEST_STATUSES.PENDING).map(r => (r.role as RoleType)._id) || []);
  const columns: ColumnType<Role>[] = [
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
      sorter: (a: Role, b: Role) => {
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
      render: (roleOwners: string[], { _id: roleId }: Role) => {
        if (requestedRoles.has(roleId)) {
          return <Button disabled size="small">{t('rolePage:PENDING')}</Button>;
        }

        if (!userRolesSet.has(roleId)) {
          return <Button type="primary" size="small" onClick={() => openRoleRequestModal(roleId)}>{t('rolePage:JOIN')}</Button>;
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
      sorter: (a: Role, b: Role) => a.name?.trim().localeCompare(b.name?.trim()),
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
    {
      title: t('global:ACTION'),
      align: 'center',
      width: 200,
      render: (role: Role) => {
        const id = role._id;
        const path = ROUTE.ROLE_DETAIL.path.replace(':id', id);

        return (
          <>
            {hasAccessToRoleDetailPage && (
            <Link to={path}>
              <Button type="default" size="small">
                {t('global:DETAIL')}
              </Button>
            </Link>
            )}

            <Button className="ml-1" type="default" onClick={() => openTeammatesModal(role)} size="small">
              {t('rolePage:DISPLAY_TEAMMATES')}
            </Button>
          </>
        );
      },
    },
  ];

  return columns;
};
