import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';

import {
  Header,
  GlobalRuleset,
  Filter,
  PopupListTable,
} from '@app/pages/Popup/List/components';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from '@app/pages/Popup/List/redux/saga';
import reducer from '@app/pages/Popup/List/redux/reducer';
import { Creators } from '@app/pages/Popup/List/redux/actions';

import { usePageViewAnalytics, usePermission } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';

const PopupListPage = () => {
  usePageViewAnalytics({ name: ROUTE.POPUP_LIST.name, squad: ROUTE.POPUP_LIST.squad });
  const { Can } = usePermission();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <>
      <Header />
      <Can permKey={permKey.PAGE_POPUP_GLOBAL_RULESET_PANE}>
        <GlobalRuleset />
      </Can>
      <Filter />
      <PopupListTable />
    </>
  );
};

const reduxKey = REDUX_KEY.POPUP.LIST;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(PopupListPage);
