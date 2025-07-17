import { useEffect } from 'react';
import { Modal, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Creators } from '@app/pages/CourierCommunication/NotificationList/Detail/redux/actions';
import { notificationSelector } from '../../redux/selectors';

const NotificationStats = props => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(Creators.getNotificationStats({ id }));
  }, [dispatch, id]);

  const { show, close } = props;
  const { t } = useTranslation('courierCommunication');

  const notificationStatsData = useSelector(notificationSelector?.getNotifStatData);
  const notificationStatPending = useSelector(notificationSelector?.getNotifStatPending);

  return (
    <Modal
      title={t('courierCommunication:NOTIFICATION_STATISTICS')}
      visible={show}
      onOk={close}
      cancelButtonProps={{ style: { display: 'none' } }}
      closable={false}
    >
      {
        notificationStatPending ? <Spin /> : (
          <>
            <p>{t('courierCommunication:NOTIFICATION_SENT')}<b>{notificationStatsData?.data?.totalRead}</b></p>
            <p>{t('courierCommunication:NOTIFICATION_READ')}<b>{notificationStatsData?.data?.totalRead}</b></p>
            <p>{t('courierCommunication:NOTIFICATION_UNREAD')}<b>{notificationStatsData?.data?.totalUnread}</b></p>
          </>
        )
      }
    </Modal>
  );
};

export default NotificationStats;
