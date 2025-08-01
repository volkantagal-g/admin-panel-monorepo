import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';

import { Header, MarketingApprovalFilter, MarketingApprovalListTable } from '@app/pages/MarketingApproval/List/components';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from '@app/pages/MarketingApproval/List/redux/saga';
import reducer from '@app/pages/MarketingApproval/List/redux/reducer';
import { Creators } from '@app/pages/MarketingApproval/List/redux/actions';
import { usePageViewAnalytics, usePermission } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';

const MarketingApprovalListPage = () => {
  usePageViewAnalytics({ name: ROUTE.MARKETING_APPROVAL_LIST.name, squad: ROUTE.MARKETING_APPROVAL_LIST.squad });
  const dispatch = useDispatch();
  const { Can } = usePermission();

  useEffect(() => {
    dispatch(Creators.initPage());

    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <Can permKey={permKey.PAGE_MARKETING_APPROVAL_LIST}>
      <Header />
      <MarketingApprovalFilter />
      <hr />
      <MarketingApprovalListTable />
    </Can>
  );
};

const reduxKey = REDUX_KEY.MARKETING_APPROVAL.LIST;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(MarketingApprovalListPage);
