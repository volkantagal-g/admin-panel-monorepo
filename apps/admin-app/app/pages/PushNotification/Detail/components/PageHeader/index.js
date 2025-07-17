import { Button, PageHeader, Tag } from 'antd';
import { get } from 'lodash';
import { DotChartOutlined, FileDoneOutlined, SendOutlined } from '@ant-design/icons';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { usePermission } from '@shared/hooks';

import useStyles from '@app/pages/PushNotification/Detail/styles';

import { notificationProcessStatus } from '@app/pages/PushNotification/constantValues';
import { getLangKey } from '@shared/i18n';
import { isUserInfoModalAvailable } from '@app/pages/PushNotification/utils';
import permKey from '@shared/shared/permKey.json';

const NotificationPageHeader = ({
  notificationId, isNotificationPending, isCountryNotification, notificationDetail,
  setIsTestNotificationModalVisible, setIsSendingUserInformationModalVisible, setIsStatisticsModalVisible,
}) => {
  const classes = useStyles();
  const { canAccess } = usePermission();
  const { t } = useTranslation('marketing');
  return (
    <PageHeader
      ghost={false}
      className={classes.notificationHeader}
      title={t('PUSH_NOTIFICATION_DETAIL')}
      tags={
        !isNotificationPending &&
        // TODO: next phase colors will depends on process status (error: red , done : green etc...)
        <Tag color="cyan">{get(notificationProcessStatus[notificationDetail.processStatus], getLangKey(), '')}</Tag>
      }
      subTitle={notificationId}
      extra={(!isNotificationPending && isCountryNotification) && [
        canAccess(permKey.PAGE_PUSH_NOTIFICATION_CAN_TEST_CAMPAIGN) && (
        <Button
          key="PUSH_NOTIFICATION_TEST_NOTICE"
          type="primary"
          onClick={() => {
            setIsTestNotificationModalVisible(true);
          }}
          icon={<SendOutlined />}
        >{t('PUSH_NOTIFICATION_TEST_NOTICE')}
        </Button>
        ),
        <Button
          disabled={!isUserInfoModalAvailable(notificationDetail)}
          onClick={() => {
            setIsSendingUserInformationModalVisible(true);
          }}
          hidden={isNotificationPending}
          key="SENDING_USER_STATUS"
          icon={<FileDoneOutlined />}
        >{t('SENDING_USER_STATUS')}
        </Button>,
        <Button
          key="NOTIFICATION_STATISTICS"
          onClick={() => {
            setIsStatisticsModalVisible(true);
          }}
          hidden={isNotificationPending}
          icon={<DotChartOutlined />}
        >{t('NOTIFICATION_STATISTICS')}
        </Button>,
      ]}
    />
  );
};

export default memo(NotificationPageHeader);
