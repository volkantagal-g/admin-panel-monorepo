import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { BasketAmountBulkUpload, DeliveryFeeBulkUpload, ServiceFeeBulkUpload } from './components';
import { REDUX_KEY } from '@shared/shared/constants';
import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import sagas from './redux/sagas';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';

const reduxKey = REDUX_KEY.MARKET_FEES.MARKET_FEES_BULK_UPLOAD;

const BulkFeeUpload = () => {
  usePageViewAnalytics({
    name: ROUTE.MARKET_FEES_BULK_UPLOAD.name,
    squad: ROUTE.MARKET_FEES_BULK_UPLOAD.squad,
  });
  const dispatch = useDispatch();

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga: sagas });
  useInitAndDestroyPage({ dispatch, Creators });

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <div className="p-2">
      <DeliveryFeeBulkUpload />
      <ServiceFeeBulkUpload />
      <BasketAmountBulkUpload />
    </div>
  );
};

export default BulkFeeUpload;
