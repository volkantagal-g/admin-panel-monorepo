import { useDispatch } from 'react-redux';
import { compose } from 'redux';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { Row } from 'antd';

import { useInitAndDestroyPage } from '@shared/hooks';
import injectReducer from '@shared/utils/injectReducer';
import injectSaga from '@shared/utils/injectSaga';
import { isMobile } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

import Dashboard from './components/Dashboard';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';

const reduxKey = REDUX_KEY.EMPLOYEE.OFFICE_ATTENDANCE_TRACKING.DASHBOARD;

const EmployeeOfficeAttendanceTrackingDashboardPage = () => {
  const { t } = useTranslation(['global']);
  const dispatch = useDispatch();
  const isDeviceMobile = isMobile();
  usePageViewAnalytics({
    name: ROUTE.EMPLOYEE_OFFICE_ATTENDANCE_TRACKING_DASHBOARD.name,
    squad: ROUTE.EMPLOYEE_OFFICE_ATTENDANCE_TRACKING_DASHBOARD.squad,
  });
  useInitAndDestroyPage({ dispatch, Creators });

  return (
    <Row className="p-1">
      <PageTitleHeader title={t('global:PAGE_TITLE.EMPLOYEE.OFFICE_ATTENDANCE_TRACKING.DASHBOARD')} />
      {isDeviceMobile && (
        <Helmet>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        </Helmet>
      )}
      <Dashboard />
    </Row>
  );
};

const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(
  withReducer,
  withSaga,
)(EmployeeOfficeAttendanceTrackingDashboardPage);
