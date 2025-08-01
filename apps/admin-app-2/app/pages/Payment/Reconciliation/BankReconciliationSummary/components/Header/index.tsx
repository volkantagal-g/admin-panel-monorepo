import { PageHeader, Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';

const Header = (): JSX.Element => {
  const { t } = useTranslation('global');

  return (
    <Row>
      <Col flex={1}>
        <PageHeader
          className="p-0 page-title"
          title={t('PAGE_TITLE.BANK_RECONCILIATION_SUMMARY')}
        />
      </Col>
    </Row>
  );
};

export default Header;
