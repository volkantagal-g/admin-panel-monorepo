import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';

import { useTranslation } from 'react-i18next';

import NewForm from './components/NewForm';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import Header from '../components/Header';

const New = () => {
  usePageViewAnalytics({ name: ROUTE.AB_TEST_NEW.name, squad: ROUTE.AB_TEST_NEW.squad });
  const dispatch = useDispatch();
  const { t } = useTranslation('global');

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <>
      <Header
        title={t('PAGE_TITLE.AB_TEST.CREATE')}
        key="header"
      />
      <NewForm />
    </>
  );
};

const reduxKey = REDUX_KEY.AB_TEST_PAGE.NEW;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(New);
