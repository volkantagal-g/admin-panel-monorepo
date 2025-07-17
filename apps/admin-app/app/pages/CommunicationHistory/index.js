import { compose } from 'redux';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { usePageViewAnalytics } from '@shared/hooks';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from '@app/pages/CommunicationHistory/redux/saga';
import { Creators } from '@app/pages/CommunicationHistory/redux/actions';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import reducer from '@app/pages/CommunicationHistory/redux/reducer';
import { DashboardFilter, Header, DashboardTable } from '@app/pages/CommunicationHistory/components';
import { ADMIN_PANEL_CONFIGS, MARKET_CONFIG_QUERY_TYPES, REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import { COMMUNICATION_CHANNEL_TYPES } from '@app/pages/CommunicationHistory/constants';

const CommunicationHistoryPage = () => {
  usePageViewAnalytics({ name: ROUTE.COMMUNICATION_HISTORY.name, squad: ROUTE.COMMUNICATION_HISTORY.squad });
  const dispatch = useDispatch();

  const [communicationType, setCommunicationType] = useState(COMMUNICATION_CHANNEL_TYPES.NOTIF);

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(CommonCreators.getConfigWithKeyRequest({
      body: {
        key: ADMIN_PANEL_CONFIGS.ACTIVE_DOMAIN_TYPES,
        type: MARKET_CONFIG_QUERY_TYPES.ARRAY,
      },
    }));
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <>
      <Header />
      <DashboardFilter communicationType={communicationType} setCommunicationType={setCommunicationType} />
      <DashboardTable communicationType={communicationType} />
    </>
  );
};

const reduxKey = REDUX_KEY.COMMUNICATION_HISTORY;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(CommunicationHistoryPage);
