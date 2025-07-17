import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import { Creators as CommonCreators } from '@shared/redux/actions/common';
import Spinner from '@shared/components/Spinner';
import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';
import FormWrapper from '../FormWrapper';
import Header from '../Header';
import { Creators } from '../../redux/actions';
import { courierSelector } from '../../redux/selectors';

const PageWrapper = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { canAccess } = usePermission();

  const isPendingGetCourierDetail = useSelector(courierSelector.getIsPending);
  const courierDetail = useSelector(courierSelector.getData);
  const hasFinanceEmployeeRole = canAccess(permKey.PAGE_COURIER_DETAIL_COMPONENT_GETIR_FINANCE_EMPLOYEE);

  useEffect(() => {
    if ((courierDetail?.assignmentType) && canAccess(permKey.PAGE_COURIER_DETAIL_ACTIVE_ORDERS)) {
      dispatch(Creators.getCourierTasksRequest({ courierId: courierDetail._id }));
      if (canAccess(permKey.PAGE_COURIER_DETAIL_STATUS_LOGS)) {
        dispatch(
          Creators.getStatusLogsRequest({
            courierId: courierDetail._id,
            startDate: moment().startOf('day').subtract('day').toISOString(),
            endDate: moment().endOf('day').subtract('day').toISOString(),
          }),
        );
      }
    }
  }, [courierDetail, dispatch, canAccess]);

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getCourierRequest({ id, hasFinanceEmployeeRole }));
    dispatch(CommonCreators.getWarehousesRequest());
    dispatch(CommonCreators.getMarketFranchisesRequest());
    dispatch(Creators.getCourierBusyOptionsRequest());
    dispatch(Creators.getGeoFenceRequest({
      courierId: id,
      startDate: moment().startOf('day').subtract('day').toISOString(),
      endDate: moment().endOf('day').subtract('day').toISOString(),
    }));
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch, id, hasFinanceEmployeeRole]);

  if (isPendingGetCourierDetail) return <Spinner />;

  return (
    <>
      <Header />
      <FormWrapper />
    </>
  );
};

export default PageWrapper;
