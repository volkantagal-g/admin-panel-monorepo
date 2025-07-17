import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';

import { Content } from '@shared/components/GUI';
import {
  Header,
  PlanogramProductsListTable,
} from '@app/pages/Planogram/Products/components';
import Filters from '@app/pages/Planogram/Products/components/Filters';

import { REDUX_KEY } from '@shared/shared/constants';
import { Creators } from '@app/pages/Planogram/Products/redux/actions';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import saga from '@app/pages/Planogram/Products/redux/saga';
import reducer from '@app/pages/Planogram/Products/redux/reducer';

const PlanogramListPage = () => {
  usePageViewAnalytics({ name: ROUTE.PLANOGRAM_PRODUCTS.name, squad: ROUTE.PLANOGRAM_PRODUCTS.squad });
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({});

  const reduxKey = REDUX_KEY.PLANOGRAM.PRODUCTS;
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });

  const initializePage = useCallback(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getSizesRequest());
    dispatch(Creators.getDemographiesRequest());
    dispatch(Creators.getPlanogramProductListRequest({ body: { page: 1, pageSize: 10 } }));
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
      <Filters setFormValues={setFormValues} />
      <PlanogramProductsListTable formValues={formValues} />
    </Content>
  );
};
export default PlanogramListPage;
