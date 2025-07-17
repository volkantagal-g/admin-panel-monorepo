import { memo } from 'react';
import { PageHeader } from 'antd';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation('communicationHistoryPage');
  return (
    <PageHeader
      ghost={false}
      className="mb-3"
      title={t('COMMUNICATION_HISTORY')}
    />
  );
};

export default memo(Header);
