import { PageHeader } from 'antd';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation('bagConstraintsPage');
  return (
    <PageHeader
      className="p-0 page-title"
      title={t('ADD_NEW_CONSTRAINT')}
    />
  );
};

export default Header;
