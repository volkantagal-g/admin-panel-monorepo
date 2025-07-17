import { get } from 'lodash';
import { Button, Space } from 'antd';
import { Link } from 'react-router-dom';
import { TFunction } from 'react-i18next';
import { ColumnsType } from 'antd/lib/table';

import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';
import { isMobile } from '@shared/utils/common';

type DisplayListItemProps = {
  id: number;
  actionTitle: string;
  title: string;
  type: string;
}

export const displayTypes = {
  ROLE: 'ROLE',
  COUNTRY: 'COUNTRY',
} as const;

const translatePrefixes = {
  ROLE: 'LISTING_MODALS.ROLES',
  COUNTRY: 'LISTING_MODALS.COUNTRIES',
} as const;

export const displayList = ({ t }: { t: TFunction }): Array<DisplayListItemProps> => {
  return [
    {
      id: 1,
      actionTitle: t(`${translatePrefixes.ROLE}.ACTION_TITLE`),
      title: t(`${translatePrefixes.ROLE}.TITLE`),
      type: displayTypes.ROLE,
    },
    {
      id: 2,
      actionTitle: t(`${translatePrefixes.COUNTRY}.ACTION_TITLE`),
      title: t(`${translatePrefixes.COUNTRY}.TITLE`),
      type: displayTypes.COUNTRY,
    },
  ];
};

export const roleTableColumns = ({ t, canAccess }: { t: TFunction, canAccess: Function }): ColumnsType => {
  const columns: ColumnsType = [
    {
      title: t('NAME'),
      dataIndex: 'name',
      width: isMobile() ? 150 : undefined,
      key: 'name',
      render: (name: string) => {
        return name;
      },
    },
    {
      title: t('MEMBERSHIP_TYPE'),
      dataIndex: 'roleMemberType',
      width: 100,
      key: 'roleMemberType',
      align: 'center',
      render: (roleMemberType: number) => {
        return t(`rolePage:ROLE_MEMBER_TYPE.${roleMemberType}`);
      },
    },
  ];

  if (canAccess(permKey.PAGE_ROLE_DETAIL)) {
    columns.push(
      {
        title: t('ACTION'),
        width: 100,
        align: 'center',
        render: (record: UserRole) => {
          const id = get(record, '_id', '');
          const path = ROUTE.ROLE_DETAIL.path.replace(':id', id);
          return (
            <Space>
              <Link to={path}>
                <Button type="default" size="small" disabled={!canAccess(permKey.PAGE_ROLE_DETAIL)}>
                  {t('DETAIL')}
                </Button>
              </Link>
            </Space>
          );
        },
      },
    );
  }

  return columns;
};
