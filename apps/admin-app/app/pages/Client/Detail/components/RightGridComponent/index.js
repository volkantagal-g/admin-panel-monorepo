import { memo } from 'react';
import { Col } from 'antd';

import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import Devices from '../Devices';
import Invoices from '../Invoices';
import Promos from '../Promos';
import LoyaltyDetails from '../LoyaltyDetails';
import GetirFoodTable from '../GetirFoodTable';
import CountryBasedPermission from '../CountryBasedPermission';
import useStyles from './styles';

const RightGridComponent = () => {
  const classes = useStyles();
  const { Can } = usePermission();

  return (
    <Col lg={12} xs={24} className={classes.wrapper}>
      <CountryBasedPermission />

      <Promos />

      <LoyaltyDetails />

      <GetirFoodTable />

      <Devices />

      <Can permKey={permKey.PAGE_CLIENT_DETAIL_INVOICES}>
        <Invoices />
      </Can>
    </Col>
  );
};

export default memo(RightGridComponent);
