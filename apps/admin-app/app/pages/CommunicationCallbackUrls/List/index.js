import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';

import {
  Header,
  CallbackUrlsFilter,
  CallbackUrlsListTable,
} from '@app/pages/CommunicationCallbackUrls/List/components';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from '@app/pages/CommunicationCallbackUrls/List/redux/saga';
import reducer from '@app/pages/CommunicationCallbackUrls/List/redux/reducer';
import { Creators } from '@app/pages/CommunicationCallbackUrls/List/redux/actions';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { SERVICE_TYPES } from '@app/pages/CommunicationCallbackUrls/constants';

const CallbackUrlsListPage = () => {
  usePageViewAnalytics({ name: ROUTE.COMMUNICATION_CALLBACK_URLS_LIST.name, squad: ROUTE.COMMUNICATION_CALLBACK_URLS_LIST.squad });
  const dispatch = useDispatch();

  const [serviceType, setServiceType] = useState(SERVICE_TYPES.NOTIF);

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <>
      <Header />
      <CallbackUrlsFilter serviceType={serviceType} setServiceType={setServiceType} />
      <CallbackUrlsListTable serviceType={serviceType} />
    </>
  );
};

const reduxKey = REDUX_KEY.COMMUNICATION_CALLBACK_URLS.LIST;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(CallbackUrlsListPage);
