import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { Col, Row } from 'antd';
import { useTheme } from 'react-jss';

import { ROUTE } from '@app/routes';
import { usePageViewAnalytics, usePermission } from '@shared/hooks';
import { REDUX_KEY } from '@shared/shared/constants';
import ErrorBoundary from '@shared/shared/ErrorBoundary';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import {
  TagStatuses,
  OrderMap,
  OrderAddress,
  CardSections,
  TimelineOrder,
  FoodUserTable,
  FoodProductTable,
  CartInfoTable,
} from '@app/pages/GetirFood/BasketDetail/components';
import permKey from '@shared/shared/permKey.json';
import saga from '@app/pages/GetirFood/BasketDetail/redux/saga';
import { Creators } from '@app/pages/GetirFood/BasketDetail/redux/actions';
import reducer from '@app/pages/GetirFood/BasketDetail/redux/reducer';
import useStyles from './styles';
import { orderDetailSelector } from './redux/selectors';
import { PaymentDetailCard } from '@shared/containers/Payment';

const GetirFoodBasketOrderDetailPage = () => {
  const { basketOrderId } = useParams();
  const dispatch = useDispatch();
  const { Can } = usePermission();
  const theme = useTheme();
  const classes = useStyles();
  usePageViewAnalytics({
    name: ROUTE.GETIR_FOOD_BASKET_DETAIL.name,
    squad: ROUTE.GETIR_FOOD_BASKET_DETAIL.squad,
  });
  const orderDetail = useSelector(orderDetailSelector.getData);
  const transactionId = orderDetail?.nepisInfos?.transactionId;

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getOrderDetailRequest({ basketOrderId }));

    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch, basketOrderId]);

  return (
    <ErrorBoundary>
      <Row gutter={[theme.spacing(3)]}>
        <Col span={24}>
          <TagStatuses />
        </Col>
        <Col span={24} md={12}>
          <OrderMap />
          <div className={classes.customerInfo}>
            <OrderAddress />
          </div>
        </Col>
        <Col span={24} md={12}>
          <TimelineOrder />
        </Col>
      </Row>
      <Row gutter={[theme.spacing(3)]}>
        <Col span={24} md={12}>
          <Can permKey={permKey.PAGE_GETIR_FOOD_ORDER_DETAIL_CART_INFO_TABLE}>
            <PaymentDetailCard transactionId={transactionId} />
          </Can>
          <CardSections />
          <FoodProductTable />
        </Col>
        <Col span={24} md={12}>
          <FoodUserTable />
          <Can permKey={permKey.PAGE_GETIR_FOOD_ORDER_DETAIL_CART_INFO_TABLE}>
            <CartInfoTable />
          </Can>
        </Col>
      </Row>
    </ErrorBoundary>
  );
};

const reduxKey = REDUX_KEY.BASKET_ORDER.DETAIL;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(GetirFoodBasketOrderDetailPage);
