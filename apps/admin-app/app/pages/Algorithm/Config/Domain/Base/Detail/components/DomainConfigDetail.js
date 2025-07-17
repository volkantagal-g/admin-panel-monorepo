import { Col, Row } from 'antd';

import DomainConfigForm from '@app/pages/Algorithm/Config/Domain/Base/Detail/components/DomainConfigForm';
import Header from '@app/pages/Algorithm/Config/Domain/Base/Detail/components/Header';
import ParentTable from '@app/pages/Algorithm/Config/Domain/Base/Detail/components/ParentTable';
import LinkedConfigsTable from '@app/pages/Algorithm/Config/Domain/Base/Detail/components/LinkedConfigsTable';

import useStyles from '@app/pages/Algorithm/Config/Domain/Base/Detail/styles';

const DomainConfigDetail = () => {
  const classes = useStyles();

  return (
    <div className={classes.domainDetailContainer}>
      <Header />
      <Row gutter={[16, 16]}>
        <Col span={14}>
          <DomainConfigForm />
        </Col>
        <Col span={10}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <ParentTable />
            </Col>
            <Col span={24}>
              <LinkedConfigsTable />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default DomainConfigDetail;
