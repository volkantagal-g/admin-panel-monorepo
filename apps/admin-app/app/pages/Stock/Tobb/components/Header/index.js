import { PageHeader, Col, Row } from 'antd';

import PageTitleHeader from '@shared/components/UI/PageTitleHeader';
import { t } from '@shared/i18n';

const Header = () => {
  const title = t('global:PAGE_TITLE.TOBB_GIB_REQUEST');

  return (
    <Row>
      <Col flex={1}>
        <PageTitleHeader title={title} />
        <PageHeader
          className="p-0 page-title"
          title={title}
        />
      </Col>
    </Row>
  );
};

export default Header;
