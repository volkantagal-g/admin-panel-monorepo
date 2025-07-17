import { PageHeader, Col, Row } from 'antd';

const Header = ({ title }) => {
  return (
    <Row>
      <Col flex={1}>
        <PageHeader className="p-0 page-title" title={title} />
      </Col>
    </Row>
  );
};

export default Header;
