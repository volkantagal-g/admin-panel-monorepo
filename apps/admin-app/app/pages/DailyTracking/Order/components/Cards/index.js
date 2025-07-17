import { useState, useEffect } from 'react';
import { Row, Empty } from 'antd';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import Card from './Card';
import useStyles from './styles';
import {
  warehouseStatsSelector,
  rateCountsSelector,
  orderPromoDistributionBetweenDatesSelector,
  redBasketCountsSelector,
} from '../../redux/selectors';
import { calculateDiscountedOrderRatio } from '../../util';

const Cards = () => {
  const { t } = useTranslation(['dailyTrackingPage', 'global']);
  const classes = useStyles();

  const warehouseData = useSelector(warehouseStatsSelector.getData);
  const warehouseDataIsPending = useSelector(warehouseStatsSelector.getIsPending);
  const rateCountData = useSelector(rateCountsSelector.getData);
  const rateCountDataIsPending = useSelector(rateCountsSelector.getIsPending);
  const orderPromoDistributionBetweenDatesData = useSelector(
    orderPromoDistributionBetweenDatesSelector.getData,
  );
  const orderPromoDistributionBetweenDatesDataIsPending = useSelector(
    orderPromoDistributionBetweenDatesSelector.getIsPending,
  );
  const redBasketCountsData = useSelector(redBasketCountsSelector.getData);
  const redBasketCountsDataIsPending = useSelector(redBasketCountsSelector.getIsPending);

  const [discountedOrderRatio, setDiscountedOrderRatio] = useState(0);

  useEffect(() => {
    setDiscountedOrderRatio(calculateDiscountedOrderRatio(orderPromoDistributionBetweenDatesData));
  }, [orderPromoDistributionBetweenDatesData]);

  const {
    mergedOrderRatio,
    missedOrderRatio,
    averageDeliveryDurationOfUnbatchedOrders,
    averageDeliveryDurationOfTotalOrders,
    queueOrderRatio,
    queueDuration,
  } = warehouseData;

  const minuteShort = t('MINUTE_SHORT');

  const isDataNotAvailable = _.isEmpty(warehouseData) && _.isEmpty(rateCountData) && _.isEmpty(orderPromoDistributionBetweenDatesData);
  const isPending = warehouseDataIsPending || rateCountDataIsPending || orderPromoDistributionBetweenDatesDataIsPending || redBasketCountsDataIsPending;

  if (isDataNotAvailable && !isPending) {
    return <Empty className={classes.empty} />;
  }

  return (
    <Row
      className={classes.cardsWrapper}
      gutter={[16, 16]}
    >
      <Card
        title={t('RED_BASKET')}
        value={redBasketCountsData}
        isPending={redBasketCountsDataIsPending}
      />
      <Card
        title={t('MISSING_ORDER')}
        value={missedOrderRatio}
        precision={2}
        suffix="%"
        isPending={warehouseDataIsPending}
      />
      <Card
        title={t('DISCOUNTED_ORDER')}
        value={discountedOrderRatio}
        suffix="%"
        isPending={orderPromoDistributionBetweenDatesDataIsPending}
      />
      <Card
        title={t('BATCHED_ORDER')}
        value={mergedOrderRatio}
        suffix="%"
        isPending={warehouseDataIsPending}
      />
      <Card
        title={t('DELIVERY_DURATION_UNBATCHED')}
        value={averageDeliveryDurationOfUnbatchedOrders}
        suffix={minuteShort}
        isPending={warehouseDataIsPending}
      />
      <Card
        title={t('DELIVERY_DURATION_TOTAL')}
        value={averageDeliveryDurationOfTotalOrders}
        suffix={minuteShort}
        isPending={warehouseDataIsPending}
      />
      <Card
        title={t('QUEUE_ORDER')}
        value={queueOrderRatio}
        suffix="%"
        isPending={warehouseDataIsPending}
      />
      <Card
        title={t('QUEUE_DURATION')}
        value={queueDuration}
        suffix={minuteShort}
        isPending={warehouseDataIsPending}
      />
      <Card
        title={t('RATING')}
        value={rateCountData}
        isPending={rateCountDataIsPending}
      />
    </Row>
  );
};

export default Cards;
