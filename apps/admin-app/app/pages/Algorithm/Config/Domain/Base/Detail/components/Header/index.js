import { PageHeader, Col, Row, Spin } from 'antd';
import { useSelector } from 'react-redux';

import { useMemo } from 'react';

import { algorithmDomainConfigDetailSelector } from '@app/pages/Algorithm/Config/Domain/Base/Detail/redux/selectors';

const Header = () => {
  const configDetailData = useSelector(algorithmDomainConfigDetailSelector.getData);
  const configDetailIsPending = useSelector(algorithmDomainConfigDetailSelector.getIsPending);

  const title = useMemo(() => {
    return `${configDetailData?.alias} | ${configDetailData?.type}`;
  }, [configDetailData]);

  const subTitle = useMemo(() => {
    return `${configDetailData?.key}`;
  }, [configDetailData]);

  return (
    <Row>
      <Col flex={1}>
        {configDetailIsPending ? (
          <Spin />
        ) : (
          <PageHeader className="p-0 page-title h1" title={title} subTitle={subTitle} />
        )}
      </Col>
    </Row>
  );
};

export default Header;
