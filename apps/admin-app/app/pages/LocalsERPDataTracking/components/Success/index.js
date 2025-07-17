import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Table from './Table';
import { Creators } from '../../redux/actions';
import Filters from './Filters';
import { LocalsERPDataTrackingSuccessSelector } from '../../redux/selectors';

const Success = () => {
  const dispatch = useDispatch();
  const successFilters = useSelector(LocalsERPDataTrackingSuccessSelector.getSuccessFilters);

  const handleSubmitFilters = useCallback(
    values => {
      dispatch(Creators.setSuccessFilters({ ...values }));
      dispatch(Creators.getLocalsERPDataTrackingSuccessRequest());
    },
    [dispatch],
  );

  const handlePaginationChange = useCallback(
    values => {
      dispatch(Creators.setSuccessFilters({ ...successFilters, ...values }));
      dispatch(Creators.getLocalsERPDataTrackingSuccessRequest());
    },
    [dispatch, successFilters],
  );

  useEffect(() => {
    dispatch(Creators.getLocalsERPDataTrackingSuccessRequest());
  }, [dispatch]);

  return (
    <>
      <Filters onSubmit={handleSubmitFilters} initialValues={successFilters} />
      <Table onPaginationChange={handlePaginationChange} />
    </>
  );
};

export default Success;
