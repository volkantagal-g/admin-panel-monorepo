import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import WarehouseGeneralInfo from './components/GeneralInfo';
import DeliveryFeeConfig from './components/DeliveryFee';
import ServiceFeeConfig from './components/ServiceFee';
import Header from './components/Header';
import { feeDetailsSelector } from './redux/selectors';
import Spinner from '@shared/components/Spinner';
import { Content } from '@shared/components/GUI';

const reduxKey = REDUX_KEY.MARKET_FEES.DETAILS;

const MarketFeesDetail = () => {
  const dispatch = useDispatch();
  const isPending = useSelector(feeDetailsSelector.getIsPending);
  const { warehouseId } = useParams();
  usePageViewAnalytics({
    name: ROUTE.MARKET_FEES_DETAILS.name,
    squad: ROUTE.MARKET_FEES_DETAILS.squad,
  });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  useEffect(() => {
    let isStarted = false;
    if (warehouseId) {
      dispatch(Creators.getFeeDetailsRequest({ warehouseId }));
      dispatch(Creators.getDynamicLevelsRequest({ warehouseId }));
      dispatch(Creators.startListeningSocketEvents({ warehouseId }));
      isStarted = true;
    }

    return () => {
      if (isStarted) {
        dispatch(Creators.stopListeningSocketEvents({}));
      }
    };
  }, [warehouseId, dispatch]);

  return (
    <Content>
      <Header />
      {isPending ? (
        <Spinner />
      ) : (
        <>
          <WarehouseGeneralInfo />
          <DeliveryFeeConfig />
          <ServiceFeeConfig />
        </>
      )}
    </Content>
  );
};

export default MarketFeesDetail;
