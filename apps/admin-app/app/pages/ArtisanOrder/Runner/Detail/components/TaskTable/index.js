import { Button, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import moment from 'moment';

import permKey from '@shared/shared/permKey.json';

import useSharedStyles from '../../styles';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { ROUTE } from '@app/routes';
import useStyles from './styles';
import { usePermission } from '@shared/hooks';

function TaskTable({ tasks }) {
  const { Text } = Typography;
  const { t } = useTranslation(['runnerDetailPage', 'getirLocals']);
  const sharedClasses = useSharedStyles();
  const classes = useStyles();
  const { canAccess } = usePermission();

  const columns = [
    {
      title: t('DATE'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: createdAt => <><Text>{moment(createdAt).format('HH:MM')}</Text><br /><Text>{moment(createdAt).format('DD/MM/YYYY')}</Text></>,
    },
    { title: t('ORDER_TYPE'), dataIndex: 'type', key: 'type', render: type => t(type) },
    {
      title: t('RUNNER_STATUS'),
      dataIndex: 'taskStatus',
      key: 'taskStatus',
      render: taskStatus => <Text className={classes.capitalizedText}>{t(`getirLocals:RUNNER.${taskStatus}`)}</Text>,
    },
    {
      title: '',
      dataIndex: 'orderId',
      key: 'orderId',
      render: orderId => (canAccess(permKey.PAGE_GL_RUNNER_DETAIL) ? (
        <Link
          component={Button}
          to={ROUTE.ARTISAN_ORDER_DETAIL.path.replace(':orderDetailId', orderId)}
        >{t('DETAIL')}
        </Link>
      ) : orderId),
    },
  ];

  return (
    <div className={sharedClasses.sectionContainer}>
      <Text className={sharedClasses.sectionTitle}>{t('ORDERS')}</Text>
      <div className="mt-4">
        <AntTableV2 scroll={{ y: '80vh' }} data={tasks} columns={columns} />
      </div>
    </div>
  );
}

export default TaskTable;
