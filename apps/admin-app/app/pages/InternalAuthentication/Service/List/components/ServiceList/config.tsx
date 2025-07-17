import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { FunctionComponent } from 'react';

import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';
import { INTERNAL_SERVICE_STATUS_NAMES } from '@app/pages/InternalAuthentication/constants';

import { DbInternalServiceWithTeam } from '../../../../types';

type TranslationFn = (s: string) => string;
export const tableColumns = ({ t, Can }: { t: TranslationFn; Can: FunctionComponent }) => [
  {
    title: t('NAME'),
    dataIndex: 'name',
    key: 'name',
    defaultSortOrder: 'ascend',
    sorter: (a: DbInternalServiceWithTeam, b: DbInternalServiceWithTeam) => a.name.localeCompare(b.name),
  },
  {
    title: t('DESCRIPTION'),
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: t('TEAM_NAME'),
    dataIndex: ['team', 'name'],
    key: 'team.name',
  },
  {
    title: t('STATUS'),
    dataIndex: 'status',
    key: 'status',
    render: (status: number) => t(INTERNAL_SERVICE_STATUS_NAMES[status]),
  },
  {
    title: t('ACTION'),
    align: 'right',
    key: 'action',
    width: 80,
    render: (service: DbInternalServiceWithTeam) => {
      const path = ROUTE.INTERNAL_AUTHENTICATION_SERVICE_DETAIL.path.replace(':teamId', service.team._id).replace(':serviceId', service._id);

      return (
        <Can permKey={permKey.PAGE_INTERNAL_AUTHENTICATION_SERVICE_DETAIL}>
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
