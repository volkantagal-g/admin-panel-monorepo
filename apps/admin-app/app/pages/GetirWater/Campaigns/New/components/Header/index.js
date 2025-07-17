import { PageHeader } from 'antd';
import { useTranslation } from 'react-i18next';

const CampaignNewHeader = () => {
  const { t } = useTranslation();
  return (
    <PageHeader
      className="p-0 page-title"
      title={t('global:PAGE_TITLE.WATER.CAMPAIGNS.NEW')}
    />
  );
};

export default CampaignNewHeader;
