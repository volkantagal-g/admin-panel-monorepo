import moment from 'moment';

import { Button, Popconfirm, Skeleton } from 'antd';

import { TFunction } from 'react-i18next';

import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';
import LinkOrText from '@shared/components/UI/LinkOrText';
import { RoleMembershipUpdateModal } from '@shared/components/CorePanel/RoleMembershipUpdateModal';
import RoleMembershipTag from '@shared/components/CorePanel/RoleMembershipTag';
import { isMobile } from '@shared/utils/common';

export type HandleUpdateRoleMembershipProps = { roleId: MongoIDType, userId: MongoIDType, memberType: number, expiryDate: string, afterSuccess: () => void };

type ColumnParameters = {
  t: TFunction;
  userId: MongoIDType;
  handleUpdateRoleMembership: (values: HandleUpdateRoleMembershipProps) => void;
  isUpdatePending: boolean;
  canAccessActions: boolean;
  handleDeleteMembership: (roleId: MongoIDType) => void;
  isDeletePending: boolean;
}

export const getColumns = ({
  t,
  userId,
  handleUpdateRoleMembership,
  isUpdatePending,
  canAccessActions, handleDeleteMembership, isDeletePending,
}: ColumnParameters) => {
  return [
    {
      title: t('NAME_1'),
      dataIndex: 'name',
      key: 'name',
      width: isMobile() ? 200 : undefined,
      sorter: (a: UserRole, b: UserRole) => a.name.localeCompare(b.name),
      defaultSortOrder: 'ascend',
      render: (name: string, record: UserRole) => {
        return <LinkOrText permKey={permKey.PAGE_ROLE_DETAIL} to={ROUTE.ROLE_DETAIL.path.replace(':id', record._id)} text={name} />;
      },
    },
    {
      title: t('MEMBERSHIP_TYPE'),
      dataIndex: 'roleMemberType',
      key: 'roleMemberType',
      align: 'center',
      width: isMobile() ? 100 : 200,
      sorter: {
        compare: (a: UserRole, b: UserRole) => a.roleMemberType - b.roleMemberType,
        multiple: 3,
      },
      defaultSortOrder: 'ascend',
      render: (roleMemberType: number) => <RoleMembershipTag memberType={roleMemberType} />,

    },
    {
      title: t('JOIN_DATE'),
      dataIndex: 'joinedAt',
      key: 'joinedAt',
      width: isMobile() ? 150 : 200,
      sorter: (a: UserRole, b: UserRole) => moment(a.joinedAt).diff(moment(b.joinedAt)),
      render: (data: string) => {
        return moment(data).format('YYYY-MM-DD HH:mm');
      },
    },
    {
      title: t('EXPIRY_DATE'),
      key: 'roleMemberType',
      align: 'center',
      width: isMobile() ? 100 : 200,
      sorter: {
        compare: (a: UserRole, b: UserRole) => a.roleMemberType - b.roleMemberType,
        multiple: 3,
      },
      render: (roleMember: UserRole) => (
        roleMember?.expiryDate
          ? moment.utc(roleMember?.expiryDate).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).format('YYYY-MM-DD')
          : 'N/A'
      ),
    },

    ...(canAccessActions ? [
      {
        title: t('ACTION'),
        align: 'center',
        key: 'action',
        width: 150,
        render: (record: UserRole) => {
          const { _id, roleMemberType, expiryDate } = record;
          return (
            <Skeleton loading={isDeletePending} active paragraph={false}>
              <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                <RoleMembershipUpdateModal
                  roleId={_id}
                  userId={userId}
                  initialMemberType={roleMemberType}
                  onUpdate={handleUpdateRoleMembership}
                  isUpdatePending={isUpdatePending}
                  expiryDate={expiryDate}
                />
                <DeleteRoleMembershipModal roleId={_id} onDelete={handleDeleteMembership} t={t} />
              </div>
            </Skeleton>
          );
        },
      },

    ] : []),

  ];
};

function DeleteRoleMembershipModal({ roleId, onDelete, t }: { roleId: MongoIDType, onDelete: (roleId: MongoIDType) => void, t: TFunction }) {
  return (
    <Popconfirm
      title={t('COMMON_CONFIRM_TEXT')}
      onConfirm={() => {
        onDelete(roleId);
      }}
      okText={t('YES')}
      cancelText={t('NO')}
    >
      <Button type="primary" size="small" danger>{t('DELETE')}</Button>
    </Popconfirm>

  );
}
