import { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { usePageViewAnalytics } from '@shared/hooks';

import { Content } from '@shared/components/GUI';
import { Header, PlanogramWarehousesListTable } from '@app/pages/Planogram/Warehouses/components';
import Filters from '@app/pages/Planogram/Warehouses/components/Filters';

import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';

import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { Creators } from '@app/pages/Planogram/Warehouses/redux/actions';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import saga from '@app/pages/Planogram/Warehouses/redux/saga';
import reducer from '@app/pages/Planogram/Warehouses/redux/reducer';

const WarehouseListPage = () => {
  usePageViewAnalytics({ name: ROUTE.PLANOGRAM_WAREHOUSES.name, squad: ROUTE.PLANOGRAM_WAREHOUSES.squad });
  const dispatch = useDispatch();

  const initialPagination = useMemo(() => ({ page: 1, pageSize: 10 }), []);

  const reduxKey = REDUX_KEY.PLANOGRAM.WAREHOUSES;
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });

  const [formValues, setFormValues] = useState({});

  const getRegionsRequest = useCallback(params => dispatch(CommonCreators.getRegionsRequest(params)), [dispatch]);

  const initializePage = useCallback(() => {
    dispatch(Creators.initPage());
    dispatch(CommonCreators.getCitiesRequest());
    dispatch(Creators.getSizesRequest());
    dispatch(Creators.getDemographiesRequest());
    dispatch(Creators.getWarehouseTypesRequest());
    dispatch(Creators.getMainWarehousesAndCitiesRequest());
    dispatch(Creators.listPlanogramWarehousesRequest({ body: { pagination: { page: 1, pageSize: 10 } } }));
    dispatch(Creators.listPlanogramWarehousesInitialRequest());
  }, [dispatch]);

  useEffect(() => {
    initializePage();
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [initializePage, dispatch]);

  return (
    <Content>
      <Header />
      <Filters
        setFormValues={setFormValues}
        getRegionsRequest={getRegionsRequest}
        initialPagination={initialPagination}
      />
      <PlanogramWarehousesListTable
        formValues={formValues}
        initialPagination={initialPagination}
      />
    </Content>
  );
};
export default WarehouseListPage;
