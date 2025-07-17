import { Col, Row } from 'antd';

import { useSelector } from 'react-redux';

import { Header } from '@app/pages/Algorithm/Config/Detail/components';

import ParentTable from '@app/pages/Algorithm/Config/Detail/components/AlgorithmConfigDetail/ParentTable';
import LinkedConfigsTable from '@app/pages/Algorithm/Config/Detail/components/AlgorithmConfigDetail/LinkedConfigsTable';
import ConfigValueCard from '@app/pages/Algorithm/Config/Detail/components/AlgorithmConfigDetail/ConfigValueCard';
import InheritedConfigValueCard from '@app/pages/Algorithm/Config/Detail/components/AlgorithmConfigDetail/InheritedConfigValueCard';
import { configDetailSelector } from '@app/pages/Algorithm/Config/Detail/redux/selectors';
import LinkedCustomConfigsTable from '@app/pages/Algorithm/Config/Detail/components/AlgorithmConfigDetail/LinkedCustomConfigsTable';

const AlgorithmConfigDetail = () => {
  const isCustom = useSelector(configDetailSelector.getIsCustom);
  return (
    <div style={{ margin: 10 }}>
      <Header />
      <Row gutter={[16, 16]}>
        <Col span={14}>
          <ConfigValueCard />
        </Col>
        {!isCustom ? (
          <>
            <Col span={10}>
              <ParentTable />
            </Col>
            <Col span={14}>
              <InheritedConfigValueCard />
            </Col>
            <Col span={10}>
              <LinkedConfigsTable />
            </Col>
          </>
        ) : (
          <Col span={10}>
            <LinkedCustomConfigsTable />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default AlgorithmConfigDetail;
