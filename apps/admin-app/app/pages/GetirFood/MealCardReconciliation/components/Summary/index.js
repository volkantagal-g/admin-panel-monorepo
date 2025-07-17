import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col, Space, Spin } from 'antd';

import AntCard from '@shared/components/UI/AntCard';
import { currencyFormat } from '@shared/utils/localization';

import useStyles from './styles';
import { getMealCardReconciliation } from '../../redux/selectors';

const Summary = () => {
  const { t } = useTranslation('foodMealCardReconciliation');
  const classes = useStyles();
  const summaryData = useSelector(getMealCardReconciliation.getSummaryData);
  const isPending = useSelector(getMealCardReconciliation.getIsPending);

  const renderRow = (label, fieldName) => {
    let firstValue = currencyFormat().format(summaryData.getirFood[fieldName]);
    let secondValue = currencyFormat().format(summaryData.mealCard[fieldName]);
    
    if (fieldName === 'totalOrderCount') {
      firstValue = summaryData.getirFood[fieldName];
      secondValue = summaryData.mealCard[fieldName];
    }

    return (
      <Row>
        <Col span={12}><b>{label}</b></Col>
        <Col className={classes.textCenter} span={6}>{firstValue}</Col>
        <Col className={classes.textCenter} span={6}>{secondValue}</Col>
      </Row>
    );
  };

  return (
    <AntCard className={classes.container}>
      <Spin spinning={isPending}>
        <Space direction="vertical" className="w-100">
          <Row>
            <Col className={classes.textCenter} span={6} offset={12}><b>{t('RECONCILIATION_DATA.GETIR_FOOD')}</b></Col>
            <Col className={classes.textCenter} span={6}><b>{t('RECONCILIATION_DATA.MEAL_CARD')}</b></Col>
          </Row>
          {renderRow(t('RECONCILIATION_DATA.TOTAL_ORDER_COUNT'), 'totalOrderCount')}
          {renderRow(t('RECONCILIATION_DATA.TOTAL_PAYMENT_AMOUNT'), 'totalPaymentAmount')}
          {renderRow(t('RECONCILIATION_DATA.TOTAL_REFUND_AMOUNT'), 'totalRefundAmount')}
          {renderRow(t('RECONCILIATION_DATA.TOTAL_NET_AMOUNT'), 'totalNetAmount')}
        </Space>   
      </Spin>
    </AntCard>
  );
};

export default Summary;
