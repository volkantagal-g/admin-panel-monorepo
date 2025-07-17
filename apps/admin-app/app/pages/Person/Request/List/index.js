import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';

import { REDUX_KEY, PERSONEL_REQUEST_STATUS } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { Header, InformationEditRequestList } from './components';
import { ROUTE } from '@app/routes';

const PersonRequestListPage = () => {
  usePageViewAnalytics({ name: ROUTE.PERSON_REQUEST_LIST.name, squad: ROUTE.PERSON_REQUEST_LIST.squad });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  const [selectedPersonRequestStatus, setSelectedPersonRequestStatus] = useState(PERSONEL_REQUEST_STATUS.INFORMATION_EDIT_REQUESTS);

  const handlePersonRequestStatusChange = value => {
    setSelectedPersonRequestStatus(value.target.value);
  };

  return (
    <>
      <Header
        selectedPersonRequestStatus={selectedPersonRequestStatus}
        handlePersonRequestStatusChange={handlePersonRequestStatusChange}
      />
      {
        selectedPersonRequestStatus === PERSONEL_REQUEST_STATUS.INFORMATION_EDIT_REQUESTS &&
        <InformationEditRequestList />
      }
    </>
  );
};

const reduxKey = REDUX_KEY.PERSON_REQUEST.STATUS.LIST;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(PersonRequestListPage);
