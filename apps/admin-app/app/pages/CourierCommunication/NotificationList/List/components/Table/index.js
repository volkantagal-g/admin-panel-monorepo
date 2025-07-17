import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Card } from 'antd';

import Table from './Table';
import { tableColumns } from './config';
import { notificationList } from '../../redux/selector';
import permKey from '@shared/shared/permKey.json';

import { usePermission } from '@shared/hooks';

import useStyles from './styles';

const NotificationsTable = ({ pagination, handlePagination }) => {
  const classes = useStyles();
  const { t } = useTranslation(['courierCommunication', 'global']);
  const { canAccess } = usePermission();

  const notifications = useSelector(notificationList?.getNotificationListData);

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    handlePagination({ currentPage, rowsPerPage });
  };

  return (
    <Card className={classes.root}>
      {canAccess(permKey.PAGE_COURIER_COMMUNICATION_NOTIFICATION_LIST) && (
        <Table
          data={notifications?.notificationTasks}
          columns={tableColumns({ t })}
          pagination={pagination}
          handlePaginationChange={handlePaginationChange}
        />
      )}
    </Card>
  );
};

export default NotificationsTable;
