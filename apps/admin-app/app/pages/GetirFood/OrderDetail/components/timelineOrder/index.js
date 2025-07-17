import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Tooltip } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import { get, has } from 'lodash';

import { orderDetailSelector } from '@app/pages/GetirFood/OrderDetail/redux/selectors';
import { foodOrderStatuses, foodOrderCancelSource } from '@shared/shared/constantValues';
import { CALLER_TYPES } from '@shared/shared/constants';
import { getLangKey } from '@shared/i18n';
import { formatDate, formatDateWithSecond } from '@shared/utils/dateHelper';
import useStyles from '@app/pages/GetirFood/OrderDetail/components/timelineOrder/styles';
import GetProductComponent from '@app/pages/GetirFood/OrderDetail/components/timelineOrderProducts';
import {
  priceFormatter,
  formatEstimatedDeliveryDuration,
  initProgressBars,
  handleEstimatedDelivery,
} from '@app/pages/GetirFood/OrderDetail/components/timelineOrder/util';
import { currency } from '@shared/utils/common';

const TimelineOrder = () => {
  const orderDetail = useSelector(orderDetailSelector.getData);
  const estimatedDeliveryDuration = get(orderDetail, 'estimatedDeliveryDuration', 0);
  const firstEstimatedDeliveryTime = get(orderDetail, 'firstEstimatedDeliveryTime', null);
  const estimatedDeliveryTimeInterval = get(orderDetail, 'estimatedDeliveryTimeInterval', null);
  const isLastCalculatedETA = has(orderDetail, 'lastCalculatedEstimatedDeliveryDuration');
  const lastCalculatedETA = get(orderDetail, 'lastCalculatedEstimatedDeliveryDuration', 0);
  const isEstimatedDeliveryTime = has(orderDetail, 'estimatedDeliveryTime');
  const estimatedDeliveryTime = get(orderDetail, 'estimatedDeliveryTime', null);
  const minRGEta = get(orderDetail, 'minRGEta', null);
  const scheduledDate = get(orderDetail, 'scheduledDate', null);
  const isQueued = get(orderDetail, 'isQueued', null);

  const { t } = useTranslation('foodOrderPage');
  const classes = useStyles();

  const firstEstimatedDeliveryDuration = useMemo(
    () => formatEstimatedDeliveryDuration(estimatedDeliveryDuration),
    [estimatedDeliveryDuration],
  );

  const lastEstimatedDeliveryDuration = useMemo(
    () => formatEstimatedDeliveryDuration(lastCalculatedETA),
    [lastCalculatedETA],
  );

  const { progressInfos, totalTimeText } = useMemo(
    () => {
      return initProgressBars({ foodOrderDetail: orderDetail });
    },
    [orderDetail],
  );

  const transformedProductsList = get(orderDetail, 'products', []);

  return (
    <>
      <h4 className={classes.customProgressHeader}>
        {t('TOTAL_TIME')}: <strong>{totalTimeText}</strong>
      </h4>
      <div className={classes.customProgress}>
        {
          progressInfos.bars?.map(bar => {
            return (
              <div key={bar.value} className={`${classes.customBar} ${classes[bar.barColor]}`} style={{ width: bar.barPercent }}>
                <Tooltip title={get(bar, 'tooltip', '')} placement="bottom">
                  {get(bar, 'text', '')}
                </Tooltip>
              </div>
            );
          })
        }
      </div>
      <ul className={classes.timeline}>
        <li className={classes.tlHeader}>
          <Button className={classes.orderButton}>
            <span>{`${isQueued ? t('QUEUED_ORDER_PLACED') : t('ORDER_STATUS')} (${formatDate(orderDetail.checkoutDate)}) -`}&nbsp;</span>
            <span>
              {`${t('FIRST_SHOWN_SHORT')}: ${handleEstimatedDelivery(
                scheduledDate || minRGEta || firstEstimatedDeliveryTime,
                firstEstimatedDeliveryDuration,
                estimatedDeliveryTimeInterval,
              )}`}&nbsp;
            </span>
            {(isLastCalculatedETA || isEstimatedDeliveryTime) &&
              (
                <span>
                  {`| ${t('LAST_SHOWN_SHORT')}: ${handleEstimatedDelivery(
                    estimatedDeliveryTime,
                    lastEstimatedDeliveryDuration,
                    estimatedDeliveryTimeInterval,
                  )}`}
                </span>
              )}
          </Button>
        </li>
        {has(orderDetail, 'checkoutDate') && (
          <li className={classes.ltItem}>
            <div className={classes.tlWrapBprimary}>
              <span className={classes.tlDate}>{formatDateWithSecond(get(orderDetail, 'checkoutDate'))}</span>
              <div className={classes.tlContent}>
                <SyncOutlined className={[classes.timelineIcon, classes.upperTimelineIcon]} spin />

                <div className={classes.panelBody}>
                  <div className={classes.tlContentClient}>
                    <div className="text-lt m-b-sm">
                      <a href={`/client/detail/${get(orderDetail, ['client', '_id'])}`}>
                        <strong className={classes.textPrimary}>
                          {get(orderDetail, ['client', 'name'])}
                        </strong>
                      </a>
                      {t('ORDER.CHECKOUT_ORDER')}
                    </div>
                  </div>
                </div>
                <div className={classes.panelBody}>
                  <div className={classes.tlContentBasket}>
                    <ul>
                      <strong>{t('BASKET')}</strong>
                      {transformedProductsList.map(foodProduct => <GetProductComponent key={foodProduct._id} foodProduct={foodProduct} />)}
                    </ul>
                  </div>
                </div>
                {has(orderDetail, 'isEcoFriendly') && (
                  <div className={classes.panelBody}>
                    <div className={classes.tlContentEco}>
                      {get(orderDetail, 'isEcoFriendly') && <span>{t('DONT_SEND_CUTLERY')}</span>}
                      {!get(orderDetail, 'isEcoFriendly') && <span>{t('SEND_CUTLERY')}</span>}
                    </div>
                  </div>
                )}
                <div className={classes.panelBody}>
                  <div className={classes.panelFooter}>
                    <p className={classes.textAlignRight}>
                      {t('TOTAL_PRICE')}: {priceFormatter(get(orderDetail, 'totalPrice'))} {currency()}
                    </p>
                    {has(orderDetail, 'discountedPriceForRestaurant') && (
                      <p className={classes.textAlignRight}>
                        {t('DISCOUNTED_PRICE_FOR_RESTAURANT')}: {priceFormatter(get(orderDetail, 'discountedPriceForRestaurant'))} {currency()}
                      </p>
                    )}
                    {has(orderDetail, 'discountedTotalPrice') && (
                      <p className={classes.textAlignRight}>
                        {t('DISCOUNTED_TOTAL_PRICE')}: {priceFormatter(get(orderDetail, 'discountedTotalPrice'))} {currency()}
                      </p>
                    )}
                    {get(orderDetail, 'appliedDeliveryFee') > 0 && (
                      <p className={classes.textAlignRight}>
                        {t('DELIVERY_FEE')}: {priceFormatter(get(orderDetail, 'appliedDeliveryFee'))} {currency()}
                      </p>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </li>
        )}
        {has(orderDetail, 'verifyDate') && (
          <li className={classes.ltItem}>
            <div className={classes.ltWrap}>
              <span className={classes.tlDate}>{formatDateWithSecond(get(orderDetail, 'verifyDate'))}</span>
              <div className={classes.tlContent}>
                <SyncOutlined className={classes.timelineIcon} spin />
                <b>{get(orderDetail, ['restaurant', 'name'], '')}</b> {t('VERIFY_ORDER')}
              </div>
            </div>
          </li>
        )}
        {has(orderDetail, 'prepareDate') && (
          <li className={classes.ltItem}>
            <div className={classes.tlWrapBprimary}>
              <span className={classes.tlDate}>{formatDateWithSecond(get(orderDetail, 'prepareDate'))}</span>
              <div className={classes.tlContent}>
                <SyncOutlined className={classes.timelineIcon} spin />
                <b>{get(orderDetail, ['restaurant', 'name'], '')}</b> {t('PREPARE_ORDER')}
              </div>
            </div>
          </li>
        )}
        {has(orderDetail, 'handoverDate') && (
          <li className={classes.ltItem}>
            <div className={classes.ltWrap}>
              <span className={classes.tlDate}>{formatDateWithSecond(get(orderDetail, 'handoverDate'))}</span>
              <div className={classes.tlContent}>
                <SyncOutlined className={classes.timelineIcon} spin />
                {t('HANDOVER_ORDER')}
                <a href={`/courier/detail/${get(orderDetail, ['courier', 'id'], '')}`}>
                  <strong className={classes.textPrimary}>{get(orderDetail, ['courier', 'name'], '')}</strong>
                </a>
              </div>
            </div>
          </li>
        )}
        {has(orderDetail, 'courierVerifyDate') && (
          <li className={classes.ltItem}>
            <div className={classes.ltWrap}>
              <span className={classes.tlDate}>{formatDateWithSecond(get(orderDetail, 'courierVerifyDate'))}</span>
              <div className={classes.tlContent}>
                <SyncOutlined className={classes.timelineIcon} spin />
                <a href={`/courier/detail/${get(orderDetail, ['courier', 'id'], '')}`}>
                  <strong className={classes.textPrimary}>{get(orderDetail, ['courier', 'name'], '')}</strong>
                </a>
                {t('VERIFY_ORDER')}
              </div>
            </div>
          </li>
        )}
        {has(orderDetail, 'reachDate') && (
          <li className={classes.ltItem}>
            <div className={classes.ltWrap}>
              <span className={classes.tlDate}>{formatDateWithSecond(get(orderDetail, 'reachDate'))}</span>
              <div className={classes.tlContent}>
                <SyncOutlined className={classes.timelineIcon} spin />
                {t('REACH_LOCATION')}
                <a href={`/courier/detail/${get(orderDetail, ['courier', 'id'], '')}`}>
                  <strong className={classes.textPrimary}>{get(orderDetail, ['courier', 'name'], '')}</strong>
                </a>
              </div>
            </div>
          </li>
        )}
        {has(orderDetail, 'deliverDate') && (
          <li className={classes.ltItem}>
            <div className={classes.ltWrap}>
              <span className={classes.tlDate}>{formatDateWithSecond(get(orderDetail, 'deliverDate'))}</span>
              <div className={classes.tlContent}>
                <SyncOutlined className={classes.timelineIcon} spin />
                <a href={`/courier/detail/${get(orderDetail, ['courier', 'id'], '')}`}>
                  <strong className={classes.textPrimary}>
                    {get(orderDetail, ['courier', 'name'], '')}
                  </strong>
                </a>
                {t('DELIVER_ORDER')}
              </div>
            </div>
          </li>
        )}
        {has(orderDetail, 'rateDate') && (
          <li className={classes.ltItem}>
            <div className={classes.ltWrap}>
              <span className={classes.tlDate}>{formatDateWithSecond(get(orderDetail, 'rateDate'))}</span>
              <div className={classes.tlContent}>
                <SyncOutlined className={classes.timelineIcon} spin />
                <div className={classes.panelBody}>
                  <div className={classes.tlContentClient}>
                    <div className="text-lt m-b-sm">
                      <strong className={classes.textPrimary}>
                        {get(orderDetail, ['client', 'name'], '')}
                      </strong>
                      {t('RATE_ORDER')}
                    </div>
                  </div>
                </div>
                <div className={classes.panelBody}>
                  <div className={classes.tlContentBasket}>
                    <p><strong>{t('RATE')}:</strong> {get(orderDetail, ['rateObj', 'rating'])}</p>
                    <p><strong>{t('COMMENT')}:</strong> {get(orderDetail, ['rateObj', 'comment'])}</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        )}

        {has(orderDetail, 'abortDate') && (
          <li className={classes.ltItem}>
            <div className={classes.tlWrapBprimary}>
              <span className={classes.tlDate}>{formatDateWithSecond(get(orderDetail, 'abortDate'))}</span>
              <div className={classes.tlContent}>
                <SyncOutlined className={classes.timelineIcon} spin />
                <strong className="text-danger">
                  {get(orderDetail, ['client', 'name'], '')}
                </strong>
                {t('ABORT_ORDER')}
              </div>
            </div>
          </li>
        )}

        {has(orderDetail, 'cancelDate') && (
          <li className={classes.ltItem}>
            <div className={classes.ltWrap}>
              <span className={classes.tlDate}>{formatDateWithSecond(get(orderDetail, 'cancelDate'))}</span>
              <div className={classes.tlContent}>
                <SyncOutlined className={classes.timelineIcon} spin />

                <div className="mb-2">
                  <strong className="text-danger">{get(foodOrderStatuses[orderDetail.status], [getLangKey()])} (
                    {get(foodOrderCancelSource[orderDetail.cancelReason.cancelSource], [getLangKey()])})
                  </strong>
                </div>

                <div className={classes.seperator} />

                <div className="pt-2">
                  <p>
                    <strong>{t('CANCEL_REASON')}: </strong> {get(orderDetail, ['cancelReason', 'messages', getLangKey()], '')}
                  </p>
                  <p>
                    <strong>{t('CANCEL_NOTE')}: </strong> {get(orderDetail, 'cancelNote', '')}
                  </p>
                  {get(orderDetail, ['canceledBy', 'callerType']) === get(CALLER_TYPES, 'ADMIN') && (
                    <p>
                      <strong>{t('CANCELED_BY')}: </strong> {get(orderDetail, ['canceledBy', 'user', 'name'], '')}
                    </p>
                  )}
                  {get(orderDetail, ['canceledBy', 'callerType']) === get(CALLER_TYPES, 'CLIENT') && (
                    <p>
                      <strong>{t('CANCELED_BY')}: </strong> {t('CLIENT')}
                    </p>
                  )}
                  {get(orderDetail.cancelClientComment) && (
                    <p>
                      <strong>{t('CLIENT')}: </strong> {get(orderDetail, 'cancelClientComment')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </li>
        )}

        {get(orderDetail, 'status') && (
          <li className={`${classes.tlHeader} mb-0`}>
            <Button className={classes.orderButton}>{get(foodOrderStatuses[orderDetail.status], [getLangKey()])}</Button>
          </li>
        )}

        {get(orderDetail, 'isScheduled') && (
          <li>
            <Button className={classes.orderButton}>{t('SCHEDULED_DELIVERY_DATE')} {formatDate(scheduledDate)}</Button>
          </li>
        )}
      </ul>
    </>
  );
};

export default TimelineOrder;
