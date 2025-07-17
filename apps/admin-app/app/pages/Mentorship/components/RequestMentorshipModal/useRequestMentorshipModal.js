import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { useInitAndDestroyPage } from '@shared/hooks';
import RequestMentorshipModal from '.';
import { reduxKey } from './constants';
import { Creators } from './redux/actions';
import reducer from './redux/reducer';
import saga from './redux/saga';

const useRequestMentorshipModal = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const [selectedRequest, setSelectedRequest] = useState();
  const memoizedHandleRequestMentorshipBtnClick = useCallback(({ request }) => {
    setSelectedRequest(request);
    dispatch(Creators.openModal());
  }, [dispatch]);

  const handleRequestMentorshipModalClose = () => {
    setSelectedRequest();
  };

  return {
    renderRequestMentorshipModal: (
      <div>
        {selectedRequest && <RequestMentorshipModal request={selectedRequest} onClose={handleRequestMentorshipModalClose} />}
      </div>
    ),
    handleRequestMentorshipBtnClick: memoizedHandleRequestMentorshipBtnClick,
  };
};

export default useRequestMentorshipModal;
