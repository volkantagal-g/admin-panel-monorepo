import { useCallback, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import { Col, Row } from 'antd';

import moment from 'moment';

import { ROUTE } from '@app/routes';
import useStyles from './styles';

import PaymentData from './components/PaymentData';

import BankData from './components/BankData';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import Payments from './components/Payments';
import { API_DATE_FORMAT } from './constants';

const reduxKey = REDUX_KEY.FOOD.FINANCIAL_DASHBOARD_V2;

const FinancialDashboardV2 = () => {
  const [payoutDate, setPayoutDate] = useState();

  const dispatch = useDispatch();
  const classes = useStyles();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });
  usePageViewAnalytics({ name: ROUTE.GETIR_FOOD_FINANCIAL_DASHBOARD_V2.name, squad: ROUTE.GETIR_FOOD_FINANCIAL_DASHBOARD_V2.squad });

  const getDailyFinancialDashboard = useCallback(
    ({ date }) => {
      dispatch(Creators.getFinancialDashboardPayoutDetailRequest({ payoutDate: date.format(API_DATE_FORMAT) }));
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(Creators.initPage());

    getDailyFinancialDashboard({ date: moment() });
    dispatch(Creators.getFinancialDashboardBankBalancesRequest());

    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch, getDailyFinancialDashboard]);

  useEffect(() => {
    if (payoutDate) {
      getDailyFinancialDashboard({ date: payoutDate });
    }
  }, [getDailyFinancialDashboard, payoutDate]);

  return (
    <>
      <Row className={classes.row}>
        <Col xs={24} sm={18} className={classes.col}>
          <PaymentData payoutDate={payoutDate} onChangePayoutDate={setPayoutDate} />
        </Col>
        <Col xs={24} sm={6} className={classes.col}>
          <BankData />
        </Col>
      </Row>
      <Row>
        <Payments />
      </Row>
    </>
  );
};

export default FinancialDashboardV2;
