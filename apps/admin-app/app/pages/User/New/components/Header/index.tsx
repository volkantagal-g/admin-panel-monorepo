import { PageHeader } from 'antd';
import { useTranslation } from 'react-i18next';

const UserNewHeader = () => {
  const { t } = useTranslation();
  return (
    <PageHeader
      className="p-0 user-title"
      title={t('PAGE_TITLE.USER.NEW')}
    />
  );
};

export default UserNewHeader;
