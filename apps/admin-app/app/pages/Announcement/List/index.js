import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';

import { Header, AnnouncementFilter, AnnouncementListTable } from '@app/pages/Announcement/List/components';
import { ADMIN_PANEL_CONFIGS, MARKET_CONFIG_QUERY_TYPES, REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from '@app/pages/Announcement/List/redux/saga';
import reducer from '@app/pages/Announcement/List/redux/reducer';
import { Creators } from '@app/pages/Announcement/List/redux/actions';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { Creators as CommonCreators } from '@shared/redux/actions/common';

const AnnouncementListPage = () => {
  usePageViewAnalytics({ name: ROUTE.ANNOUNCEMENT_LIST.name, squad: ROUTE.ANNOUNCEMENT_LIST.squad });
  const dispatch = useDispatch();

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
      <AnnouncementFilter />
      <hr />
      <AnnouncementListTable />
    </>
  );
};

const reduxKey = REDUX_KEY.ANNOUNCEMENT.LIST;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(AnnouncementListPage);
