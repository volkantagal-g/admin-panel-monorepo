import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ROUTE } from '@app/routes';
import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import Header from '@app/pages/Mentorship/components/Header';
import FormUtil from './components/FormUtil';
import CoursesTable from './components/Courses';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { Creators } from './redux/actions';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { reduxKey } from './constants';
import { getMentorshipMentorDetailSelector, getMentorshipUserOfCurrentUserSelector } from './redux/selectors';

const MentorProfile = () => {
  const dispatch = useDispatch();
  const { id: mentorId } = useParams();
  usePageViewAnalytics({ name: ROUTE.MENTORSHIP_MENTOR_DETAIL.name, squad: ROUTE.MENTORSHIP_MENTOR_DETAIL.squad });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const userNotExists = useSelector(getMentorshipUserOfCurrentUserSelector.hasError);
  const userData = useSelector(getMentorshipUserOfCurrentUserSelector.getData);
  const mentorData = useSelector(getMentorshipMentorDetailSelector.getData);

  useEffect(() => {
    if (mentorId) {
      dispatch(Creators.getMentorshipUserOfCurrentUserRequest());
      dispatch(Creators.getMentorshipMentorDetailRequest({ mentorId }));
      dispatch(Creators.filterMentorshipCoursesRequest({ body: { mentor: mentorId } }));
    }
  }, [dispatch, mentorId]);

  return (
    <div className="p-3">
      <Header userFullName={mentorData?.employeeId?.fullName} isMentorDetailPage />
      <FormUtil initialValues={mentorData} />
      <CoursesTable
        mentorData={mentorData}
        userNotExists={userNotExists}
        showRequestMentorshipButton={!userNotExists || (userData && mentorData && userData?._id !== mentorData?._id)}
      />
    </div>
  );
};

export default MentorProfile;
