import { useTranslation } from 'react-i18next';
import { PageHeader } from 'antd';

import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

const Header = () => {
  const { t } = useTranslation('growthDashboard');

  const pageTitle = t('PAGE_TITLE');

  return (
    <>
      <PageTitleHeader title={pageTitle} />
      <PageHeader className="p-0" title={pageTitle} />
    </>
  );
};

export default Header;
