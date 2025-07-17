import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Creators } from './redux/action';
import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { useInjectReducer } from '@shared/utils/injectReducer';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import Header from './components/Header/index';
import Filter from './components/Filter/index';
import Table from './components/Table/index';

import { TmsListSelector } from '@app/pages/Fleet/TMS/List/redux/selector';

const reduxKey = REDUX_KEY.TMS.LIST;

const TmsList = () => {
  usePageViewAnalytics({ name: ROUTE.TMS_LIST.name, squad: ROUTE.TMS_LIST.squad });
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const [filters, setFilters] = useState({
    plate: '',
    dincerId: '',
    palletCapacity: 0,
    volumeCapacity: 0,
    activeness: null,
    vehicleType: null,
    vehicleClass: '',
  });

  const [pagination, setPagination] = useState({
    currentPage: 1,
    rowsPerPage: 10,
  });

  const tableData = useSelector(TmsListSelector?.getData);
  const isTableLoading = useSelector(TmsListSelector?.getIsPending);
  const deleteVehicle = useSelector(TmsListSelector?.getDeleteData);

  const handleSubmit = filter => {
    setFilters(filter);
  };

  const handlePaginationChange = value => {
    setPagination(value);
  };

  useEffect(() => {
    const { currentPage, rowsPerPage } = pagination;
    dispatch(Creators.getVehicleList({ ...filters, currentPage, rowsPerPage }));
  }, [filters, dispatch, pagination, deleteVehicle]);

  return (
    <>
      <Header />
      <Filter handleSubmit={handleSubmit} />
      <Table
        data={tableData?.tmsVehicles}
        loading={isTableLoading}
        total={tableData?.totalCount}
        handlePagination={handlePaginationChange}
      />
    </>
  );
};

export default TmsList;
