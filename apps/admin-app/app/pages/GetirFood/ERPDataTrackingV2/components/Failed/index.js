import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Table from './Table';
import { Creators } from '../../redux/actions';
import Filters from './Filters';
import { ERPDataTrackingFailedSelector } from '../../redux/selectors';

const Failed = () => {
  const dispatch = useDispatch();
  const failedFilters = useSelector(ERPDataTrackingFailedSelector.getFailedFilters);

  const handleSubmitFilters = useCallback(
    values => {
      dispatch(Creators.setFailedFilters({ ...values }));
      dispatch(Creators.getERPDataTrackingFailedRequest());
    },
    [dispatch],
  );

  const handlePaginationChange = useCallback(
    values => {
      dispatch(Creators.setFailedFilters({ ...failedFilters, ...values }));
      dispatch(Creators.getERPDataTrackingFailedRequest());
    },
    [dispatch, failedFilters],
  );

  useEffect(() => {
    dispatch(Creators.getERPDataTrackingFailedRequest());
  }, [dispatch]);

  return (
    <>
      <Filters onSubmit={handleSubmitFilters} initialValues={failedFilters} />
      <Table onPaginationChange={handlePaginationChange} />
    </>
  );
};

export default Failed;
