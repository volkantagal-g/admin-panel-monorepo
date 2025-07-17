import { PageHeader, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import CalculateModal from '../CalculateModal';

const Header = ({ filters }) => {
  const { t } = useTranslation('global');

  return (
    <Row justify="space-between" align="middle">
      <PageHeader className="p-0 page-title" title={t('PAGE_TITLE.TIP_PAYBACK.PAYOUT_SUMMARY')} />
      <CalculateModal filters={filters} />
    </Row>
  );
};

export default Header;
