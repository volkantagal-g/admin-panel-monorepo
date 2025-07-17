import { Col, Row } from 'antd';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import _ from 'lodash';

import Spinner from '@shared/components/Spinner';
import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import ErrorBoundary from '@shared/shared/ErrorBoundary';
import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { ActionsMenu, AddressInfo, CardsSection, DetailProgressBar, Map, OrderNote, Tags, TimelineOrder } from './components';
import useVisibilityChange from './hooks/useVisibilityChange';
import { Creators } from './redux/actions';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { financeOrderDetailSelector } from './redux/selectors';
import useStyles from './styles';
import { getIsOrderActive } from './util';

const reduxKey = REDUX_KEY.FINANCE.ORDER;

let interval;

const FinanceOrderDetailPage = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation('financeOrderDetailPage');
  const isPending = useSelector(financeOrderDetailSelector.getIsPending);
  const orderDetail = useSelector(financeOrderDetailSelector.getData);

  const orderStatus = _.get(orderDetail, 'status');
  const isOrderActive = getIsOrderActive(orderStatus);
  const isWindowActive = useVisibilityChange();

  usePageViewAnalytics({
    name: ROUTE.GETIR_FINANCE_ORDER_DETAIL.name,
    squad: ROUTE.GETIR_FINANCE_ORDER_DETAIL.squad,
  });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const setOrderInterval = useCallback(() => {
    interval = setInterval(() => {
      dispatch(Creators.getFinanceOrderDetailIntervalRequest({ orderId }));
    }, 5000);
  }, [dispatch, orderId]);

  const clearOrderInterval = () => clearInterval(interval);

  useEffect(() => {
    dispatch(Creators.getFinanceOrderDetailRequest({ orderId }));
  }, [dispatch, orderId]);

  useEffect(() => {
    if (isOrderActive && isWindowActive) setOrderInterval();
    else clearOrderInterval();

    return () => clearOrderInterval();
  }, [isOrderActive, setOrderInterval, isWindowActive]);

  if (isPending) {
    return (
      <Col span={24}>
        <Spinner />
      </Col>
    );
  }

  return (
    <ErrorBoundary>
      <Row gutter={[theme.spacing(3)]}>
        <Col span={24}>
          <Row>
            <Col span={12}>
              <Tags />
            </Col>
            <Col span={12} className={classes.actionsMenu}>
              <ActionsMenu />
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <div className={classes.titleContent}>
            <b className={classes.mapTitle}>{t('MAP')}</b>
          </div>
          <div className={classes.mapWrapper}>
            <ErrorBoundary>
              <Map />
            </ErrorBoundary>
          </div>
          <div className={classes.customerInfo}>
            <ErrorBoundary>
              <AddressInfo />
            </ErrorBoundary>
          </div>
          <CardsSection />
          <OrderNote />
        </Col>
        <Col span={12}>
          <DetailProgressBar />
          <TimelineOrder />
        </Col>
      </Row>
    </ErrorBoundary>
  );
};

export default FinanceOrderDetailPage;
