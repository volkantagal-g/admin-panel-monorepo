import { memo } from 'react';
import { PageHeader, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

import { ROUTE } from '@app/routes';

const Header = () => {
  const { t } = useTranslation('transactionalSmsPage');
  return (
    <PageHeader
      ghost={false}
      className="mb-3"
      title={t('TRANSACTIONAL_SMS_LIST')}
      extra={[
        <Link key="NEW_TRANSACTIONAL_SMS_BTN" to={ROUTE.TRANSACTIONAL_SMS_NEW.path}>
          <Button type="primary" icon={<PlusOutlined />}>
            {t('NEW_TRANSACTIONAL_SMS')}
          </Button>
        </Link>,
      ]}
    />
  );
};

export default memo(Header);
