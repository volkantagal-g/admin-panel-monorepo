import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectSaga } from '@shared/utils/injectSaga';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { Creators } from './redux/action';
import VehicleDetails from './components/detailsPage';
import VehicleLogs from './components/VehicleLogs';

import { Creators as CommonCreators } from '@shared/redux/actions/common';

const reduxKey = REDUX_KEY.VEHICLE.DETAIL;

const VehicleDetailPage = () => {
  usePageViewAnalytics({ name: ROUTE.VEHICLE_DETAIL.name, squad: ROUTE.VEHICLE_DETAIL.squad });
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const { id } = useParams();

  useEffect(() => {
    dispatch(Creators.getVehicleType());
    dispatch(CommonCreators.getCitiesRequest());
    dispatch(Creators.getVehicleDetails({ vehicleId: id }));
  }, [id, dispatch]);

  return (
    <>
      <VehicleDetails />
      <VehicleLogs />
    </>
  );
};

export default VehicleDetailPage;
