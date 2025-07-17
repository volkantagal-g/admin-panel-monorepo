import { PageHeader } from 'antd';
import { useTranslation } from 'react-i18next';

const RoleNewHeader = () => {
  const { t } = useTranslation();
  return (
    <PageHeader
      className="p-0 role-title"
      title={t('PAGE_TITLE.ROLE.NEW')}
    />
  );
};

export default RoleNewHeader;
