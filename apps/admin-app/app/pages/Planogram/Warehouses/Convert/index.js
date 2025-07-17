import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Content } from '@shared/components/GUI';
import Header from '@app/pages/Planogram/Warehouses/Convert/components/Header';
import GeneralInfoForm from '@app/pages/Planogram/Warehouses/Convert/components/GeneralInfoForm';

import { REDUX_KEY } from '@shared/shared/constants';
import { Creators } from '@app/pages/Planogram/Warehouses/redux/actions';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import saga from '@app/pages/Planogram/Warehouses/redux/saga';
import reducer from '@app/pages/Planogram/Warehouses/redux/reducer';

const PlanogramWarehouseConvertPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const reduxKey = REDUX_KEY.PLANOGRAM.WAREHOUSES;
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });

  const initializePage = useCallback(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getPlanogramWarehouseDetailsRequest({ body: { warehouseId: id, pagination: { page: 1, pageSize: 10 } } }));
    dispatch(Creators.getSizesRequest());
    dispatch(Creators.getDemographiesRequest());
    dispatch(Creators.getWarehouseTypesRequest());
  }, [dispatch, id]);

  useEffect(() => {
    initializePage();
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [initializePage, dispatch]);

  return (
    <Content>
      <Header />
      <GeneralInfoForm />
    </Content>
  );
};
export default PlanogramWarehouseConvertPage;
