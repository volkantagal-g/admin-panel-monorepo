import { PageHeader, Col, Row, Spin } from 'antd';
import { useSelector } from 'react-redux';

import { useMemo } from 'react';

import { configDetailSelector } from '@app/pages/Algorithm/Config/Detail/redux/selectors';
import DeleteConfigNodeButton from '@app/pages/Algorithm/Config/Detail/components/AlgorithmConfigDetail/DeleteConfigNodeButton';
import UpdateConfigNodeButton from '@app/pages/Algorithm/Config/Detail/components/AlgorithmConfigDetail/UpdateConfigNodeButton';

const Header = () => {
  const configDetailData = useSelector(configDetailSelector.getData);
  const configDetailIsPending = useSelector(configDetailSelector.getIsPending);
  const isCustom = useSelector(configDetailSelector.getIsCustom);

  const title = useMemo(() => {
    return `${configDetailData.alias} | ${configDetailData.type}`;
  }, [configDetailData]);

  const subTitle = useMemo(() => {
    return `${configDetailData.key}`;
  }, [configDetailData]);

  return (
    <Row justify="space-between">
      <Col flex={1} span={18}>
        {configDetailIsPending ? (
          <Spin />
        ) : (
          <PageHeader className="p-0 page-title h1" title={title} subTitle={subTitle} />
        )}
      </Col>
      {isCustom && (
      <Col>
        <UpdateConfigNodeButton />
        <DeleteConfigNodeButton />
      </Col>
      )}
    </Row>
  );
};

export default Header;
