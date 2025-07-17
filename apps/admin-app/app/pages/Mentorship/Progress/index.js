import { useEffect } from 'react';
import { Row, Col, Divider } from 'antd';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ROUTE } from '@app/routes';
import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { reduxKey } from './constants';
import { Creators } from './redux/actions';
import {
  getMentorshipRequestDetailSelector,
  getMentorshipTodosSelector,
  getMentorshipSessionNotesSelector,
  getMentorshipUserOfCurrentUserSelector,
} from './redux/selectors';
import { Space } from '@shared/components/GUI';
import Header from '../components/Header';
import DetailInfo from './components/DetailInfo';
import InitialSteps from './components/InitialSteps';
import Outlines from './components/Outlines';
import TodoList from './components/TodoList';
import SessionNotes from './components/SessionNotes';
import FinishMentorshipButton from './components/FinishMentorshipButton';

const MentorshipProgress = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  usePageViewAnalytics({ name: ROUTE.MENTORSHIP_PROGRESS.name, squad: ROUTE.MENTORSHIP_PROGRESS.squad });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const mentorshipUser = useSelector(getMentorshipUserOfCurrentUserSelector.getData);
  const mentorshipUserIsPending = useSelector(getMentorshipUserOfCurrentUserSelector.getIsPending);
  const mentorshipRequestData = useSelector(getMentorshipRequestDetailSelector.getData);
  const isPending = useSelector(getMentorshipRequestDetailSelector.getIsPending);

  const todosData = useSelector(getMentorshipTodosSelector.getData);
  const sessionNotesData = useSelector(getMentorshipSessionNotesSelector.getData);
  const mentorshipUserId = mentorshipUser?._id;
  const isCurrentUserMentor = mentorshipRequestData?.mentor?.employeeId?._id === mentorshipUserId;

  useEffect(() => {
    dispatch(Creators.getMentorshipUserOfCurrentUserRequest({}));
  }, [dispatch]);

  useEffect(() => {
    if (id && mentorshipUserId) {
      dispatch(Creators.getMentorshipRequestDetailRequest({ body: { id, mentorshipUserId } }));
      dispatch(Creators.getMentorshipTodosRequest({ body: { mentorshipRequest: id } }));
      dispatch(Creators.getMentorshipSessionNotesRequest({ body: { mentorshipRequest: id } }));
    }
  }, [dispatch, id, mentorshipUserId]);

  const handleUpdateMentorshipRequest = values => {
    dispatch(Creators.updateMentorshipRequestDetailRequest({ body: { id, ...values } }));
  };

  return (
    <div className="p-3">
      <Header />
      <Space className="p-0">
        <div>
          <DetailInfo {...mentorshipRequestData} />
          <Divider className="m-0" />
          <Row gutter={[20, 20]} className="p-4">
            <Col lg={6} md={12} xs={24}>
              <InitialSteps />
            </Col>
            <Col lg={6} md={12} xs={24}>
              <Outlines
                data={mentorshipRequestData}
                onSubmit={handleUpdateMentorshipRequest}
                isPending={isPending}
                disabled={!!mentorshipRequestData?.finishedDate || !mentorshipRequestData?.mentorshipStatus}
              />
            </Col>
            <Col lg={6} md={12} xs={24}>
              <TodoList
                todos={todosData}
                isPending={isPending}
                disabled={!!mentorshipRequestData?.finishedDate || !mentorshipRequestData?.mentorshipStatus}
                mentorshipRequestId={id}
              />
            </Col>
            <Col lg={6} md={12} xs={24}>
              <SessionNotes
                sessionNotes={sessionNotesData}
                isPending={isPending}
                disabled={!!mentorshipRequestData?.finishedDate || !mentorshipRequestData?.mentorshipStatus}
                mentorshipRequestId={id}
              />
            </Col>
          </Row>
        </div>
      </Space>
      {(!mentorshipRequestData?.finishedDate && isCurrentUserMentor && !mentorshipUserIsPending) ? (
        <FinishMentorshipButton
          mentorshipRequestId={id}
          isPending={isPending}
        />
      ) : null}
    </div>
  );
};

export default MentorshipProgress;
