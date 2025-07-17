import { Row, Col } from 'antd';

const FormRow = ({ children, className }) => {
  return (
    <Col span={24} className={className}>
      <Row>
        {children}
      </Row>
    </Col>
  );
};

export default FormRow;
