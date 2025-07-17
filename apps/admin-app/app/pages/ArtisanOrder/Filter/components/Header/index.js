import { memo } from 'react';
import { PageHeader, Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation('artisanOrderFilterPage');

  return (
    <Row>
      <Col flex={1}>
        <PageHeader
          className="p-0 page-title"
          title={t('TITLE')}
        />
      </Col>
    </Row>
  );
};

export default memo(Header);
