import { memo, useState } from 'react';
import { PageHeader, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { PlusOutlined, RobotOutlined } from '@ant-design/icons';

import { ROUTE } from '@app/routes';
import ConnectedContentModal from '@shared/containers/Marketing/ConnectedContentModal';
import IconManagementDrawer from '@app/pages/PushNotification/List/components/IconManagementDrawer';

const Header = () => {
  const { t } = useTranslation('marketing');
  const [showIconManagementDrawer, setShowIconManagementDrawer] = useState(false);
  return (
    <>
      <PageHeader
        ghost={false}
        className="mb-3"
        title={t('PUSH_NOTIFICATION_LIST')}
        extra={[
          <Button
            type="secondary"
            icon={<RobotOutlined />}
            key="ICON_MANAGEMENT_BTN"
            onClick={() => {
              setShowIconManagementDrawer(true);
            }}
          >
            {t('ICON_MANAGEMENT')}
          </Button>,
          <ConnectedContentModal key="CONNECTED_CONTENT_MODAL" />,
          <Link key="NEW_NOTIF_BTN" to={ROUTE.PUSH_NOTIFICATION_NEW.path}>
            <Button type="primary" icon={<PlusOutlined />}>
              {t('NEW_PUSH_NOTIFICATION')}
            </Button>
          </Link>,
        ]}
      />
      <IconManagementDrawer destroyOnClose visible={showIconManagementDrawer} setVisible={setShowIconManagementDrawer} />
    </>

  );
};

export default memo(Header);
