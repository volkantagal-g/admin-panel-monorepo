import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { FunctionComponent } from 'react';

import { ROUTE } from '@app/routes';
import { DbInternalService } from '@app/pages/InternalAuthentication/types';
import permKey from '@shared/shared/permKey.json';
import { INTERNAL_SERVICE_STATUS_NAMES } from '@app/pages/InternalAuthentication/constants';

type TranslationFn = (s: string) => string;
export const tableColumns = ({ t, Can }: { t: TranslationFn; Can: FunctionComponent }) => [
  {
    title: t('NAME'),
    dataIndex: 'name',
    key: 'name',
    defaultSortOrder: 'ascend',
    sorter: (a: DbInternalService, b: DbInternalService) => a.name.localeCompare(b.name),
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
    render: (status: number) => t(INTERNAL_SERVICE_STATUS_NAMES[status]),
  },
  {
    title: t('ACTION'),
    align: 'right',
    key: 'action',
    width: 80,
    render: (service: DbInternalService) => {
      const path = ROUTE.INTERNAL_AUTHENTICATION_SERVICE_DETAIL.path.replace(':teamId', service.teamId).replace(':serviceId', service._id);

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
