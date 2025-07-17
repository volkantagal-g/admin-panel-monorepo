import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { compose } from 'redux';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import { Header, InformationEditRequestDetailBody } from './components';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { ROUTE } from '@app/routes';

const PersonRequestDetailPage = () => {
  usePageViewAnalytics({ name: ROUTE.PERSON_REQUEST_DETAIL.name, squad: ROUTE.PERSON_REQUEST_DETAIL.squad });
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getInformationEditRequestDetailRequest({ approvalId: id }));
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch, id]);

  return (
    <>
      <Header />
      <InformationEditRequestDetailBody />
    </>
  );
};

const reduxKey = REDUX_KEY.PERSON_REQUEST.STATUS.DETAIL;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(PersonRequestDetailPage);
