import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';
import { Col, Row } from 'antd';

import { ActiveOrder, Header, RestaurantStatus } from './components';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { REDUX_KEY } from '@shared/shared/constants';
import { Creators } from './redux/actions';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from './redux/saga';
import reducer from './redux/reducer';

const FoodActiveOrderSummaryPage = () => {
  usePageViewAnalytics({
    name: ROUTE.GETIR_FOOD_ORDER_SUMMARY.name,
    squad: ROUTE.GETIR_FOOD_ORDER_SUMMARY.squad,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Creators.initPage());

    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <Row gutter={[12, 12]}>
      <Col span={24}>
        <Header />
      </Col>
      <Col span={24} sm={12}>
        <ActiveOrder />
      </Col>
      <Col span={24} sm={12}>
        <RestaurantStatus />
      </Col>
    </Row>
  );
};

const reduxKey = REDUX_KEY.FOOD.ACTIVE_ORDER_SUMMARY;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(FoodActiveOrderSummaryPage);
