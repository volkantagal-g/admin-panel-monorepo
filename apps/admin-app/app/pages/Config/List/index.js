import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

import { Header, Filter, MainTable, ChangeLogsTable } from './components';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';

const reduxKey = REDUX_KEY.CONFIG.LIST;

const ConfigListPage = () => {
  usePageViewAnalytics({ name: ROUTE.CONFIG_LIST.name, squad: ROUTE.CONFIG_LIST.squad });
  const [t] = useTranslation(['global']);
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  useEffect(() => {
    dispatch(CommonCreators.getOperationalCountriesRequest());
  }, [dispatch]);

  return (
    <>
      <PageTitleHeader title={t('global:PAGE_TITLE.CONFIG.LIST')} />
      <Header />
      <Filter />
      <MainTable />
      <ChangeLogsTable />
    </>
  );
};

export default ConfigListPage;
