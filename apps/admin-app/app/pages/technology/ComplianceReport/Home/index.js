import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';

import { Header, Charts } from './components';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';

const ComplianceReportHome = () => {
  usePageViewAnalytics({ name: ROUTE.TECHNOLOGY_COMPLIANCE_REPORT_HOME.name, squad: ROUTE.TECHNOLOGY_COMPLIANCE_REPORT_HOME.squad });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <div>
      <Header />
      <Charts />
    </div>
  );
};

const reduxKey = REDUX_KEY.TECHNOLOGY.COMPLIANCE_REPORT.HOME;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(ComplianceReportHome);
