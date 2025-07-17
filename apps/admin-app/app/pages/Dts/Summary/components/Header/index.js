import { PageHeader, Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import RedirectButton from '@shared/components/UI/RedirectButton';
import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';
import { ROUTE } from '@app/routes';

const Header = () => {
  const { t } = useTranslation('dtsSummaryPage');
  const { Can } = usePermission();

  return (
    <Row>
      <Col flex={1}>
        <PageHeader
          className="p-0 page-title"
          title={t('global:PAGE_TITLE.DTS.SUMMARY')}
        />
      </Col>
      <Can permKey={permKey.PAGE_DTS_LOGS_UPDATE}>
        <Col>
          <RedirectButton
            to={ROUTE.DTS_LOGS_UPDATE.path}
            title={t('UPLOAD_DTS_LOGS')}
          />
        </Col>
      </Can>

    </Row>
  );
};

export default Header;
