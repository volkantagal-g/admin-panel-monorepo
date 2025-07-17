import { Col, Divider, Row, Typography } from 'antd';

const { Title } = Typography;

export default function SectionTitle({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <Row align="middle">
      <Col className="mr-2" flex={1}>
        <Divider orientation="left" orientationMargin="0">
          <Title level={5}>{title}</Title>
        </Divider>
      </Col>

      {children && children}
    </Row>
  );
}
