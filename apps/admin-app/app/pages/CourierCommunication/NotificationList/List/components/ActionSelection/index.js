import { Button, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { ROUTE } from '@app/routes';
import { Creators } from '@app/pages/CourierCommunication/NotificationList/List/redux/action';
import useStyles from '@app/pages/CourierCommunication/NotificationList/List/components/ActionSelection/styles';

const ActionSelection = ({ notificationData }) => {
  const { _id, courierIds, name, channel, priority, notification, category } = notificationData;
  const { t } = useTranslation(['courierCommunication', 'global']);
  const classes = useStyles();
  const dispatch = useDispatch();
  const detailPageRoutePath =
    ROUTE.COURIER_COMMUNICATION_NOTIFICATION_DETAIL.path.replace(':id', _id);

  const handleDuplicateNotification = () => {
    const duplicationData = {
      courierIds,
      notificationName: `${name} (duplicated)`,
      channel,
      priority,
      notification,
      category,
    };
    dispatch(Creators.duplicateNotification(duplicationData));
  };

  return (
    <Space>
      <Button
        className={classes.actionButton}
      >
        <Link to={detailPageRoutePath}>
          {t('DETAIL')}
        </Link>
      </Button>
      <Button
        onClick={handleDuplicateNotification}
        className={classes.actionButton}
      >{t('DUPLICATE')}
      </Button>
    </Space>
  );
};

export default ActionSelection;
