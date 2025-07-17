import { Tag, Button, Space } from 'antd';
import { get } from 'lodash';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { TFunction } from 'react-i18next';
import { SortOrder } from 'antd/lib/table/interface';

import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';
import { isMobile } from '@shared/utils/common';
import { displayList } from '../ListingModal/config';
import ListingModal from '../ListingModal';

export const tableColumns = ({ t, canAccess }: { t: TFunction, canAccess: (permKey: string) => boolean }) => [
  {
    title: t('ACTIVENESS'),
    dataIndex: 'isActive',
    key: 'isActive',
    align: 'center',
    width: 80,
    render: (isActive: boolean) => {
      const color = isActive ? 'success' : 'error';
      const text = isActive ? t('ACTIVE') : t('INACTIVE');
      return (
        <Tag color={color}>
          {text}
        </Tag>
      );
    },
  },
  {
    title: t('EMAIL'),
    dataIndex: 'email',
    key: 'email',
    width: isMobile() ? 120 : 200,
    render: (email: string) => {
      return email;
    },
  },
  {
    title: t('NAME'),
    dataIndex: 'name',
    defaultSortOrder: 'ascend',
    width: isMobile() ? 120 : undefined,
    sorter: () => {},
    key: 'name',
    render: (name: string) => {
      return name;
    },
  },
  {
    title: t('CREATED_AT'),
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: isMobile() ? 120 : 200,
    sorter: () => {},
    render: (createdAt: string) => {
      if (!createdAt) return 'N/A';

      return moment(createdAt).format('YYYY-MM-DD HH:mm');
    },
  },
  {
    title: t('ACTION'),
    align: 'center',
    width: 270,
    render: (record: UserType) => {
      const id = get(record, '_id', '');
      const path = ROUTE.USER_DETAIL.path.replace(':id', id);
      const { countries, roles, _id: userId, hasGlobalAccess } = record;
      const userData = { userId, countries, roles, hasGlobalAccess };
      return (
        <Space>
          {displayList({ t }).map(modalItem => {
            return (
              <ListingModal
                key={modalItem.id}
                actionTitle={modalItem.actionTitle}
                title={modalItem.title}
                type={modalItem.type}
                data={userData}
              />
            );
          })}
          {canAccess(permKey.PAGE_USER_DETAIL) && (
            <Link to={path}>
              <Button type="default" size="small">
                {t('DETAIL')}
              </Button>
            </Link>
          )}
        </Space>
      );
    },
  },
];
