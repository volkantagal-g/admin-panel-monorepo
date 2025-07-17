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
      title={t('ANNOUNCEMENT_LIST')}
      extra={[
        <Link key="NEW_ANNOUNCEMENT_BTN" to={ROUTE.ANNOUNCEMENT_NEW.path}>
          <Button type="primary" icon={<PlusOutlined />}>
            {t('NEW_ANNOUNCEMENT')}
          </Button>
        </Link>,
      ]}
    />
  );
};

export default memo(Header);
