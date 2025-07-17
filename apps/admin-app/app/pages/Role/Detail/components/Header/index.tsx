import { PageHeader } from 'antd';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation();

  return (
    <PageHeader
      className="p-0 role-title"
      title={t('global:PAGE_TITLE.ROLE.DETAIL')}
    />
  );
};

export default Header;
