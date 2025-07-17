import { PageHeader, Col, Row, Alert, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const { Text, Link } = Typography;

const Header = () => {
  const { t } = useTranslation('technologyComplianceReport');

  return (
    <>
      <Alert
        description={(
          <>
            <Text strong>{t('HEADER_INFORMATION.SCAN_PERIOD')}</Text><br />
            <Text strong>{t('HEADER_INFORMATION.INSTANT_REPORT_INFO_HEADER')}</Text><br />
            <Text code copyable>{t('HEADER_INFORMATION.INSTANT_REPORT_COMMAND')}</Text><br />
            <Link href="https://getirdev.atlassian.net/wiki/spaces/techcommitties/pages/1355514690/HOW+TO+ENFORCE+YOUR+PROJECT+SECURITY+IN+JS" target="_blank">
              <Text strong>{t('HEADER_INFORMATION.CI_CD_DOCUMENTATION')}</Text>
            </Link>
          </>
        )}
        type="info"
        style={{ background: '#e6f4ff', borderColor: '#91caff' }}
      />
      <Row>
        <Col flex={1}>
          <PageHeader
            className="p-0 page-title"
            title={t('global:PAGE_TITLE.COMPLIANCE_REPORT.NODE.VULNERABILITIES')}
          />
        </Col>
      </Row>
    </>
  );
};

export default Header;
