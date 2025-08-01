import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { Creators } from '../../redux/actions';
import CollapsePanel from '../common/CollapsePanel';
import UserDetail from './UserDetail';
import PostDetail from './PostDetail';
import ReceivedApplicationDetail from './ReceivedApplicationDetail';

const GetirJobsServiceDetail = () => {
  const { t } = useTranslation('clientTargetingPage');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Creators.getGetirJobsPostTypesRequest());
    dispatch(Creators.getGetirJobsCategoryRequest());
    dispatch(Creators.getGetirJobsDrivingLicensesRequest());
  }, [dispatch]);

  return (
    <CollapsePanel isParent header={t('GETIR_JOBS_SERVICE_DETAIL')} activeKey="getirJobsServiceDetail">
      <UserDetail />
      <PostDetail />
      <ReceivedApplicationDetail />
    </CollapsePanel>
  );
};

export default GetirJobsServiceDetail;
