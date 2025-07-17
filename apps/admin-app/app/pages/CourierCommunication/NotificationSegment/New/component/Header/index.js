import { useTranslation } from 'react-i18next';
import { Row, Col, PageHeader } from 'antd';

const Header = () => {
  const { t } = useTranslation();

  return (
    <Row gutter={[8, 4]}>
      <Col flex={1}>
        <PageHeader className="p-0 page-title" title={t('PAGE_TITLE.COURIER_COMMUNICATION.CREATE_SEGMENT')} />
      </Col>
    </Row>
  );
};

export default Header;
