import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { Row } from 'antd';
import { useParams } from 'react-router-dom';

import {
  Header,
  LeftGridComponent,
  RightGridComponent,
  MarketOrderTable,
  FoodTable,
  LocalsTable,
  GetirBiTaksiTable,
  AgentBasedPermission,
  WaterMarketplaceOrdersTable,
  FinanceTable,
} from '@app/pages/Client/Detail/components';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from '@app/pages/Client/Detail/redux/saga';
import reducer from '@app/pages/Client/Detail/redux/reducer';
import { Creators } from '@app/pages/Client/Detail/redux/actions';
import { usePageViewAnalytics, useToggle, usePermission } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { accessSelector } from './redux/selectors';
import useQuery from '@shared/shared/hooks/useQuery';
import SusbscriptionTable from './components/SubscriptionTable';
import permKey from '@shared/shared/permKey.json';

const ClientDetailPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const query = useQuery();
  const slectedCountryCode = JSON.parse(localStorage.getItem('selectedCountry')).code.alpha2;
  const integrationKey = query.get('integrationKey');
  usePageViewAnalytics({ name: ROUTE.CLIENT_DETAIL.name, squad: ROUTE.CLIENT_DETAIL.squad });
  const accessToken = useSelector(accessSelector.getToken);
  const [isAddFeedbackModalVisible, setIsAddFeedbackModalVisible] = useToggle();
  const { canAccess } = usePermission();
  const hasSubscriptionDetailViewPermission = canAccess(permKey.PAGE_CLIENT_DETAIL_SUBSCRIPTION_DETAILS_DISPLAY);
  useEffect(() => {
    dispatch(Creators.initPage());

    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(Creators.getClientDetailAccessTokenRequest({ clientId: id }));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (accessToken) {
      dispatch(Creators.getClientRequest({ data: { id, integrationKey } }));

      dispatch(Creators.getSegmentsOfClientRequest({ clientId: id }));
      if (hasSubscriptionDetailViewPermission) {
        dispatch(Creators.getSubscriptionDetailsRequest({ id, typeCode: 'GETIR_OZEL', countryCode: slectedCountryCode }));
      }
    }
  }, [dispatch, accessToken, id, integrationKey, hasSubscriptionDetailViewPermission, slectedCountryCode]);

  return (
    <>
      <Header
        setIsAddFeedbackModalVisible={setIsAddFeedbackModalVisible}
      />
      <Row gutter={16} data-testid="client-details-main-container">
        <LeftGridComponent
          isAddFeedbackModalVisible={isAddFeedbackModalVisible}
          setIsAddFeedbackModalVisible={setIsAddFeedbackModalVisible}
        />
        <RightGridComponent />
        {hasSubscriptionDetailViewPermission && <SusbscriptionTable />}
        <FinanceTable />
        <MarketOrderTable />
        <FoodTable />
        <LocalsTable />
        <GetirBiTaksiTable />
        <WaterMarketplaceOrdersTable />
      </Row>
      <AgentBasedPermission />
    </>
  );
};

const reduxKey = REDUX_KEY.CLIENT.DETAIL;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(ClientDetailPage);
