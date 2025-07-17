import { Col, Row } from 'antd';

import { useSelector } from 'react-redux';

import { financeOrderDetailSelector } from '../../redux/selectors';
import ClientCard from './ClientCard';
import CourierCard from './CourierCard';
import WarehouseCard from './WarehouseCard';
import useStyles from './styles';

const CardsSection = () => {
  const classes = useStyles();
  const isVendorAgt = useSelector(financeOrderDetailSelector.getIsVendorAgt);

  return (
    <Row>
      <Col xs={24} sm={24} md={24} lg={24} xl={8} className={isVendorAgt ? classes.agtCol : ''}>
        <ClientCard />
      </Col>
      {
        !isVendorAgt && (
          <>
            <Col className={classes.courierInfo} xs={24} sm={24} md={24} lg={24} xl={8}>
              <CourierCard />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={8}>
              <WarehouseCard />
            </Col>
          </>
        )
      }
    </Row>
  );
};

export { CardsSection };
