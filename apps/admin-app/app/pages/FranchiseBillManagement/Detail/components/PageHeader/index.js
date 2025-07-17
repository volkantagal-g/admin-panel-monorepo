import { PageHeader, Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';

const FranchiseBillDetailPageHeader = () => {
  const { t } = useTranslation('franchiseBillManagementPage');

  return (
    <Row gutter={8}>
      <Col>
        <PageHeader
          className="p-0 page-title"
          title={t('PAGE_TITLE.FRANCHISE_BILL_MANAGEMENT.DETAIL')}
        />
      </Col>
    </Row>
  );
};

export default FranchiseBillDetailPageHeader;
