import { Col, Statistic, Card, Skeleton } from 'antd';

function Index({ title, value, precision=0, suffix, isPending }) {
  if (isPending) {
    return (
      <Col md={{ span: 8 }} xs={{ span: 12 }}>
        <Card>
          <Skeleton
            paragraph={{ rows: 1 }}
          />
        </Card>
      </Col>
    );
  }

  return (
    <Col md={{ span: 8 }} xs={{ span: 12 }}>
      <Card>
        <Statistic
          title={title}
          value={value ?? 'N/A'}
          precision={precision}
          suffix={suffix}
        />
      </Card>
    </Col>
  );
}

export default Index;
