import { Col, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

const PageHeader = () => {
  const { t } = useTranslation('fieldAnnouncementPage');

  return (
    <Row gutter={[8, 8]} justify="end" align="middle">
      <Col span={24}>
        <Title level={3}>{t('PAGE_TITLE.DETAIL')}</Title>
      </Col>
    </Row>
  );
};

export default PageHeader;
