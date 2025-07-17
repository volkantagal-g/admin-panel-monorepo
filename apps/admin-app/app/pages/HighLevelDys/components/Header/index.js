import { PageHeader, Col, Row } from 'antd';

import { t } from '@shared/i18n';

const Header = () => {
  return (
    <Row>
      <Col flex={1}>
        <PageHeader
          className="p-0 page-title"
          title={t('PAGE_TITLE.HIGH_LEVEL_DYS')}
        />
      </Col>
    </Row>
  );
};

export default Header;
