import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Header from '../components/Header';
import FormUtil from './components/FormUtil';
import { ScrollToTabs } from '@shared/components/GUI';
import CoursesTable from '@app/pages/Mentorship/components/Table/Courses';
import MyMatchesTable from '@app/pages/Mentorship/components/Table/MyMatches';
import RequestsTable from '@app/pages/Mentorship/components/Table/Requests';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { Creators } from './redux/actions';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { reduxKey } from './constants';
import { getEmployeeOfCurrentUserSelector, createOrUpdateMentorshipUserInfoSelector, getMentorshipUserSelector } from './redux/selectors';

const getTabItems = ({ t, _id, isMentor, userData }) => {
  const items = [];
  if (_id) {
    if (isMentor) {
      items.push({
        id: 'topics',
        label: t('MENTORSHIP_TOPICS'),
        children: <CoursesTable userData={userData} />,
      });
    }
    items.push(...[{
      id: 'matches',
      label: t('MY_MATCHES'),
      children: <MyMatchesTable userData={userData} />,
    },
    {
      id: 'requests',
      label: t('MENTORSHIP_REQUESTS'),
      children: <RequestsTable userData={userData} />,
    }]);
  }
  return items;
};

const Profile = () => {
  const { t } = useTranslation(['mentorshipPage', 'global']);
  const dispatch = useDispatch();
  usePageViewAnalytics({ name: ROUTE.MENTORSHIP_PROFILE.name, squad: ROUTE.MENTORSHIP_PROFILE.squad });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });
  const employeeData = useSelector(getEmployeeOfCurrentUserSelector.getData);
  const employeeDataPending = useSelector(getEmployeeOfCurrentUserSelector.getIsPending);
  const userNotExists = useSelector(getMentorshipUserSelector.hasError);
  const userData = useSelector(createOrUpdateMentorshipUserInfoSelector.getData);
  const isPending = useSelector(createOrUpdateMentorshipUserInfoSelector.getIsPending);
  const { _id, isMentor } = userData ?? {};
  const tabItems = getTabItems({ t, _id, isMentor, userData });

  useEffect(() => {
    dispatch(Creators.getEmployeeOfCurrentUserRequest());
  }, [dispatch]);

  const handleCreateOrUpdateMentorshipUser = user => {
    dispatch(Creators.createOrUpdateMentorshipUserRequest({ body: { ...user, isEdit: !!_id } }));
  };

  return (
    <div className="p-3">
      <Header isProfilePage />
      <FormUtil
        initialValues={userData}
        onSubmit={handleCreateOrUpdateMentorshipUser}
        isPending={isPending || employeeDataPending}
        employee={employeeData}
        userNotExists={userNotExists}
      />
      {_id ? <ScrollToTabs items={tabItems} /> : null}
    </div>
  );
};

export default Profile;
