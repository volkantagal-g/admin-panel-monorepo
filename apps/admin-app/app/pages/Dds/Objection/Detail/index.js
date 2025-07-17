import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { PageHeader, Col, Row, Skeleton } from 'antd';
import { useParams } from 'react-router-dom';

import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { REDUX_KEY, DDS_OBJECTION_STATUSES } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { ddsObjectionDetailSelector } from './redux/selector';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import {
  LogInfoCard,
  OrderInfoCard,
  WaybillsInfoCard,
  ReasonInfoCard,
  Footer,
  RejectReasonModal,
} from './components/index';

import { t } from '@shared/i18n';

const DDSObjectionDetailPage = () => {
  usePageViewAnalytics({ name: ROUTE.DDS_OBJECTION_DETAIL.name, squad: ROUTE.DDS_OBJECTION_DETAIL.squad });
  const dispatch = useDispatch();
  useInitAndDestroyPage({ dispatch, Creators });
  const { id } = useParams();

  const [rejectReasonModalVisibility, setRejectReasonModalVisibility] = useState(false);

  const data = useSelector(ddsObjectionDetailSelector.getData);
  const isPending = useSelector(ddsObjectionDetailSelector.getIsPending);

  const { logInfo, orderInfo, waybillsInfo, objection, conclusion, status } = data;

  const acceptButtonHandler = () => {
    dispatch(Creators.acceptDdsObjectionRequest({ objectionId: id }));
  };

  const handleCloseRejectReasonModal = () => {
    setRejectReasonModalVisibility(false);
  };

  const handleConfirmRejectReasonModal = reason => {
    dispatch(Creators.rejectDdsObjectionRequest({ objectionId: id, description: reason }));
    handleCloseRejectReasonModal();
  };

  const rejectButtonHandler = () => {
    setRejectReasonModalVisibility(true);
  };

  useEffect(() => {
    dispatch(Creators.getDdsObjectionDetailRequest({ objectionId: id }));
  }, [dispatch, id]);

  return (
    <>
      <Row>
        <Col flex={1}>
          <PageHeader
            className="p-0 page-title"
            title={t('global:PAGE_TITLE.DDS.OBJECTION.DETAIL')}
          />
        </Col>
      </Row>
      <Skeleton
        active
        loading={isPending}
      >
        <Row gutter={[8, 8]}>
          <Col md={12} sm={12} xs={24}>
            <LogInfoCard logInfo={logInfo} status={status} />
          </Col>
          {orderInfo.isVisible && (
            <Col md={12} sm={12} xs={24}>
              <OrderInfoCard orderInfo={orderInfo} />
            </Col>
          )}
          {waybillsInfo.isVisible && (
            <Col md={12} sm={12} xs={24}>
              <WaybillsInfoCard waybillsInfo={waybillsInfo} />
            </Col>
          )}
          {objection.text && (
            <Col md={12} sm={12} xs={24}>
              <ReasonInfoCard data={objection} />
            </Col>
          )}
          {conclusion.text && (
            <Col md={12} sm={12} xs={24}>
              <ReasonInfoCard data={conclusion} />
            </Col>
          )}
        </Row>
        <RejectReasonModal
          rejectReasonModalVisibility={rejectReasonModalVisibility}
          handleCloseRejectReasonModal={handleCloseRejectReasonModal}
          handleConfirmRejectReasonModal={handleConfirmRejectReasonModal}
        />
        {
          status === DDS_OBJECTION_STATUSES.WAITING && (
            <Footer
              acceptButtonHandler={acceptButtonHandler}
              rejectButtonHandler={rejectButtonHandler}
            />
          )
        }
      </Skeleton>
    </>
  );
};

const reduxKey = REDUX_KEY.DDS.OBJECTION.DETAIL;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(DDSObjectionDetailPage);
