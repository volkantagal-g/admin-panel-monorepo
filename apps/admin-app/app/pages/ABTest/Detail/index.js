import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';
import { useParams } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';

import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import DetailForm from './components/DetailForm';
import Header from '../components/Header';

const Detail = () => {
  usePageViewAnalytics({ name: ROUTE.AB_TEST_DETAIL.name, squad: ROUTE.AB_TEST_DETAIL.squad });
  const dispatch = useDispatch();
  const { id: testId } = useParams();
  const { t } = useTranslation('global');

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getTestRequest({ testId }));
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch, testId]);

  return (
    <>
      <Header
        title={t('PAGE_TITLE.AB_TEST.DETAIL')}
        key="header"
      />
      <DetailForm testId={testId} />
    </>
  );
};

const reduxKey = REDUX_KEY.AB_TEST_PAGE.DETAIL;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(Detail);
