import { memo } from 'react';
import { PageHeader, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

import { ROUTE } from '@app/routes';

const Header = () => {
  const { t } = useTranslation('transactionalNotificationPage');
  return (
    <PageHeader
      ghost={false}
      className="mb-3"
      title={t('TRANSACTIONAL_NOTIFICATION_LIST')}
      extra={[
        <Link key="NEW_TRANSACTIONAL_NOTIFICATION_BTN" to={ROUTE.TRANSACTIONAL_NOTIFICATION_NEW.path}>
          <Button type="primary" icon={<PlusOutlined />}>
            {t('NEW_TRANSACTIONAL_NOTIFICATION')}
          </Button>
        </Link>,
      ]}
    />
  );
};

export default memo(Header);
