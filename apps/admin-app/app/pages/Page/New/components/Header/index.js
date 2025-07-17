import { PageHeader } from 'antd';
import { useTranslation } from 'react-i18next';

const PageNewHeader = () => {
  const { t } = useTranslation();
  return (
    <PageHeader
      className="p-0 page-title"
      title={t('PAGE_TITLE.PAGE.NEW')}
    />
  );
};

export default PageNewHeader;
