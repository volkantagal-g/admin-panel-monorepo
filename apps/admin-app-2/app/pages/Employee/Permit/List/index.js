import { useEffect } from 'react';
import { compose } from 'redux';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useInitAndDestroyPage } from '@shared/hooks';
import injectReducer from '@shared/utils/injectReducer';
import injectSaga from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';
import Filter from './components/Filter';
import Table from './components/Table';
import Header from './components/Header';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';

const EmployeePermitListPage = () => {
  const { t } = useTranslation(['global', 'employeePage']);
  const dispatch = useDispatch();
  usePageViewAnalytics({
    name: ROUTE.EMPLOYEE_PERMIT_LIST.name,
    squad: ROUTE.EMPLOYEE_PERMIT_LIST.squad,
  });

  useInitAndDestroyPage({ dispatch, Creators });

  useEffect(() => {
    dispatch(Creators.getFilteredPermitsRequest({}));
  }, [dispatch]);

  return (
    <>
      <PageTitleHeader title={t('global:PAGE_TITLE.EMPLOYEE.PERMIT_LIST')} />
      <Header />
      <Filter />
      <Table />
    </>
  );
};

const reduxKey = REDUX_KEY.EMPLOYEE.PERMIT.LIST;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(EmployeePermitListPage);
