import { PageHeader } from 'antd';
import { useTranslation } from 'react-i18next';

import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

const AssetDashboardHeader = () => {
  const { t } = useTranslation(['assetPage', 'global']);
  const title = t('global:PAGE_TITLE.ASSET.DASHBOARD');
  return (
    <>
      <PageHeader
        className="p-0 user-title"
        title={title}
      />
      <PageTitleHeader title={title} />
    </>
  );
};

export default AssetDashboardHeader;
