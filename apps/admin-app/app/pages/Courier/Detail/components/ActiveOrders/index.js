/* eslint-disable react-hooks/exhaustive-deps */
import { useTranslation } from 'react-i18next';
import { Button, Col, Row, Spin } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import AntCard from '@shared/components/UI/AntCard';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import useStyles from './styles';
import {
  getCourierBatchOrderAvatars,
  getCourierOrderDetails,
  getCourierNextArtisanOrderId,
} from '../../utils';
import {
  statusLogsSelector,
  courierTasksSelector,
  returnDetailsWithReturnIdListSelector,
} from '../../redux/selectors';
import done from '@shared/assets/markers/artisan_order_done.png';
import canceled from '@shared/assets/markers/artisan_order_canceled.png';
import { tableColumns } from './config';
import { COURIER_TASK_STATUS, GETIR_FINANCE_DOMAIN_TYPE } from '@shared/shared/constants';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

const DELIVERY = 'Delivery';

function ActiveOrders({ data }) {
  const { t } = useTranslation('courierPage');
  const classes = useStyles();
  const batchRef = useRef(null);
  const dispatch = useDispatch();
  const courierStatusLogs = useSelector(statusLogsSelector.getBatchData);

  const isPendingCourierStatusLogs = useSelector(statusLogsSelector.getIsPending);
  const courierTasksData = useSelector(courierTasksSelector.getData)?.data;

  const returnDetailsWithReturnIdsData = useSelector(returnDetailsWithReturnIdListSelector.getData);

  const batchOrdersData = useMemo(() => {
    if (courierTasksData?.length > 0) {
      return courierTasksData.filter(task => (task.type === DELIVERY)).map((task, index) => (
        {
          ...task,
          batchIndex: index + 1,
          checkoutDate: task.acceptedDate,
          id: task.orderId,
        }));
    }
    return [];
  }, [courierTasksData]);

  const { Can, canAccess } = usePermission();
  const hasFinanceEmployeeRole = canAccess(permKey.PAGE_COURIER_DETAIL_COMPONENT_GETIR_FINANCE_EMPLOYEE);

  const returnOrderId = useMemo(() => {
    if (batchOrdersData?.length > 0 && returnDetailsWithReturnIdsData?.length > 0) {
      const orderId = batchOrdersData.map(batchReturn => {
        if (data?.returnOrder === batchReturn.id) {
          return returnDetailsWithReturnIdsData?.length > 0 ?
            returnDetailsWithReturnIdsData.find(returnDetail => returnDetail.uid === batchReturn.id)?.orderId : '';
        }
        return '';
      });
      return orderId;
    }
    return '';
  }, [data, batchOrdersData, returnDetailsWithReturnIdsData]);

  const courierOrderDetails = useMemo(
    () => getCourierOrderDetails(data, t, returnOrderId),
    [data, t, returnOrderId],
  );

  const courierNextOrderDetails = useMemo(
    () => getCourierNextArtisanOrderId(data, t),
    [data, t],
  );

  const batchOrderAvatars = useMemo(() => {
    if (data?.artisanOrder || data?.foodOrder || data?.marketOrder) {
      return getCourierBatchOrderAvatars(courierTasksData, batchOrdersData, courierStatusLogs);
    }
    return [];
  }, [data, batchOrdersData, courierStatusLogs, courierTasksData]);

  const columns = useMemo(() => tableColumns(t), [t]);

  const confirmationCode = useMemo(() => {
    if (courierOrderDetails?.value && courierTasksData?.length > 0) {
      return courierTasksData.find(task => (task.orderId === courierOrderDetails?.value &&
        task.type === DELIVERY))?.confirmationCode;
    }
    return '';
  }, [courierOrderDetails, courierTasksData]);

  const scroll = scrollOffset => {
    batchRef.current.scrollLeft += scrollOffset;
  };

  const handleNextBatchOrder = () => scroll(100);
  const handlePrevBatchOrder = () => scroll(-100);

  const renderBatchCarouselArrows = () => (
    <>
      <Button
        className="mr-2"
        type="default"
        shape="circle"
        icon={<ArrowLeftOutlined />}
        onClick={handlePrevBatchOrder}
      />
      <Button
        type="default"
        shape="circle"
        icon={<ArrowRightOutlined />}
        onClick={handleNextBatchOrder}
      />
    </>
  );

  const arrangedBatchedOrders = () => {
    const arrangedData = (data?.artisanOrder || data?.foodOrder || data?.marketOrder) ? batchOrdersData : [];
    return arrangedData;
  };

  const handleOrderDetailLinkClick = e => {
    if (courierOrderDetails?.redirect === 'error') {
      e.preventDefault();
      dispatch(ToastCreators.error({ message: 'Error: missing property currentDomainType' }));
    }
  };

  const renderActiveOrdersSection = () => {
    if (
      (!hasFinanceEmployeeRole && courierOrderDetails) ||
      (hasFinanceEmployeeRole && courierOrderDetails && data?.currentDomainType === GETIR_FINANCE_DOMAIN_TYPE)) {
      return (
        <>
          <Col span={12}>
            <strong>{courierOrderDetails?.label}</strong>
          </Col>
          <Col span={12}>
            <Link to={courierOrderDetails?.redirect} onClick={handleOrderDetailLinkClick}>
              {courierOrderDetails?.value}
            </Link>
          </Col>
        </>
      );
    }
    return (<Col span={24}>{t('NO_ACTIVE_ORDER')}</Col>);
  };

  return (
    <Can permKey={permKey.PAGE_COURIER_DETAIL_ACTIVE_ORDERS}>
      <AntCard>
        <Row justify="space-between">
          {renderActiveOrdersSection()}
        </Row>
      </AntCard>
      {courierNextOrderDetails && (
        <AntCard>
          <Row justify="space-between">
            <>
              <Col span={12}>
                <strong>{courierNextOrderDetails.label}</strong>
              </Col>
              <Col span={12}>
                <Link to={courierNextOrderDetails.redirect}>
                  {courierNextOrderDetails.value}
                </Link>
              </Col>
            </>
          </Row>
        </AntCard>
      )}
      {confirmationCode && (
        <AntCard>
          <Row>
            <strong>{t('CONFIRMATION_CODE')}: </strong> <span className={classes.confirmationCodeText}>{confirmationCode}</span>
          </Row>
        </AntCard>
      )}
      {(data?.artisanOrder || data?.foodOrder || data?.marketOrder) && batchOrdersData?.length > 0 && (
        <AntCard
          title={t('BATCHED_ORDERS_TIMELINE')}
          extra={renderBatchCarouselArrows()}
        >
          {isPendingCourierStatusLogs ? (<Spin className={classes.spinContent} />) : (
            <div className={classes.batchTimeline} ref={batchRef}>
              {batchOrderAvatars?.map((avatar, index) => (
                <div>
                  <div
                    className={classes.batchBadge}
                    style={{
                      backgroundColor: avatar.backgroundColor,
                      opacity: avatar.opacity,
                    }}
                  >
                    <span className="tooltip">
                      {
                        (avatar.taskStatus === COURIER_TASK_STATUS.CANCELLED && !avatar.isNextTaskCancelAlert) &&
                        (
                          <b>
                            {t('ORDER')} {avatar.index} - {t('CANCELED_ORDER')}
                          </b>
                        )
                      }
                      {
                        (avatar.taskStatus !== COURIER_TASK_STATUS.CANCELLED || avatar.isNextTaskCancelAlert) &&
                        (
                          <b>
                            {t('ORDER')} {avatar.index} - {avatar.statusName && t(`ACTIVE_ORDER_STATUS.${avatar.statusName}`)}
                          </b>
                        )
                      }
                      <br />
                      {avatar.createdAtL}
                    </span>
                    <img
                      className="batch-left-corner-icon"
                      alt="icon"
                      style={{ opacity: (avatar.isVisible && 1) || 0 }}
                      src={
                        avatar.taskStatus !== COURIER_TASK_STATUS.CANCELLED &&
                        avatar.taskStatus !== COURIER_TASK_STATUS.CANCEL_ALERT ? done : canceled
                      }
                    />
                    <span className="batch-right-corner-icon">{avatar.index}</span>
                    <img src={avatar.iconUrl} alt="icon" />
                    <span
                      className="batch-badge-arrow"
                      style={{ borderTopColor: avatar.backgroundColor }}
                    />
                    {index !== 0 && (
                    <div className="batch-timeline-progress-bar">
                      {avatar.duration !== '' && (
                      <span
                        className={`batch-timeline-progress hover_${avatar.index}}`}
                      >
                        {avatar.duration} {t('MINUTE_SHORT')}
                      </span>
                      )}
                    </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          {
            (batchOrdersData?.length > 0) && (
            <AntTableV2
              data={arrangedBatchedOrders()}
              columns={columns}
            />
            )
          }
        </AntCard>
      )}
    </Can>
  );
}

ActiveOrders.defaultProps = { data: {} };
ActiveOrders.propTypes = { data: PropTypes.shape({}) };

export default ActiveOrders;
