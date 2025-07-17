import { Col, Row } from 'antd';
import { useSelector } from 'react-redux';

import ProductsListActionButton from '@shared/containers/ProductsListModal/ActionButton';
import Stats from '../Stats';
import Filter from '../Filter';
import { getSubmittedFilters } from '../../redux/selectors';

const Header = () => {
  const filters = useSelector(getSubmittedFilters);

  const warehouseIds = filters.warehouse ? [filters.warehouse] : [];

  return (
    <Row gutter={[4, 4]} className="mb-1 align-items-center pr-1 pl-1">
      <Col xs={24} md={3}>
        <Stats domainType={filters.domainType} />
      </Col>
      <Col xs={24} md={21}>
        <Row gutter={[4, 4]}>
          <Col xs={20} md={22}>
            <Filter />
          </Col>
          <Col xs={4} md={2} className="d-flex justify-content-end align-items-center">
            <ProductsListActionButton
              filters={{
                domainType: filters.domainType,
                isSlottedDelivery: filters.isSlottedDelivery,
                city: filters.city,
                warehouseIds,
                clientId: filters.clientId,
                integrationTypes: filters.integrationTypes,
                orderStatus: filters.orderStatus,
              }}
              className="ml-auto"
              size="small"
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Header;
