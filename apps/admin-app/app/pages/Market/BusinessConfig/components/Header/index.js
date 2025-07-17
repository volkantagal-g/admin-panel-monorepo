import { PageHeader } from 'antd';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation('businessConfig');

  return (
    <PageHeader
      className="p-0 page-title"
      title={t('PAGE_TITLE')}
    />
  );
};

export default Header;
