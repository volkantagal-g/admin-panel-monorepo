import { useEffect } from 'react';
import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Skeleton } from 'antd';

import { Header, Form, PromoUsageInfo } from './components';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { ROUTE } from '@app/routes';
import { usePageViewAnalytics } from '@shared/hooks';

import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { campaignDetailSelector } from './redux/selectors';

const CampaignDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  usePageViewAnalytics({ name: ROUTE.GETIR_WATER_CAMPAIGN_DETAIL.name, squad: ROUTE.GETIR_WATER_CAMPAIGN_DETAIL.squad, slugs: { id } });

  const isPendingDetail = useSelector(campaignDetailSelector.getIsPending);

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getProductsRequest());
    dispatch(Creators.getBrandsRequest());
    dispatch(Creators.getCampaignDetailRequest({ campaignId: id }));
    dispatch(Creators.getPromoUsageDetailRequest({ campaignId: id }));

    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch, id]);

  return (
    <Skeleton loading={isPendingDetail} active>
      <Header />
      <PromoUsageInfo />
      <Form />
    </Skeleton>
  );
};

const reduxKey = REDUX_KEY.GETIR_WATER.CAMPAIGNS;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(CampaignDetailPage);
