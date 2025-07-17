import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Content } from '@shared/components/GUI';
import GeneralInfoForm from '@app/pages/Planogram/Products/Convert/components/GeneralInfoForm';
import Header from '@app/pages/Planogram/Products/Convert/components/Header';

import { REDUX_KEY } from '@shared/shared/constants';
import { Creators } from '@app/pages/Planogram/Products/redux/actions';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import saga from '@app/pages/Planogram/Products/redux/saga';
import reducer from '@app/pages/Planogram/Products/redux/reducer';

const PlanogramProductDetailPage = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const reduxKey = REDUX_KEY.PLANOGRAM.PRODUCTS;
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });

  const initializePage = useCallback(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getSizesRequest());
    dispatch(Creators.getDemographiesRequest());
    dispatch(Creators.getWarehouseTypesRequest());
    dispatch(Creators.getMainWarehousesAndCitiesRequest());
    dispatch(Creators.getPlanogramProductDetailsRequest({ id }));
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
export default PlanogramProductDetailPage;
