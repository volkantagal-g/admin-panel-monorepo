import { Button, Tag } from 'antd';

import { Link } from 'react-router-dom';

import permKey from '@shared/shared/permKey.json';
import { ROUTE } from '@app/routes';
import { courierStatuses } from '@shared/shared/constantValues';
import { getLangKey } from '@shared/i18n';
import { getStatusColorForList as getStatusColor } from '../../utils';

export const tableColumns = (t, Can) => [
  {
    title: t('NAME'),
    dataIndex: 'name',
    key: 'name',
    width: 200,
  },
  {
    title: t('GSM'),
    dataIndex: 'gsm',
    key: 'gsm',
    width: 100,
  },
  {
    title: t('ACTIVENESS'),
    dataIndex: 'isActivated',
    key: 'isActivated',
    width: 100,
    render: isActivated => <Tag color={isActivated ? 'green' : 'red'}>{isActivated ? t('ACTIVE') : t('INACTIVE')}</Tag>,
  },
  {
    title: t('STATUS'),
    dataIndex: 'status',
    key: 'status',
    width: 200,
    render: status => <Tag color={getStatusColor(status)}>{courierStatuses[status]?.[getLangKey()]}</Tag>,
  },
  {
    title: t('IS_LOGGED_IN'),
    dataIndex: 'isLoggedIn',
    key: 'isLoggedIn',
    width: 100,
    render: isLoggedIn => <Tag color={isLoggedIn ? 'green' : 'red'}>{isLoggedIn ? t('YES') : t('NO')}</Tag>,
  },
  {
    title: t('ACTION'),
    dataIndex: '_id',
    key: '_id',
    width: 100,
    render: id => {
      const urlPath = ROUTE.COURIER_DETAIL.path;
      const urlPathWithId = urlPath.replace(':id', id);
      return (
        <Can key="updateCourierDetails" permKey={permKey.PAGE_COURIER_DETAIL}>
          <Button
            id={id}
            size="small"
            variant="contained"
            type="default"
          >
            <Link to={urlPathWithId}>{t('DETAIL')}</Link>
          </Button>
        </Can>
      );
    },
  },
];
