import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { Col, Row } from 'antd';
import { useTheme } from 'react-jss';
import { has } from 'lodash';

import {
  TagStatuses,
  ActionsMenu,
  OrderMap,
  OrderAddress,
  TimelineOrder,
  CardSections,
  OrderNote,
  ForbiddenMatches,
  InsightInquiryTable,
  FoodUserTable,
  IvrActionsTable,
  PartialRefundTable,
  RefundInfoTable,
  CartInfoTable,
  FoodProductTable,
  OrderChangeStatusTable,
  GetirSubsDiscountTable,
  PromoDetailLink,
} from '@app/pages/GetirFood/OrderDetail/components';
import permKey from '@shared/shared/permKey.json';
import ErrorBoundary from '@shared/shared/ErrorBoundary';
import { REDUX_KEY } from '@shared/shared/constants';
import { Creators } from '@app/pages/GetirFood/OrderDetail/redux/actions';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics, usePermission } from '@shared/hooks';
import useStyles from '@app/pages/GetirFood/OrderDetail/styles';
import { ROUTE } from '@app/routes';
import saga from '@app/pages/GetirFood/OrderDetail/redux/saga';
import reducer from '@app/pages/GetirFood/OrderDetail/redux/reducer';
import { availableChangeTypesSelector, orderDetailSelector } from '@app/pages/GetirFood/OrderDetail/redux/selectors';
import { isNullOrEmpty } from '@shared/utils/common';
import { PaymentDetailCard } from '@shared/containers/Payment';

const GetirFoodOrderDetailPage = () => {
  const { orderDetailId } = useParams();
  const dispatch = useDispatch();
  const { Can, canAccess } = usePermission();
  const theme = useTheme();
  const classes = useStyles();
  usePageViewAnalytics({ name: ROUTE.GETIR_FOOD_ORDER_DETAIL.name, squad: ROUTE.GETIR_FOOD_ORDER_DETAIL.squad });

  const [isActionMenuVisible, setIsActionMenuVisible] = useState();

  const handleIsActionMenuVisibleChange = isVisible => {
    setIsActionMenuVisible(isVisible);
  };

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getOrderDetailRequest({ orderDetailId }));
    dispatch(Creators.getOrderChangeOptionsRequest());
    dispatch(Creators.getOrderInsightInquiryRequest({ foodOrderId: orderDetailId }));
    dispatch(Creators.getAvailableChangeTypesForOrderRequest({ foodOrderId: orderDetailId }));

    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch, orderDetailId]);

  const currentOrderChangeReason = useSelector(availableChangeTypesSelector.getData);
  const orderDetail = useSelector(orderDetailSelector.getData);
  const subsId = has(orderDetail, 'subscriptionId');
  const transactionId = orderDetail?.nepisInfos?.transactionId;

  return (
    <ErrorBoundary>
      <Row gutter={[theme.spacing(3)]}>
        <Col span={24}>
          <Row>
            <Col span={12}>
              <TagStatuses />
            </Col>
            <Col span={12} className={classes.actionsMenu}>
              {canAccess(permKey.PAGE_GETIR_FOOD_ORDER_DETAIL_ACTION_MENU) &&
              <ActionsMenu onIsVisibleChange={handleIsActionMenuVisibleChange} isActionMenuVisible={isActionMenuVisible} />}
            </Col>
          </Row>
        </Col>
        <Col span={24} md={12}>
          <OrderMap />
          <div className={classes.customerInfo}>
            <OrderAddress />
          </div>
          <Can permKey={permKey.PAGE_GETIR_FOOD_ORDER_DETAIL_CART_INFO_TABLE}>
            <PaymentDetailCard transactionId={transactionId} />
          </Can>
          <CardSections />
          <OrderNote orderId={orderDetailId} />
        </Col>
        <Col span={24} md={12}>
          <TimelineOrder />
        </Col>
      </Row>
      <Row gutter={[theme.spacing(3)]}>
        <Col span={24} md={12}>
          <PromoDetailLink />
          <Can permKey={permKey.PAGE_GETIR_FOOD_ORDER_DETAIL_FORBIDDEN_MATCHES}>
            <ForbiddenMatches />
          </Can>
          <InsightInquiryTable />
          <FoodUserTable />
          <IvrActionsTable />
        </Col>
        <Col span={24} md={12}>
          {
            subsId &&
            <GetirSubsDiscountTable />
          }
          <PartialRefundTable />
          <RefundInfoTable />
          {!isNullOrEmpty(currentOrderChangeReason.createdAt) && (
            <OrderChangeStatusTable />
          )}
          <Can permKey={permKey.PAGE_GETIR_FOOD_ORDER_DETAIL_CART_INFO_TABLE}>
            <CartInfoTable />
          </Can>
        </Col>
        <Col span={24}>
          <FoodProductTable />
        </Col>
      </Row>
    </ErrorBoundary>
  );
};

const reduxKey = REDUX_KEY.FOOD_ORDER.DETAIL;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(GetirFoodOrderDetailPage);
