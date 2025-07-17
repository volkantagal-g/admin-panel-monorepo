import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { PageHeader } from 'antd';

import { useParams } from 'react-router-dom';

import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';
import { Creators } from '../redux/actions';
import saga from '../redux/saga';
import reducer from '../redux/reducer';
import DetailContainer from './components/DetailContainer';

const reduxKey = REDUX_KEY.WORKFORCE_EMPLOYEE_LEAVE_MANAGEMENT;

const EmployeeLeaveRequestDetail = () => {
  const { t } = useTranslation(['global']);
  const dispatch = useDispatch();
  const { name, squad } = ROUTE.WORKFORCE_EMPLOYEE_LEAVE_MANAGEMENT_DETAIL;
  usePageViewAnalytics({ name, squad });
  const { id } = useParams();

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  return (
    <>
      <PageTitleHeader title={t('global:PAGE_TITLE.LEAVE_MANAGEMENT.DETAIL')} />{' '}
      <PageHeader
        className="p-0 page-title"
        title={t('global:PAGE_TITLE.LEAVE_MANAGEMENT.DETAIL')}
      />
      <DetailContainer leaveRequestId={id} />
    </>
  );
};

export default EmployeeLeaveRequestDetail;
