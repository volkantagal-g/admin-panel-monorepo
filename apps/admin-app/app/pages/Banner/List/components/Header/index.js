import { memo } from 'react';
import { PageHeader, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

import { ROUTE } from '@app/routes';

const Header = () => {
  const { t } = useTranslation('marketing');
  return (
    <PageHeader
      ghost={false}
      className="mb-3"
      title={t('BANNER_LIST')}
      extra={[
        <Link key="NEW_BANNER_BTN" to={ROUTE.BANNER_NEW.path}>
          <Button type="primary" icon={<PlusOutlined />}>
            {t('NEW_BANNER')}
          </Button>
        </Link>,
      ]}
    />
  );
};

export default memo(Header);
