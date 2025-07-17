import { useMemo, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { compose } from 'redux';
import { Col, Row } from 'antd';
import { useTheme } from 'react-jss';

import {
  ActionsMenu,
  ArtisanProductTable,
  ArtisanUserTable,
  BatchedOrdersTable,
  BatchedReturnsTable,
  CardSections,
  CartInfoTable,
  ForbiddenMatches,
  IvrActionsTable,
  OrderAdress,
  OrderNote,
  PartialRefundTable,
  RefundInfoTable,
  TagStatuses,
  TimelineOrder,
  TimelineRefund,
  OrderProgressBar,
  OrderDetailMap,
  SubscriptionInfoTable,
} from './components';
import ErrorBoundary from '@shared/shared/ErrorBoundary';
import { REDUX_KEY } from '@shared/shared/constants';
import { Creators } from './redux/actions';
import useStyles from '@app/pages/ArtisanOrder/Detail/styles';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import permKey from '@shared/shared/permKey.json';
import { usePageViewAnalytics, usePermission } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import saga from './redux/saga';
import reducer from './redux/reducer';
import {
  courierRouteSelector,
  orderDetailSelector,
  refundTabActiveKeySelector,
  orderReturnsSelector,
  getCourierByIdSelector,
  currentRunnerSelector,
  courierReturnRouteSelector,
  courierTasksSelector,
  callPinSelector,
  returnDetailsWithReturnIdListSelector,
} from '@app/pages/ArtisanOrder/Detail/redux/selectors';
import CallInfoTimeline from './components/CallInfoTimeline';
import { getTasksBetweenPickupAndDelivery, getOrderIdsFromCourierTasks } from './util';

const ArtisanOrderDetailPage = () => {
  const { orderDetailId } = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation('artisanOrderPage');
  const { Can, canAccess } = usePermission();
  const {
    courier,
    shopLoc,
    deliveryAddress,
    courierVerifyAfterCheckoutDate,
    courierReachedToShopDate,
    courierVerifyDate,
    reachDate,
    deliverDate,
    checkoutDate,
    verifyDate,
    prepareDate,
    cancelDate,
    deliveryType,
    deliveryInfo,
    shop,
    assignmentType,
    isInQueue,
    subscriptionInfo,
  } = useSelector(orderDetailSelector.getData) ?? {};
  const isPendingOrderDetail = useSelector(orderDetailSelector.getIsPending);
  const isPendingCourierTasks = useSelector(courierTasksSelector.getIsPending);
  const courierBatchedTasks = useSelector(courierTasksSelector.getData);
  const courierRoutes = useSelector(courierRouteSelector.getData);
  const courierReturnRoutes = useSelector(courierReturnRouteSelector.getData);
  const refundTabActiveKey = useSelector(refundTabActiveKeySelector.getData) ?? '';
  const orderReturns = useSelector(orderReturnsSelector.getData) ?? {};
  const returnCourier = useSelector(getCourierByIdSelector.getData);
  const currentRunner = useSelector(currentRunnerSelector);
  const callPin = useSelector(callPinSelector);
  const returnDetailsWithReturnIdsData = useSelector(returnDetailsWithReturnIdListSelector.getData);

  const returnId = refundTabActiveKey;
  const refundCourierId = orderReturns?.courierId;
  const courierReturnTasks = useMemo(() => courierBatchedTasks?.successData?.returnTasks?.data || [], [courierBatchedTasks]);

  const courierOrderTasks = useMemo(() => {
    const orderTasks = courierBatchedTasks?.successData?.orderTasks || [];
    return (getTasksBetweenPickupAndDelivery(orderTasks?.data, orderDetailId) || []);
  }, [courierBatchedTasks, orderDetailId]);

  usePageViewAnalytics({
    name: ROUTE.ARTISAN_ORDER_DETAIL.name,
    squad: ROUTE.ARTISAN_ORDER_DETAIL.squad,
  });

  const [isActionMenuVisible, setIsActionMenuVisible] = useState(false);
  const [isOrderCanShuffle, setIsOrderCanShuffle] = useState(false);

  const visibleOnChange = useCallback(event => {
    setIsActionMenuVisible(event);
  }, []);

  useEffect(() => {
    if (isActionMenuVisible) {
      localStorage.setItem('openActionModal', 'true');
    }
    else {
      localStorage.removeItem('openActionModal');
    }
  }, [isActionMenuVisible]);

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getOrderDetailRequest({ orderDetailId }));
    dispatch(Creators.getOrderCancelOptionRequest({ orderDetailId }));
    dispatch(Creators.getOrderRefundOptionRequest({ orderDetailId }));
    dispatch(Creators.getPaymentMethodsRequest({ includeOnline: true }));
    dispatch(Creators.getReturnsAvailabilityRequest({ orderDetailId }));
    dispatch(Creators.getCallInfoMessagesRequest());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch, orderDetailId]);

  useEffect(() => {
    if (refundCourierId) {
      dispatch(Creators.getCourierByIdRequest({ courierId: refundCourierId }));
    }
  }, [dispatch, refundCourierId, returnId]);

  useEffect(() => {
    if (deliveryInfo?.isRunnerRequired && refundTabActiveKey &&
      canAccess(permKey.PAGE_ARTISAN_ORDER_DETAIL_GETIR_EMPLOYEE_BASE)) {
      dispatch(
        Creators.getReturnRunnerRequest({ returnId: refundTabActiveKey }),
      );
      dispatch(
        Creators.getReturnRunnerHistoryRequest({ returnId: refundTabActiveKey }),
      );
    }
  }, [dispatch, deliveryInfo, refundTabActiveKey, canAccess]);

  useEffect(() => {
    if (deliveryInfo?.isRunnerRequired && orderDetailId &&
      canAccess(permKey.PAGE_ARTISAN_ORDER_DETAIL_GETIR_EMPLOYEE_BASE)) {
      dispatch(Creators.getCurrentRunnerRequest({ orderId: orderDetailId }));
    }
  }, [dispatch, deliveryInfo, orderDetailId, canAccess]);

  useEffect(() => {
    if (returnId && refundCourierId) {
      const returnIds = [...new Set(courierReturnTasks.map(returnTask => returnTask.orderId))];
      const returnsWithActiveField = returnIds.map(rId => {
        return {
          returnId: rId,
          isActive: returnId === rId,
        };
      });
      const body = { returnOrders: returnsWithActiveField, courierId: refundCourierId };
      dispatch(Creators.getCourierReturnRouteRequest({ body }));
    }
  }, [dispatch, orderDetailId, returnId, refundCourierId, courierReturnTasks]);

  useEffect(() => {
    if (courierOrderTasks?.length > 0 && assignmentType && !courierVerifyAfterCheckoutDate) {
      if (courierOrderTasks[0].courierId !== courier?.id) {
        setIsOrderCanShuffle(true);
      }
    }
    else {
      setIsOrderCanShuffle(false);
    }
  }, [assignmentType, courierOrderTasks, courier, courierVerifyAfterCheckoutDate]);

  useEffect(() => {
    if (courierOrderTasks?.length > 0 && courier?.id) {
      const orders = getOrderIdsFromCourierTasks(courierOrderTasks, orderDetailId);
      const body = { orders, courierId: courier?.id };
      dispatch(Creators.getCourierRouteRequest({ body }));
    }
  }, [dispatch, orderDetailId, courier, courierOrderTasks]);

  useEffect(() => {
    dispatch(Creators.getCourierTasksRequest({ orderDetailId, returnId: returnId || '' }));
  }, [assignmentType, dispatch, orderDetailId, returnId]);

  useEffect(() => {
    if (courierReturnTasks?.length > 0) {
      const returnIds = [...new Set(courierReturnTasks.map(returnTask => returnTask.orderId))];
      dispatch(Creators.getReturnDetailsWithReturnIdListRequest({ returnIds }));
    }
  }, [courierReturnTasks, dispatch, orderDetailId, returnId]);

  useEffect(() => {
    if (isOrderCanShuffle && courierOrderTasks?.length > 0) {
      dispatch(Creators.getArtisanCourierByIdRequest({ courierId: courierOrderTasks[0].courierId }));
    }
  }, [dispatch, courierOrderTasks, isOrderCanShuffle]);

  return (
    <ErrorBoundary>
      <Row gutter={[theme.spacing(3)]}>
        <Col span={24}>
          <Row justify="space-between" align="middle">
            <Can permKey={permKey.PAGE_ARTISAN_ORDER_DETAIL_GETIR_EMPLOYEE_BASE}>
              <TagStatuses />
            </Can>
            <Can permKey={permKey.PAGE_ARTISAN_ORDER_DETAIL_ACTION_MENU}>
              <ActionsMenu
                visibleChange={visibleOnChange}
                isActionMenuVisible={isActionMenuVisible}
              />
            </Can>
          </Row>
        </Col>
        <Col span={12}>
          {/* Map */}
          <div className={classes.titleContent}>
            <b className={classes.mapTitle}>{t('MAP')}</b>
          </div>
          <div className={classes.mapWrapper}>
            <ErrorBoundary>
              <OrderDetailMap
                orderDetailId={orderDetailId}
                returnId={returnId}
                orderRoutes={courierRoutes}
                returnRoutes={courierReturnRoutes}
                deliveryAddress={deliveryAddress}
                shopLoc={shopLoc}
                courierReturnTasks={courierReturnTasks}
                returnCourier={returnCourier}
                courier={courier}
                shop={shop}
                isOrderCanShuffle={isOrderCanShuffle}
                courierOrderTasks={courierOrderTasks}
              />
            </ErrorBoundary>
          </div>
          {/* Customer Info */}
          <Can permKey={permKey.PAGE_ARTISAN_ORDER_DETAIL_GETIR_EMPLOYEE_BASE}>
            <div className={classes.customerInfo}>
              <OrderAdress />
            </div>
          </Can>
          <CardSections
            returnCourier={returnCourier}
            currentRunner={currentRunner}
            refundCourierId={refundCourierId}
            isOrderCanShuffle={isOrderCanShuffle}
          />
          <Can permKey={permKey.PAGE_ARTISAN_ORDER_DETAIL_GETIR_EMPLOYEE_BASE}>
            <OrderNote orderId={orderDetailId} />
          </Can>
          <Can permKey={permKey.PAGE_ARTISAN_ORDER_DETAIL_FORBIDDEN_MATCHES}>
            <ForbiddenMatches />
          </Can>
          <Can permKey={permKey.PAGE_ARTISAN_ORDER_DETAIL_GETIR_EMPLOYEE_BASE}>
            <ArtisanUserTable />
            <IvrActionsTable />
            <PartialRefundTable />
            <RefundInfoTable />
          </Can>
          <Can permKey={permKey.PAGE_ARTISAN_ORDER_DETAIL_CART_INFO_TABLE}>
            <CartInfoTable />
          </Can>
          <Can permKey={permKey.PAGE_ARTISAN_ORDER_DETAIL_GETIR_EMPLOYEE_BASE}>
            <ArtisanProductTable />
          </Can>
        </Col>
        <Col span={12}>
          <OrderProgressBar
            order={{
              courierVerifyDate,
              reachDate,
              deliverDate,
              checkoutDate,
              verifyDate,
              prepareDate,
              cancelDate,
              deliveryType,
            }}
          />
          <TimelineOrder />
          <CallInfoTimeline orderId={orderDetailId} callPin={callPin} />
          <div className="mb-3">
            <TimelineRefund />
          </div>
          {
            courierOrderTasks?.length > 0 && (
            <BatchedOrdersTable
              orderDetailId={orderDetailId}
              courier={courier}
              courierVerifyAfterCheckoutDate={courierVerifyAfterCheckoutDate}
              courierReachedToShopDate={courierReachedToShopDate}
              courierVerifyDate={courierVerifyDate}
              reachDate={reachDate}
              deliverDate={deliverDate}
              courierOrderTasks={courierOrderTasks}
              isPendingCourierTasks={isPendingCourierTasks}
              isPendingOrderDetail={isPendingOrderDetail}
              isInQueue={isInQueue}
            />
            )
          }
          <BatchedReturnsTable
            orderDetailId={orderDetailId}
            returnId={returnId}
            courier={returnCourier}
            isPendingCourierTasks={isPendingCourierTasks}
            courierReturnTasks={courierReturnTasks}
            isPendingOrderDetail={isPendingOrderDetail}
            returnDetailsWithReturnIdsData={returnDetailsWithReturnIdsData}
          />
          {subscriptionInfo?.subscriptionId && <SubscriptionInfoTable subscriptionInfo={subscriptionInfo} />}
        </Col>
      </Row>
    </ErrorBoundary>
  );
};

const reduxKey = REDUX_KEY.ARTISAN_ORDER.DETAIL;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(ArtisanOrderDetailPage);
