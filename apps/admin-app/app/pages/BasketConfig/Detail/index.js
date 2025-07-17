import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { basketAmountDetailsSelector } from './redux/selectors';
import Spinner from '@shared/components/Spinner';
import { BasketAmountConfigs, Header, WarehouseDetails } from './components';
import { Content } from '@shared/components/GUI';

const reduxKey = REDUX_KEY.BASKET_CONFIG.DETAIL;

const BasketConfigDetails = () => {
  const { warehouseId } = useParams();
  const dispatch = useDispatch();
  const isPending = useSelector(basketAmountDetailsSelector.getIsPending);
  usePageViewAnalytics({
    name: ROUTE.GETIR_MARKET_BASKET_CONFIG_DETAILS.name,
    squad: ROUTE.GETIR_MARKET_BASKET_CONFIG_DETAILS.squad,
  });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  useEffect(() => {
    dispatch(Creators.getDiscountedBasketAmountsRequest({ warehouseId }));
  }, [warehouseId, dispatch]);

  return (
    <Content>
      <Header />
      {isPending ? (
        <Spinner />
      ) : (
        <>
          <WarehouseDetails />
          <BasketAmountConfigs />
        </>
      )}
    </Content>
  );
};

export default BasketConfigDetails;
