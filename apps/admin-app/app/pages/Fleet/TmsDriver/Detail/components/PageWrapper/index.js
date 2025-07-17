import { Row, Col } from 'antd';
import { useSelector } from 'react-redux';

import Header from '@app/pages/Fleet/TmsDriver/Detail/components/Header';
import DriverLocation from '@app/pages/Fleet/TmsDriver/Detail/components/Location';
import GeneralInformation from '@app/pages/Fleet/TmsDriver/Detail/components/GeneralInformation';
import { tmsDriverSelector } from '@app/pages/Fleet/TmsDriver/Detail/redux/selectors';

const PageWrapper = () => {
  const driver = useSelector(tmsDriverSelector.getData);
  const isDriverPending = useSelector(tmsDriverSelector.getIsPending);

  return (
    <Row gutter={[12, 6]}>
      {!isDriverPending && driver && (
        <>
          <Col xs={24}>
            <Header name={driver.name} statusLastChangedAt={driver.statusLastChangedAt} />
          </Col>
          <Col xs={24} md={12}>
            <DriverLocation location={driver.location} isPending={isDriverPending} />
          </Col>
          <Col xs={24} md={12}>
            <GeneralInformation
              name={driver.name}
              gsm={driver.gsm}
              personalGsm={driver.personalGsm}
              username={driver.username}
              createdAt={driver.createdAt}
              status={driver.status}
              isLoggedIn={driver.isLoggedIn}
              isActivated={driver.isActivated}
            />
          </Col>
        </>
      )}
    </Row>
  );
};

export default PageWrapper;
