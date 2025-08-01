import { Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { Creators } from '../../redux/actions';
import BasicFilterForm from './BasicFilterForm';
import { getPagination, getSubmittedFilters } from '../../redux/selectors';

const Filter = () => {
  const dispatch = useDispatch();
  const hasSelectedClient = !!useSelector(getSubmittedFilters).clientId;
  const pagination = useSelector(getPagination);

  const fetchData = () => {
    dispatch(Creators.getActiveOrdersRequest());
    if (!hasSelectedClient) {
      dispatch(Creators.getActiveOrderStatsRequest());
    }
  };

  const handleSubmit = () => {
    dispatch(Creators.setPagination({ currentPage: 1, rowsPerPage: pagination.rowsPerPage }));
    fetchData();
  };

  return (
    <Row>
      <Col xs={24}>
        <BasicFilterForm handleSubmit={handleSubmit} />
      </Col>
    </Row>
  );
};

export default Filter;
