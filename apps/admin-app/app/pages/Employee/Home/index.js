/* eslint-disable */
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'antd';

import { useInitAndDestroyPage, usePermission } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';
import RedirectButtonV2 from '@shared/components/UI/RedirectButtonV2';
import permKey from '@shared/shared/permKey.json';

import PermitDetailModal from '../components/Permit/DetailModal';
import NewPermitRequestModal from './components/NewPermitRequestModal';
import { Creators } from './redux/actions';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { actionButtonSelector } from './redux/selectors';

import PermitHistoryAndRequestTable from './components/PermitHistoryAndRequestTable';
import PermitCalendar from './components/PermitCalendar';

const reduxKey = REDUX_KEY.EMPLOYEE.HOME;

const EmployeeHomePage = () => {
  const { t } = useTranslation(['employeePage', 'global']);
  const dispatch = useDispatch();
  usePageViewAnalytics({ name: ROUTE.EMPLOYEE_HOME.name, squad: ROUTE.EMPLOYEE_HOME.squad });
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });
  const [selectedPermit, setSelectedPermit] = useState();
  const [isNewPermitRequestFormVisible, setIsNewPermitRequestFormVisible] = useState(false);
  const [newPermitRequestGroupType, setNewPermitRequestGroupType] = useState('OFF_SITE_WORK');
  
  const isActionSucceeded = useSelector(actionButtonSelector.getIsSucceeded);
  const isActionResultPending = useSelector(actionButtonSelector.getIsPending);
  const { Can } = usePermission();

  const memoizedHandlePermitDetailBtnClick = useCallback(({ permit }) => {
    setSelectedPermit(permit._id);
  }, []);

  const handlePermitDetailModalClose = () => {
    setSelectedPermit();
  };

  const handleNewPermitRequestBtnClick = (groupType) => {
    setNewPermitRequestGroupType(groupType);
    setIsNewPermitRequestFormVisible(true);
  };

  const handleNewPermitRequestModalClose = useCallback(({ isDataNeedToBeRefresh = false } = {}) => {
    setIsNewPermitRequestFormVisible(false);
    if (isDataNeedToBeRefresh) {
      dispatch(Creators.getFilteredPermitsRequest({}));
    }
  }, []);

  const handleApprove = ({ permitId }) => {
    dispatch(Creators.approvePermitRequest({ permitId }));
  };

  const handleReject = ({ permitId }) => {
    dispatch(Creators.rejectPermitRequest({ permitId }));
  };

  const handleCancel = ({ permitId }) => {
    dispatch(Creators.cancelPermitRequest({ permitId }));
  };

  const handleCancelRequest = ({ permitId }) => {
    dispatch(Creators.cancelRequestedPermitRequest({ permitId }));
  };

  const handleActionSucceeded = () => {
    dispatch(Creators.resetActionButton());
  };

  return (
    <>
      <PageTitleHeader title={t('global:PAGE_TITLE.EMPLOYEE.HOME')} />
      <Row gutter={[4, 4]}>
        <Can permKey={permKey.PAGE_EMPLOYEE_PERMIT_LIST}>
          <Col xs={24}>
            <RedirectButtonV2
              size="small"
              type="primary"
              to={ROUTE.EMPLOYEE_PERMIT_LIST.path}
              text={t('employeePage:LEAVE_REPORTING')}
              permKey={permKey.PAGE_EMPLOYEE_PERMIT_LIST}
            />
          </Col>
        </Can>
        <Col xs={24}>
          <PermitHistoryAndRequestTable onPermitDetailClick={memoizedHandlePermitDetailBtnClick} onNewPermitRequestBtnClick={handleNewPermitRequestBtnClick} />
        </Col>
        <Col xs={24}>
          <PermitCalendar onPermitDetailClick={memoizedHandlePermitDetailBtnClick} />
        </Col>
      </Row>
      {
        selectedPermit && (
          <PermitDetailModal
            permitId={selectedPermit}
            onClose={handlePermitDetailModalClose}
            onActionSucceeded={handleActionSucceeded}
            onApprove={handleApprove}
            onReject={handleReject}
            onCancel={handleCancel}
            onCancelRequest={handleCancelRequest}
            isActionSucceeded={isActionSucceeded}
            isActionResultPending={isActionResultPending}
          />
        )
      } 
      <NewPermitRequestModal
        isVisible={isNewPermitRequestFormVisible}
        onClose={handleNewPermitRequestModalClose}
        permitRequestGroupType={newPermitRequestGroupType}
      />
    </>
  );
};

export default EmployeeHomePage;
