import { PageHeader } from 'antd';
import { useTranslation } from 'react-i18next';

import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

const AssetNewHeader = () => {
  const { t } = useTranslation(['assetPage', 'global']);
  const title = t('global:PAGE_TITLE.ASSET.DETAIL');
  return (
    <>
      <PageHeader
        className="p-0 user-title"
        title={t('HEADING')}
      />
      <PageTitleHeader title={title} />
    </>
  );
};

export default AssetNewHeader;
