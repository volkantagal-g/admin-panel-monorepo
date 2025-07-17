import { PageHeader, Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t } = useTranslation('profile');

  return (
    <Row gutter={8}>
      <Col flex={1}>
        <PageHeader
          className="p-0 role-title"
          title={t('PAGE_TITLE')}
        />
      </Col>
    </Row>
  );
}
