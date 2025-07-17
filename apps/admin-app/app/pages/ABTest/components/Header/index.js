import { PageHeader, Row, Col } from 'antd';

import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

const Header = ({ title, children }) => {
  return (
    <>
      <PageTitleHeader title={title} />
      <Row justify="space-between" align="middle">
        <Col>
          <PageHeader className="p-0 page-title" title={title} />
        </Col>
        {children ? <Col>{children}</Col> : null}
      </Row>
    </>
  );
};

export default Header;
