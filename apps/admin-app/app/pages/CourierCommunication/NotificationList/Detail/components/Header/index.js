import { useState } from 'react';
import { Row, PageHeader, Col, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { notificationSelector } from '@app/pages/CourierCommunication/NotificationList/Detail/redux/selectors';
import NotificationStatus from '@app/pages/CourierCommunication/NotificationList/Detail/components/NotificationStatus';
import NotificationStats from '@app/pages/CourierCommunication/NotificationList/Detail/components/NotificationStats';
import useStyles from '@app/pages/CourierCommunication/NotificationList/Detail/components/Header/styles';

const Header = () => {
  const { t } = useTranslation(['global', 'courierCommunication']);
  const classes = useStyles();
  const [modal, setModal] = useState(false);

  const notification = useSelector(notificationSelector.getData);

  return (
    <Row>
      <PageHeader
        className="p-0 page-title"
        title={t('global:PAGE_TITLE.COURIER_COMMUNICATION.DETAIL')}
      />
      <div className={classes.labelContainer}>
        <span>{notification?._id}</span>
      </div>
      <NotificationStatus status={notification?.status} />
      <Col className={classes.notifStats}>
        <Button type="primary" onClick={() => setModal(true)}> {t('courierCommunication:NOTIFICATION_STATISTICS')} </Button>
        { modal ? <NotificationStats show={modal} close={() => setModal(false)} /> : null}
      </Col>
    </Row>
  );
};

export default Header;
