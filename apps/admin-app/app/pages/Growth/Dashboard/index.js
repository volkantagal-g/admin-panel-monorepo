import { useEffect } from 'react';
import { compose } from 'redux';
import { useDispatch } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';

import { Creators } from './redux/actions';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import saga from './redux/saga';
import reducer from './redux/reducer';
import TwoColumnLayout from '@shared/components/UI/TwoColumnLayout';
import ErrorFallback from '@shared/components/UI/ErrorFallback';
import {
  Header,
  Filter,
  GrowthDomainSummaryTable,
  GrowthWarehouseBreakdownContainer,
} from './components';
import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';

const GrowthDashboard = () => {
  usePageViewAnalytics({ name: ROUTE.GROWTH_DASHBOARD.name, squad: ROUTE.GROWTH_DASHBOARD.squad });

  const dispatch = useDispatch();

  useInitAndDestroyPage({ dispatch, Creators });
  useEffect(() => {
    dispatch(CommonCreators.getAvailableDomainTypesForCountrySelectorRequest());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Filter />
      <TwoColumnLayout
        gutter={[6, 6]}
        leftColumn={(
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <GrowthDomainSummaryTable />
          </ErrorBoundary>
        )}
        rightColumn={(
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <GrowthWarehouseBreakdownContainer />
          </ErrorBoundary>
        )}
      />
    </>
  );
};

const reduxKey = REDUX_KEY.GROWTH.DAILY_DASHBOARD;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(GrowthDashboard);
