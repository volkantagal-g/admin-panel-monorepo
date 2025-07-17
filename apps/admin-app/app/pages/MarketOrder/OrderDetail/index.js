import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Col, Row } from 'antd';
import { useTheme } from 'react-jss';

import { get, isEmpty } from 'lodash';

import permKey from '@shared/shared/permKey.json';

import {
  useInitAndDestroyPage,
  usePageViewAnalytics,
  usePermission,
} from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import {
  ADMIN_PANEL_CONFIGS,
  CALLER_TYPES,
  FRAUD_ORDER_STATUS,
  GETIR_DOMAIN_TYPES,
  MARKET_CONFIG_QUERY_TYPES,
  MARKET_ORDER_STATUS,
  REDUX_KEY,
} from '@shared/shared/constants';
import { ROUTE } from '@app/routes';

import saga from './redux/sagas';
import reducer from './redux/reducers';
import {
  OrderInfoCard,
  OrderAddress,
  TagStatuses,
  TimelineOrder,
  OrderNote,
  OrderMap,
  ForbiddenMatch,
  OrderActions,
  BasketLogs,
  InvoiceInfo,
  PartialRefundList,
  OrderActionButtons,
  BatchedOrderList,
  SubscriptionBenefitInfoTable,
  ChangeDeliverySlotModal,
  CancelMarketOrderModal,
  OrderJson,
} from './components';
import { Creators } from './redux/actions';
import useQuery from '@shared/shared/hooks/useQuery';
import ClientFeedback from './components/ClientFeedbackTable';
import OrderFeedback from './components/OrderFeedbackTable';
import ProductList from './components/ProductList';
import { orderDetailSelector } from './redux/selectors';
import Spinner from '@shared/components/Spinner';
import { getCancelFraudOrderReasonId } from './components/utils';
import { isOrderActive } from './utils';

import { PaymentDetailCard } from '@shared/containers/Payment';
import { Space } from '@shared/components/GUI';

const reduxKey = REDUX_KEY.MARKET_ORDER.ORDER_DETAIL;

const OrderDetail = () => {
  const { canAccess, Can } = usePermission();
  usePageViewAnalytics({
    name: ROUTE.GETIR_MARKET_ORDER_DETAIL.name,
    squad: ROUTE.GETIR_MARKET_ORDER_DETAIL.squad,
  });
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const query = useQuery();
  const domainType = query.get('domainType');
  const theme = useTheme();

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  useEffect(() => {
    dispatch(Creators.getOrderDetailRequest({ id: orderId, domainType }));

    if (Number(domainType) === GETIR_DOMAIN_TYPES.VOYAGER) {
      dispatch(
        Creators.getConfigWithKeyRequest({
          body: {
            key: ADMIN_PANEL_CONFIGS.WATER_QUEUE_INTERVAL_CONFIG,
            type: MARKET_CONFIG_QUERY_TYPES.OBJECT,
          },
        }),
      );
      dispatch(
        Creators.getConfigWithKeyRequest({
          body: {
            key: ADMIN_PANEL_CONFIGS.WATER_ETA_INTERVAL_CONFIG,
            type: MARKET_CONFIG_QUERY_TYPES.OBJECT,
          },
        }),
      );
    }
  }, [orderId, domainType, dispatch]);

  const orderDetail = useSelector(orderDetailSelector.getData);
  const { _id, status, courier, basket, fraudSuspicionRecord } = orderDetail;
  const { _id: courierId } = courier?.courier || {};
  const { isSubscriber } = get(basket, 'subscriptionBenefitInfo', {});
  const { slottedDeliveryInfo } = get(orderDetail, 'delivery', {});
  const isSlottedDelivery =
    status === MARKET_ORDER_STATUS.RESERVED && !isEmpty(slottedDeliveryInfo);

  useEffect(() => {
    let isStarted = false;
    if (_id && isOrderActive(status)) {
      dispatch(
        Creators.startListeningSocketEvents({ marketOrder: { _id, courier: { id: courierId } } }),
      );
      isStarted = true;
    }

    return () => {
      if (isStarted) {
        dispatch(Creators.stopListeningSocketEvents({}));
      }
    };
  }, [dispatch, _id, status, courierId]);

  const cancelOrder = useCallback(async () => {
    dispatch(
      Creators.cancelOrderRequest({
        domainType,
        id: _id,
        callerType: CALLER_TYPES.ADMIN,
        reasonId: getCancelFraudOrderReasonId(),
        note: 'Fraud order has been cancelled',
      }),
    );
  }, [domainType, _id, dispatch]);

  useEffect(() => {
    if (
      fraudSuspicionRecord?.status === FRAUD_ORDER_STATUS?.FRAUD_ORDER &&
      status < MARKET_ORDER_STATUS.DELIVERED
    ) {
      cancelOrder();
    }
  }, [fraudSuspicionRecord?.status, cancelOrder, status]);

  const isPending = useSelector(orderDetailSelector.getIsPending);

  return (
    <Row gutter={[theme.spacing(2)]} data-testid="order-detail">
      {isPending ? (
        <Col span={24}>
          <Spinner />
        </Col>
      ) : (
        <>
          {isSlottedDelivery && <ChangeDeliverySlotModal />}
          <CancelMarketOrderModal />
          <Col span={24}>
            <Space className="px-1 py-2">
              <Row justify="space-between" align="top">
                <Col span={14}>
                  <TagStatuses />
                </Col>
                <Col span={2}>
                  <OrderJson />
                </Col>
                <Col span={8}>
                  <OrderActionButtons />
                </Col>
              </Row>
            </Space>
          </Col>
          <Col span={24}>
            <Row gutter={4}>
              <Col span={12}>
                <OrderMap />
                <OrderAddress />
                <OrderInfoCard />
                <Can
                  permKey={permKey.PAGE_GETIR_MARKET_ORDER_DETAIL_PAYMENT_INFO}
                >
                  <PaymentDetailCard
                    transactionId={orderDetail?.payment?.transactionId}
                    paymentAmount={orderDetail?.payment?.amount}
                    provision={orderDetail?.provision}
                    totalChargedAmount={orderDetail?.basket?.calculation?.totalChargedAmount}
                    merchantOrderId={canAccess(permKey.PAGE_PAYMENT_TRANSACTION_LIST) ? orderDetail?.id : undefined}
                    alwaysShowAllEvents
                  />
                </Can>
                <OrderNote />
                <ClientFeedback />
                <OrderFeedback />
                {canAccess(
                  permKey.PAGE_GETIR_MARKET_ORDER_DETAIL_FORBIDDEN_MATCHES,
                ) && <ForbiddenMatch />}
                {(Number(domainType) === GETIR_DOMAIN_TYPES.VOYAGER || orderDetail?.domainType === GETIR_DOMAIN_TYPES.VOYAGER) ? (
                  <BasketLogs />
                ) : (
                  <OrderActions />
                )}
                <InvoiceInfo />
              </Col>
              <Col span={12}>
                <TimelineOrder />
                {!isEmpty(orderDetail?.batchedOrders) && <BatchedOrderList />}
                <PartialRefundList />
                {isSubscriber && <SubscriptionBenefitInfoTable />}
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <ProductList />
          </Col>
        </>
      )}
    </Row>
  );
};

export default OrderDetail;
