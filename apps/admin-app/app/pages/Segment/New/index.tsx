import { useDispatch } from 'react-redux';

import { useTranslation } from 'react-i18next';

import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';

import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { NewForm, Header } from './components';

const reduxKey = REDUX_KEY.SEGMENT.NEW;

const SegmentNewPage = () => {
  const { t } = useTranslation('segment');
  const dispatch = useDispatch();
  usePageViewAnalytics({ name: ROUTE.SEGMENT_NEW.name, squad: ROUTE.SEGMENT_NEW.squad });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  return (
    <>
      <Header />
      <NewForm />
    </>
  );
};

export default SegmentNewPage;
