import { useEffect } from 'react';
import { compose } from 'redux';
import { useDispatch } from 'react-redux';

import { Header, Form } from './components';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { ROUTE } from '@app/routes';
import { usePageViewAnalytics } from '@shared/hooks';

import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';

const CampaignNewPage = () => {
  const dispatch = useDispatch();
  usePageViewAnalytics({ name: ROUTE.GETIR_WATER_CAMPAIGN_NEW.name, squad: ROUTE.GETIR_WATER_CAMPAIGN_NEW.squad });

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getProductsRequest());
    dispatch(Creators.getBrandsRequest());

    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <>
      <Header />
      <Form />
    </>
  );
};

const reduxKey = REDUX_KEY.GETIR_WATER.CAMPAIGNS;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(CampaignNewPage);
