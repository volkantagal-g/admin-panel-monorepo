import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { FunctionComponent } from 'react';

import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';
import { INTERNAL_TEAM_STATUS_NAMES } from '@app/pages/InternalAuthentication/constants';

import { InternalTeam } from '../../../../types';

type TranslationFn = (s: string) => string;
export const tableColumns = ({ t, Can }: { t: TranslationFn; Can: FunctionComponent }) => [
  {
    title: t('NAME'),
    dataIndex: 'name',
    key: 'name',
    defaultSortOrder: 'ascend',
    sorter: (a: InternalTeam, b: InternalTeam) => a.name.localeCompare(b.name),
  },
  {
    title: t('DESCRIPTION'),
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: t('STATUS'),
    dataIndex: 'status',
    key: 'status',
    render: (status: number) => t(INTERNAL_TEAM_STATUS_NAMES[status]),
  },
  {
    title: t('ACTION'),
    align: 'right',
    dataIndex: '_id',
    key: '_id',
    width: 80,
    render: (_id: string) => {
      const path = ROUTE.INTERNAL_AUTHENTICATION_TEAM_DETAIL.path.replace(':id', _id);

      return (
        <Can permKey={permKey.PAGE_INTERNAL_AUTHENTICATION_TEAM_DETAIL}>
          <Link to={path}>
            <Button type="default" size="small">
              {t('DETAIL')}
            </Button>
          </Link>
        </Can>
      );
    },
  },
];
