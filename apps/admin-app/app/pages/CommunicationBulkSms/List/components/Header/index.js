import { memo } from 'react';
import { PageHeader, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

import { ROUTE } from '@app/routes';

const Header = () => {
  const { t } = useTranslation('communicationBulkSmsPage');
  return (
    <PageHeader
      ghost={false}
      className="mb-3"
      title={t('COMMUNICATION_BULK_SMS_LIST')}
      extra={[
        <Link key="NEW_COMMUNICATION_BULK_SMS_LIST" to={ROUTE.COMMUNICATION_BULK_SMS_NEW.path}>
          <Button id="newCommunicationBulkSmsBtn" type="primary" icon={<PlusOutlined />}>
            {t('NEW_COMMUNICATION_BULK_SMS_BTN')}
          </Button>
        </Link>,
      ]}
    />
  );
};

export default memo(Header);
