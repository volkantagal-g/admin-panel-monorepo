import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash';
import { Empty, Skeleton } from 'antd';

import { ROUTE } from '@app/routes';
import { REDUX_KEY } from '@shared/shared/constants';
import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';

// UI imports
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';
import {
  SectionTitle,
  EmployeeDetail,
  Header,
  MyAssets,
  ActiveSessions,
  LeavesSection,
  Vehicles,
} from './components';

// redux imports
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from '@app/pages/Profile/redux/saga';
import reducer from '@app/pages/Profile/redux/reducer';
import { Creators } from '@app/pages/Profile/redux/actions';
import { getEmployeeDetailsSelector } from './redux/selectors';

function Profile() {
  const { t } = useTranslation(['profile', 'assetPage']);
  const dispatch = useDispatch();
  usePageViewAnalytics({ name: ROUTE.PROFILE.name, squad: ROUTE.PROFILE.squad });

  useInitAndDestroyPage({ dispatch, Creators });

  const employee = useSelector(getEmployeeDetailsSelector.getData);
  const loading = useSelector(getEmployeeDetailsSelector.getIsPending);

  useEffect(() => {
    dispatch(Creators.getEmployeeDetailsForProfileRequest());
    dispatch(Creators.getEmployeeEducationsRequest());
  }, [dispatch]);

  return (
    <>
      <PageTitleHeader title={t('PAGE_TITLE')} />
      <Header />
      <SectionTitle title={t('profile:COMPONENTS.EMPLOYEE_INFO.TITLE')} />
      {loading ? <Skeleton active /> : <div>{!isEmpty(employee) ? <EmployeeDetail /> : <Empty />}</div> }
      <SectionTitle title={t('profile:COMPONENTS.LEAVES.TITLE')} />
      <LeavesSection />
      <MyAssets />
      <Vehicles />
      <ActiveSessions />
    </>
  );
}

const reduxKey = REDUX_KEY.PROFILE;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(Profile);
