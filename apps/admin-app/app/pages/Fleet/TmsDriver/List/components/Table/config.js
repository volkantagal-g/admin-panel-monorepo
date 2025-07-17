import { Button, Tag } from 'antd';
import { Link } from 'react-router-dom';

import { getStatusColorForList as getStatusColor } from '@app/pages/Courier/List/utils';
import { courierStatuses } from '@shared/shared/constantValues';
import { getLangKey } from '@shared/i18n';
import { ROUTE } from '@app/routes';

export const getTableColumns = t => {
  return [
    {
      title: t('courierPage:NAME'),
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: t('courierPage:GSM'),
      dataIndex: 'gsm',
      key: 'gsm',
      width: 100,
    },
    {
      title: t('courierPage:ACTIVENESS'),
      dataIndex: 'isActivated',
      key: 'isActivated',
      width: 100,
      render: isActivated => <Tag color={isActivated ? 'green' : 'red'}>{isActivated ? t('ACTIVE') : t('INACTIVE')}</Tag>,
    },
    {
      title: t('courierPage:STATUS'),
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: status => <Tag color={getStatusColor(status)}>{courierStatuses[status]?.[getLangKey()]}</Tag>,
    },
    {
      title: t('courierPage:IS_LOGGED_IN'),
      dataIndex: 'isLoggedIn',
      key: 'isLoggedIn',
      width: 100,
      render: isLoggedIn => <Tag color={isLoggedIn ? 'green' : 'red'}>{isLoggedIn ? t('YES') : t('NO')}</Tag>,
    },
    {
      title: t('global:ACTION'),
      dataIndex: '_id',
      key: 'action',
      width: 100,
      render: _id => {
        const path = ROUTE.TMS_DRIVER_DETAIL.path.replace(':id', _id);
        return (
          <Button>
            <Link to={path}>{t('DETAIL')}</Link>
          </Button>
        );
      },
    },
  ];
};
