import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Row, Col } from 'antd';

import Header from './components/Header/index';
import Filter from './components/Filter/index';
import WarningModal from './components/WarningModal';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { Creators } from './redux/action';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { useInjectReducer } from '@shared/utils/injectReducer';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { tableColumns } from './config';
import { vehicleListSelector } from '@app/pages/Fleet/Vehicle/List/redux/selector';

const reduxKey = REDUX_KEY.VEHICLE.LIST;

const VehicleList = () => {
  const { t } = useTranslation(['marketVehicle']);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    rowsPerPage: 10,
  });
  usePageViewAnalytics({ name: ROUTE.VEHICLE_LIST.name, squad: ROUTE.VEHICLE_LIST.squad });
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });
  const tableData = useSelector(vehicleListSelector.getData);
  const isTableLoading = useSelector(vehicleListSelector.getIsPending);

  const [filters, setFilters] = useState({
    warehouseIds: [],
    franchiseIds: [],
    statuses: '',
    plate: '',
    vehicleConstraintId: [],
    cities: [],
    tag: '',
  });

  const handleSubmit = filter => {
    setFilters(filter);
  };

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  useEffect(() => {
    const { currentPage, rowsPerPage } = pagination;
    dispatch(Creators.getVehicleList({ ...filters, currentPage, rowsPerPage, withTotalCount: true }));
  }, [dispatch, filters, pagination]);

  useEffect(() => {
    dispatch(Creators.getVehicleTypeList());
    dispatch(CommonCreators.getCitiesRequest());
  }, [dispatch]);

  return (
    <>
      <Header filters={filters} />
      <Filter handleSubmit={handleSubmit} />
      <WarningModal />
      <Row>
        <Col span={24}>
          <AntTableV2
            data={tableData?.vehicles}
            columns={tableColumns({ t })}
            loading={isTableLoading}
            pagination={pagination}
            onPaginationChange={handlePaginationChange}
            total={tableData?.totalCount}
          />
        </Col>
      </Row>
    </>
  );
};

export default VehicleList;
