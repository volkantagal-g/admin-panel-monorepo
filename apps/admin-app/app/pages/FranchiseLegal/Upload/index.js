import { useDispatch } from 'react-redux';

import { ROUTE } from '@app/routes';
import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { useInjectReducer } from '@shared/utils/injectReducer';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { Form } from './components';

const reduxKey = REDUX_KEY.FRANCHISE_LEGAL.NEW;

const UploadFranchiseLegal = () => {
  usePageViewAnalytics({ name: ROUTE.FRANCHISE_LEGAL_NEW.name, squad: ROUTE.FRANCHISE_LEGAL_NEW.squad });

  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });
  return (
    <Form />
  );
};

export default UploadFranchiseLegal;
