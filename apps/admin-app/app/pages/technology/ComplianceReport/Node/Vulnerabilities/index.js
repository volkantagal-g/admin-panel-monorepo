import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';

import { Header, Table } from './components';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';

const ComplianceReportNodeVulnerabilities = () => {
  usePageViewAnalytics({
    name: ROUTE.TECHNOLOGY_COMPLIANCE_REPORT_NODE_VULNERABILITIES.name,
    squad: ROUTE.TECHNOLOGY_COMPLIANCE_REPORT_NODE_VULNERABILITIES.squad,
  });
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
      <Table />
    </div>
  );
};

const reduxKey = REDUX_KEY.TECHNOLOGY.COMPLIANCE_REPORT.NODE.VULNERABILITIES;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(ComplianceReportNodeVulnerabilities);
