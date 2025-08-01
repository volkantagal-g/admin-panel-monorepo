import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';
import { Tabs } from 'antd';

import { useTranslation } from 'react-i18next';

import { Header, OrderTab, TransactionTab } from './components';
import { Creators } from './redux/actions';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import reducer from './redux/reducer';
import saga from './redux/saga';
import useStyles from './styles';

const BankReconciliationReport = () => {
  const { t } = useTranslation(['bankReconciliationReportPage']);

  usePageViewAnalytics({ name: ROUTE.BANK_RECONCILIATION_REPORT.name, squad: ROUTE.BANK_RECONCILIATION_REPORT.squad });
  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <>
      <Header />
      <Tabs className={classes.tabs} defaultActiveKey="1">
        <Tabs.TabPane tab={t('bankReconciliationReportPage:ORDER')} key="1">
          <OrderTab />
        </Tabs.TabPane>
        <Tabs.TabPane tab={t('bankReconciliationReportPage:GETIR_DRIVE_TRANSACTIONS')} key="2">
          <TransactionTab />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

const reduxKey = REDUX_KEY.BANK_RECONCILIATION_REPORT.LIST;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(BankReconciliationReport);
