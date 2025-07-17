import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'antd';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { vehicleConstraintListSelector } from './redux/selectors';
import { Filter, Header } from './components';
import { _getTableColumns } from './config';
import { vehicleConstraintListRequestParams } from '../utils';

const reduxKey = REDUX_KEY.VEHICLE_CONSTRAINT.LIST;

const VehicleConstraintList = () => {
  usePageViewAnalytics({ name: ROUTE.VEHICLE_CONSTRAINT_LIST.name, squad: ROUTE.VEHICLE_CONSTRAINT_LIST.squad });
  const { t } = useTranslation('vehicleConstraintPage');

  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const [filters, setFilters] = useState({
    statuses: [],
    types: [],
  });

  const [pagination, setPagination] = useState({
    currentPage: 1,
    rowsPerPage: 10,
  });

  const handlePaginationChange = newPagination => {
    setPagination(newPagination);
  };

  const data = useSelector(vehicleConstraintListSelector.getData);
  const totalCount = useSelector(vehicleConstraintListSelector.getTotalCount);
  const isPending = useSelector(vehicleConstraintListSelector.getIsPending);

  const handleSubmit = values => {
    setFilters(values);
  };

  useEffect(() => {
    const requestParams = vehicleConstraintListRequestParams({ ...filters, pagination });
    dispatch(Creators.getVehicleConstraintListRequest(requestParams));
  }, [filters, pagination, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <>
      <Header />
      <Filter
        handleSubmit={handleSubmit}
        isPending={isPending}
      />
      <Row>
        <Col span={24}>
          <AntTableV2
            data={data}
            columns={_getTableColumns({ t })}
            loading={isPending}
            pagination={pagination}
            onPaginationChange={handlePaginationChange}
            total={totalCount}
          />
        </Col>
      </Row>
    </>
  );
};

export default VehicleConstraintList;
