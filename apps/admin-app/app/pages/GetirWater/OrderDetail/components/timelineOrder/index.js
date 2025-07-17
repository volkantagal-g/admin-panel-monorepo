import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import _ from 'lodash';

import { waterOrderStatuses } from '@shared/shared/constantValues';
import { getLangKey } from '@shared/i18n';
import { formatDate } from '@shared/utils/dateHelper';
import { currency } from '@shared/utils/common';

import { orderDetailSelector } from '../../redux/selectors';
import { PAYMENT_STATUS, ORDER_STATUS } from '../../constants';
import useStyles from './styles';
import { cancelOptions } from '../actionsMenu/modals/cancelShopOrderModal/cancelOptions';
import { refundOptions } from '../actionsMenu/modals/shopRefundModal/refundOptions';

const TimelineOrder = () => {
  const orderDetail = useSelector(orderDetailSelector.getData) || {};
  const { t } = useTranslation('waterOrderPage');
  const classes = useStyles();

  const priceFormatter = price => {
    const formatedPrice = _.isNumber(price) && Number.parseFloat(price);
    return `₺${formatedPrice.toFixed(2)}`;
  };

  const customerName = _.get(orderDetail, 'customerName', '');
  const customerId = _.get(orderDetail, 'customerId', '');
  const paymentDate = _.get(orderDetail, 'paymentDate', false);
  const approvedDate = _.get(orderDetail, 'approvedDate', false);
  const preparedDate = _.get(orderDetail, 'preparedDate', false);
  const deliveryDate = _.get(orderDetail, 'deliveryDate', false);
  const verifyingStartedDate = _.get(orderDetail, 'verifyingStartedDate', false);
  const cancelDate = _.get(orderDetail, 'cancelDate', false);
  const scheduledDate = _.get(orderDetail, 'scheduledDate', false);
  const vendorName = _.get(orderDetail, 'vendorName', '');
  const paymentStatus = _.get(orderDetail, 'paymentStatus', undefined);
  const orderStatus = _.get(orderDetail, 'orderStatus', false);
  const totalPrice = _.get(orderDetail, 'totalPrice', 0);
  const totalChargedAmount = _.get(orderDetail, 'totalChargedAmount', 0);
  const confirmationCode = _.get(orderDetail, 'confirmationCode', '');
  const isDiscountActive = totalPrice !== totalChargedAmount;
  const canceledByFullName = _.get(orderDetail, 'canceledByFullName', false);
  const cancelReason = _.get(orderDetail, 'cancelReason', false);
  const cancelReasonKey = _.findKey(cancelOptions, item => item === cancelReason, false);
  const cancelNote = _.get(orderDetail, 'cancelNote', false);
  const isAutoDelivered = _.get(orderDetail, 'isAutoDelivered', false);
  const isReturned = _.get(orderDetail, 'isReturned', false);
  const scheduledDeliveryDateStart = _.get(orderDetail, 'scheduledDeliveryDateStart', false);
  const scheduledDeliveryDateEnd = _.get(orderDetail, 'scheduledDeliveryDateEnd', false);
  const isScheduled = _.get(orderDetail, 'isScheduled', false);

  const refundReason = _.get(orderDetail, 'refundReason', false);
  const refundReasonKey = _.findKey(refundOptions, item => item === refundReason, false);
  const refundNote = _.get(orderDetail, 'refundNote', false);
  const isPartialRefund = paymentStatus === PAYMENT_STATUS.PENDING_PARTIAL_REFUND || paymentStatus === PAYMENT_STATUS.PARTIAL_REFUND_SUCCEDED;
  const isPendingRefund = (paymentStatus === PAYMENT_STATUS.PENDING_REFUND && isReturned) ||
   (paymentStatus === PAYMENT_STATUS.PENDING_PARTIAL_REFUND && isReturned);
  const isRefunded = (paymentStatus === PAYMENT_STATUS.REFUNDED && isReturned) || (paymentStatus === PAYMENT_STATUS.PARTIAL_REFUND_SUCCEDED && isReturned);
  const isOrderCanceled = (orderStatus === ORDER_STATUS.CANCELED_ADMIN && !isReturned) || (orderStatus === ORDER_STATUS.CANCELED_VENDOR && !isReturned);

  const orderStatusText = () => {
    if (!refundReasonKey) return waterOrderStatuses[orderStatus][getLangKey()];
    if (isPartialRefund) return t('TIMELINE.ADMIN_PARTIAL_REFUNDED');
    return t('TIMELINE.ADMIN_REFUNDED');
  };

  return (
    <ul className={classes.timeline}>
      <li className={classes.tlHeader}>
        <Button className={classes.orderButton}>
          <span>
            {t('TIMELINE.ORDER_STATUS')} ({formatDate(orderDetail.checkoutDate)})
          </span>
          -<span>{t('TIMELINE.FIRST_SHOWN_SHORT')}</span>
        </Button>
      </li>
      {isScheduled && (
        <li className={classes.ltItem}>
          <div className={classes.tlWrapBprimary}>
            <span className={classes.tlDate}>{formatDate(paymentDate)}</span>
            <div className={classes.tlContent}>
              <SyncOutlined className={classes.timelineIcon} spin />
              <div className="text-lt m-b-sm">
                <a href={`/client/detail/${customerId}`}>
                  <strong className={classes.textPrimary}>{customerName}</strong>
                </a>
                { t('TIMELINE.SCHEDULED_ORDER_POSTFIX')}({confirmationCode})
                <div>
                  <strong>
                    {t('TIMELINE.SCHEDULED_TIME')}
                    {formatDate(scheduledDeliveryDateStart || new Date())} - {formatDate(scheduledDeliveryDateEnd, 'HH.mm')}{' '}
                  </strong>
                </div>
              </div>
            </div>
          </div>
          {!verifyingStartedDate && (
          <div className={classes.ltWrap}>
            <div className={classes.tlContent}>
              <div className={classes.panelBody}>
                <div className={classes.tlContentBasket}>
                  <ul>
                    <strong>{t('TIMELINE.BASKET')}</strong>
                    {orderDetail.products.map(item => {
                      return (
                        <li key={item._id}>
                          <span>
                            {item.count} -{item.name} - ({priceFormatter(item.totalPriceOfAllItems)})
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className={classes.panelBody}>
                <div className={classes.panelFooter}>
                  <p className={classes.textAlignLeft}>
                    {t('TIMELINE.TOTAL_PRICE')}: {priceFormatter(totalPrice)} {currency()}
                  </p>
                  {isDiscountActive && (
                  <p className={classes.textAlignLeft}>
                    {t('TIMELINE.DISCOUNTED_PRICE')}: {priceFormatter(totalChargedAmount)} {currency()}
                  </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          )}
        </li>
      )}
      {
        isScheduled && verifyingStartedDate && (
        <li className={classes.ltItem}>

          <div className={classes.tlWrapBprimary}>
            <span className={classes.tlDate}>{formatDate(verifyingStartedDate)}</span>
            <div className={classes.tlContent}>
              <SyncOutlined className={classes.timelineIcon} spin />
              <div className="text-lt m-b-sm">
                {t('TIMELINE.ORDER_VISIBLE_ON_VP')}.
              </div>
            </div>
          </div>

        </li>
        )
      }
      {!isScheduled && paymentDate && (
        <li className={classes.ltItem}>

          <div className={classes.tlWrapBprimary}>
            <span className={classes.tlDate}>{formatDate(paymentDate)}</span>
            <div className={classes.tlContent}>
              <SyncOutlined className={classes.timelineIcon} spin />
              <div className="text-lt m-b-sm">
                <a href={`/client/detail/${customerId}`}>
                  <strong className={classes.textPrimary}>{customerName}</strong>
                </a>
                {t('TIMELINE.CHECKOUT_ORDER_POSTFIX')}. ({confirmationCode})
              </div>
            </div>
          </div>

          <div className={classes.ltWrap}>
            <div className={classes.tlContent}>
              <div className={classes.panelBody}>
                <div className={classes.tlContentBasket}>
                  <ul>
                    <strong>{t('TIMELINE.BASKET')}</strong>
                    {orderDetail.products.map(item => {
                      return (
                        <li key={item._id}>
                          <span>
                            {item.count} -{item.name} - ({priceFormatter(item.totalPriceOfAllItems)})
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className={classes.panelBody}>
                <div className={classes.panelFooter}>
                  <p className={classes.textAlignLeft}>
                    {t('TIMELINE.TOTAL_PRICE')}: {priceFormatter(totalPrice)} {currency()}
                  </p>
                  {isDiscountActive && (
                    <p className={classes.textAlignLeft}>
                      {t('TIMELINE.DISCOUNTED_PRICE')}: {priceFormatter(totalChargedAmount)} {currency()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </li>
      )}
      {approvedDate && (
        <li className={classes.ltItem}>
          <div className={classes.ltWrap}>
            <span className={classes.tlDate}>{formatDate(approvedDate)}</span>
            <div className={classes.tlContent}>
              <SyncOutlined className={classes.timelineIcon} spin />
              <b>{vendorName}</b> {t('TIMELINE.VERIFY_ORDER_POSTFIX')}
            </div>
          </div>
        </li>
      )}
      {preparedDate && (
        <li className={classes.ltItem}>
          <div className={classes.tlWrapBprimary}>
            <span className={classes.tlDate}>{formatDate(preparedDate)}</span>
            <div className={classes.tlContent}>
              <SyncOutlined className={classes.timelineIcon} spin />
              <b>{vendorName}</b> {t('TIMELINE.PREPARE_ORDER_POSTFIX')}
            </div>
          </div>
        </li>
      )}
      {deliveryDate && (
        <li className={classes.ltItem}>
          <div className={classes.ltWrap}>
            <span className={classes.tlDate}>{formatDate(deliveryDate)}</span>
            <div className={classes.tlContent}>
              <SyncOutlined className={classes.timelineIcon} spin />
              {isAutoDelivered ? t('TIMELINE.DELIVER_ORDER_AUTO_DELIVERED') : t('TIMELINE.DELIVER_ORDER')}
            </div>
          </div>
        </li>
      )}
      {isRefunded && (
        <li className={classes.ltItem}>
          <div className={classes.ltWrap}>
            <span className={classes.tlDate}>{formatDate(cancelDate)}</span>
            <div className={classes.tlContent}>
              <SyncOutlined className={classes.timelineIcon} spin />
              <b className={classes.cancelTitleText}>
                {isPartialRefund ? t('TIMELINE.PARTIAL_REFUNDED_ORDER') : t('TIMELINE.REFUNDED_ORDER')}
              </b>
              <br />
              {refundNote && (
                <>
                  <b>{t('TIMELINE.REFUND_NOTE')}</b>
                  {refundNote}
                  <br />
                </>
              )}
              {refundReasonKey && (
                <>
                  <b>{t('TIMELINE.REFUND_REASON')}</b>
                  {t(`waterOrderDetailModal:REFUND_OPTIONS.${refundReasonKey}`)}
                  <br />
                </>
              )}
            </div>
          </div>
        </li>
      )}
      { isPendingRefund && (
        <li className={classes.ltItem}>
          <div className={classes.ltWrap}>
            <span className={classes.tlDate}>{formatDate(cancelDate)}</span>
            <div className={classes.tlContent}>
              <SyncOutlined className={classes.timelineIcon} spin />
              <b className={classes.cancelTitleText}>
                {isPartialRefund ? t('TIMELINE.WAITING_PARTIAL_REFUND_ORDER') : t('TIMELINE.WAITING_REFUND_ORDER')}
              </b>
              <br />
              {refundNote && (
                <>
                  <b>{t('TIMELINE.REFUND_NOTE')}</b>
                  {refundNote}
                  <br />
                </>
              )}
              {refundReasonKey && (
                <>
                  <b>{t('TIMELINE.REFUND_REASON')}</b>
                  {t(`waterOrderDetailModal:REFUND_OPTIONS.${refundReasonKey}`)}
                  <br />
                </>
              )}
            </div>
          </div>
        </li>
      )}
      {isOrderCanceled && (
        <li className={classes.ltItem}>
          <div className={classes.ltWrap}>
            <span className={classes.tlDate}>{formatDate(cancelDate)}</span>
            <div className={classes.tlContent}>
              <SyncOutlined className={classes.timelineIcon} spin />
              <b className={classes.cancelTitleText}>{t('TIMELINE.CANCELED_ORDER')}</b>
              <br />
              {cancelNote && (
                <>
                  <b>{t('TIMELINE.CANCEL_NOTE')}</b>
                  {cancelNote}
                  <br />
                </>
              )}
              {cancelReasonKey && (
                <>
                  <b>{t('TIMELINE.CANCEL_REASON')}</b>
                  {t(`waterOrderDetailModal:CANCEL_OPTIONS.${cancelReasonKey}`)}
                  <br />
                </>
              )}
              {canceledByFullName && (
                <>
                  <b>{t('TIMELINE.CANCELED_BY_FULLNAME')}</b>
                  {canceledByFullName}
                  <br />
                </>
              )}
            </div>
          </div>
        </li>
      )}
      {orderStatus && (
        <li className={classes.tlHeader}>
          <Button className={classes.orderButton}>{orderStatusText()}</Button>
        </li>
      )}
      {scheduledDate && (
        <li>
          <Button className={classes.orderButton}>
            {t('SCHEDULED_DELIVERY_DATE')} {formatDate(scheduledDate)}
          </Button>
        </li>
      )}
    </ul>
  );
};

export default TimelineOrder;
