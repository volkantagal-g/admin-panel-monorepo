import { PageHeader } from 'antd';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation();

  return (
    <PageHeader
      className="p-0 user-title"
      title={t('global:PAGE_TITLE.USER.DETAIL')}
    />
  );
};

export default Header;
