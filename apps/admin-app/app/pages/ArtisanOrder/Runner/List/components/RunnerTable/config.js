import { Button, Tag } from 'antd';
import { Link } from 'react-router-dom';

import permKey from '@shared/shared/permKey.json';
import { ROUTE } from '@app/routes';
import { RUNNER_STATUSES } from '../../constants';

export const tableColumns = ({ t, canAccess }) => [
  {
    title: t('STATUS'),
    dataIndex: 'status',
    key: 'status',
    width: 200,
    render: status => {
      const color = status === RUNNER_STATUSES.INACTIVE ? 'error' : 'success';
      const text = t(`STATUS_${status}`) || 'unknown';
      return <Tag color={color}>{text}</Tag>;
    },
  },
  {
    title: t('NAME'),
    dataIndex: 'nameSurname',
    key: 'nameSurname',
    width: 200,
    render: nameSurname => {
      return nameSurname;
    },
  },
  {
    title: t('GSM'),
    dataIndex: 'cellPhone',
    key: 'cellPhone',
    width: 200,
    render: cellPhone => {
      return cellPhone;
    },
  },
  {
    title: t('WAREHOUSE'),
    dataIndex: 'warehouse',
    key: 'warehouse',
    width: 200,
    render: warehouse => {
      return warehouse;
    },
  },
  {
    dataIndex: 'runnerUuid',
    key: 'runnerUuid',
    width: 200,
    render: runnerUuid => {
      const path = ROUTE.GL_RUNNER_DETAIL.path.replace(':id', runnerUuid);

      return (
        canAccess(permKey.PAGE_GL_RUNNER_DETAIL) ? (
          <Link to={path}>
            <Button type="default" size="small">
              {t('DETAIL')}
            </Button>
          </Link>
        ) : runnerUuid
      );
    },
  },
];
