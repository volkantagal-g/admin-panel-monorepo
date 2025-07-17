import { PageHeader as AntPageHeader, Row } from 'antd';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { StatusBadge } from '@app/pages/Promo/Detail/components/CommunicationsForm/PaneHeader';

const Header = memo(({ status }) => {
  const { t } = useTranslation('marketingApproval');
  return (
    <Row className="mb-4 w-100">
      <AntPageHeader
        className="w-100"
        ghost={false}
        title={t('DETAIL.TITLE')}
        extra={[
          <StatusBadge status={status} key="1" />,
        ]}
      />
    </Row>
  );
});

export default Header;
