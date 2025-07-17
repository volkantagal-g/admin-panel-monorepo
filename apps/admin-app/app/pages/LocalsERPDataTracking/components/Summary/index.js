import { useCallback, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';

import Filters from './Filters';
import Table from './Table';
import { Creators } from '../../redux/actions';
import { SUMMARY_INITIAL_FILTERS } from '../../constants';
import { LocalsERPDataTrackingSummarySelector } from '../../redux/selectors';

const Summary = () => {
  const dispatch = useDispatch();
  const tableData = useSelector(LocalsERPDataTrackingSummarySelector.getData);
  const isPending = useSelector(LocalsERPDataTrackingSummarySelector.getIsPending);

  const getERPDataTrackingSummary = useCallback(
    dateRange => {
      if (dateRange) {
        dispatch(
          Creators.getLocalsERPDataTrackingSummaryRequest({
            startDate: moment(dateRange[0]).format('YYYY-MM-DD'),
            endDate: moment(dateRange[1]).format('YYYY-MM-DD'),
          }),
        );
      }
    },
    [dispatch],
  );

  const handleChangeFilters = useCallback(
    ({ dateRange }) => {
      getERPDataTrackingSummary(dateRange);
    },
    [getERPDataTrackingSummary],
  );

  useEffect(() => {
    getERPDataTrackingSummary(SUMMARY_INITIAL_FILTERS);
  }, [getERPDataTrackingSummary]);

  return (
    <>
      <Filters onChangeFilters={handleChangeFilters} />
      <Table tableData={tableData} loading={isPending} />
    </>
  );
};
export default Summary;
