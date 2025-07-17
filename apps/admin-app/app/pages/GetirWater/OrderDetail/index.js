import { useEffect, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { Col, Row } from 'antd';
import { useTheme } from 'react-jss';

import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';

import saga from './redux/sagas';
import reducer from './redux/reducers';
import {
  ActionsMenu,
  CardSections,
  Header,
  OrderAdress,
  PaymentCardInfo,
  RefundTable,
  TagStatuses,
  TimelineOrder,
  WaterUserTable,
  OrderNote,
  OrderMap,
  ProductsList,
  IvrActionList,
} from './components';
import { Creators } from './redux/actions';
import { ACTION_TYPE } from './constants';

const reduxKey = REDUX_KEY.GETIR_WATER.ORDER_DETAIL;

const OrderDetail = () => {
  usePageViewAnalytics({ name: ROUTE.GETIR_WATER_ORDER_DETAIL.name, squad: ROUTE.GETIR_WATER_ORDER_DETAIL.squad });
  const dispatch = useDispatch();
  const location = useLocation();
  const { waterOrderId } = useParams();
  const theme = useTheme();

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  useEffect(() => {
    dispatch(Creators.getOrderDetailRequest({ id: waterOrderId }));
  }, [dispatch, waterOrderId]);

  useLayoutEffect(() => {
    const searchQuerys = location.search
      ? new URLSearchParams(location.search)
      : null;
    if (!searchQuerys) {
      return;
    }

    const action = searchQuerys.get('action');

    if (action === ACTION_TYPE.cancel) {
      dispatch(
        Creators.setIsCancelOrderModalVisible({ isCancelOrderModalVisible: true }),
      );
    }
    else if (action === ACTION_TYPE.partialRefund) {
      dispatch(
        Creators.setIsPartialRefundModalVisible({ isPartialRefundModalVisible: true }),
      );
    }
    else if (action === ACTION_TYPE.refund) {
      dispatch(
        Creators.setIsOrderRefundModalVisible({ isOrderRefundModalVisible: true }),
      );
    }
  }, [location, dispatch]);

  return (
    <>
      <Header />
      <Row gutter={[theme.spacing(3)]}>
        <Col span={24}>
          <Row>
            <Col span={12}>
              <TagStatuses />
            </Col>
            <Col span={12}>
              <ActionsMenu />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row>
            <Col span={12}>
              <OrderMap />
              <OrderAdress />
              <CardSections />
              <OrderNote />
            </Col>
            <Col span={12}>
              <TimelineOrder />
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <WaterUserTable />
          <ProductsList />
          <IvrActionList />
        </Col>
        <Col span={12}>
          <RefundTable />
          <PaymentCardInfo />
        </Col>
      </Row>
    </>
  );
};

export default OrderDetail;
