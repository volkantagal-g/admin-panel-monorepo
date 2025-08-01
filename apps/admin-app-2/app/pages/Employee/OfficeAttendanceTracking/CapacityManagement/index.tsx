import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';

import Capacity from './components/Capacity';

const reduxKey = REDUX_KEY.EMPLOYEE.OFFICE_ATTENDANCE_TRACKING.CAPACITY_MANAGEMENT;

function CapacityManagement() {
  const { t } = useTranslation(['global', 'employeePage']);
  const dispatch = useDispatch();
  usePageViewAnalytics({
    name: ROUTE.EMPLOYEE_OFFICE_ATTENDANCE_TRACKING_CAPACITY_MANAGEMENT.name,
    squad: ROUTE.EMPLOYEE_OFFICE_ATTENDANCE_TRACKING_CAPACITY_MANAGEMENT.squad,
  });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  return (
    <div className="p-1 h-100">
      <PageTitleHeader title={t('global:PAGE_TITLE.EMPLOYEE.OFFICE_ATTENDANCE_TRACKING.CAPACITY_MANAGEMENT')} />
      <Capacity />
    </div>
  );
}

export default CapacityManagement;
