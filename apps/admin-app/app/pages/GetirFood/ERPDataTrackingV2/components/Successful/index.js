import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Table from './Table';
import { Creators } from '../../redux/actions';
import Filters from './Filters';
import { ERPDataTrackingSuccessfulSelector } from '../../redux/selectors';

const Successful = () => {
  const dispatch = useDispatch();
  const successfulFilters = useSelector(ERPDataTrackingSuccessfulSelector.getSuccessfulFilters);

  const handleSubmitFilters = useCallback(
    values => {
      dispatch(Creators.setSuccessfulFilters({ ...values }));
      dispatch(Creators.getERPDataTrackingSuccessfulRequest());
    },
    [dispatch],
  );

  const handlePaginationChange = useCallback(
    values => {
      dispatch(Creators.setSuccessfulFilters({ ...successfulFilters, ...values }));
      dispatch(Creators.getERPDataTrackingSuccessfulRequest());
    },
    [dispatch, successfulFilters],
  );

  useEffect(() => {
    dispatch(Creators.getERPDataTrackingSuccessfulRequest());
  }, [dispatch]);

  return (
    <>
      <Filters onSubmit={handleSubmitFilters} initialValues={successfulFilters} />
      <Table onPaginationChange={handlePaginationChange} />
    </>
  );
};

export default Successful;
