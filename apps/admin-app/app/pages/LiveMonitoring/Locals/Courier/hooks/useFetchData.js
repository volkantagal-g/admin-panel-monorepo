import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { Creators } from '../redux/actions';

const useFetchData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Creators.getCourierPlanAndCountsRequest());

    dispatch(CommonCreators.getCitiesRequest());
    dispatch(CommonCreators.getActiveWarehousesRequest());
  }, [dispatch]);
};

export default useFetchData;
