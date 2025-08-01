import { memo } from 'react';
import { PageHeader } from 'antd';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation('marketing');
  return (
    <PageHeader
      ghost={false}
      className="mb-3"
      title={t('MARKETING_APPROVAL_LIST')}
    />
  );
};

export default memo(Header);
