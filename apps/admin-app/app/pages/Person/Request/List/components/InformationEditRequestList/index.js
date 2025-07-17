import { useState, useEffect } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { Creators } from '@app/pages/Person/Request/List/redux/actions';
import InformationEditRequestFilter from '../InformationEditRequestFilter';
import InformationEditRequestTable from '../InformationEditRequestTable';
import { getInformationEditRequestListRequestParams } from '../../utils';

const InformationEditRequestList = () => {
  const dispatch = useDispatch();

  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 10 });
  const [selectedFranchise, setSelectedFranchise] = useState(undefined);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [selectedRequestStatus, setSelectedRequestStatus] = useState(null);
  const [selectedRequestTimeRange, setSelectedRequestTimeRange] = useState([
    moment().startOf('day'),
    moment().endOf('day'),
  ]);

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  const handleSetSelectedRequestStatus = value => {
    setSelectedRequestStatus(value);
  };

  const handleSetSelectedRequestTimeRange = timeRange => {
    setSelectedRequestTimeRange(timeRange);
  };

  const handleSetSelectedFranchise = value => {
    setSelectedFranchise(value);
  };

  const handleSetSelectedPerson = value => {
    setSelectedPerson(value);
  };

  const informationEditRequestListRequest = () => {
    const requestParams = getInformationEditRequestListRequestParams({
      selectedPerson,
      selectedFranchise,
      selectedRequestStatus,
      selectedRequestTimeRange,
      pagination,
    });
    dispatch(Creators.getInformationEditRequestListRequest(requestParams));
  };

  useEffect(() => {
    informationEditRequestListRequest();
  }, [
    pagination.currentPage,
    pagination.rowsPerPage,
    selectedPerson,
    selectedFranchise,
    selectedRequestTimeRange,
    selectedRequestStatus,
    dispatch,
  ]);

  return (
    <>
      <InformationEditRequestFilter
        selectedRequestStatus={selectedRequestStatus}
        setSelectedRequestStatus={handleSetSelectedRequestStatus}
        selectedRequestTimeRange={selectedRequestTimeRange}
        setSelectedRequestTimeRange={handleSetSelectedRequestTimeRange}
        selectedFranchise={selectedFranchise}
        setSelectedFranchise={handleSetSelectedFranchise}
        selectedPerson={selectedPerson}
        setSelectedPerson={handleSetSelectedPerson}
      />
      <InformationEditRequestTable
        pagination={pagination}
        handlePaginationChange={handlePaginationChange}
      />
    </>
  );
};

export default InformationEditRequestList;
