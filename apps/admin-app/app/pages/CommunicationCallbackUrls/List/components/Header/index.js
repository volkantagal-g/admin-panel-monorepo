import { memo } from 'react';
import { PageHeader, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

import { ROUTE } from '@app/routes';

const Header = () => {
  const { t } = useTranslation('communicationCallbackUrlsPage');
  return (
    <PageHeader
      ghost={false}
      className="mb-3"
      title={t('COMMUNICATION_CALLBACK_URLS_LIST')}
      extra={[
        <Link key="NEW_COMMUNICATION_CALLBACK_URLS_LIST" to={ROUTE.COMMUNICATION_CALLBACK_URLS_NEW.path}>
          <Button type="primary" icon={<PlusOutlined />}>
            {t('NEW_COMMUNICATION_CALLBACK_URLS_BTN')}
          </Button>
        </Link>,
      ]}
    />
  );
};

export default memo(Header);
