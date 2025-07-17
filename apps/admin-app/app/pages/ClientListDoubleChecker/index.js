import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';

import { useTranslation } from 'react-i18next';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { Header, ClientListImporter, Filter } from './components';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

function ClientListDoubleChecker() {
  usePageViewAnalytics({ name: ROUTE.CLIENT_LIST_DOUBLE_CHECKER.name, squad: ROUTE.CLIENT_LIST_DOUBLE_CHECKER.squad });
  const dispatch = useDispatch();
  const { t } = useTranslation('global');

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <div>
      <PageTitleHeader title={t('PAGE_TITLE.CLIENT_LIST_DOUBLE_CHECKER')} />
      <Header />
      <ClientListImporter />
      <Filter />
    </div>
  );
}

const reduxKey = REDUX_KEY.CLIENT_LIST_DOUBLE_CHECKER;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(ClientListDoubleChecker);
