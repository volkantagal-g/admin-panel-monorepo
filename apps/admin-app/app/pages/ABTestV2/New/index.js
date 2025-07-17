import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';
import { useTranslation } from 'react-i18next';

import { Content } from '@shared/components/GUI';
import NewForm from './components/NewForm';
import Header from '../components/Header';

import { REDUX_KEY } from '@shared/shared/constants';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { Creators } from './redux/actions';

import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from './redux/saga';
import reducer from './redux/reducer';

const linkTo = '/abTestingv2/list';

const New = () => {
  usePageViewAnalytics({ name: ROUTE.AB_TEST_V2_NEW.name, squad: ROUTE.AB_TEST_V2_NEW.squad });
  const dispatch = useDispatch();
  const { t } = useTranslation('abTestingV2Page');

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getTestTypeListRequest());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <Content>
      <Header
        title={t('global:PAGE_TITLE.AB_TEST_V2.CREATE')}
        showInfo
        contentStartPlacement
        showLink
        linkTo={linkTo}
      />
      <NewForm />
    </Content>
  );
};

const reduxKey = REDUX_KEY.AB_TEST_V2_PAGE.NEW;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(New);
