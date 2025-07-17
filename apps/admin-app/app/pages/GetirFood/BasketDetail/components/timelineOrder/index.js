import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import { get } from 'lodash';

import { getLangKey } from '@shared/i18n';
import { currency } from '@shared/utils/common';
import { BASKET_ORDER_STATUS } from '@shared/shared/constants';
import { formatDate, formatDateWithSecond } from '@shared/utils/dateHelper';
import { basketOrderStatuses } from '@shared/shared/constantValues';
import { orderDetailSelector } from '@app/pages/GetirFood/BasketDetail/redux/selectors';
import GetProductComponent from './products';
import { priceFormatter, formatEstimatedDeliveryDuration } from './util';
import useStyles from './styles';

const TimelineOrder = () => {
  const orderDetail = useSelector(orderDetailSelector.getData);
  const { t } = useTranslation('foodOrderPage');
  const classes = useStyles();

  const estimatedDeliveryDuration = useMemo(
    () => formatEstimatedDeliveryDuration({ orderDetail }),
    [orderDetail],
  );

  const getPricingInfo = useCallback(
    () => {
      const discountedTotalPrice = get(orderDetail, 'discountedTotalPrice', false);
      const discountedPriceForRestaurant = get(orderDetail, 'discountedPriceForRestaurant', false);
      return (
        <div className={classes.panelFooter}>
          <p className={classes.textAlignRight}>
            {t('TOTAL_PRICE')}: {priceFormatter(get(orderDetail, 'totalPrice'))} {currency()}
          </p>
          {discountedPriceForRestaurant && (
            <p className={classes.textAlignRight}>
              {t('DISCOUNTED_PRICE_FOR_RESTAURANT')}: {priceFormatter(discountedPriceForRestaurant)} {currency()}
            </p>
          )}
          {discountedTotalPrice && (
            <p className={classes.textAlignRight}>
              {t('DISCOUNTED_TOTAL_PRICE')}: {priceFormatter(discountedTotalPrice)} {currency()}
            </p>
          )}
        </div>
      );
    },
    [orderDetail, classes.panelFooter, classes.textAlignRight, t],
  );

  const products = get(orderDetail, 'products', []);
  const transformedProductsList = products.map(p => <GetProductComponent key={p._id} basketProduct={p} productNote={t('PRODUCT.NOTE')} />);

  return (
    <ul className={classes.timeline}>
      <li className={classes.tlHeader}>
        <Button className={classes.orderButton}>
          <span>{t('ORDER_STATUS')} ({formatDate(orderDetail.createdAt)})</span> -
          <span>
            {t('FIRST_SHOWN_SHORT')}: {estimatedDeliveryDuration} {t('MINUTE_SHORT')}
          </span>
        </Button>
      </li>

      {!!transformedProductsList.length && (
        <li className={classes.ltItem}>
          <div className={classes.tlWrapBprimary}>
            <div className={classes.tlContent}>
              <div className={classes.panelBody}>
                <div className={classes.tlContentBasket}>
                  <ul key={get(orderDetail, '_id')} className={classes.basketList}>
                    <strong>{t('BASKET')}</strong>
                    {transformedProductsList}
                  </ul>
                </div>
              </div>
              <div className={classes.panelBody}>
                {getPricingInfo()}
              </div>
            </div>
          </div>
        </li>
      )}

      {[BASKET_ORDER_STATUS.ABORTED, BASKET_ORDER_STATUS.COMPLETED].includes(orderDetail.status) && (
        <li className={classes.ltItem}>
          <div className={classes.tlWrapBprimary}>
            <span className={classes.tlDate}>{formatDateWithSecond(get(orderDetail, 'updatedAt'))}</span>
            <div className={classes.tlContent}>
              <SyncOutlined className={classes.timelineIcon} spin />
              <strong className={BASKET_ORDER_STATUS.ABORTED === orderDetail.status ? 'text-danger' : 'text-primary'}>
                {get(orderDetail, ['client', 'name'], '')}
              </strong>
              {' '}{BASKET_ORDER_STATUS.ABORTED === orderDetail.status ? t('ABORT_ORDER') : t('BASKET_COMPLETED')}
            </div>
          </div>
        </li>
      )}

      {get(orderDetail, 'status') && (
        <li className={`${classes.tlHeader} mb-0`}>
          <Button className={classes.orderButton}>{get(basketOrderStatuses[orderDetail.status], [getLangKey()])}</Button>
        </li>
      )}

      {get(orderDetail, 'isScheduled') && (
        <li>
          <Button className={classes.orderButton}>{t('SCHEDULED_DELIVERY_DATE')} {formatDate(get(orderDetail, 'scheduledDate'))}</Button>
        </li>
      )}
    </ul>
  );
};

export default TimelineOrder;
