import { Alert, PageHeader } from 'antd';

import { useTranslation } from 'react-i18next';

import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

const Header = ({ title, description, instructions }) => {
  const { t } = useTranslation('reportsPage');
  return (
    <>
      <PageTitleHeader title={title} />
      <PageHeader className="p-0 page-title" title={title} />
      {description && (<h6>{t('DESCRIPTION')}: {description}</h6>)}
      {instructions?.trim() && (
      <Alert
        message={t('INSTRUCTIONS')}
        description={instructions}
        type="warning"
        className="mb-2"
      />
      )}
    </>
  );
};

export default Header;
