import { PageHeader, Col, Row, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';

const Header = () => {
  const { t } = useTranslation();

  return (
    <Row>
      <Col flex={1}>
        <PageHeader
          className="p-0 page-title"
          title={t('global:PAGE_TITLE.WAREHOUSE_PROPOSAL.LIST')}
        />
      </Col>
      <Col>
        <Button href="/warehouseProposal/create" type="primary" icon={<PlusOutlined />}>
          {t('global:PAGE_TITLE.WAREHOUSE_PROPOSAL.CREATE')}
        </Button>
      </Col>
    </Row>
  );
};

export default Header;
