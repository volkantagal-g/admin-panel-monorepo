import { PageHeader, Col, Row } from 'antd';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { getWarehousesSelector } from '@shared/redux/selectors/common';

const Header = ({ warehouseId }) => {
  const warehouses = useSelector(getWarehousesSelector.getData);
  const isPending = useSelector(getWarehousesSelector.getIsPending);

  const [pageTitle, setPageTitle] = useState('');

  useEffect(() => {
    if (!isPending) {
      setPageTitle(warehouses.find(warehouse => warehouse._id === warehouseId)?.name);
    }
  }, [warehouseId, isPending, warehouses]);

  return (
    <Row>
      <Col flex={1}>
        <PageHeader
          className="p-0 page-title"
          title={pageTitle}
        />
      </Col>
    </Row>
  );
};

export default Header;
