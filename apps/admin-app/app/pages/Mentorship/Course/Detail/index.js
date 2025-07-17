import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import Header from '@app/pages/Mentorship/components/Header';
import FormUtil from './components/FormUtil';
import { reduxKey } from './constants';
import { Creators } from './redux/actions';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { getMentorshipCourseDetailSelector, getMentorshipUserOfCurrentUserSelector } from './redux/selectors';

const MentorshipCourseDetail = () => {
  const dispatch = useDispatch();
  const { id: courseId } = useParams();
  usePageViewAnalytics({ name: ROUTE.MENTORSHIP_COURSE_DETAIL.name, squad: ROUTE.MENTORSHIP_COURSE_DETAIL.squad });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const userNotExists = useSelector(getMentorshipUserOfCurrentUserSelector.hasError);
  const userData = useSelector(getMentorshipUserOfCurrentUserSelector.getData);
  const data = useSelector(getMentorshipCourseDetailSelector.getData);
  const isPending = useSelector(getMentorshipCourseDetailSelector.getIsPending);
  const course = data?.course;
  const mentorshipRequest = data?.requests?.[data.requests.length - 1];
  const status = mentorshipRequest?.requestStatus;

  useEffect(() => {
    if (courseId) {
      dispatch(Creators.getMentorshipUserOfCurrentUserRequest());
      dispatch(Creators.getMentorshipCourseDetailRequest({ courseId }));
    }
  }, [dispatch, courseId]);

  return (
    <div className="p-3">
      <Header />
      <FormUtil
        initialValues={course}
        isPending={isPending}
        userNotExists={userNotExists}
        mentorshipRequest={mentorshipRequest}
        requestStatus={mentorshipRequest && course._id === mentorshipRequest.course ? status : null}
        showRequestMentorshipButton={!userNotExists || (userData && course?.mentor && course?.mentor?._id !== userData?._id)}
      />
    </div>
  );
};

export default MentorshipCourseDetail;
